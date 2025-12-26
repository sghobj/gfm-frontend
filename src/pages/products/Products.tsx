import {
    Alert,
    Badge,
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Checkbox,
    Chip,
    Container,
    Divider,
    Drawer,
    FormControl,
    FormControlLabel,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    MenuItem,
    Select,
    Slider,
    Snackbar,
    Stack,
    Typography,
    useMediaQuery,
    useTheme,
    Skeleton,
    Grid, OutlinedInput,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import CloseIcon from "@mui/icons-material/Close";
import {type Dispatch, type SetStateAction, useEffect, useMemo, useState} from "react";
import { Scheme } from "../../components/scheme/Scheme";
import {COLORS} from "../../theme/colors.ts";

type SortKey = "featured" | "newest" | "priceAsc" | "priceDesc" | "ratingDesc";

type Product = {
    id: string;
    name: string;
    subtitle?: string;
    category: string;
    price: number;
    compareAt?: number;
    tags: string[];
    image: string;
    isNew?: boolean;
    isFeatured?: boolean;
    inStock: boolean;
};

const CATEGORIES = ["Snacks", "Spreads", "Granola", "Honey", "Oils", "Pickles", "Spices", "Other"];

const BASE_PRODUCTS: Product[] = [
    {
        id: "p1",
        name: "Za’atar Crunch Mix",
        subtitle: "Toasted seeds, herbs, and sea salt",
        category: "Snacks",
        price: 5.5,
        compareAt: 6.5,
        tags: ["Best seller"],
        image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1200&q=70",
        isFeatured: true,
        inStock: true,
    },
    {
        id: "p2",
        name: "Organic Tahini",
        subtitle: "Stone-ground sesame paste",
        category: "Spreads",
        price: 7.25,
        tags: ["Organic"],
        image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1200&q=70",
        isNew: true,
        inStock: true,
    },
    {
        id: "p3",
        name: "Wildflower Honey",
        subtitle: "Raw & unfiltered",
        category: "Honey",
        price: 9.9,
        tags: ["Raw"],
        image: "https://images.unsplash.com/photo-1587049352851-8d3d7c2b5b7c?auto=format&fit=crop&w=1200&q=70",
        isFeatured: true,
        inStock: false,
    },
    {
        id: "p4",
        name: "Harissa Spice Blend",
        subtitle: "Smoky heat for everyday cooking",
        category: "Spices",
        price: 4.75,
        tags: ["Spicy"],
        image: "https://images.unsplash.com/photo-1604909052686-3f3b2a3d0b3f?auto=format&fit=crop&w=1200&q=70",
        inStock: true,
    },
    {
        id: "p5",
        name: "Olive Oil (Extra Virgin)",
        subtitle: "Cold-pressed, peppery finish",
        category: "Oils",
        price: 14.5,
        tags: ["Awarded"],
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=70",
        isFeatured: true,
        inStock: true,
    },
    {
        id: "p6",
        name: "Granola – Date & Almond",
        subtitle: "Baked small-batch granola",
        category: "Granola",
        price: 6.95,
        tags: ["No refined sugar"],
        image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=1200&q=70",
        isNew: true,
        inStock: true,
    },
];

export const MOCK_PRODUCTS: Product[] = [
    ...BASE_PRODUCTS,
    ...Array.from({ length: 18 }).map((_, i) => {
        const base = BASE_PRODUCTS[i % BASE_PRODUCTS.length];
        return {
            ...base,
            id: `p_${i + 7}`,
            name: `${base.name} ${i + 1}`,
            price: Math.round((base.price + (i % 5) * 0.65) * 100) / 100,
            isFeatured: i % 7 === 0,
            isNew: i % 5 === 0,
            inStock: i % 6 !== 0,
        };
    }),
];


function money(n: number) {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(n);
}

function clampPriceRange(products: Product[]) {
    const prices = products.map((p) => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return [Math.floor(min), Math.ceil(max)] as [number, number];
}

type FiltersState = {
    q: string;
    categories: string[];
    price: [number, number];
    onlyInStock: boolean;
    sort: SortKey;
};

function FilterPanel(props: {
    filters: FiltersState;
    setFilters: Dispatch<SetStateAction<FiltersState>>;
    priceBounds: [number, number];
    onClear: () => void;
}) {
    const { filters, setFilters, priceBounds, onClear } = props;

    const toggleCategory = (cat: string) => {
        setFilters((prev) => {
            const has = prev.categories.includes(cat);
            return {
                ...prev,
                categories: has ? prev.categories.filter((c) => c !== cat) : [...prev.categories, cat],
            };
        });
    };

    const activeCount =
        (filters.categories.length ? 1 : 0) +
        (filters.onlyInStock ? 1 : 0) +
        (filters.price[0] !== priceBounds[0] || filters.price[1] !== priceBounds[1] ? 1 : 0);

    return (
        <Stack spacing={2} >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography variant="h6" fontWeight={800}>
                    Filters
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    {activeCount > 0 && (
                        <Chip size="small" label={`${activeCount} active`} variant="outlined" />
                    )}
                    <Button size="small" onClick={onClear} sx={{ textTransform: "none" }}>
                        Clear
                    </Button>
                </Stack>
            </Stack>

            <Divider />

            <Box>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Category
                </Typography>
                <List dense disablePadding>
                    {CATEGORIES.map((cat) => {
                        const checked = filters.categories.includes(cat);
                        return (
                            <ListItem key={cat} disablePadding>
                                <ListItemButton onClick={() => toggleCategory(cat)} dense>
                                    <Checkbox edge="start" checked={checked} tabIndex={-1} disableRipple />
                                    <ListItemText primary={cat} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Box>

            <Divider />

            <Box>
                <Typography variant="subtitle2" fontWeight={700} gutterBottom>
                    Price range
                </Typography>
                <Slider
                    value={filters.price}
                    onChange={(_, v) => setFilters((p) => ({ ...p, price: v as [number, number] }))}
                    valueLabelDisplay="auto"
                    min={priceBounds[0]}
                    max={priceBounds[1]}
                />
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption" color="text.secondary">
                        {money(filters.price[0])}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {money(filters.price[1])}
                    </Typography>
                </Stack>
            </Box>

            <Divider />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={filters.onlyInStock}
                        onChange={(e) => setFilters((p) => ({ ...p, onlyInStock: e.target.checked }))}
                    />
                }
                label="In stock only"
            />
        </Stack>
    );
}

function ProductCard(props: {
    p: Product;
    onAdd: (p: Product) => void;
    onView: (p: Product) => void;
}) {
    const { p, onView } = props;

    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                borderRadius: 3,
                overflow: "hidden",
                background: 'white'
            }}
        >
            <Box sx={{ position: "relative" }}>
                <CardMedia component="img" height={180} image={p.image} alt={p.name} />
                <Stack direction="row" spacing={1} sx={{ position: "absolute", top: 12, left: 12 }}>
                    {p.isNew && <Chip size="small" label="New" />}
                    {p.isFeatured && <Chip size="small" label="Featured" variant="outlined" />}
                    {!p.inStock && <Chip size="small" label="Out of stock" color="warning" />}
                </Stack>
            </Box>

            <CardContent sx={{ flexGrow: 1 }}>
                <Stack spacing={0.75}>
                    <Typography variant="overline" color="text.secondary">
                        {p.category}
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2}>
                        {p.name}
                    </Typography>
                    {p.subtitle && (
                        <Typography variant="body2" color="text.secondary">
                            {p.subtitle}
                        </Typography>
                    )}

                    <Stack direction="row" spacing={1} alignItems="baseline" sx={{ pt: 0.5 }}>
                        <Typography variant="h6" fontWeight={900}>
                            {money(p.price)}
                        </Typography>
                        {p.compareAt && p.compareAt > p.price && (
                            <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                                {money(p.compareAt)}
                            </Typography>
                        )}
                    </Stack>

                    {p.tags.length > 0 && (
                        <Stack direction="row" spacing={1} sx={{ pt: 0.5 }} flexWrap="wrap" useFlexGap>
                            {p.tags.slice(0, 2).map((t) => (
                                <Chip key={t} size="small" label={t} variant="outlined" />
                            ))}
                        </Stack>
                    )}
                </Stack>
            </CardContent>

            <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
                <Button
                    variant="contained"
                    size="small"
                    onClick={() => onView(p)}
                    sx={{ textTransform: "none", fontWeight: 700, width: '100%' }}
                >
                    View
                </Button>
            </CardActions>
        </Card>
    );
}

export const Products = () => {
    const theme = useTheme();
    const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

    const priceBounds = useMemo(() => clampPriceRange(MOCK_PRODUCTS), []);

    const [filters, setFilters] = useState<FiltersState>({
        q: "",
        categories: [],
        price: priceBounds,
        onlyInStock: false,
        sort: "featured",
    });

    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Simulated loading (replace with your API fetch)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(t);
    }, []);

    const filtered = useMemo(() => {
        const q = filters.q.trim().toLowerCase();

        let items = MOCK_PRODUCTS.filter((p) => {
            const matchesQuery =
                !q ||
                p.name.toLowerCase().includes(q) ||
                (p.subtitle?.toLowerCase().includes(q) ?? false) ||
                p.category.toLowerCase().includes(q) ||
                p.tags.some((t) => t.toLowerCase().includes(q));

            const matchesCategory = !filters.categories.length || filters.categories.includes(p.category);
            const matchesStock = !filters.onlyInStock || p.inStock;
            const matchesPrice = p.price >= filters.price[0] && p.price <= filters.price[1];

            return matchesQuery && matchesCategory && matchesStock && matchesPrice;
        });

        switch (filters.sort) {
            case "featured":
                items = items.sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
                break;
            case "newest":
                items = items.sort((a, b) => Number(b.isNew) - Number(a.isNew));
                break;
            case "priceAsc":
                items = items.sort((a, b) => a.price - b.price);
                break;
            case "priceDesc":
                items = items.sort((a, b) => b.price - a.price);
                break;
        }

        return items;
    }, [filters]);

    // Simple pagination
    const [page, setPage] = useState(1);
    const perPage = 12;
    useEffect(() => {
        if (page !== 1) setPage(1);
    }, [filters]);
    const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
    const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

    const clearFilters = () => {
        setFilters({
            q: "",
            categories: [],
            price: priceBounds,
            onlyInStock: false,
            sort: "featured",
        });
    };

    // Snackbar (Add to cart)
    const [snack, setSnack] = useState<{ open: boolean; text: string; severity: "success" | "info" }>({
        open: false,
        text: "",
        severity: "success",
    });

    const onAdd = (p: Product) => {
        setSnack({ open: true, text: `${p.name} added to cart`, severity: "success" });
    };

    const onView = (p: Product) => {
        // Replace with your route navigation (e.g., navigate(`/products/${p.id}`))
        setSnack({ open: true, text: `Open: ${p.name}`, severity: "info" });
    };

    const activeFilterCount =
        (filters.categories.length ? 1 : 0) +
        (filters.onlyInStock ? 1 : 0) +
        (filters.price[0] !== priceBounds[0] || filters.price[1] !== priceBounds[1] ? 1 : 0);

    return (
        <Box>
            {/* Hero */}
            <Scheme id={4}>
            <Box
                sx={{
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    py: { xs: 4, md: 6 },
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={1.25}>
                        <Breadcrumbs color={'text.primary'}>
                            <Typography >Home</Typography>
                            <Typography fontWeight={700} sx={{textDecoration: 'underline', textUnderlineOffset: 6, color: COLORS.primary.dark}}>
                                Products
                            </Typography>
                        </Breadcrumbs>
                        <Typography variant="h3" fontWeight={900} lineHeight={1.05}>
                            Products
                        </Typography>
                        <Typography sx={{ maxWidth: 720 }}>
                            Explore our curated selection. Use filters to find the right products for your needs.
                        </Typography>
                    </Stack>
                </Container>
            </Box>
            </Scheme>

            {/* Controls bar */}
            <Container maxWidth="xl" sx={{ py: 3 }}>
                <Stack spacing={2}>
                    <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems={{ md: "center" }}>
                        <OutlinedInput
                            value={filters.q}
                            onChange={(e) => setFilters((p) => ({ ...p, q: e.target.value }))}
                            placeholder="Search products…"
                            fullWidth
                            startAdornment={
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            }
                        />
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                            {!isMdUp && (
                                <Button
                                    variant="outlined"
                                    startIcon={
                                        <Badge color="primary" badgeContent={activeFilterCount} invisible={activeFilterCount === 0}>
                                            <FilterAltOutlinedIcon />
                                        </Badge>
                                    }
                                    onClick={() => setMobileFiltersOpen(true)}
                                    sx={{ textTransform: "none", fontWeight: 700, whiteSpace: "nowrap" }}
                                >
                                    Filters
                                </Button>
                            )}

                            <FormControl size="small" sx={{ minWidth: 170 }}>
                                <Select
                                    value={filters.sort}
                                    sx={{ height: '100%' }}
                                    onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value as SortKey }))}
                                >
                                    <MenuItem value="featured">Featured</MenuItem>
                                    <MenuItem value="newest">Newest</MenuItem>
                                    <MenuItem value="ratingDesc">Top rated</MenuItem>
                                    <MenuItem value="priceAsc">Price: low → high</MenuItem>
                                    <MenuItem value="priceDesc">Price: high → low</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                    </Stack>

                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography color="text.secondary">
                            {loading ? "Loading…" : `${filtered.length} result${filtered.length === 1 ? "" : "s"}`}
                        </Typography>

                        <Stack direction="row" spacing={1} alignItems="center">
                            {(filters.categories.length > 0 ||
                                filters.onlyInStock ||
                                filters.price[0] !== priceBounds[0] ||
                                filters.price[1] !== priceBounds[1]) && (
                                <Button onClick={clearFilters} size="small" sx={{ textTransform: "none" }}>
                                    Clear filters
                                </Button>
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </Container>

            <Container maxWidth="xl" sx={{ pb: 5 }}>
                <Grid container spacing={2} alignItems="flex-start">
                    {/* Desktop sidebar */}
                    {isMdUp && (
                        <Grid size={{xs: 12, md: 3}}>
                            <Card variant="outlined" sx={{ borderRadius: 3, position: "sticky", top: 16, background: 'white' }}>
                                <CardContent>
                                    <FilterPanel
                                        filters={filters}
                                        setFilters={setFilters}
                                        priceBounds={priceBounds}
                                        onClear={clearFilters}
                                    />
                                </CardContent>
                            </Card>
                        </Grid>
                    )}

                    {/* Products */}
                    <Grid size={{xs: 12, md: isMdUp ? 9 : 12}}>
                        {loading ? (
                            <Grid container spacing={2}>
                                {Array.from({ length: 12 }).map((_, i) => (
                                    <Grid key={i} size={{xs: 12, sm: 6, lg: 4}}>
                                        <Card variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
                                            <Skeleton variant="rectangular" height={180} />
                                            <CardContent>
                                                <Skeleton width="40%" />
                                                <Skeleton width="90%" />
                                                <Skeleton width="70%" />
                                                <Skeleton width="55%" />
                                            </CardContent>
                                            <CardActions sx={{ px: 2, pb: 2 }}>
                                                <Skeleton variant="rounded" width={90} height={32} />
                                                <Skeleton variant="rounded" width={70} height={32} />
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : pageItems.length === 0 ? (
                            <Card variant="outlined" sx={{ borderRadius: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" fontWeight={800}>
                                        No results
                                    </Typography>
                                    <Typography color="text.secondary" sx={{ mt: 0.5 }}>
                                        Try adjusting filters or searching for something else.
                                    </Typography>
                                    <Button onClick={clearFilters} sx={{ mt: 2, textTransform: "none", fontWeight: 700 }}>
                                        Reset filters
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <Grid container spacing={2}>
                                {pageItems.map((p) => (
                                    <Grid key={p.id} size={{xs: 12, sm: 6, lg: 4}}>
                                        <ProductCard p={p} onAdd={onAdd} onView={onView} />
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {/* Pagination (simple) */}
                        {!loading && pageItems.length > 0 && pageCount > 1 && (
                            <Stack direction="row" justifyContent="center" spacing={1.5} sx={{ mt: 3 }}>
                                <Button
                                    variant="outlined"
                                    disabled={page === 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    sx={{ textTransform: "none" }}
                                >
                                    Prev
                                </Button>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Typography color="text.secondary">
                                        Page <b>{page}</b> of <b>{pageCount}</b>
                                    </Typography>
                                </Stack>
                                <Button
                                    variant="outlined"
                                    disabled={page === pageCount}
                                    onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                                    sx={{ textTransform: "none" }}
                                >
                                    Next
                                </Button>
                            </Stack>
                        )}
                    </Grid>
                </Grid>
            </Container>

            {/* Mobile filters drawer */}
            <Drawer
                anchor="left"
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                PaperProps={{ sx: { width: "min(92vw, 360px)" } }}
            >
                <Box sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" fontWeight={900}>
                            Filters
                        </Typography>
                        <IconButton onClick={() => setMobileFiltersOpen(false)}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    <Divider sx={{ my: 2 }} />
                    <FilterPanel filters={filters} setFilters={setFilters} priceBounds={priceBounds} onClear={clearFilters} />
                </Box>
            </Drawer>

            {/* Snackbar */}
            <Snackbar
                open={snack.open}
                autoHideDuration={2200}
                onClose={() => setSnack((s) => ({ ...s, open: false }))}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity={snack.severity}
                    onClose={() => setSnack((s) => ({ ...s, open: false }))}
                    sx={{ borderRadius: 2 }}
                >
                    {snack.text}
                </Alert>
            </Snackbar>
        </Box>
    );
}
