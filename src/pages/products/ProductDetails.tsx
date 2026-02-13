import {
    Box,
    Breadcrumbs,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Link,
    Stack,
    Typography,
    CircularProgress,
    Avatar,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Scheme } from "../../components/scheme/Scheme.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { HeroSection } from "../../components/section/HeroSection.tsx";
import { resolveStrapiMediaUrl } from "../../utils/strapiMedia.ts";
import { GetOfferingDocument } from "../../gql/graphql.ts";
import { StrapiImage } from "../../components/image/StrapiImage.tsx";
import { BlocksTypography } from "../../components/typography/BlocksTypography.tsx";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { useQuery } from "@apollo/client/react";
import { ProductInquiryModal } from "../../components/order/ProductInquiryModal.tsx";
import {useEffect, useMemo, useState} from "react";

function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("");
}

export const ProductDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const { data, loading, error } = useQuery(GetOfferingDocument, {
        variables: { id: id || "" },
        skip: !id,
    });

    const offering = data?.offering;

    const images =useMemo(() => {
        const list = [];
        if (offering?.images && offering.images.length > 0) {
            list.push(...offering.images.filter(Boolean));
        } else if (offering?.product?.image) {
            list.push(offering.product.image);
        }
        return list;
    }, [offering]);

    const [activeImg, setActiveImg] = useState<any>(null);
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    useEffect(() => {
        if (images.length > 0) {
            setActiveImg(images[0]);
        }
    }, [images]);

    if (loading) {
        return (
            <Box sx={{ py: 20, textAlign: "center" }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error || !offering) {
        return (
            <Container maxWidth="xl" sx={{ py: 10, textAlign: "center" }}>
                <Typography variant="h5" color="error" fontWeight={900}>
                    {error ? "Failed to load product" : "Product not found"}
                </Typography>
                <Button onClick={() => navigate("/products")} sx={{ mt: 2 }}>
                    Back to Products
                </Button>
            </Container>
        );
    }

    return (
        <>
            <HeroSection
                title={offering.product?.name || "Product Details"}
                subtitle={offering.product?.category?.name || ""}
                image={resolveStrapiMediaUrl(images[0]?.url) || "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop"}
                height={{ xs: "40vh", md: "50vh" }}
            >
                <Breadcrumbs
                    aria-label="breadcrumb"
                    sx={{
                        color: "white",
                        "& .MuiBreadcrumbs-separator": { color: "rgba(255,255,255,0.7)" }
                    }}
                >
                    <Link
                        underline="hover"
                        onClick={() => navigate("/")}
                        sx={{ cursor: 'pointer', color: "rgba(255,255,255,0.8)", "&:hover": { color: "white" } }}
                    >
                        Home
                    </Link>
                    <Link
                        underline="hover"
                        onClick={() => navigate("/products")}
                        sx={{ cursor: 'pointer', color: "rgba(255,255,255,0.8)", "&:hover": { color: "white" } }}
                    >
                        Products
                    </Link>
                    <Typography sx={{ color: "white", fontWeight: 700 }}>{offering.product?.name}</Typography>
                </Breadcrumbs>
            </HeroSection>
            <Scheme id={1}>
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
                        <Stack spacing={2}>
                            <Box>
                                <Grid container spacing={{ xs: 4, md: 10 }}>
                                    {/* Left: Images */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Box sx={{ position: "sticky", top: 100 }}>
                                            {activeImg && (
                                                <StrapiImage
                                                    media={activeImg}
                                                    alt={offering.product?.name || ""}
                                                    sx={{
                                                        width: "100%",
                                                        height: { xs: 300, md: 500 },
                                                        objectFit: "contain",
                                                        borderRadius: 4,
                                                        bgcolor: "white",
                                                        border: "1px solid",
                                                        borderColor: "divider",
                                                        p: 2,
                                                    }}
                                                />
                                            )}

                                            {images.length > 1 && (
                                                <Stack
                                                    direction="row"
                                                    spacing={1.5}
                                                    sx={{ mt: 2, overflowX: "auto", pb: 1 }}
                                                >
                                                    {images.map((img, idx) => (
                                                        <Box
                                                            key={img?.documentId || idx}
                                                            component="button"
                                                            onClick={() => setActiveImg(img)}
                                                            style={{
                                                                border: "none",
                                                                background: "transparent",
                                                                padding: 0,
                                                                cursor: "pointer",
                                                            }}
                                                            aria-label="Select product image"
                                                        >
                                                            <StrapiImage
                                                                media={img}
                                                                alt=""
                                                                sx={{
                                                                    width: 100,
                                                                    height: 100,
                                                                    objectFit: "contain",
                                                                    borderRadius: 2,
                                                                    border: "2px solid",
                                                                    borderColor:
                                                                        img === activeImg
                                                                            ? "primary.main"
                                                                            : "divider",
                                                                    opacity: img === activeImg ? 1 : 0.6,
                                                                    bgcolor: "white",
                                                                    p: 1,
                                                                    transition: "all 0.2s ease",
                                                                }}
                                                            />
                                                        </Box>
                                                    ))}
                                                </Stack>
                                            )}
                                        </Box>
                                    </Grid>

                                    {/* Right: Details */}
                                    <Grid size={{ xs: 12, md: 6 }}>
                                        <Stack spacing={4}>
                                            <Box>
                                                <Stack
                                                    direction="row"
                                                    spacing={2}
                                                    alignItems="center"
                                                    sx={{ mb: 2 }}
                                                >
                                                    {offering.brand?.logo ? (
                                                        <StrapiImage
                                                            media={offering.brand.logo}
                                                            sx={{
                                                                height: 40,
                                                                width: "auto",
                                                                objectFit: "contain",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Avatar
                                                            sx={{
                                                                bgcolor: "primary.main",
                                                                fontWeight: 800,
                                                            }}
                                                        >
                                                            {initials(offering.brand?.name || "")}
                                                        </Avatar>
                                                    )}
                                                    <Typography
                                                        variant="overline"
                                                        color="text.secondary"
                                                        fontWeight={800}
                                                        sx={{ letterSpacing: 1.2 }}
                                                    >
                                                        {offering.brand?.name}
                                                    </Typography>
                                                </Stack>

                                                <Typography
                                                    variant="h2"
                                                    fontWeight={900}
                                                    sx={{ lineHeight: 1.1, mb: 1 }}
                                                >
                                                    {offering.product?.name}
                                                </Typography>
                                                <Typography
                                                    variant="h5"
                                                    color="primary.main"
                                                    fontWeight={700}
                                                >
                                                    {offering.product?.category?.name}
                                                </Typography>
                                            </Box>

                                            <Divider />

                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={800}
                                                    sx={{
                                                        mb: 2,
                                                        textTransform: "uppercase",
                                                        fontSize: "0.85rem",
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Product Description
                                                </Typography>
                                                {offering.product?.description ? (
                                                    <BlocksTypography
                                                        content={
                                                            offering.product
                                                                .description as BlocksContent
                                                        }
                                                    />
                                                ) : (
                                                    <Typography
                                                        color="text.secondary"
                                                        sx={{ fontStyle: "italic" }}
                                                    >
                                                        No description available for this offering.
                                                    </Typography>
                                                )}
                                            </Box>

                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={800}
                                                    sx={{
                                                        mb: 2,
                                                        textTransform: "uppercase",
                                                        fontSize: "0.85rem",
                                                        color: "text.secondary",
                                                    }}
                                                >
                                                    Availability & Specifications
                                                </Typography>
                                                <Stack spacing={3}>
                                                    {offering.dateSpecifications?.map(
                                                        (spec, sIdx) => (
                                                            <Box
                                                                key={sIdx}
                                                                sx={{
                                                                    p: 2,
                                                                    borderRadius: 2,
                                                                    bgcolor: "background.paper",
                                                                    border: "1px solid",
                                                                    borderColor: "divider",
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="subtitle2"
                                                                    fontWeight={800}
                                                                    color="primary.main"
                                                                    gutterBottom
                                                                >
                                                                    {spec?.grade} - {spec?.sizes}
                                                                </Typography>
                                                                <Stack
                                                                    direction="row"
                                                                    spacing={1}
                                                                    flexWrap="wrap"
                                                                    useFlexGap
                                                                    sx={{ gap: 1, mt: 1 }}
                                                                >
                                                                    {spec?.pack_options?.map(
                                                                        (opt, oIdx) => (
                                                                            <Chip
                                                                                key={oIdx}
                                                                                label={
                                                                                    opt?.displayLabel ||
                                                                                    `${opt?.amount} ${opt?.unit}`
                                                                                }
                                                                                variant="outlined"
                                                                                sx={{
                                                                                    fontWeight: 600,
                                                                                }}
                                                                            />
                                                                        ),
                                                                    )}
                                                                </Stack>
                                                            </Box>
                                                        ),
                                                    )}
                                                </Stack>
                                            </Box>

                                            <Box
                                                sx={{
                                                    p: 3,
                                                    borderRadius: 3,
                                                    bgcolor: "primary.50",
                                                    border: "1px dashed",
                                                    borderColor: "primary.200",
                                                }}
                                            >
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box sx={{ fontSize: "2rem" }}>🌿</Box>
                                                    <Box>
                                                        <Typography
                                                            variant="subtitle1"
                                                            color="primary.900"
                                                            fontWeight={800}
                                                        >
                                                            Authentic Organic Produce
                                                        </Typography>
                                                        <Typography variant="body2" color="primary.800">
                                                            Sourced directly from certified organic
                                                            farms in Jordan.
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                            </Box>

                                            <Button
                                                variant="contained"
                                                size="large"
                                                startIcon={<AddShoppingCartIcon />}
                                                sx={{
                                                    py: 2,
                                                    borderRadius: 2,
                                                    fontWeight: 900,
                                                    fontSize: "1.2rem",
                                                    boxShadow: 6,
                                                    textTransform: "none",
                                                }}
                                                onClick={() => setOrderModalOpen(true)}
                                            >
                                                Product Inquiry
                                            </Button>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Stack>
                    </Container>
                </Box>
            </Scheme>

            {offering && (
                <ProductInquiryModal
                    open={orderModalOpen}
                    onClose={() => setOrderModalOpen(false)}
                    offering={offering}
                />
            )}
        </>
    );
};
