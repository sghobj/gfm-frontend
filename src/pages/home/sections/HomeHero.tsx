import { Box, Typography, Button, Stack, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import type { GetHomeDataQuery } from "../../../gql/graphql";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia.ts";

type HeroData = NonNullable<GetHomeDataQuery["homepage"]>["hero"];

interface HomeHeroProps {
    data?: HeroData;
}

interface SlideData {
    id: number | string;
    title: string;
    subtitle: string;
    description: string;
    image: string;
    ctaPrimary: string;
    ctaSecondary: string;
    primaryLink: string;
    secondaryLink: string;
}

export const HomeHero = ({ data }: HomeHeroProps) => {
    const navigate = useNavigate();

    const SLIDES: SlideData[] =
        data && data.length > 0
            ? data.map((item, index) => ({
                  id: item?.id ?? index,
                  title: item?.title ?? "",
                  subtitle: item?.subtitle ?? "",
                  description: item?.description ?? "",
                  image: item?.image?.url ?? "/assets/bg1.jpg",
                  ctaPrimary: item?.ctaPrimary ?? "Explore Products",
                  ctaSecondary: item?.ctaSecondary ?? "Our Story",
                  primaryLink: item?.primaryLink ?? "/products",
                  secondaryLink: item?.secondaryLink ?? "/about-us",
              }))
            : [];

    return (
        <Box
            sx={{
                width: "100%",
                height: { xs: "70vh", md: "90vh" },
                minHeight: { xs: 500, md: 600 },
                position: "relative",
                overflow: "hidden",
                // mt: { xs: -8, md: -12 }, // Removed to avoid overlapping navigation
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    "& .swiper": {
                        width: "100%",
                        height: "100%",
                    },
                    "& .swiper-button-next, & .swiper-button-prev": {
                        color: "#fff",
                        opacity: 0,
                        transition: "opacity 0.3s ease",
                    },
                    "&:hover .swiper-button-next, &:hover .swiper-button-prev": {
                        opacity: 1,
                    },
                    "& .swiper-pagination-bullet-active": {
                        bgcolor: "#fff",
                    },
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
                    autoplay={{ delay: 10000, disableOnInteraction: false }}
                    loop
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
                                    backgroundImage: `url(${resolveStrapiMediaUrl(slide.image)})`,
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
                                    <Stack
                                        spacing={3}
                                        sx={{
                                            maxWidth: { xs: "100%", md: "700px" },
                                            color: "white",
                                        }}
                                    >
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
                                                    fontSize: {
                                                        xs: "2.5rem",
                                                        sm: "3.5rem",
                                                        md: "5rem",
                                                    },
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
                                        <Stack
                                            direction={{ xs: "column", sm: "row" }}
                                            spacing={2.5}
                                        >
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
            </Box>

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
