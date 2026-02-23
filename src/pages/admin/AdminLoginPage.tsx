import { useState } from "react";
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "../../auth/AdminAuthContext";

type LocationState = {
    from?: string;
};

export function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation("common");
    const { login, isAuthenticated, isAdmin } = useAdminAuth();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (isAuthenticated && isAdmin) {
        return <Navigate to="/admin/order-links" replace />;
    }

    const redirectTarget = (
        (location.state as LocationState | null)?.from ?? "/admin/order-links"
    ).toString();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setBusy(true);
        setError(null);

        try {
            await login({ identifier, password });
            navigate(redirectTarget, { replace: true });
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : t("adminLogin.errors.unableToSignIn");
            setError(message);
        } finally {
            setBusy(false);
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={2} sx={{ p: 4 }}>
                <Stack spacing={3}>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            {t("adminLogin.title")}
                        </Typography>
                        <Typography color="text.secondary">{t("adminLogin.subtitle")}</Typography>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label={t("adminLogin.fields.identifier")}
                                value={identifier}
                                onChange={(event) => setIdentifier(event.target.value)}
                                autoComplete="username"
                                required
                                fullWidth
                            />
                            <TextField
                                label={t("adminLogin.fields.password")}
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                            <Button type="submit" variant="contained" disabled={busy}>
                                {busy
                                    ? t("adminLogin.actions.signingIn")
                                    : t("adminLogin.actions.signIn")}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
