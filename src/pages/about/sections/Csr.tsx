import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import Co2OutlinedIcon from "@mui/icons-material/Co2Outlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";

export function CsrSection() {
    const items = [
        {
            icon: <Co2OutlinedIcon />,
            title: "Reducing carbon footprint",
            text: "We work to lower emissions by improving efficiency across sourcing and logistics where possible.",
        },
        {
            icon: <RecyclingOutlinedIcon />,
            title: "Backing sustainable businesses",
            text: "We support environmentally-conscious partners and initiatives aligned with long-term sustainability.",
        },
        {
            icon: <PublicOutlinedIcon />,
            title: "CBI project (2020–2024)",
            text:
                "We were part of the CBI project (2020–2024), supporting sustainable development in " +
                "emerging economies and encouraging companies to strengthen environmental practices," +
                "water stewardship, and labor conditions.",
        },
    ];

    return (
        <Box className="section">
            <Typography className={"section-heading"} variant={"h1"}>
                CSR (Corporate Social Responsibility)
            </Typography>

            <Typography variant="body1" sx={{ maxWidth: 900, mt: 1.5, opacity: 0.9 }}>
                We believe exporting premium organic products comes with responsibility. Our CSR
                focuses on reducing environmental impact, supporting sustainable practices, and
                contributing to development initiatives that improve conditions across the value
                chain.
            </Typography>

            <Grid container spacing={2.2} sx={{ mt: 3 }}>
                {items.map((i) => (
                    <Grid key={i.title} size={{ xs: 12, md: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.4,
                                borderRadius: 3,
                                border: "1px solid",
                                borderColor: "divider",
                                minHeight: 200,
                                background: "white",
                                transition: "transform 200ms ease",
                                "&:hover": { transform: "translateY(-2px)" },
                            }}
                        >
                            <Stack direction="row" spacing={1.2} alignItems="center" sx={{ mb: 1 }}>
                                <Box sx={{ display: "grid", placeItems: "center" }}>{i.icon}</Box>
                                <Typography sx={{ fontWeight: 700 }}>{i.title}</Typography>
                            </Stack>
                            <Typography sx={{ opacity: 0.85, lineHeight: 1.8 }}>
                                {i.text}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
