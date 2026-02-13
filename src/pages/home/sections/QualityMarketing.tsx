import { Box, Typography, Container, Grid, Stack, Card, CardContent } from "@mui/material";
import { Scheme } from "../../../components/scheme/Scheme";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NatureIcon from "@mui/icons-material/Nature";
import PublicIcon from "@mui/icons-material/Public";

const features = [
    {
        icon: <NatureIcon fontSize="large" color="primary" />,
        title: "100% Certified Organic",
        description: "Our produce is grown without synthetic pesticides or fertilizers, ensuring pure, natural flavors and maximum nutritional value."
    },
    {
        icon: <VerifiedUserIcon fontSize="large" color="primary" />,
        title: "Highest Quality Standards",
        description: "We adhere to rigorous international quality controls and certifications, guaranteeing premium produce for every shipment."
    },
    {
        icon: <LocalShippingIcon fontSize="large" color="primary" />,
        title: "Freshness Guaranteed",
        description: "Through optimized logistics and cold-chain management, we ensure our products reach you with peak freshness."
    },
    {
        icon: <PublicIcon fontSize="large" color="primary" />,
        title: "Sustainable Farming",
        description: "We support eco-friendly agricultural practices that preserve soil health and water resources in the Jordan Valley."
    }
];

export const QualityMarketing = () => {
    return (
        <Scheme id={2}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
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
                    <Grid container spacing={8} alignItems="center">
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Stack spacing={3}>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    fontWeight={800}
                                    sx={{ letterSpacing: 3 }}
                                >
                                    WHY CHOOSE US
                                </Typography>
                                <Typography variant="h2" fontWeight={900} sx={{ lineHeight: 1.1 }}>
                                    Pure Harvest, <br />
                                    Professional Excellence
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
                                    At Good Food Mood Co., we believe that the best food comes from a
                                    deep respect for nature and a commitment to professional excellence
                                    in every step of the supply chain.
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Grid container spacing={3}>
                                {features.map((feature, index) => (
                                    <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                        <Card
                                            elevation={0}
                                            sx={{
                                                height: "100%",
                                                borderRadius: 3,
                                                bgcolor: "background.paper",
                                                border: "1px solid",
                                                borderColor: "transparent",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    borderColor: "primary.main",
                                                    transform: "translateY(-5px)",
                                                    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
                                                }
                                            }}
                                        >
                                            <CardContent sx={{ p: 4 }}>
                                                <Box sx={{ mb: 2 }}>
                                                    {feature.icon}
                                                </Box>
                                                <Typography variant="h5" fontWeight={800} gutterBottom>
                                                    {feature.title}
                                                </Typography>
                                                <Typography variant="body1" color="text.secondary" lineHeight={1.6}>
                                                    {feature.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};
