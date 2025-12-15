import * as React from "react";
import { Box, Typography, IconButton, Stack, Paper, Grid, Fade, Chip } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

type Point = {
    title: string;
    summary: string;
    detail?: string;
    image: string; // resolved URL
    tag?: string;
};

const points: Point[] = [
    {
        title: "Flexibility (no MOQ)",
        summary: "Order sizes that fit your business + private label options.",
        detail: "No minimum order quantity and customizable private/white labeling.",
        image: new URL("../../../assets/110.jpg", import.meta.url).href,
        tag: "Orders",
    },
    {
        title: "Organic focus",
        summary: "Niche dedication to organic products from private farms.",
        detail: "We continuously improve crop quality with an organic-first mindset.",
        image: new URL("../../../assets/vision.jpg", import.meta.url).href,
        tag: "Quality",
    },
    {
        title: "Agri + logistics know-how",
        summary: "Deep understanding from farming to shipping.",
        detail: "We handle the full value chain to keep deliveries reliable.",
        image: new URL("../../../assets/mapjordan1.png", import.meta.url).href,
        tag: "Operations",
    },
    {
        title: "Long-term partnerships",
        summary: "We’re here for repeat business, not one-off sales.",
        detail: "Your growth is tied to ours — we invest in lasting relationships.",
        image: new URL("../../../assets/110.jpg", import.meta.url).href,
        tag: "Trust",
    },
    {
        title: "Fearless on delicate products",
        summary: "We proactively address objections (quality, shelf life, handling).",
        detail: "Especially for dates and EVOO—consistency and care matter.",
        image: new URL("../../../assets/vision.jpg", import.meta.url).href,
        tag: "Assurance",
    },
    {
        title: "Shelf life + distribution ready",
        summary: "Built for wholesale, retail, HoReCa, and importers.",
        detail: "Product stability and packaging designed for distribution.",
        image: new URL("../../../assets/mapjordan1.png", import.meta.url).href,
        tag: "Distribution",
    },
    {
        title: "Packaging variety",
        summary: "Dates from 50g packs to 5kg cartons; EVOO 250ml–17.5L.",
        detail: "Customize formats based on your market needs.",
        image: new URL("../../../assets/110.jpg", import.meta.url).href,
        tag: "Packaging",
    },
];

export function WhyUsHeroCarousel() {
    const [active, setActive] = React.useState(0);
    const [hovered, setHovered] = React.useState(false);
    const max = points.length;

    const next = React.useCallback(() => setActive((p) => (p + 1) % max), [max]);
    const prev = React.useCallback(() => setActive((p) => (p - 1 + max) % max), [max]);

    // Optional autoplay (every 6s). Pause on hover.
    React.useEffect(() => {
        if (hovered) return;
        const id = window.setInterval(next, 6000);
        return () => window.clearInterval(id);
    }, [next, hovered]);

    const p = points[active];

    return (
        <Stack spacing={2.2}>
            {/* HERO IMAGE */}
            <Paper
                elevation={0}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                sx={{
                    position: "relative",
                    borderRadius: 3,
                    overflow: "hidden",
                    border: "1px solid",
                    borderColor: "divider",
                    minHeight: { xs: 360, md: 520 },
                }}
            >
                {/* background image */}
                <Box
                    key={p.image} // forces transition on image change
                    component="img"
                    src={p.image}
                    alt={p.title}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "scale(1.03)",
                    }}
                />

                {/* gradient overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.10) 100%)",
                    }}
                />

                {/* Controls */}
                <Box sx={{ position: "absolute", top: 14, right: 14, display: "flex", gap: 1 }}>
                    <IconButton
                        onClick={prev}
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.85)",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" },
                        }}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton
                        onClick={next}
                        sx={{
                            backgroundColor: "rgba(255,255,255,0.85)",
                            "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" },
                        }}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </Box>

                {/* Overlay content */}
                <Box
                    sx={{
                        position: "absolute",
                        left: { xs: 16, md: 28 },
                        bottom: { xs: 18, md: 28 },
                        right: { xs: 16, md: 28 },
                    }}
                >
                    <Fade in key={active} timeout={450}>
                        <Box
                            sx={{
                                maxWidth: 720,
                                animation: "liftIn 450ms ease both",
                                "@keyframes liftIn": {
                                    from: { opacity: 0, transform: "translateY(10px)" },
                                    to: { opacity: 1, transform: "translateY(0px)" },
                                },
                            }}
                        >
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                                {p.tag ? (
                                    <Chip
                                        label={p.tag}
                                        size="small"
                                        sx={{
                                            backgroundColor: "rgba(255,255,255,0.14)",
                                            color: "rgba(255,255,255,0.92)",
                                            border: "1px solid rgba(255,255,255,0.20)",
                                        }}
                                    />
                                ) : null}
                                <Typography
                                    sx={{
                                        color: "rgba(255,255,255,0.85)",
                                        letterSpacing: "0.12em",
                                    }}
                                    variant="overline"
                                >
                                    {String(active + 1).padStart(2, "0")} /{" "}
                                    {String(max).padStart(2, "0")}
                                </Typography>
                            </Stack>

                            <Typography
                                sx={{
                                    color: "white",
                                    fontWeight: 700,
                                    lineHeight: 1.1,
                                    fontSize: { xs: "1.55rem", sm: "2.0rem", md: "2.5rem" },
                                }}
                            >
                                {p.title}
                            </Typography>

                            <Typography
                                sx={{
                                    mt: 1.2,
                                    color: "rgba(255,255,255,0.92)",
                                    lineHeight: 1.75,
                                    fontSize: { xs: 14.5, sm: 16 },
                                }}
                            >
                                {p.detail ?? p.summary}
                            </Typography>
                        </Box>
                    </Fade>
                </Box>
            </Paper>

            {/* 7 SUMMARY CARDS (clickable) */}
            <Grid container spacing={1.6}>
                {points.map((item, idx) => {
                    const isActive = idx === active;
                    return (
                        <Grid key={item.title} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                            <Paper
                                onClick={() => setActive(idx)}
                                role="button"
                                tabIndex={0}
                                elevation={0}
                                sx={{
                                    cursor: "pointer",
                                    p: 1.6,
                                    borderRadius: 2.5,
                                    border: "1px solid",
                                    borderColor: isActive ? "text.primary" : "divider",
                                    transform: isActive ? "translateY(-2px)" : "translateY(0px)",
                                    transition:
                                        "transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease",
                                    boxShadow: isActive ? "0 10px 26px rgba(0,0,0,0.10)" : "none",
                                    "&:hover": { transform: "translateY(-2px)" },
                                }}
                            >
                                <Typography sx={{ fontWeight: 700, mb: 0.6, fontSize: 14.5 }}>
                                    {item.title}
                                </Typography>
                                <Typography
                                    sx={{ opacity: 0.85, fontSize: 13.5, lineHeight: 1.55 }}
                                >
                                    {item.summary}
                                </Typography>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
}
