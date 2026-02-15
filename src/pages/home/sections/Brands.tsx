import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import { Scheme } from "../../../components/scheme/Scheme";
import { SectionSubtitle } from "../../../components/typography/SectionTypography";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia";
import type { GetHomeDataQuery } from "../../../gql/graphql";

type BrandType = NonNullable<GetHomeDataQuery["brands"]>[number];

type BrandsProps = {
    brands: BrandType[];
};

export const Brands = ({ brands }: BrandsProps) => {
    if (!brands || brands.length === 0) return null;

    const sortedBrands = [...brands].sort((a, b) => {
        const aIsGoodJo = a && a.name === "GoodJo";
        const bIsGoodJo = b && b.name === "GoodJo";

        if (aIsGoodJo && !bIsGoodJo) return -1;
        if (!aIsGoodJo && bIsGoodJo) return 1;
        return 0; // keep relative order for others
    });

    return (
        <Scheme id={4}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {/* Background Gradient similar to CustomersMap */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        // background:
                        //     "radial-gradient(800px 400px at 90% 80%, rgba(99,102,241,0.04), transparent 70%)," +
                        //     "radial-gradient(600px 400px at 10% 20%, rgba(16,185,129,0.04), transparent 70%)," +
                        //     "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
                        zIndex: 0,
                    }}
                />

                <Container
                    maxWidth="xl"
                    sx={{
                        maxWidth: "1440px",
                        px: { xs: 2, sm: 4, md: 6 },
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Stack spacing={3}>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    fontWeight={800}
                                    sx={{ letterSpacing: 3 }}
                                >
                                    OUR BRANDS
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.05,
                                        letterSpacing: -0.5,
                                    }}
                                >
                                    A World of Flavors
                                </Typography>

                                <SectionSubtitle
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "1.1rem",
                                        lineHeight: 1.6,
                                        color: "text.secondary",
                                    }}
                                >
                                    From our flagship premium selection to specialized labels, we
                                    bring together the best organic brands from Jordan.
                                </SectionSubtitle>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: 6,
                                }}
                            >
                                {/* Prominent First Brand - Featured Label */}
                                {sortedBrands[0] && (
                                    <Box
                                        sx={{
                                            position: "relative",
                                            width: "100%",
                                            maxWidth: 600,
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                transform: "translateY(-5px)",
                                                "& img": {
                                                    transform: "scale(1.05)",
                                                    filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.1))",
                                                },
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={resolveStrapiMediaUrl(sortedBrands[0].logo?.url)}
                                            alt={
                                                sortedBrands[0].logo?.alternativeText ??
                                                sortedBrands[0].name ??
                                                "Brand"
                                            }
                                            loading="lazy"
                                            sx={{
                                                maxHeight: { xs: 160, md: 220 },
                                                width: "100%",
                                                maxWidth: 340,
                                                objectFit: "contain",
                                                transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                                                mb: 2,
                                                borderRadius: 3,
                                            }}
                                        />
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 900,
                                                textAlign: "center",
                                                color: "primary.main",
                                                textTransform: "uppercase",
                                                letterSpacing: 2,
                                            }}
                                        >
                                            {sortedBrands[0].name}
                                        </Typography>
                                    </Box>
                                )}

                                {/* Other Brands in a clean horizontal flex/wrap for modern look */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: { xs: 3, md: 4 },
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    {sortedBrands.slice(1).map((brand, idx) => (
                                        <Box
                                            key={brand?.documentId ?? idx}
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                minWidth: { xs: 120, md: 150 },
                                                transition: "all 0.3s ease",
                                                cursor: "default",
                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    "& img": {
                                                        opacity: 1,
                                                        filter: "grayscale(0%) drop-shadow(0 10px 15px rgba(0,0,0,0.05))",
                                                    },
                                                    "& .brand-name": {
                                                        color: "primary.main",
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        >
                                            <Box
                                                component="img"
                                                src={resolveStrapiMediaUrl(brand?.logo?.url)}
                                                alt={
                                                    brand?.logo?.alternativeText ??
                                                    brand?.name ??
                                                    "Brand"
                                                }
                                                loading="lazy"
                                                sx={{
                                                    maxHeight: { xs: 60, md: 75 },
                                                    width: "100%",
                                                    maxWidth: 140,
                                                    objectFit: "contain",
                                                    opacity: 0.6,
                                                    // filter: "grayscale(100%)",
                                                    transition: "all 0.4s ease",
                                                    mb: 1.5,
                                                    borderRadius: 3,
                                                }}
                                            />
                                            <Typography
                                                variant="caption"
                                                className="brand-name"
                                                sx={{
                                                    fontWeight: 700,
                                                    textAlign: "center",
                                                    color: "text.secondary",
                                                    textTransform: "uppercase",
                                                    letterSpacing: 1,
                                                    fontSize: "0.65rem",
                                                    opacity: 0.7,
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                {brand?.name}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};
