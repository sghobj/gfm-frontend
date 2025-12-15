import { Scheme } from "../../components/scheme/Scheme.tsx";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { VisionSection } from "./sections/Vision.tsx";
import { ValuesSection } from "./sections/Values.tsx";
import { WhyUsHeroCarousel } from "./sections/WhyUs.tsx";
import { CsrSection } from "./sections/Csr.tsx";

export const About = () => {
    return (
        <Box className={"section about"}>
            <Scheme id={4}>
                <Grid
                    container
                    spacing={10}
                    className="about-landing"
                    sx={{ minHeight: { md: "fit-content", lg: "80vh" } }}
                >
                    <Grid size={{ lg: 6, sm: 12 }}>
                        <Stack
                            spacing={2}
                            sx={{ m: "auto", height: "100%", justifyContent: "center" }}
                        >
                            <Typography className={"section-heading"} variant={"h1"}>
                                Our Story
                            </Typography>
                            <Typography className={"leading-text"} variant={"h2"}>
                                Beyond organic, we deliver distinction.
                            </Typography>
                            <Typography variant={"body1"} sx={{ textAlign: "justify", m: "auto" }}>
                                Founded in 2014, we are a specialized exporter of premium organic
                                products with strong international coverage and a commercial mindset
                                built for scale. Our expertise spans the full value chain—from
                                agricultural production to global distribution—allowing us to
                                deliver consistent quality, dependable volumes, and smooth
                                operations.
                            </Typography>
                            <Typography variant={"body1"} sx={{ textAlign: "justify", m: "auto" }}>
                                Our leading products include Organic Medjool Dates and Extra Virgin
                                Olive Oil. We export approximately 900–1,000 tons of Organic Medjool
                                dates annually and produce 100–150 tons of Extra Virgin Olive Oil
                                per year, serving clients across HoReCa, importing, retail,
                                wholesale, and distribution channels.
                            </Typography>
                        </Stack>
                    </Grid>

                    <Grid
                        size={{ lg: 6, sm: 12 }}
                        sx={{ alignItems: { lg: "flex-start", xl: "center" }, display: "flex" }}
                    >
                        <img
                            src={new URL("../../assets/110.jpg", import.meta.url).href}
                            alt={"landing-about"}
                            width={"100%"}
                        />
                    </Grid>
                </Grid>
            </Scheme>

            <Scheme id={1}>
                <Box
                    className={"section"}
                    sx={{
                        minHeight: { md: "fit-content", lg: "30vh" },
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Grid spacing={10} container sx={{ margin: "auto" }}>
                        <Grid size={{ lg: 6, sm: 12 }}>
                            <Stack direction={"row"} spacing={2}>
                                <img
                                    src={
                                        new URL("../../assets/mapjordan1.png", import.meta.url).href
                                    }
                                    alt={"jo"}
                                    width={"100%"}
                                />
                            </Stack>
                        </Grid>

                        <Grid size={{ lg: 6, sm: 12 }}>
                            <Stack
                                spacing={2}
                                sx={{ m: "auto", height: "100%", justifyContent: "center" }}
                            >
                                <Typography className={"section-heading"} variant={"h1"}>
                                    Our Mission
                                </Typography>
                                <Typography
                                    className={"mission-text"}
                                    variant={"body1"}
                                    sx={{ textAlign: "justify" }}
                                >
                                    We exist to deliver premium organic products to international
                                    markets—products defined by quality, consistency, and care from
                                    source to shipment. At the same time, our mission is bigger than
                                    trade: to give Jordan and Jordanian products the global exposure
                                    they deserve, strengthening their reputation and value across
                                    the world.
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Scheme>

            <VisionSection />
            <Box className={"section"} sx={{ w: "100%" }}>
                <ValuesSection />
            </Box>

            <Scheme id={3}>
                <Box className={"section"}>
                    <WhyUsHeroCarousel />
                </Box>
            </Scheme>

            <Scheme id={1}>
                <CsrSection />
            </Scheme>
        </Box>
    );
};
