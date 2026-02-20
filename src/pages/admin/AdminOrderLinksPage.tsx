import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../auth/AdminAuthProvider";
import { OrderLinkGenerator } from "../../components/order/OrderLinkGenerator";

export function AdminOrderLinksPage() {
    const navigate = useNavigate();
    const { user, logout } = useAdminAuth();

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Stack spacing={3}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            B2B Order Links
                        </Typography>
                        <Typography color="text.secondary">
                            Logged in as {user?.email || user?.username || "admin"}
                        </Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleLogout}>
                        Logout
                    </Button>
                </Box>

                <OrderLinkGenerator />
            </Stack>
        </Container>
    );
}
