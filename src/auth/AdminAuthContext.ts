import { createContext, useContext } from "react";
import type { AdminUser } from "./adminSession";

export type LoginArgs = {
    identifier: string;
    password: string;
};

export type AdminAuthContextValue = {
    jwt: string | null;
    user: AdminUser;
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (args: LoginArgs) => Promise<void>;
    logout: () => void;
};

export const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

export const useAdminAuth = (): AdminAuthContextValue => {
    const ctx = useContext(AdminAuthContext);
    if (!ctx) {
        throw new Error("useAdminAuth must be used inside AdminAuthProvider.");
    }
    return ctx;
};
