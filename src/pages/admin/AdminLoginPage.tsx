import { useState } from "react";
import { Alert, Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../auth/AdminAuthProvider";

type LocationState = {
    from?: string;
};

export function AdminLoginPage() {
    const navigate = useNavigate();
    const location = useLocation();
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
        } catch (err: any) {
            setError(err?.message ?? "Unable to sign in.");
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
                            Admin Login
                        </Typography>
                        <Typography color="text.secondary">
                            Sign in to generate protected B2B order links.
                        </Typography>
                    </Box>

                    {error && <Alert severity="error">{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            <TextField
                                label="Email or Username"
                                value={identifier}
                                onChange={(event) => setIdentifier(event.target.value)}
                                autoComplete="username"
                                required
                                fullWidth
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                autoComplete="current-password"
                                required
                                fullWidth
                            />
                            <Button type="submit" variant="contained" disabled={busy}>
                                {busy ? "Signing in..." : "Sign in"}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
