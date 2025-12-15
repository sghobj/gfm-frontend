import { Box, Container, Paper, Typography, Divider, useMediaQuery, useTheme } from "@mui/material";
import { Scheme } from "../../../components/scheme/Scheme.tsx";

type ValueItem = { title: string; description: string };

const VALUES: ValueItem[] = [
    {
        title: "Customer First",
        description: "We listen closely, act quickly, and build partnerships that last.",
    },
    {
        title: "Agile & Flexible",
        description: "We adapt with precision—without compromising standards.",
    },
    { title: "Authentic by Nature", description: "What we promise is exactly what we deliver." },
    {
        title: "Integrity, Always",
        description: "We operate with transparency, fairness, and accountability.",
    },
    {
        title: "Commitment to Excellence",
        description: "Every step is held to high standards—from source to shipment.",
    },
    {
        title: "People & Support",
        description: "We invest in our team, because strong people create strong outcomes.",
    },
    {
        title: "Distinctive Culture",
        description: "A shared mindset of quality, ownership, and pride in Jordanian origin.",
    },
];

export const ValuesSection = (): JSX.Element => {
    const theme = useTheme();

    // Column count by breakpoint
    const upMd = useMediaQuery(theme.breakpoints.up("md")); // >= md
    const upSm = useMediaQuery(theme.breakpoints.up("sm")); // >= sm

    const columns = upMd ? 3 : upSm ? 2 : 1;
    const remainder = VALUES.length % columns;

    // If remainder === 0, last row is full -> no spanning needed.
    // If remainder !== 0, we span the last item from its start column to the end.
    const lastItemGridColumn = columns > 1 && remainder !== 0 ? `${remainder} / -1` : undefined;

    return (
        <Scheme id={1}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ textAlign: "center", mb: { xs: 4, md: 6 } }}>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: { xs: "2rem", md: "2.75rem" },
                            lineHeight: 1.1,
                        }}
                    >
                        Our Values
                    </Typography>

                    <Divider
                        sx={{
                            mx: "auto",
                            mt: 2.5,
                            width: 84,
                            borderColor: "rgba(176,141,87,0.55)",
                        }}
                    />

                    <Typography
                        sx={{
                            mt: 2,
                            maxWidth: 820,
                            mx: "auto",
                            lineHeight: 1.8,
                            fontSize: { xs: 14.5, md: 16 },
                        }}
                    >
                        These values are woven into our culture and reflected in how we
                        work—internally and with every partner we serve.
                    </Typography>
                </Box>

                {/* Flexible grid + last card spans full row if alone */}
                <Box
                    sx={{
                        display: "grid",
                        gap: 2.5,
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(3, minmax(0, 1fr))",
                        },
                    }}
                >
                    {VALUES.map((item, idx) => {
                        const isLast = idx === VALUES.length - 1;

                        return (
                            <Box
                                key={item.title}
                                sx={{
                                    ...(isLast && lastItemGridColumn
                                        ? { gridColumn: lastItemGridColumn }
                                        : null),
                                }}
                            >
                                <ValueCard item={item} />
                            </Box>
                        );
                    })}
                </Box>
            </Container>
        </Scheme>
    );
};

function ValueCard({ item }: { item: ValueItem }): JSX.Element {
    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                p: { xs: 2.5, md: 3 },
                borderRadius: 2,
                backgroundColor: "var(--app-primary-light)",
                backdropFilter: "blur(6px)",
                border: "1px solid var(--app-border)",
            }}
        >
            <Typography sx={{ fontWeight: 500, fontSize: { xs: "1.2rem", md: "1.35rem" } }}>
                {item.title}
            </Typography>

            <Typography sx={{ mt: 1.25, lineHeight: 1.8, fontSize: { xs: 14.5, md: 15.5 } }}>
                {item.description}
            </Typography>
        </Paper>
    );
}
