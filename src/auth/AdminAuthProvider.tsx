import { useCallback, useMemo, useState, type ReactNode } from "react";
import { useApolloClient } from "@apollo/client/react";
import { AdminAuthContext, type AdminAuthContextValue, type LoginArgs } from "./AdminAuthContext";
import {
    clearAdminSession,
    isB2BAdminRole,
    loadAdminSession,
    saveAdminSession,
} from "./adminSession";
import type { AdminSession } from "./adminSession";
import {
    AdminLoginDocument,
    CurrentUserRoleDocument,
    type AdminLoginMutation,
    type AdminLoginMutationVariables,
    type CurrentUserRoleQuery,
} from "../graphql/gql/graphql";

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const client = useApolloClient();
    const [session, setSession] = useState<AdminSession | null>(() => loadAdminSession());

    const login = useCallback(
        async ({ identifier, password }: LoginArgs) => {
            const cleanIdentifier = identifier.trim();
            if (!cleanIdentifier || !password) {
                throw new Error("Identifier and password are required.");
            }

            const { data } = await client.mutate<AdminLoginMutation, AdminLoginMutationVariables>({
                mutation: AdminLoginDocument,
                variables: {
                    input: {
                        identifier: cleanIdentifier,
                        password,
                    },
                },
            });

            const jwt = data?.login?.jwt ?? null;
            const user = data?.login?.user ?? null;
            if (!jwt || !user) {
                throw new Error("Invalid login response.");
            }

            const roleResponse = await client.query<CurrentUserRoleQuery>({
                query: CurrentUserRoleDocument,
                fetchPolicy: "no-cache",
                context: {
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                },
            });

            const resolvedRole = roleResponse.data?.currentUserRole ?? user.role ?? null;
            if (!isB2BAdminRole(resolvedRole)) {
                throw new Error("This account is not allowed to access admin order links.");
            }

            const nextSession: AdminSession = {
                jwt,
                user: {
                    ...user,
                    role: resolvedRole,
                },
            };
            saveAdminSession(nextSession);
            setSession(nextSession);
        },
        [client],
    );

    const logout = useCallback(() => {
        clearAdminSession();
        setSession(null);
        void client.clearStore();
    }, [client]);

    const value = useMemo<AdminAuthContextValue>(() => {
        const user = session?.user ?? null;
        const jwt = session?.jwt ?? null;
        const isAuthenticated = !!jwt;
        const isAdmin = isAuthenticated && isB2BAdminRole(user?.role ?? null);

        return {
            jwt,
            user,
            isAuthenticated,
            isAdmin,
            login,
            logout,
        };
    }, [session, login, logout]);

    return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}
