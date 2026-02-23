import { Box, Container, Grid, Paper, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { B2BSubscribeForm } from "../../../components/subscription/B2BSubscribeForm";
import { Scheme } from "../../../components/scheme/Scheme";
import { HOME_SECTION_TYPOGRAPHY } from "./homeSectionTypography";

export const B2BSubscribe = () => {
    const { t } = useTranslation("common");

    return (
        <Scheme id={3}>
            <Box
                id="b2b-subscribe"
                sx={{
                    py: { xs: 8, md: 10 },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        maxWidth: "1440px",
                        px: { xs: 2, sm: 4, md: 6 },
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 4,
                            border: "1px solid",
                            borderColor: "divider",
                            p: { xs: 3, sm: 4, md: 5 },
                            bgcolor: "white",
                        }}
                    >
                        <Grid
                            container
                            spacing={{ xs: 3.5, md: 8 }}
                            alignItems="center"
                            color={"black"}
                        >
                            <Grid size={{ xs: 12, md: 5 }}>
                                <Stack spacing={2}>
                                    <Typography
                                        variant="overline"
                                        sx={HOME_SECTION_TYPOGRAPHY.overline}
                                    >
                                        {t("subscription.badge")}
                                    </Typography>
                                    <Typography variant="h2" sx={HOME_SECTION_TYPOGRAPHY.heading}>
                                        {t("subscription.title")}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            ...HOME_SECTION_TYPOGRAPHY.subtitle,
                                            maxWidth: "none",
                                        }}
                                    >
                                        {t("subscription.subtitle")}
                                    </Typography>
                                </Stack>
                            </Grid>

                            <Grid size={{ xs: 12, md: 7 }}>
                                <B2BSubscribeForm variant="homepage" />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>
        </Scheme>
    );
};
