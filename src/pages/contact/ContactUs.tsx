import { Scheme } from "../../components/scheme/Scheme.tsx";
import { LocationMap } from "./sections/LocationMap.tsx";
import { Box, Grid, Typography } from "@mui/material";
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
                </Scheme>
            </Box>
            <Scheme id={1}>
                <LocationMap />
            </Scheme>
        </Box>
    );
};
