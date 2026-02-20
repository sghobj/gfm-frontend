export type AdminRole = {
    name?: string | null;
    type?: string | null;
} | null;

export type AdminUser = {
    id?: string | number | null;
    username?: string | null;
    email?: string | null;
    role?: AdminRole;
} | null;

export type AdminSession = {
    jwt: string;
    user: AdminUser;
};

const STORAGE_KEY = "b2b_admin_session_v1";
const ADMIN_ROLE_KEY = "b2b-admin";

const canUseStorage = () => typeof window !== "undefined";
const normalize = (value: unknown) => String(value ?? "").trim().toLowerCase();

export const isB2BAdminRole = (role: AdminRole): boolean => {
    const roleType = normalize(role?.type);
    const roleName = normalize(role?.name);
    return roleType === ADMIN_ROLE_KEY || roleName === ADMIN_ROLE_KEY;
};

export const loadAdminSession = (): AdminSession | null => {
    if (!canUseStorage()) return null;

    try {
        const raw = window.sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return null;

        const parsed = JSON.parse(raw) as AdminSession;
        if (!parsed?.jwt) return null;
        return parsed;
    } catch {
        return null;
    }
};

export const saveAdminSession = (session: AdminSession): void => {
    if (!canUseStorage()) return;
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
};

export const clearAdminSession = (): void => {
    if (!canUseStorage()) return;
    window.sessionStorage.removeItem(STORAGE_KEY);
};

export const getAdminJwtToken = (): string | null => loadAdminSession()?.jwt ?? null;
