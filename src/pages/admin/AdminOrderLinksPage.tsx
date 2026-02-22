import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAdminAuth } from "../../auth/AdminAuthProvider";
import { OrderLinkGenerator } from "../../components/order/OrderLinkGenerator";

export function AdminOrderLinksPage() {
    const navigate = useNavigate();
    const { t } = useTranslation("common");
    const { user, logout } = useAdminAuth();

    const handleLogout = () => {
        logout();
        navigate("/admin/login", { replace: true });
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Stack spacing={3}>
                <Box
                    sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                    <Box>
                        <Typography variant="h4" fontWeight={800}>
                            {t("adminOrderLinks.pageTitle")}
                        </Typography>
                        <Typography color="text.secondary">
                            {t("adminOrderLinks.loggedInAs", {
                                user:
                                    user?.email ||
                                    user?.username ||
                                    t("adminOrderLinks.adminFallback"),
                            })}
                        </Typography>
                    </Box>
                    <Button variant="outlined" onClick={handleLogout}>
                        {t("actions.logout")}
                    </Button>
                </Box>

                <OrderLinkGenerator />
            </Stack>
        </Container>
    );
}
