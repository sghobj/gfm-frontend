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
                        background:
                            "radial-gradient(800px 400px at 90% 80%, rgba(99,102,241,0.04), transparent 70%)," +
                            "radial-gradient(600px 400px at 10% 20%, rgba(16,185,129,0.04), transparent 70%)," +
                            "linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(248,250,252,1) 100%)",
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

                        {/* Right Column: Logo Grid */}
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={{ xs: 6, md: 8 }}
                                alignItems="center"
                                justifyContent={{ xs: "center", lg: "flex-start" }}
                            >
                                {/* Prominent First Brand */}
                                {sortedBrands[0] && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                "& img": {
                                                    filter: "grayscale(0%) opacity(1)",
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
                                                maxHeight: { xs: 140, md: 200 },
                                                width: "100%",
                                                maxWidth: 220,
                                                objectFit: "contain",
                                                filter: "grayscale(100%) opacity(0.6)",
                                                transition: "all 0.3s ease",
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Other Brands in a 3x1 line, centered vertically */}
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: {
                                            xs: "repeat(2, 1fr)",
                                            sm: "repeat(3, 1fr)",
                                        },
                                        gap: { xs: 4, md: 5 },
                                        alignItems: "center",
                                    }}
                                >
                                    {sortedBrands.slice(1).map((brand, idx) => (
                                        <Box
                                            key={brand?.documentId ?? idx}
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    transform: "translateY(-4px)",
                                                    "& img": {
                                                        filter: "grayscale(0%) opacity(1)",
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
                                                    maxHeight: { xs: 60, md: 80 },
                                                    width: "100%",
                                                    maxWidth: 160,
                                                    objectFit: "contain",
                                                    filter: "grayscale(100%) opacity(0.6)",
                                                    transition: "all 0.3s ease",
                                                }}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};
