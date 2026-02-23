import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Scheme } from "../../../components/scheme/Scheme";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia";
import type { GetHomeDataQuery } from "../../../graphql/gql/graphql";
import { HOME_SECTION_TYPOGRAPHY } from "./homeSectionTypography";

type BrandType = NonNullable<GetHomeDataQuery["brands"]>[number];

type BrandsProps = {
    brands: BrandType[];
};

export const Brands = ({ brands }: BrandsProps) => {
    const { t } = useTranslation("common");
    if (!brands || brands.length === 0) return null;
    const normalizedBrands = brands.filter((brand): brand is NonNullable<BrandType> =>
        Boolean(brand),
    );
    if (normalizedBrands.length === 0) return null;

    const sortedBrands = [...normalizedBrands].sort((a, b) => {
        const aIsGoodJo = a && a.name === "GoodJo";
        const bIsGoodJo = b && b.name === "GoodJo";

        if (aIsGoodJo && !bIsGoodJo) return -1;
        if (!aIsGoodJo && bIsGoodJo) return 1;
        return 0;
    });
    const featuredBrand = sortedBrands[0] ?? null;
    const secondaryBrands = sortedBrands.slice(1);

    return (
        <Scheme id={4}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
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
                                    sx={HOME_SECTION_TYPOGRAPHY.overline}
                                >
                                    {t("home.brands.overline")}
                                </Typography>

                                <Typography variant="h2" sx={HOME_SECTION_TYPOGRAPHY.heading}>
                                    {t("home.brands.title")}
                                </Typography>

                                <Typography variant="body1" sx={HOME_SECTION_TYPOGRAPHY.subtitle}>
                                    {t("home.brands.subtitle")}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Stack spacing={{ xs: 2, md: 3 }} sx={{ width: "100%" }}>
                                {featuredBrand && (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "background.paper",
                                            border: "1px solid",
                                            borderColor: "divider",
                                            borderRadius: 3,
                                            p: { xs: 3, md: 4 },
                                            minHeight: { xs: 210, md: 260 },
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: "primary.main",
                                                boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
                                                transform: "translateY(-4px)",
                                                "& img": {
                                                    transform: "scale(1.04)",
                                                },
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={resolveStrapiMediaUrl(featuredBrand.logo?.url)}
                                            alt={
                                                featuredBrand.logo?.alternativeText ??
                                                featuredBrand.name ??
                                                t("home.brands.logoAlt")
                                            }
                                            loading="lazy"
                                            sx={{
                                                width: "100%",
                                                maxWidth: 280,
                                                maxHeight: { xs: 150, md: 180 },
                                                objectFit: "contain",
                                                borderRadius: 2,
                                                transition: "transform 0.3s ease",
                                                mb: 1.5,
                                            }}
                                        />
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 800,
                                                textAlign: "center",
                                                color: "primary.main",
                                                textTransform: "uppercase",
                                                letterSpacing: 1,
                                            }}
                                        >
                                            {featuredBrand.name}
                                        </Typography>
                                    </Box>
                                )}

                                {secondaryBrands.length > 0 && (
                                    <Box
                                        sx={{
                                            display: "grid",
                                            width: "100%",
                                            gridTemplateColumns: {
                                                xs: "repeat(2, minmax(0, 1fr))",
                                                sm: "repeat(3, minmax(0, 1fr))",
                                            },
                                            gap: { xs: 2, md: 3 },
                                        }}
                                    >
                                        {secondaryBrands.map((brand, idx) => (
                                            <Box
                                                key={brand.documentId ?? idx}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "stretch",
                                                    justifyContent: "center",
                                                    width: "100%",
                                                    minHeight: { xs: 120, md: 136 },
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        transform: "translateY(-4px)",
                                                        "& img": {
                                                            opacity: 1,
                                                            filter: "grayscale(0%)",
                                                            transform: "scale(1.04)",
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
                                                    src={resolveStrapiMediaUrl(brand.logo?.url)}
                                                    alt={
                                                        brand.logo?.alternativeText ??
                                                        brand.name ??
                                                        t("home.brands.logoAlt")
                                                    }
                                                    loading="lazy"
                                                    sx={{
                                                        display: "block",
                                                        width: "100%",
                                                        maxWidth: "100%",
                                                        height: { xs: 88, md: 104 },
                                                        objectFit: "contain",
                                                        bgcolor: "common.white",
                                                        p: 1.25,
                                                        boxSizing: "border-box",
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        opacity: 0.75,
                                                        filter: "grayscale(20%)",
                                                        borderRadius: 2,
                                                        transition: "all 0.3s ease",
                                                        mb: 1.25,
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
                                                        fontSize: "0.68rem",
                                                        opacity: 0.85,
                                                        transition: "all 0.3s ease",
                                                    }}
                                                >
                                                    {brand.name}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};

