import * as React from "react";
import {
    Box,
    Breadcrumbs,
    Button,
    Chip,
    Container,
    Divider,
    Grid,
    Link,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

type Product = {
    id: string;
    name: string;
    brand: string;
    price: number;
    compareAt?: number;
    rating: number;
    reviewCount: number;
    inStock: boolean;
    badges?: string[];
    description: string;
    highlights: string[];
    images: string[];
};

const demoProduct: Product = {
    id: "sku-123",
    name: "Wireless Noise-Cancelling Headphones",
    brand: "Acme Audio",
    price: 199.99,
    compareAt: 249.99,
    rating: 4.5,
    reviewCount: 328,
    inStock: true,
    badges: ["Best Seller", "Free Shipping"],
    description:
        "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and ultra-soft ear cushions.",
    highlights: [
        "Active Noise Cancellation (ANC)",
        "Up to 30 hours battery life",
        "Bluetooth 5.3 + multipoint",
        "Fast charging (10 min = 5 hours)",
    ],
    images: [
        "https://images.unsplash.com/photo-1518444028785-8febb8153c8f?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1200&q=80",
    ],
};

export const ProductDetails = () => {
    const product = demoProduct;

    const [activeImg, setActiveImg] = React.useState(product.images[0]);
    const [qty] = React.useState(1);

    const discount =
        product.compareAt && product.compareAt > product.price
            ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
            : null;

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Stack spacing={2}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="#">
                        Home
                    </Link>
                    <Link underline="hover" color="inherit" href="#">
                        Audio
                    </Link>
                    <Typography color="text.primary">{product.name}</Typography>
                </Breadcrumbs>

                <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
                    <Grid container spacing={3}>
                        {/* Left: Images */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Box
                                component="img"
                                src={activeImg}
                                alt={product.name}
                                sx={{
                                    width: "100%",
                                    height: { xs: 280, md: 420 },
                                    objectFit: "cover",
                                    borderRadius: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            />

                            <Stack direction="row" spacing={1.5} sx={{ mt: 2, overflowX: "auto", pb: 1 }}>
                                {product.images.map((img) => (
                                    <Box
                                        key={img}
                                        component="button"
                                        onClick={() => setActiveImg(img)}
                                        style={{ border: "none", background: "transparent", padding: 0, cursor: "pointer" }}
                                        aria-label="Select product image"
                                    >
                                        <Box
                                            component="img"
                                            src={img}
                                            alt=""
                                            sx={{
                                                width: 140,
                                                height: 120,
                                                objectFit: "cover",
                                                borderRadius: 1.5,
                                                border: "2px solid",
                                                borderColor: img === activeImg ? "primary.main" : "divider",
                                                opacity: img === activeImg ? 1 : 0.85,
                                            }}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Right: Details */}
                        <Grid size={{xs: 12, md: 6}}>
                            <Stack spacing={2}>
                                <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                                    <Typography variant="overline" color="text.secondary">
                                        {product.brand}
                                    </Typography>
                                    {product.badges?.map((b) => (
                                        <Chip key={b} size="small" label={b} />
                                    ))}
                                </Stack>

                                <Typography variant="h4" sx={{ lineHeight: 1.15 }}>
                                    {product.name}
                                </Typography>

                                <Stack direction="row" spacing={1.5} alignItems="baseline" flexWrap="wrap">
                                    <Typography variant="h5">${product.price.toFixed(2)}</Typography>
                                    {product.compareAt ? (
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{ textDecoration: "line-through" }}
                                        >
                                            ${product.compareAt.toFixed(2)}
                                        </Typography>
                                    ) : null}
                                    {discount ? <Chip color="success" size="small" label={`${discount}% OFF`} /> : null}
                                </Stack>

                                <Typography color={product.inStock ? "success.main" : "error.main"} variant="body2">
                                    {product.inStock ? "In stock" : "Out of stock"}
                                </Typography>

                                <Divider />

                                <Typography variant="body1">{product.description}</Typography>

                                <Box>
                                    <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                        Highlights
                                    </Typography>
                                    <Box component="ul" sx={{ m: 0, pl: 2, color: "text.secondary" }}>
                                        {product.highlights.map((h) => (
                                            <li key={h}>
                                                <Typography variant="body2" color="text.secondary">
                                                    {h}
                                                </Typography>
                                            </li>
                                        ))}
                                    </Box>
                                </Box>

                                <Divider />

                                {/* Actions */}
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<AddShoppingCartIcon />}
                                        disabled={!product.inStock}
                                        sx={{ flex: 1, minHeight: 48 }}
                                        onClick={() => console.log("Add to cart", { productId: product.id, qty })}
                                    >
                                        Make an Order
                                    </Button>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>
                </Paper>
            </Stack>
        </Container>
    );
}
