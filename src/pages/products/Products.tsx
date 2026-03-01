import { useMemo, useState } from "react";
import {
    Avatar,
    Box,
    Container,
    Grid,
    InputAdornment,
    MenuItem,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Chip,
    Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { StrapiImage } from "../../components/image/StrapiImage";
import { useQuery } from "@apollo/client/react";

import { BlocksTypography } from "../../components/typography/BlocksTypography.tsx";
import { ProductInquiryModal } from "../../components/order/ProductInquiryModal.tsx";
import { GetAllOfferingsDocument, type GetAllOfferingsQuery } from "../../graphql/gql/graphql.ts";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { Scheme } from "../../components/scheme/Scheme.tsx";
import { SectionSubtitle, SectionTitle } from "../../components/typography/SectionTypography.tsx";
import { LoadingState } from "../../components/state/LoadingState";
import { toStrapiLocale } from "../../apollo/apolloClient.ts";
import { isContentForLocale } from "../../utils/localizedContent.ts";

// ----------------------------
// GraphQL Query
// ----------------------------
const GET_ALL_OFFERINGS = GetAllOfferingsDocument;

// ----------------------------
// UI Types (derived from GQL)
// ----------------------------
type GQLOffering = NonNullable<NonNullable<GetAllOfferingsQuery["offerings"]>[number]>;
type GQLProduct = NonNullable<GQLOffering["product"]>;

type ProductGroup = {
    product: GQLProduct;
    offerings: GQLOffering[];
};

// ---------- UI helpers ----------
function uniq<T>(arr: T[]) {
    return Array.from(new Set(arr));
}
function initials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase())
        .join("");
}

