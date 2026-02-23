import { useCallback, useMemo, useState, type ReactNode } from "react";
import { gql } from "@apollo/client";
import { useApolloClient } from "@apollo/client/react";
import { AdminAuthContext, type AdminAuthContextValue, type LoginArgs } from "./AdminAuthContext";
import {
    clearAdminSession,
    isB2BAdminRole,
    loadAdminSession,
    saveAdminSession,
} from "./adminSession";
import type { AdminSession, AdminUser } from "./adminSession";

type LoginMutationData = {
    login?: {
        jwt?: string | null;
        user?: AdminUser;
    } | null;
};

type LoginMutationVars = {
    input: {
        identifier: string;
        password: string;
    };
};

type CurrentUserRoleData = {
    currentUserRole?: {
        name?: string | null;
        type?: string | null;
    } | null;
};

const LOGIN_MUTATION = gql`
    mutation AdminLogin($input: UsersPermissionsLoginInput!) {
        login(input: $input) {
            jwt
            user {
                id
                username
                email
                role {
                    name
                    type
                }
            }
        }
    }
`;

const CURRENT_USER_ROLE_QUERY = gql`
    query CurrentUserRole {
        currentUserRole {
            name
            type
        }
    }
`;
export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const client = useApolloClient();
    const [session, setSession] = useState<AdminSession | null>(() => loadAdminSession());

    const login = useCallback(
        async ({ identifier, password }: LoginArgs) => {
            const cleanIdentifier = identifier.trim();
            if (!cleanIdentifier || !password) {
                throw new Error("Identifier and password are required.");
            }

            const { data } = await client.mutate<LoginMutationData, LoginMutationVars>({
                mutation: LOGIN_MUTATION,
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

            const roleResponse = await client.query<CurrentUserRoleData>({
                query: CURRENT_USER_ROLE_QUERY,
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
