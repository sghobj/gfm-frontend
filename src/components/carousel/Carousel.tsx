import * as React from "react";
import { Box, Paper, Typography, IconButton, MobileStepper, Stack } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

type Slide = {
    title: string;
    subtitle?: string;
    body: string;
    bullets?: string[];
    image: string;
};

const slides: Slide[] = [
    {
        title: "Organic Medjool Dates",
        subtitle: "Consistency at scale",
        body: "We supply premium organic Medjool dates with dependable volumes and smooth export operations.",
        bullets: ["900–1,000 tons/year", "Export-ready packaging", "Reliable lead times"],
        image: new URL("../../assets/110.jpg", import.meta.url).href,
    },
    {
        title: "Extra Virgin Olive Oil",
        subtitle: "Jordan’s finest, globally shipped",
        body: "Cold-pressed EVOO produced with strict quality control from harvest to bottling.",
        bullets: ["100–150 tons/year", "Multiple bottle/tin formats", "HoReCa + retail ready"],
        image: new URL("../../assets/vision.jpg", import.meta.url).href,
    },
    {
        title: "Beyond the core portfolio",
        subtitle: "Curated premium products",
        body: "We’re expanding into a curated set of high-quality goods that showcase Jordan at its best.",
        bullets: ["Market-led selection", "Private label options", "Long-term partnerships"],
        image: new URL("../../assets/mapjordan1.png", import.meta.url).href,
    },
];

export function StoryCarousel() {
    const [active, setActive] = React.useState(0);
    const maxSteps = slides.length;

    const handleNext = () => setActive((p) => Math.min(p + 1, maxSteps - 1));
    const handleBack = () => setActive((p) => Math.max(p - 1, 0));

    const s = slides[active];

    return (
        <Paper
            elevation={0}
            sx={{
                overflow: "hidden",
                borderRadius: 0,
                p: 0,
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
                    height: "90vh",
                }}
            >
                {/* Image side */}
                <Box sx={{ position: "relative" }}>
                    <Box
                        component="img"
                        src={s.image}
                        alt={s.title}
                        sx={{
                            width: "100%",
                            height: { xs: 240, md: "100%" },
                            objectFit: "cover",
                            display: "block",
                        }}
                    />
                    {/* Subtle gradient for polish */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(180deg, rgba(0,0,0,0.10) 0%, rgba(0,0,0,0.35) 100%)",
                        }}
                    />
                    <Box sx={{ position: "absolute", left: 16, bottom: 14, right: 16 }}>
                        <Typography sx={{ color: "white", fontWeight: 600, fontSize: 18 }}>
                            {s.title}
                        </Typography>
                        {s.subtitle && (
                            <Typography sx={{ color: "rgba(255,255,255,0.9)" }}>
                                {s.subtitle}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Text side */}
                <Box sx={{ p: { xs: 2.5, md: 3 }, display: "flex" }}>
                    <Stack spacing={1.5} sx={{ width: "100%" }}>
                        <Typography variant="overline" sx={{ letterSpacing: "0.14em" }}>
                            {String(active + 1).padStart(2, "0")} /{" "}
                            {String(maxSteps).padStart(2, "0")}
                        </Typography>

                        <Typography sx={{ fontSize: 22, fontWeight: 600, lineHeight: 1.2 }}>
                            {s.title}
                        </Typography>

                        <Typography sx={{ opacity: 0.9, lineHeight: 1.8 }}>{s.body}</Typography>

                        {s.bullets?.length ? (
                            <Box component="ul" sx={{ m: 0, pl: 2.2 }}>
                                {s.bullets.map((b) => (
                                    <Box key={b} component="li" sx={{ mb: 0.6 }}>
                                        <Typography sx={{ opacity: 0.9 }}>{b}</Typography>
                                    </Box>
                                ))}
                            </Box>
                        ) : null}

                        <Box sx={{ flex: 1 }} />

                        {/* Controls */}
                        <MobileStepper
                            variant="dots"
                            steps={maxSteps}
                            position="static"
                            activeStep={active}
                            sx={{ p: 0, background: "transparent" }}
                            nextButton={
                                <IconButton onClick={handleNext} disabled={active === maxSteps - 1}>
                                    <KeyboardArrowRight />
                                </IconButton>
                            }
                            backButton={
                                <IconButton onClick={handleBack} disabled={active === 0}>
                                    <KeyboardArrowLeft />
                                </IconButton>
                            }
                        />
                    </Stack>
                </Box>
            </Box>
        </Paper>
    );
}
