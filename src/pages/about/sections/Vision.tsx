import { Box, Container, Paper, Typography, Stack, Divider } from "@mui/material";

// Use your generated image URL/path here
const bgImageUrl = new URL("../../../assets/vision.jpg", import.meta.url).href;

export const VisionSection = () => {
    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                py: { xs: 6, md: 10 },
                minHeight: { xs: "auto", md: 650 },
                display: "flex",
                alignItems: "center",
                backgroundImage: `url(${bgImageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                overflowX: "clip", // prevents tiny horizontal scroll
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background: { xs: "rgba(0,0,0,0.35)", md: "rgba(0,0,0,0.25)" },
                }}
            />

            <Container
                maxWidth="lg"
                disableGutters
                sx={{
                    position: "relative",
                    zIndex: 1,
                    px: { xs: 2, sm: 3 }, // manual safe padding
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-start" },
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        // 🔑 Never exceed viewport width on mobile
                        width: { xs: "calc(100vw - 32px)", sm: "100%" }, // 32px = 16px*2 padding
                        maxWidth: { xs: "calc(100vw - 32px)", sm: 640, md: 720 },
                        boxSizing: "border-box",
                        mx: "auto",

                        p: { xs: 2.5, sm: 4, md: 5 },
                        backgroundColor: "rgba(0,0,0,0.65)",
                        color: "#fff",
                        borderRadius: { xs: 2, md: 3 },
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.12)",

                        // 🔑 Protect against long text causing overflow
                        overflowWrap: "anywhere",
                    }}
                >
                    <Typography variant="overline" sx={{ letterSpacing: "0.18em", opacity: 0.9 }}>
                        OUR VISION
                    </Typography>

                    <Typography
                        sx={{
                            mt: 1,
                            mb: 2,
                            fontWeight: 500,
                            fontFamily: "serif",
                            lineHeight: 1.15,
                            fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.6rem" },
                        }}
                    >
                        Scaling Jordan’s finest for the world
                    </Typography>

                    <Typography
                        sx={{ opacity: 0.92, lineHeight: 1.8, fontSize: { xs: 14.5, sm: 16 } }}
                    >
                        Over the next five years, our vision is to become Jordan’s leading export
                        gateway—expanding beyond Organic Medjool Dates and Extra Virgin Olive Oil to
                        a curated portfolio that showcases Jordan at its best.
                    </Typography>

                    <Divider
                        sx={{ my: { xs: 2.5, md: 3 }, borderColor: "rgba(255,255,255,0.22)" }}
                    />

                    <Stack spacing={1.2}>
                        <Line label="Organic Medjool Dates" value="2,000 tons/year" />
                        <Line label="Extra Virgin Olive Oil" value="300 tons/year" />
                        <Line label="Additional premium products" value="200 tons/year" />
                    </Stack>
                </Paper>
            </Container>
        </Box>
    );
};
type LineProps = {
    label: string;
    value: string;
};

function Line({ label, value }: LineProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "baseline",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                overflowWrap: "anywhere",
            }}
        >
            <Typography sx={{ opacity: 0.9, fontSize: { xs: 14, sm: 16 } }}>{label}</Typography>
            <Typography sx={{ fontWeight: 600, fontSize: { xs: 14, sm: 16 } }}>{value}</Typography>
        </Box>
    );
}
