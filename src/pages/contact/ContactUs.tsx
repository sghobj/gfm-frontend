import { Scheme } from "../../components/scheme/Scheme.tsx";
import { LocationMap } from "./sections/LocationMap.tsx";
import { Box, Grid, Typography } from "@mui/material";

export const ContactUs = () => {
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
                                Let’s talk good food.
                            </Typography>
                            <Typography variant="h2" className={"subheader"}>
                                We’re here to help with orders, partnerships, and product info.
                                Reach out and we’ll respond within 1–2 business days.
                            </Typography>
                            <Typography variant="body1" className={"landing"}>
                                Made with care in Jordan. Certified-quality ingredients,
                                always.{" "}
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
