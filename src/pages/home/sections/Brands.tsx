import { Box, Container, Stack, Typography, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Scheme } from "../../../components/scheme/Scheme";
import { SectionSubtitle } from "../../../components/typography/SectionTypography";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia";
import type { GetHomeDataQuery } from "../../../gql/graphql";

type BrandType = NonNullable<GetHomeDataQuery["brands"]>[number];

type BrandsProps = {
    brands: BrandType[];
};

export const Brands = ({ brands }: BrandsProps) => {
    const { t } = useTranslation("common");
    if (!brands || brands.length === 0) return null;

    const sortedBrands = [...brands].sort((a, b) => {
        const aIsGoodJo = a && a.name === "GoodJo";
        const bIsGoodJo = b && b.name === "GoodJo";

        if (aIsGoodJo && !bIsGoodJo) return -1;
        if (!aIsGoodJo && bIsGoodJo) return 1;
        return 0;
    });

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
                                    color="primary"
                                    fontWeight={800}
                                    sx={{ letterSpacing: 3 }}
                                >
                                    {t("home.brands.overline")}
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.05,
                                        letterSpacing: -0.5,
                                    }}
                                >
                                    {t("home.brands.title")}
                                </Typography>

                                <SectionSubtitle
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "1.1rem",
                                        lineHeight: 1.6,
                                        color: "text.secondary",
                                    }}
                                >
                                    {t("home.brands.subtitle")}
                                </SectionSubtitle>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "repeat(2, 1fr)",
                                        sm: "repeat(3, 1fr)",
                                        md: "repeat(3, 1fr)",
                                    },
                                    gridAutoRows: { xs: "140px", md: "180px" },
                                    gap: { xs: 2, md: 3 },
                                }}
                            >
                                {sortedBrands.map((brand, idx) => {
                                    const isFirst = idx === 0;
                                    return (
                                        <Box
                                            key={brand?.documentId ?? idx}
                                            sx={{
                                                gridRow: isFirst ? "span 2" : "span 1",
                                                gridColumn: isFirst
                                                    ? { xs: "span 2", sm: "span 1" }
                                                    : "span 1",
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                // p: 1,
                                                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                                                cursor: "default",
                                                "&:hover": {
                                                    transform: "translateY(-6px)",
                                                    "& img": {
                                                        opacity: 1,
                                                        filter: "grayscale(0%)",
                                                        transform: "scale(1.05)",
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
                                                    t("home.brands.logoAlt")
                                                }
                                                loading="lazy"
                                                sx={{
                                                    maxHeight: isFirst
                                                        ? { xs: 180, md: 260 }
                                                        : { xs: 50, md: 70 },
                                                    alignItems: "center",
                                                    width: "100%",
                                                    maxWidth: isFirst ? 280 : 120,
                                                    objectFit: "contain",
                                                    opacity: isFirst ? 1 : 0.7,
                                                    filter: isFirst ? "none" : "grayscale(20%)",
                                                    transition: "all 0.4s ease",
                                                    mb: isFirst ? 2 : 1.5,
                                                }}
                                            />
                                            <Typography
                                                variant={isFirst ? "h6" : "caption"}
                                                className="brand-name"
                                                sx={{
                                                    fontWeight: 800,
                                                    textAlign: "center",
                                                    color: isFirst
                                                        ? "primary.main"
                                                        : "text.secondary",
                                                    textTransform: "uppercase",
                                                    letterSpacing: 1,
                                                    fontSize: isFirst ? undefined : "0.65rem",
                                                    opacity: 0.8,
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                {brand?.name}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};
