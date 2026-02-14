import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Import Swiper styles
import "swiper/swiper-bundle.css";

interface SlideData {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaPrimary: string;
    ctaSecondary: string;
    primaryLink: string;
    secondaryLink: string;
}

export const HomeHero = () => {
    const navigate = useNavigate();

    const SLIDES: SlideData[] = [
        {
            id: 1,
            title: "Nature's Finest",
            subtitle: "FROM JORDAN TO THE WORLD",
            description: "Experience the authentic taste of sun-ripened organic produce, cultivated with care in the heart of the Jordan Valley.",
            image: "/assets/bg1.jpg",
            ctaPrimary: "Explore Products",
            ctaSecondary: "Our Story",
            primaryLink: "/products",
            secondaryLink: "/about-us"
        },
        {
            id: 2,
            title: "Pure & Certified",
            subtitle: "100% ORGANIC EXPORTS",
            description: "Adhering to the highest international standards to deliver premium quality organic fruits and vegetables to global markets.",
            image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1920&auto=format&fit=crop",
            ctaPrimary: "View Catalog",
            ctaSecondary: "Certifications",
            primaryLink: "/products",
            secondaryLink: "/about-us"
        },
        {
            id: 3,
            title: "Sustainable Growth",
            subtitle: "ROOTED IN TRADITION",
            description: "We bridge the gap between local heritage and global demand through eco-friendly agricultural practices.",
            image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?q=80&w=1920&auto=format&fit=crop",
            ctaPrimary: "Contact Us",
            ctaSecondary: "Sustainability",
            primaryLink: "/contact-us",
            secondaryLink: "/about-us"
        }
    ];

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "70vh", md: "85vh" },
                minHeight: { xs: 500, md: 600 },
                position: "relative",
                overflow: "hidden",
                // mt: { xs: -8, md: -12 }, // Removed to avoid overlapping navigation
            }}
        >
            <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                fadeEffect={{ crossFade: true }}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 6000, disableOnInteraction: false }}
                loop
                style={{ width: "100%", height: "100%" }}
            >
                {SLIDES.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                backgroundImage: `url(${slide.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: "100%",
                                    height: "100%",
                                    bgcolor: "rgba(0, 0, 0, 0.45)", // Overlay
                                    zIndex: 1,
                                },
                            }}
                        >
                            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
                                <Stack spacing={3} sx={{ maxWidth: { xs: "100%", md: "700px" }, color: "white" }}>
                                    <Box>
                                        <Typography
                                            variant="overline"
                                            sx={{
                                                color: "primary.light",
                                                display: "block",
                                                mb: 1,
                                                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            {slide.subtitle}
                                        </Typography>
                                        <Typography
                                            variant="h1"
                                            sx={{
                                                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "5rem" },
                                                lineHeight: 1.1,
                                                mb: 2,
                                                textShadow: "0 4px 12px rgba(0,0,0,0.4)",
                                            }}
                                        >
                                            {slide.title}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                maxWidth: 600,
                                                mb: 4,
                                                opacity: 0.95,
                                                fontSize: { xs: "1rem", md: "1.25rem" },
                                                textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                            }}
                                        >
                                            {slide.description}
                                        </Typography>
                                    </Box>
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
                                        <Button
                                            variant="contained"
                                            size="large"
                                            endIcon={<ArrowForwardIcon />}
                                            onClick={() => navigate(slide.primaryLink)}
                                            sx={{
                                                px: 5,
                                                py: 2,
                                                borderRadius: 2,
                                                fontWeight: 800,
                                                fontSize: "1.1rem",
                                                textTransform: "none",
                                                boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                                            }}
                                        >
                                            {slide.ctaPrimary}
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            size="large"
                                            onClick={() => navigate(slide.secondaryLink)}
                                            sx={{
                                                px: 5,
                                                py: 2,
                                                borderRadius: 2,
                                                fontWeight: 800,
                                                fontSize: "1.1rem",
                                                textTransform: "none",
                                                color: "white",
                                                borderColor: "white",
                                                borderWidth: 2,
                                                backdropFilter: "blur(4px)",
                                                bgcolor: "rgba(255,255,255,0.1)",
                                                "&:hover": {
                                                    borderWidth: 2,
                                                    bgcolor: "rgba(255,255,255,0.25)",
                                                    borderColor: "white",
                                                },
                                            }}
                                        >
                                            {slide.ctaSecondary}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Container>
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Global Swiper Overrides for this component */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 10,
                    "& .swiper-pagination-bullet": {
                        width: 12,
                        height: 12,
                        backgroundColor: "rgba(255,255,255,0.7)",
                        opacity: 1,
                    },
                    "& .swiper-pagination-bullet-active": {
                        backgroundColor: "primary.main",
                        width: 30,
                        borderRadius: "6px",
                    },
                    "& .swiper-button-next, & .swiper-button-prev": {
                        color: "white",
                        display: { xs: "none", md: "flex" },
                        "&::after": {
                            fontSize: "20px",
                            fontWeight: 900,
                        },
                        bgcolor: "rgba(0,0,0,0.2)",
                        width: 50,
                        height: 50,
                        borderRadius: "50%",
                        backdropFilter: "blur(4px)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                            bgcolor: "primary.main",
                        },
                    },
                }}
            />
        </Box>
    );
};
