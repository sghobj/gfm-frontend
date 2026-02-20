import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthProvider";

export function RequireAdminAuth() {
    const location = useLocation();
    const { isAuthenticated, isAdmin } = useAdminAuth();

    if (!isAuthenticated || !isAdmin) {
        const redirectTarget = `${location.pathname}${location.search}`;
        return <Navigate to="/admin/login" replace state={{ from: redirectTarget }} />;
    }

    return <Outlet />;
}