// ---------- Component ----------
export function Products() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data, loading, error } = useQuery(GET_ALL_OFFERINGS, {
        variables: { locale },
    });

    const offerings: GQLOffering[] = useMemo(() => {
        if (!data?.offerings) return [];
        return data.offerings.filter(
            (o): o is GQLOffering =>
                !!o &&
                !!o.brand &&
                !!o.product &&
                isContentForLocale(o.locale, activeLocale) &&
                isContentForLocale(o.brand.locale, activeLocale) &&
                isContentForLocale(o.product.locale, activeLocale) &&
                String(o.availability ?? "").toLowerCase() !== "no",
        );
    }, [data, activeLocale]);
    const hasAnyAvailableOfferings = offerings.length > 0;

    // Filters
    const [search, setSearch] = useState("");
    const [brandFilter, setBrandFilter] = useState<string>("all");

    // Modal state
    const [selectedOffering, setSelectedOffering] = useState<GQLOffering | null>(null);
    const [orderModalOpen, setOrderModalOpen] = useState(false);

    const handleCloseModal = () => setSelectedOffering(null);
    const handleOpenOrder = () => setOrderModalOpen(true);
    const handleCloseOrder = () => setOrderModalOpen(false);

    const brands = useMemo(() => {
        const opts = uniq(offerings.map((o) => `${o.brand!.slug || "unknown"}::${o.brand!.name}`))
            .map((s) => {
                const [slug, name] = s.split("::");
                return { slug, name };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
        return [{ slug: "all", name: t("products.filters.allBrands") }, ...opts];
    }, [offerings, t]);

    // Grouping & Filtering
    const productsList = useMemo(() => {
        const term = search.toLowerCase();

        // Filter offerings first
        const filtered = offerings.filter((o) => {
            const matchesSearch =
                o.product!.name.toLowerCase().includes(term) ||
                o.brand!.name.toLowerCase().includes(term);

            const matchesBrand =
                brandFilter === "all" || (o.brand!.slug || "unknown") === brandFilter;

            return matchesSearch && matchesBrand;
        });

        // Group by product
        const productMap = new Map<string, ProductGroup>();
        for (const o of filtered) {
            const prodId = o.product!.documentId;
            const group = productMap.get(prodId) ?? { product: o.product!, offerings: [] };
            group.offerings.push(o);
            productMap.set(prodId, group);
        }

        return Array.from(productMap.values())
            .sort((a, b) => a.product.name.localeCompare(b.product.name))
            .map((g) => ({
                ...g,
                offerings: g.offerings.sort((a, b) => a.brand!.name.localeCompare(b.brand!.name)),
            }));
    }, [offerings, search, brandFilter]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Hero & Filters */}
            <Scheme id={3}>
                <Box
                    sx={{
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
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
                        <Stack spacing={6}>
                            <Stack spacing={2}>
                                <SectionTitle>{t("products.hero.title")}</SectionTitle>
                                <SectionSubtitle>{t("products.hero.subtitle")}</SectionSubtitle>
                            </Stack>

                            <Stack spacing={3}>
                                {/* Search & Brand Filters */}
                                <Stack direction={{ xs: "column", md: "row" }} useFlexGap gap={2}>
                                    <TextField
                                        size="small"
                                        placeholder={t("products.filters.searchPlaceholder")}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        sx={{
                                            flex: 1,
                                            minWidth: 260,
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor: "white",
                                                borderRadius: 2,
                                                color: "black",
                                            },
                                        }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <TextField
                                        select
                                        size="small"
                                        value={brandFilter}
                                        onChange={(e) => setBrandFilter(e.target.value)}
                                        sx={{
                                            minWidth: 200,
                                            "& .MuiOutlinedInput-root": {
                                                bgcolor: "white",
                                                borderRadius: 2,
                                                color: "black",
                                            },
                                        }}
                                    >
                                        {brands.map((b) => (
                                            <MenuItem key={b.slug} value={b.slug}>
                                                {b.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Scheme>

            {/* Content */}
            <Container
                maxWidth="xl"
                sx={{
                    maxWidth: "1440px",
                    px: { xs: 2, sm: 4, md: 6 },
                    py: { xs: 8, md: 12 },
                }}
            >
                {loading ? (
                    <LoadingState message={t("products.loading")} />
                ) : error ? (
                    <Box sx={{ py: 10, textAlign: "center" }}>
                        <Typography variant="h5" color="error" fontWeight={900}>
                            {t("products.errorLoading")}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            {error.message}
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={10}>
                        {productsList.map(({ product, offerings: groupOfferings }) => {
                            const heroImage = product.image;

                            return (
                                <Box key={product.documentId}>
                                    <Grid
                                        container
                                        spacing={{ xs: 4, md: 10 }}
                                        sx={{ mb: 6 }}
                                        alignItems="center"
                                    >
                                        {heroImage && (
                                            <Grid size={{ xs: 12, md: 6 }}>
                                                <StrapiImage
                                                    media={heroImage}
                                                    alt={product.name}
                                                    sx={{
                                                        width: "100%",
                                                        height: { xs: 250, md: 350 },
                                                        objectFit: "cover",
                                                        borderRadius: 2,
                                                        filter: "grayscale(10%) contrast(1.1)",
                                                        transition: "filter 0.3s ease",
                                                        "&:hover": {
                                                            filter: "none",
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                        )}
                                        <Grid size={{ xs: 12, md: heroImage ? 6 : 12 }}>
                                            <Stack spacing={3}>
                                                <Stack spacing={0.5}>
                                                    <Typography
                                                        variant="overline"
                                                        color="primary.main"
                                                        fontWeight={800}
                                                        sx={{
                                                            letterSpacing: "0.2em",
                                                            opacity: 0.8,
                                                        }}
                                                    >
                                                        {product.category?.name ||
                                                            t("products.labels.other")}
                                                    </Typography>
                                                    <Typography
                                                        variant="h4"
                                                        fontWeight={900}
                                                        sx={{
                                                            letterSpacing: "-0.03em",
                                                            fontSize: { xs: "2.25rem", md: "3rem" },
                                                            lineHeight: 1.1,
                                                        }}
                                                    >
                                                        {product.name}
                                                    </Typography>
                                                </Stack>
                                                {product.description ? (
                                                    <BlocksTypography
                                                        content={
                                                            product.description as BlocksContent
                                                        }
                                                        paragraphSx={{
                                                            lineHeight: 1.4,
                                                            color: "text.secondary",
                                                            overflow: "hidden",
                                                        }}
                                                    />
                                                ) : null}
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    {/* Brand offerings */}
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                sm: "repeat(2, 1fr)",
                                                lg: "repeat(4, 1fr)",
                                            },
                                            gap: { xs: 4, md: 10 },
                                            mb: 6,
                                        }}
                                    >
                                        {groupOfferings.map((o) => {
                                            const brand = o.brand!;
                                            const logo = brand.logo?.url;

                                            return (
                                                <Box
                                                    key={o.documentId}
                                                    onClick={() => setSelectedOffering(o)}
                                                    sx={{
                                                        cursor: "pointer",
                                                        transition:
                                                            "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                        "&:hover": {
                                                            transform: "translateY(-4px)",
                                                            "& .brand-cta": {
                                                                opacity: 1,
                                                                transform: "translateY(0)",
                                                            },
                                                            "& .brand-logo": {
                                                                filter: "grayscale(0%)",
                                                                opacity: 1,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    <Stack spacing={2} sx={{ height: "100%" }}>
                                                        <Box
                                                            sx={{
                                                                height: 120,
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                bgcolor: "background.paper",
                                                                borderRadius: 2,
                                                                p: 3,
                                                                border: "1px solid",
                                                                borderColor: "transparent",
                                                                transition:
                                                                    "border-color 0.3s ease",
                                                                "&:hover": {
                                                                    borderColor: "primary.main",
                                                                },
                                                            }}
                                                        >
                                                            {logo ? (
                                                                <StrapiImage
                                                                    media={brand.logo}
                                                                    className="brand-logo"
                                                                    sx={{
                                                                        maxWidth: "100%",
                                                                        maxHeight: "100%",
                                                                        width: "auto",
                                                                        background: "white",
                                                                        borderRadius: 1,
                                                                        objectFit: "contain",
                                                                        filter: "grayscale(100%)",
                                                                        opacity: 0.6,
                                                                        transition: "all 0.3s ease",
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Avatar
                                                                    sx={{
                                                                        width: 56,
                                                                        height: 56,
                                                                        bgcolor: "primary.main",
                                                                        fontWeight: 900,
                                                                    }}
                                                                >
                                                                    {initials(brand.name)}
                                                                </Avatar>
                                                            )}
                                                        </Box>

                                                        <Box sx={{ px: 1 }}>
                                                            <Stack
                                                                direction="row"
                                                                justifyContent="space-between"
                                                                alignItems="flex-start"
                                                            >
                                                                <Box>
                                                                    <Typography
                                                                        variant="subtitle1"
                                                                        fontWeight={900}
                                                                    >
                                                                        {brand.name}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="text.secondary"
                                                                        sx={{
                                                                            textTransform:
                                                                                "uppercase",
                                                                            letterSpacing: "0.1em",
                                                                        }}
                                                                    >
                                                                        {product.name}
                                                                    </Typography>
                                                                </Box>
                                                            </Stack>

                                                            {o.product?.description && (
                                                                <BlocksTypography
                                                                    content={
                                                                        o.product
                                                                            ?.description as BlocksContent
                                                                    }
                                                                    paragraphSx={{
                                                                        mt: 1,
                                                                        fontSize: "0.85rem",
                                                                        lineHeight: 1.4,
                                                                        color: "text.secondary",
                                                                        display: "-webkit-box",
                                                                        WebkitLineClamp: 2,
                                                                        WebkitBoxOrient: "vertical",
                                                                        overflow: "hidden",
                                                                    }}
                                                                />
                                                            )}

                                                            <Typography
                                                                variant="button"
                                                                className="brand-cta"
                                                                color="primary.main"
                                                                sx={{
                                                                    display: "block",
                                                                    mt: 2,
                                                                    fontWeight: 900,
                                                                    fontSize: "0.75rem",
                                                                    opacity: 0,
                                                                    transform: "translateY(5px)",
                                                                    transition: "all 0.3s ease",
                                                                }}
                                                            >
                                                                {t("products.labels.showMore")}
                                                            </Typography>
                                                        </Box>
                                                    </Stack>
                                                </Box>
                                            );
                                        })}
                                    </Box>
                                    <Divider />
                                </Box>
                            );
                        })}

                        {productsList.length === 0 && (
                            <Box sx={{ py: 10, textAlign: "center" }}>
                                <Typography variant="h5" fontWeight={900}>
                                    {hasAnyAvailableOfferings
                                        ? t("products.empty.noResultsTitle")
                                        : t("products.empty.comingSoonTitle")}
                                </Typography>
                                {hasAnyAvailableOfferings ? (
                                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                                        {t("products.empty.noResultsSubtitle")}
                                    </Typography>
                                ) : (
                                    <Typography color="text.secondary" sx={{ mt: 1 }}>
                                        {t("products.empty.comingSoonSubtitle")}
                                    </Typography>
                                )}
                            </Box>
                        )}
                    </Stack>
                )}
            </Container>

            {/* Product Summary Modal */}
            <Dialog
                open={Boolean(selectedOffering)}
                onClose={handleCloseModal}
                maxWidth="md"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1, background: "white" },
                }}
            >
                {selectedOffering && (
                    <>
                        <DialogTitle
                            sx={{
                                m: 0,
                                p: 2,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6" fontWeight={900}>
                                {t("products.modal.title")}
                            </Typography>
                            <IconButton
                                aria-label="close"
                                onClick={handleCloseModal}
                                sx={{ color: (theme) => theme.palette.grey[500] }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent dividers sx={{ p: 3 }}>
                            <Grid container spacing={4}>
                                <Grid size={{ xs: 12, md: 5 }}>
                                    <StrapiImage
                                        media={selectedOffering.images?.[0]}
                                        alt={selectedOffering.product?.name || ""}
                                        sx={{
                                            width: "100%",
                                            aspectRatio: "1/1",
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, md: 7 }}>
                                    <Stack spacing={3}>
                                        <Box>
                                            <Typography
                                                variant="overline"
                                                color="primary"
                                                fontWeight={800}
                                                sx={{ letterSpacing: 1.5 }}
                                            >
                                                {selectedOffering.product?.category?.name ||
                                                    t("products.modal.premiumHarvest")}
                                            </Typography>
                                            <Typography
                                                variant="h4"
                                                fontWeight={900}
                                                sx={{ mb: 1, lineHeight: 1.2 }}
                                            >
                                                {selectedOffering.product?.name}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                useFlexGap
                                                gap={1}
                                                alignItems="center"
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    color="text.secondary"
                                                >
                                                    {t("products.modal.by")}
                                                </Typography>
                                                <Typography variant="subtitle1" fontWeight={700}>
                                                    {selectedOffering.brand?.name}
                                                </Typography>
                                            </Stack>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                fontWeight={800}
                                                gutterBottom
                                                sx={{
                                                    textTransform: "uppercase",
                                                    fontSize: "0.75rem",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {t("products.modal.availablePackaging")}
                                            </Typography>

                                            {selectedOffering.isMedjoolDate ? (
                                                <Stack spacing={2}>
                                                    {selectedOffering.dateSpecifications?.map(
                                                        (spec, specIdx) => {
                                                            const grade = spec?.grade ?? "";
                                                            const size = spec?.sizes ?? "";
                                                            const packOpts = (
                                                                spec?.pack_options ?? []
                                                            ).filter(Boolean);

                                                            if (
                                                                !grade &&
                                                                !size &&
                                                                packOpts.length === 0
                                                            )
                                                                return null;

                                                            return (
                                                                <Box key={specIdx}>
                                                                    <Typography
                                                                        variant="caption"
                                                                        fontWeight={700}
                                                                        sx={{
                                                                            color: "primary.main",
                                                                            mb: 1,
                                                                            display: "block",
                                                                        }}
                                                                    >
                                                                        {grade}{" "}
                                                                        {grade && size ? " - " : ""}{" "}
                                                                        {size}
                                                                    </Typography>

                                                                    <Stack
                                                                        direction="row"
                                                                        spacing={1}
                                                                        flexWrap="wrap"
                                                                        useFlexGap
                                                                        sx={{ gap: 1 }}
                                                                    >
                                                                        {packOpts.map(
                                                                            (opt, idx) => {
                                                                                const label =
                                                                                    opt?.displayLabel ||
                                                                                    (opt?.amountMin !=
                                                                                        null &&
                                                                                    opt?.amountMax !=
                                                                                        null
                                                                                        ? `${opt.amountMin}-${opt.amountMax} ${opt.unit ?? ""}`.trim()
                                                                                        : `${opt?.amount ?? ""} ${opt?.unit ?? ""}`.trim());

                                                                                return (
                                                                                    <Chip
                                                                                        key={`${specIdx}-${idx}`}
                                                                                        label={
                                                                                            label ||
                                                                                            t(
                                                                                                "products.modal.option",
                                                                                            )
                                                                                        }
                                                                                        variant="outlined"
                                                                                        size="small"
                                                                                        sx={{
                                                                                            fontWeight: 600,
                                                                                            borderRadius: 1.5,
                                                                                        }}
                                                                                    />
                                                                                );
                                                                            },
                                                                        )}
                                                                    </Stack>
                                                                </Box>
                                                            );
                                                        },
                                                    )}

                                                    {(!selectedOffering.dateSpecifications ||
                                                        selectedOffering.dateSpecifications
                                                            .length === 0) && (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ fontStyle: "italic" }}
                                                        >
                                                            {t("products.modal.contactPackaging")}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            ) : (
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                    flexWrap="wrap"
                                                    useFlexGap
                                                    sx={{ gap: 1 }}
                                                >
                                                    {(selectedOffering.pack_options ?? []).filter(
                                                        Boolean,
                                                    ).length ? (
                                                        (selectedOffering.pack_options ?? [])
                                                            .filter(Boolean)
                                                            .map((opt, idx) => {
                                                                const label =
                                                                    opt?.displayLabel ||
                                                                    `${opt?.amount ?? ""} ${opt?.unit ?? ""}`.trim() ||
                                                                    t("products.modal.option");

                                                                return (
                                                                    <Chip
                                                                        key={`nd-${idx}`}
                                                                        label={label}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        sx={{
                                                                            fontWeight: 600,
                                                                            borderRadius: 1.5,
                                                                        }}
                                                                    />
                                                                );
                                                            })
                                                    ) : (
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{ fontStyle: "italic" }}
                                                        >
                                                            {t("products.modal.contactPackaging")}
                                                        </Typography>
                                                    )}
                                                </Stack>
                                            )}
                                        </Box>

                                        <Box
                                            sx={{
                                                bgcolor: "primary.50",
                                                p: 2,
                                                borderRadius: 2,
                                                border: "1px dashed",
                                                borderColor: "primary.200",
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                color="primary.900"
                                                fontWeight={600}
                                            >
                                                {t("products.modal.authenticTitle")}
                                            </Typography>
                                            <Typography variant="caption" color="primary.800">
                                                {t("products.modal.authenticSubtitle")}
                                            </Typography>
                                        </Box>

                                        <Stack direction="row" useFlexGap gap={2}>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                size="large"
                                                onClick={handleOpenOrder}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    fontWeight: 900,
                                                    textTransform: "none",
                                                    fontSize: "1.1rem",
                                                    boxShadow: 4,
                                                }}
                                            >
                                                {t("products.modal.orderInquiry")}
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                fullWidth
                                                size="large"
                                                endIcon={<OpenInNewIcon />}
                                                onClick={() => {
                                                    navigate(
                                                        `/product/${selectedOffering.documentId}`,
                                                    );
                                                    handleCloseModal();
                                                }}
                                                sx={{
                                                    py: 1.5,
                                                    borderRadius: 2,
                                                    fontWeight: 900,
                                                    textTransform: "none",
                                                    fontSize: "1.1rem",
                                                }}
                                            >
                                                {t("products.modal.fullDetails")}
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </>
                )}
            </Dialog>

            {selectedOffering && (
                <ProductInquiryModal
                    open={orderModalOpen}
                    onClose={handleCloseOrder}
                    offering={selectedOffering}
                />
            )}
        </Box>
    );
}
