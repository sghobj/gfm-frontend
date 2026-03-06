import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
    Fab,
    Drawer,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ViewListIcon from "@mui/icons-material/ViewList";
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
import { MarketingTagChip } from "../../components/product/MarketingTagChip";

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

const JAPANESE_PRODUCTS_SLUG = "japanese-products";
const MAX_PACK_TAGS_PER_CARD = 6;

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

function getOptionalVariantLabel(offering: GQLOffering): string | null {
    const maybeVariantLabel = (offering as GQLOffering & { variantLabel?: string | null })
        .variantLabel;

    if (typeof maybeVariantLabel !== "string") return null;
    const trimmed = maybeVariantLabel.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function isJapaneseProductsSection(product: GQLProduct): boolean {
    const maybeSlug = (product as GQLProduct & { slug?: string | null }).slug;
    return maybeSlug === JAPANESE_PRODUCTS_SLUG;
}

function formatPackOptionLabel(option: {
    displayLabel?: string | null;
    amount?: number | null;
    amountMin?: number | null;
    amountMax?: number | null;
    unit?: string | null;
}): string | null {
    const displayLabel = option.displayLabel?.trim();
    if (displayLabel) return displayLabel;

    if (option.amountMin != null && option.amountMax != null) {
        return `${option.amountMin}-${option.amountMax} ${option.unit ?? ""}`.trim();
    }

    if (option.amount != null) {
        return `${option.amount} ${option.unit ?? ""}`.trim();
    }

    return null;
}

function getOfferingPackOptionLabels(offering: GQLOffering): string[] {
    const labels = new Set<string>();

    for (const packOption of offering.pack_options ?? []) {
        if (!packOption) continue;
        const label = formatPackOptionLabel(packOption);
        if (label) labels.add(label);
    }

    for (const dateSpec of offering.dateSpecifications ?? []) {
        if (!dateSpec) continue;
        for (const packOption of dateSpec.pack_options ?? []) {
            if (!packOption) continue;
            const label = formatPackOptionLabel(packOption);
            if (label) labels.add(label);
        }
    }

    return Array.from(labels);
}

function getProductMarketingTags(
    product: GQLProduct,
): Array<{ id: string; label: string; iconName: string | null; color: string | null }> {
    const tags = product.marketing_tags ?? [];
    const normalized: Array<{
        id: string;
        label: string;
        iconName: string | null;
        color: string | null;
    }> = [];

    for (let index = 0; index < tags.length; index++) {
        const tag = tags[index];
        if (!tag) continue;
        const label = tag.label?.trim();
        if (!label) continue;
        normalized.push({
            id: tag.documentId ?? `${product.documentId}-tag-${index}`,
            label,
            iconName: tag.iconName?.trim() || null,
            color: tag.color?.trim() || null,
        });
    }

    return normalized;
}

// ---------- Component ----------
export function Products() {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language ?? "en") === "rtl";
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
    const pieNavRef = useRef<HTMLDivElement | null>(null);
    const productSectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [activeProductId, setActiveProductId] = useState<string | null>(null);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const [showFloatingProductNav, setShowFloatingProductNav] = useState(false);
    const [mobileProductNavOpen, setMobileProductNavOpen] = useState(false);

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
            const variantLabel = getOptionalVariantLabel(o);
            const matchesSearch =
                o.product!.name.toLowerCase().includes(term) ||
                o.brand!.name.toLowerCase().includes(term) ||
                (variantLabel ? variantLabel.toLowerCase().includes(term) : false);

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

    const productNavItems = useMemo(
        () =>
            productsList.map(({ product }, index) => ({
                id: product.documentId,
                name: product.name,
                color: PIE_SLICE_COLORS[index % PIE_SLICE_COLORS.length],
                imageUrl: product.image?.url ? resolveStrapiMediaUrl(product.image.url) : null,
            })),
        [productsList],
    );

    const pieSlices = useMemo(() => {
        const total = productNavItems.length;
        if (total === 0) return [];

        return productNavItems.map((item, index) => {
            const startAngle = (index / total) * 360;
            const endAngle = ((index + 1) / total) * 360;
            const middleAngle = startAngle + (endAngle - startAngle) / 2;
            const labelPosition = polarToCartesian(100, 100, 63, middleAngle);

            return {
                ...item,
                index,
                path: buildPieSlicePath(100, 100, 98, startAngle, endAngle),
                labelPosition,
                labelLines: splitPieLabel(item.name),
                patternId: `product-pie-pattern-${index}`,
                middleAngle,
            };
        });
    }, [productNavItems]);

    const scrollToProductSection = useCallback((productId: string) => {
        const target = productSectionRefs.current[productId];
        if (!target) return;

        const topOffset = 96;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - topOffset;
        window.scrollTo({ top: Math.max(targetTop, 0), behavior: "smooth" });
        setActiveProductId(productId);
    }, []);

    useEffect(() => {
        if (productNavItems.length === 0) {
            setActiveProductId(null);
            return;
        }

        setActiveProductId((prev) => {
            if (prev && productNavItems.some((item) => item.id === prev)) return prev;
            return productNavItems[0].id;
        });
    }, [productNavItems]);

    useEffect(() => {
        if (loading || !!error || productNavItems.length === 0 || !pieNavRef.current) {
            setShowFloatingProductNav(false);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                setShowFloatingProductNav(!entry.isIntersecting);
            },
            { threshold: 0.15 },
        );

        observer.observe(pieNavRef.current);
        return () => observer.disconnect();
    }, [loading, error, productNavItems.length]);

    useEffect(() => {
        if (productNavItems.length === 0) return;

        const sections = productNavItems
            .map((item) => productSectionRefs.current[item.id])
            .filter((section): section is HTMLDivElement => Boolean(section));

        if (sections.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter((entry) => entry.isIntersecting);
                if (visibleEntries.length === 0) return;

                const mostVisible = visibleEntries.reduce((best, entry) =>
                    entry.intersectionRatio > best.intersectionRatio ? entry : best,
                );
                const id = (mostVisible.target as HTMLDivElement).dataset.productId;
                if (id) setActiveProductId(id);
            },
            {
                threshold: [0.15, 0.3, 0.5, 0.75],
                rootMargin: "-25% 0px -45% 0px",
            },
        );

        sections.forEach((section) => observer.observe(section));
        return () => observer.disconnect();
    }, [productNavItems]);

    useEffect(() => {
        if (!showFloatingProductNav) {
            setMobileProductNavOpen(false);
        }
    }, [showFloatingProductNav]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Hero & Filters */}
            <Scheme id={3}>
                <Box
                    sx={{
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        py: { xs: 6, md: 8 },
                        minHeight: { xs: "auto", lg: "calc(100vh - 72px)" },
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
                        <Stack
                            direction={{ xs: "column", lg: "row" }}
                            spacing={{ xs: 5, lg: 7 }}
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ minHeight: { xs: "auto", lg: "calc(100vh - 180px)" } }}
                        >
                            <Stack spacing={4} sx={{ width: "100%", flex: 1, maxWidth: 760 }}>
                                <Stack spacing={2}>
                                    <SectionTitle>{t("products.hero.title")}</SectionTitle>
                                    <SectionSubtitle>{t("products.hero.subtitle")}</SectionSubtitle>
                                </Stack>

                                <Stack spacing={3}>
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
                                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>
                                        {t("products.navigation.subtitle")}
                                    </Typography>
                                </Stack>
                            </Stack>

                            {!loading && !error && productsList.length > 0 && (
                                <Box
                                    ref={pieNavRef}
                                    sx={{
                                        width: { xs: 290, sm: 360, lg: 460 },
                                        maxWidth: "100%",
                                        flexShrink: 0,
                                    }}
                                >
                                    <Box
                                        component="svg"
                                        viewBox="0 0 200 200"
                                        role="img"
                                        aria-label={t("products.navigation.pieAriaLabel")}
                                        sx={{
                                            display: "block",
                                            width: "100%",
                                            height: "auto",
                                            filter: "drop-shadow(0 18px 34px rgba(23,59,33,0.25))",
                                        }}
                                    >
                                        <defs>
                                            {pieSlices
                                                .filter((slice) => Boolean(slice.imageUrl))
                                                .map((slice) => (
                                                    <pattern
                                                        key={slice.patternId}
                                                        id={slice.patternId}
                                                        x="0"
                                                        y="0"
                                                        width="200"
                                                        height="200"
                                                        patternUnits="userSpaceOnUse"
                                                        patternContentUnits="userSpaceOnUse"
                                                    >
                                                        <image
                                                            href={slice.imageUrl ?? undefined}
                                                            width="200"
                                                            height="200"
                                                            preserveAspectRatio="xMidYMid slice"
                                                            opacity="0.5"
                                                        />
                                                    </pattern>
                                                ))}
                                        </defs>

                                        {pieSlices.map((slice) => {
                                            const isActive = activeProductId === slice.id;
                                            const isHovered = hoveredProductId === slice.id;
                                            const labelShiftY =
                                                slice.labelLines.length > 1 ? -3.5 : 0;
                                            const labelFontSize =
                                                pieSlices.length > 6 ? 6.4 : 7.2;
                                            const overlayOpacity = slice.imageUrl ? 0.55 : 0.9;
                                            const hoverRadians =
                                                ((slice.middleAngle - 90) * Math.PI) / 180;
                                            const hoverOffset = isHovered ? 3 : 0;
                                            const hoverTranslateX =
                                                Math.cos(hoverRadians) * hoverOffset;
                                            const hoverTranslateY =
                                                Math.sin(hoverRadians) * hoverOffset;

                                            return (
                                                <g
                                                    key={slice.id}
                                                    onClick={() => scrollToProductSection(slice.id)}
                                                    onMouseEnter={() =>
                                                        setHoveredProductId(slice.id)
                                                    }
                                                    onMouseLeave={() => setHoveredProductId(null)}
                                                    style={{
                                                        cursor: "pointer",
                                                        transform: `translate(${hoverTranslateX}px, ${hoverTranslateY}px) scale(${isHovered ? 1.02 : 1})`,
                                                        transformOrigin: "center",
                                                        transformBox: "fill-box",
                                                        transition:
                                                            "transform 220ms ease, filter 220ms ease",
                                                        filter: isHovered
                                                            ? "drop-shadow(0 8px 12px rgba(0,0,0,0.18))"
                                                            : "none",
                                                    }}
                                                >
                                                    {slice.imageUrl ? (
                                                        <path
                                                            d={slice.path}
                                                            fill={`url(#${slice.patternId})`}
                                                            style={{ transition: "all 220ms ease-in-out" }}
                                                        />
                                                    ) : null}
                                                    <path
                                                        d={slice.path}
                                                        fill="#ffffff"
                                                        opacity={isHovered ? overlayOpacity - 0.12 : overlayOpacity}
                                                        style={{
                                                            transition: "all 220ms ease-in-out",
                                                        }}
                                                    />
                                                    <path
                                                        d={slice.path}
                                                        fill="none"
                                                        stroke={
                                                            isActive
                                                                ? "rgba(17,48,27,0.96)"
                                                                : isHovered
                                                                  ? "rgba(17,48,27,0.6)"
                                                                : "rgba(23,59,33,0.24)"
                                                        }
                                                        strokeWidth={isActive ? 2.8 : isHovered ? 2.2 : 1.35}
                                                        style={{ transition: "all 220ms ease-in-out" }}
                                                    />
                                                    <text
                                                        x={slice.labelPosition.x}
                                                        y={slice.labelPosition.y + labelShiftY}
                                                        textAnchor="middle"
                                                        fill="#173b21"
                                                        fontSize={isHovered ? labelFontSize + 0.4 : labelFontSize}
                                                        fontWeight={isHovered ? "900" : "800"}
                                                        style={{ pointerEvents: "none" }}
                                                    >
                                                        {slice.labelLines.map((line, lineIndex) => (
                                                            <tspan
                                                                key={`${slice.id}-line-${lineIndex}`}
                                                                x={slice.labelPosition.x}
                                                                dy={lineIndex === 0 ? 0 : 7.6}
                                                            >
                                                                {line}
                                                            </tspan>
                                                        ))}
                                                    </text>
                                                </g>
                                            );
                                        })}
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="34"
                                            fill="rgba(255,255,255,0.95)"
                                            stroke="rgba(31,111,74,0.2)"
                                            strokeWidth="1.5"
                                        />
                                        <text
                                            x="100"
                                            y="95"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#1f6f4a"
                                            fontSize="9"
                                            fontWeight="700"
                                        >
                                            {t("products.navigation.pieCenterTop")}
                                        </text>
                                        <text
                                            x="100"
                                            y="107"
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            fill="#1f6f4a"
                                            fontSize="9"
                                            fontWeight="700"
                                        >
                                            {t("products.navigation.pieCenterBottom")}
                                        </text>
                                    </Box>
                                </Box>
                            )}
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
                            const isJapaneseProductGroup = isJapaneseProductsSection(product);
                            const productMarketingTags = getProductMarketingTags(product);

                                return (
                                    <Box
                                        key={product.documentId}
                                        id={`product-section-${product.documentId}`}
                                        data-product-id={product.documentId}
                                        ref={(node: HTMLDivElement | null) => {
                                            productSectionRefs.current[product.documentId] = node;
                                        }}
                                        sx={{ scrollMarginTop: { xs: 88, md: 110 } }}
                                    >
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
                                                    {productMarketingTags.length > 0 && (
                                                        <Stack
                                                            direction="row"
                                                            useFlexGap
                                                            gap={1}
                                                            flexWrap="wrap"
                                                            sx={{ mt: 1 }}
                                                        >
                                                            {productMarketingTags.map((tag) => (
                                                                <MarketingTagChip
                                                                    key={tag.id}
                                                                    label={tag.label}
                                                                    iconName={tag.iconName}
                                                                    backgroundColor={tag.color}
                                                                />
                                                            ))}
                                                        </Stack>
                                                    )}
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
                                            const packOptionLabels = getOfferingPackOptionLabels(o);
                                            const visiblePackOptionLabels = packOptionLabels.slice(
                                                0,
                                                MAX_PACK_TAGS_PER_CARD,
                                            );
                                            const hasMorePackOptions =
                                                packOptionLabels.length >
                                                visiblePackOptionLabels.length;
                                            const variantLabel = getOptionalVariantLabel(o);
                                            const shouldShowVariantBadge =
                                                isJapaneseProductGroup && Boolean(variantLabel);

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

                                                            {shouldShowVariantBadge && (
                                                                <Chip
                                                                    label={variantLabel}
                                                                    size="small"
                                                                    color="primary"
                                                                    sx={{
                                                                        mt: 1,
                                                                        fontWeight: 700,
                                                                        borderRadius: 1.5,
                                                                        width: "fit-content",
                                                                    }}
                                                                />
                                                            )}

                                                            {visiblePackOptionLabels.length > 0 ? (
                                                                <Stack
                                                                    direction="row"
                                                                    useFlexGap
                                                                    gap={0.75}
                                                                    flexWrap="wrap"
                                                                    sx={{ mt: 1 }}
                                                                >
                                                                    {visiblePackOptionLabels.map(
                                                                        (label, idx) => (
                                                                            <Chip
                                                                                key={`${o.documentId}-pack-${idx}`}
                                                                                label={label}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                sx={{
                                                                                    fontWeight: 600,
                                                                                    borderRadius: 1.5,
                                                                                }}
                                                                            />
                                                                        ),
                                                                    )}
                                                                    {hasMorePackOptions && (
                                                                        <Chip
                                                                            label={`+${packOptionLabels.length - visiblePackOptionLabels.length}`}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            sx={{
                                                                                fontWeight: 700,
                                                                                borderRadius: 1.5,
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            ) : (
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{ mt: 1, display: "block" }}
                                                                >
                                                                    {t(
                                                                        "products.modal.contactPackaging",
                                                                    )}
                                                                </Typography>
                                                            )}

                                                            {visiblePackOptionLabels.length > 0 ? (
                                                                <Stack
                                                                    direction="row"
                                                                    useFlexGap
                                                                    gap={0.75}
                                                                    flexWrap="wrap"
                                                                    sx={{ mt: 1 }}
                                                                >
                                                                    {visiblePackOptionLabels.map(
                                                                        (label, idx) => (
                                                                            <Chip
                                                                                key={`${o.documentId}-pack-${idx}`}
                                                                                label={label}
                                                                                size="small"
                                                                                variant="outlined"
                                                                                sx={{
                                                                                    fontWeight: 600,
                                                                                    borderRadius: 1.5,
                                                                                }}
                                                                            />
                                                                        ),
                                                                    )}
                                                                    {hasMorePackOptions && (
                                                                        <Chip
                                                                            label={`+${packOptionLabels.length - visiblePackOptionLabels.length}`}
                                                                            size="small"
                                                                            variant="outlined"
                                                                            sx={{
                                                                                fontWeight: 700,
                                                                                borderRadius: 1.5,
                                                                            }}
                                                                        />
                                                                    )}
                                                                </Stack>
                                                            ) : (
                                                                <Typography
                                                                    variant="caption"
                                                                    color="text.secondary"
                                                                    sx={{ mt: 1, display: "block" }}
                                                                >
                                                                    {t(
                                                                        "products.modal.contactPackaging",
                                                                    )}
                                                                </Typography>
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

            {showFloatingProductNav && productNavItems.length > 0 && (
                <Box
                    sx={{
                        position: "fixed",
                        top: { md: 96, lg: 118 },
                        [isRtl ? "left" : "right"]: { md: 12, lg: 18 },
                        zIndex: (theme) => theme.zIndex.speedDial,
                        display: { xs: "none", md: "block" },
                        width: { md: 76, lg: 84 },
                        maxHeight: "70vh",
                        overflowY: "auto",
                        borderRadius: 2,
                        p: 1,
                        bgcolor: "rgba(255,255,255,0.96)",
                        border: "1px solid rgba(31,111,74,0.18)",
                        boxShadow: "0 16px 36px rgba(18,47,27,0.18)",
                        backdropFilter: "blur(8px)",
                    }}
                >
                    <Typography
                        variant="caption"
                        sx={{
                            display: "block",
                            pb: 0.8,
                            fontWeight: 700,
                            color: "text.secondary",
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            textAlign: "center",
                            fontSize: "0.58rem",
                        }}
                    >
                        {t("products.navigation.floatingTitle", {
                            defaultValue: "Products",
                        })}
                    </Typography>
                    <Stack spacing={0.95} alignItems="center">
                        {productNavItems.map((item) => {
                            const isActive = activeProductId === item.id;
                            return (
                                <Stack
                                    key={`floating-${item.id}`}
                                    spacing={0.2}
                                    alignItems="center"
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    <Button
                                        size="small"
                                        onClick={() => scrollToProductSection(item.id)}
                                        title={item.name}
                                        aria-label={item.name}
                                        sx={{
                                            p: 0,
                                            minWidth: 0,
                                            width: 44,
                                            height: 44,
                                            borderRadius: "50%",
                                            border: "2px solid",
                                            borderColor: isActive
                                                ? "rgba(23,59,33,0.9)"
                                                : "rgba(23,59,33,0.2)",
                                            bgcolor: isActive
                                                ? "rgba(31,111,74,0.08)"
                                                : "rgba(255,255,255,0.9)",
                                            boxShadow: isActive
                                                ? "0 4px 12px rgba(23,59,33,0.2)"
                                                : "none",
                                            "&:hover": {
                                                borderColor: "rgba(23,59,33,0.75)",
                                                bgcolor: "rgba(31,111,74,0.08)",
                                            },
                                        }}
                                    >
                                        {item.imageUrl ? (
                                            <Avatar
                                                src={item.imageUrl}
                                                alt={item.name}
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                }}
                                            />
                                        ) : (
                                            <Box
                                                sx={{
                                                    width: 36,
                                                    height: 36,
                                                    borderRadius: "50%",
                                                    bgcolor: "rgba(31,111,74,0.16)",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        width: 10,
                                                        height: 10,
                                                        borderRadius: "50%",
                                                        bgcolor: item.color,
                                                    }}
                                                />
                                            </Box>
                                        )}
                                    </Button>
                                </Stack>
                            );
                        })}
                    </Stack>
                </Box>
            )}

            {showFloatingProductNav && productNavItems.length > 0 && (
                <>
                    <Fab
                        color="primary"
                        aria-label={t("products.navigation.mobileFabAriaLabel", {
                            defaultValue: "Open product quick navigation",
                        })}
                        onClick={() => setMobileProductNavOpen(true)}
                        sx={{
                            position: "fixed",
                            bottom: 20,
                            [isRtl ? "left" : "right"]: 16,
                            zIndex: (theme) => theme.zIndex.modal,
                            display: { xs: "inline-flex", md: "none" },
                            boxShadow: "0 14px 30px rgba(18,47,27,0.3)",
                        }}
                    >
                        <ViewListIcon />
                    </Fab>

                    <Drawer
                        anchor="bottom"
                        open={mobileProductNavOpen}
                        onClose={() => setMobileProductNavOpen(false)}
                        PaperProps={{
                            sx: {
                                borderTopLeftRadius: 18,
                                borderTopRightRadius: 18,
                                pb: "calc(16px + env(safe-area-inset-bottom))",
                                px: 2,
                                pt: 1.5,
                                maxHeight: "75vh",
                            },
                        }}
                        sx={{ display: { xs: "block", md: "none" } }}
                    >
                        <Stack spacing={1.5}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography variant="subtitle1" fontWeight={800}>
                                    {t("products.navigation.mobileTitle", {
                                        defaultValue: "Jump to Product",
                                    })}
                                </Typography>
                                <IconButton
                                    size="small"
                                    aria-label={t("products.navigation.mobileCloseAriaLabel", {
                                        defaultValue: "Close product navigation",
                                    })}
                                    onClick={() => setMobileProductNavOpen(false)}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Stack>
                            <Stack spacing={1} sx={{ overflowY: "auto", pb: 0.5 }}>
                                {productNavItems.map((item, index) => {
                                    const isActive = activeProductId === item.id;
                                    return (
                                        <Button
                                            key={`mobile-nav-${item.id}`}
                                            variant={isActive ? "contained" : "outlined"}
                                            onClick={() => {
                                                scrollToProductSection(item.id);
                                                setMobileProductNavOpen(false);
                                            }}
                                            sx={{
                                                justifyContent: "flex-start",
                                                textTransform: "none",
                                                borderRadius: 2,
                                                px: 1.5,
                                                py: 1,
                                                fontWeight: 700,
                                                borderColor: "rgba(31,111,74,0.25)",
                                                bgcolor: isActive ? item.color : "white",
                                                color: isActive ? "white" : "text.primary",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    bgcolor: item.color,
                                                    mr: 1,
                                                    flexShrink: 0,
                                                    border: "1px solid rgba(0,0,0,0.12)",
                                                }}
                                            />
                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    maxWidth: "100%",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    whiteSpace: "nowrap",
                                                    fontWeight: 700,
                                                }}
                                            >
                                                {`${index + 1}. ${item.name}`}
                                            </Typography>
                                        </Button>
                                    );
                                })}
                            </Stack>
                        </Stack>
                    </Drawer>
                </>
            )}

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
