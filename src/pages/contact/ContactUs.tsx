import { Scheme } from "../../components/scheme/Scheme.tsx";
import { LocationMap } from "./sections/LocationMap.tsx";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ContactUs = () => {
    const { t } = useTranslation("common");
    return (
        <Box className={"section contact about"}>
            <Box
                component="section"
                sx={{
                    position: "relative",
                    display: "grid",
                    alignContent: "end",
                    alignItems: "end",
                }}
            >
                <Scheme id={3}>
                    <Box sx={{ py: { xs: 8, md: 12 }, display: "flex", justifyContent: "center" }}>
                        <Container
                            maxWidth="xl"
                            sx={{
                                maxWidth: "1440px",
                                px: { xs: 2, sm: 4, md: 6 },
                            }}
                        >
                            <Grid container>
                                <Grid size={{ sm: 12 }} className={"text-area"}>
                                    <Typography variant="h2" className={"section-heading"}>
                                        {t("contactPage.hero.title")}
                                    </Typography>
                                    <Typography variant="h2" className={"subheader"}>
                                        {t("contactPage.hero.subtitle")}
                                    </Typography>
                                    <Typography variant="body1" className={"landing"}>
                                        {t("contactPage.hero.note")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Container>
                    </Box>
                </Scheme>
            </Box>
            <Scheme id={1}>
                <Box sx={{ py: { xs: 6, md: 8 }, display: "flex", justifyContent: "center" }}>
                    <Container
                        maxWidth="xl"
                        sx={{
                            maxWidth: "1440px",
                            px: { xs: 2, sm: 4, md: 6 },
                        }}
                    >
                        <LocationMap />
                    </Container>
                </Box>
            </Scheme>
        </Box>
    );
};
