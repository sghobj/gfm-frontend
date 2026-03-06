import { useEffect, useMemo, useState } from "react";
import { Box, Typography, Button, Stack, Container, Grid } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useTranslation } from "react-i18next";
import type { GetHomeDataQuery } from "../../../graphql/gql/graphql";

// Import Swiper styles
import "swiper/swiper-bundle.css";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia.ts";
import { hasNonEmptyText } from "../../../utils/localizedContent";
import { HOME_SECTION_TYPOGRAPHY } from "./homeSectionTypography";
import { useContactLinks } from "../../../providers/ContactLinksProvider";

type HeroData = NonNullable<GetHomeDataQuery["homepage"]>["hero"];
type SlideVariant = "default" | "logo_weather";

interface HomeHeroProps {
    data?: HeroData;
}

interface SlideData {
    id: number | string;
    variant: SlideVariant;
    title?: string;
    subtitle?: string;
    description?: string;
    image: string;
    logoImage?: string;
    logoAlt?: string;
    ctaPrimary?: string;
    ctaSecondary?: string;
    primaryLink?: string;
    secondaryLink?: string;
    weatherCity: string;
    weatherLatitude: number;
    weatherLongitude: number;
    weatherTimezone: string;
}

type WeatherState = {
    isLoading: boolean;
    temperatureC: number | null;
    weatherCode: number | null;
    windSpeedKmh: number | null;
    error: string | null;
};

const DEFAULT_WEATHER_CITY = "Amman, Jordan";
const DEFAULT_WEATHER_LATITUDE = 31.9539;
const DEFAULT_WEATHER_LONGITUDE = 35.9106;
const DEFAULT_WEATHER_TIMEZONE = "Asia/Amman";

function normalizeVariant(value?: string | null): SlideVariant {
    return value === "logo_weather" ? "logo_weather" : "default";
}

function toFiniteNumber(value: unknown, fallback: number): number {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function formatInTimezone(
    date: Date,
    locale: string,
    timeZone: string,
    options: Intl.DateTimeFormatOptions,
): string {
    try {
        return new Intl.DateTimeFormat(locale, { ...options, timeZone }).format(date);
    } catch {
        return new Intl.DateTimeFormat(locale, options).format(date);
    }
}

function getWeatherLabel(code: number | null): string {
    if (code == null) return "Weather unavailable";
    if (code === 0) return "Clear sky";
    if ([1, 2].includes(code)) return "Partly cloudy";
    if (code === 3) return "Overcast";
    if ([45, 48].includes(code)) return "Fog";
    if ([51, 53, 55, 56, 57].includes(code)) return "Drizzle";
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "Rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "Snow";
    if ([95, 96, 99].includes(code)) return "Thunderstorm";
    return "Variable";
}

export const HomeHero = ({ data }: HomeHeroProps) => {
    const navigate = useNavigate();
    const { i18n, t } = useTranslation("common");
    const { whatsappLink } = useContactLinks();
    const locale = i18n.resolvedLanguage ?? i18n.language ?? "en";
    const [now, setNow] = useState(() => new Date());
    const [weather, setWeather] = useState<WeatherState>({
        isLoading: false,
        temperatureC: null,
        weatherCode: null,
        windSpeedKmh: null,
        error: null,
    });

    const slides: SlideData[] = useMemo(
        () =>
            (data ?? []).flatMap((item, index) => {
                if (!item || !hasNonEmptyText(item.image?.url)) return [];

                const variant = normalizeVariant(item.variant);
                if (variant === "default") {
                    if (
                        !hasNonEmptyText(item.title) ||
                        !hasNonEmptyText(item.subtitle) ||
                        !hasNonEmptyText(item.description) ||
                        !hasNonEmptyText(item.ctaPrimary) ||
                        !hasNonEmptyText(item.ctaSecondary) ||
                        !hasNonEmptyText(item.primaryLink) ||
                        !hasNonEmptyText(item.secondaryLink)
                    ) {
                        return [];
                    }
                }

                if (
                    variant === "logo_weather" &&
                    !hasNonEmptyText(item.logoImage?.url) &&
                    !hasNonEmptyText(item.image?.url)
                ) {
                    return [];
                }

                return [
                    {
                        id: item.id ?? index,
                        variant,
                        title: item.title ?? undefined,
                        subtitle: item.subtitle ?? undefined,
                        description: item.description ?? undefined,
                        image: item.image.url,
                        logoImage: item.logoImage?.url ?? undefined,
                        logoAlt:
                            item.logoImage?.alternativeText ??
                            item.image?.alternativeText ??
                            undefined,
                        ctaPrimary: item.ctaPrimary ?? undefined,
                        ctaSecondary: item.ctaSecondary ?? undefined,
                        primaryLink: item.primaryLink ?? undefined,
                        secondaryLink: item.secondaryLink ?? undefined,
                        weatherCity: item.weatherCity?.trim() || DEFAULT_WEATHER_CITY,
                        weatherLatitude: toFiniteNumber(
                            item.weatherLatitude,
                            DEFAULT_WEATHER_LATITUDE,
                        ),
                        weatherLongitude: toFiniteNumber(
                            item.weatherLongitude,
                            DEFAULT_WEATHER_LONGITUDE,
                        ),
                        weatherTimezone: item.weatherTimezone?.trim() || DEFAULT_WEATHER_TIMEZONE,
                    },
                ];
            }),
        [data],
    );

    const firstSpecialSlide = slides[0]?.variant === "logo_weather" ? slides[0] : null;

    useEffect(() => {
        const timer = window.setInterval(() => {
            setNow(new Date());
        }, 60 * 1000);

        return () => window.clearInterval(timer);
    }, []);

    useEffect(() => {
        if (!firstSpecialSlide) return;

        let isActive = true;

        const loadWeather = async () => {
            setWeather((prev) => ({ ...prev, isLoading: true, error: null }));
            try {
                const weatherUrl = new URL("https://api.open-meteo.com/v1/forecast");
                weatherUrl.searchParams.set("latitude", String(firstSpecialSlide.weatherLatitude));
                weatherUrl.searchParams.set(
                    "longitude",
                    String(firstSpecialSlide.weatherLongitude),
                );
                weatherUrl.searchParams.set(
                    "current",
                    "temperature_2m,weather_code,wind_speed_10m",
                );
                weatherUrl.searchParams.set("timezone", firstSpecialSlide.weatherTimezone);

                const response = await fetch(weatherUrl.toString());
                if (!response.ok) throw new Error("Weather request failed");

                const payload = (await response.json()) as {
                    current?: {
                        temperature_2m?: number;
                        weather_code?: number;
                        wind_speed_10m?: number;
                    };
                };
                const current = payload.current;

                if (!isActive) return;

                setWeather({
                    isLoading: false,
                    temperatureC:
                        typeof current?.temperature_2m === "number" ? current.temperature_2m : null,
                    weatherCode:
                        typeof current?.weather_code === "number" ? current.weather_code : null,
                    windSpeedKmh:
                        typeof current?.wind_speed_10m === "number" ? current.wind_speed_10m : null,
                    error: null,
                });
            } catch {
                if (!isActive) return;
                setWeather({
                    isLoading: false,
                    temperatureC: null,
                    weatherCode: null,
                    windSpeedKmh: null,
                    error: "Weather unavailable",
                });
            }
        };

        void loadWeather();
        const refresh = window.setInterval(
            () => {
                void loadWeather();
            },
            15 * 60 * 1000,
        );

        return () => {
            isActive = false;
            window.clearInterval(refresh);
        };
    }, [firstSpecialSlide]);

    const handleCtaNavigation = (rawLink: string) => {
        const link = rawLink.trim();
        if (!link) return;

        if (
            link.startsWith("http://") ||
            link.startsWith("https://") ||
            link.startsWith("mailto:") ||
            link.startsWith("tel:")
        ) {
            window.location.assign(link);
            return;
        }

        if (link.startsWith("#")) {
            navigate(`/${link}`);
            return;
        }

        navigate(link);
    };

    if (slides.length === 0) return null;

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
                    {slides.map((slide, index) => {
                        const isFeaturedLogoWeather =
                            index === 0 && slide.variant === "logo_weather";

                        if (isFeaturedLogoWeather) {
                            const timeLabel = formatInTimezone(now, locale, slide.weatherTimezone, {
                                hour: "2-digit",
                                minute: "2-digit",
                            });
                            const dateLabel = formatInTimezone(now, locale, slide.weatherTimezone, {
                                weekday: "long",
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            });

                            return (
                                <SwiperSlide key={slide.id}>
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: "100%",
                                            position: "relative",
                                            display: "flex",
                                            alignItems: "center",
                                            background:
                                                "linear-gradient(130deg, #ffffff 0%, #f8fbf7 55%, #edf5ef 100%)",
                                        }}
                                    >
                                        <Container
                                            maxWidth="xl"
                                            sx={{
                                                maxWidth: "1440px",
                                                px: { xs: 2, sm: 4, md: 6 },
                                                position: "relative",
                                                zIndex: 2,
                                            }}
                                        >
                                            <Grid
                                                container
                                                spacing={{ xs: 3, md: 6 }}
                                                alignItems="center"
                                            >
                                                <Grid size={{ xs: 12, md: 8 }}>
                                                    <Box
                                                        sx={{
                                                            minHeight: { xs: 260, md: 500 },
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            borderRadius: 3,
                                                            px: { xs: 2, md: 4 },
                                                            py: { xs: 3, md: 4 },
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={resolveStrapiMediaUrl(
                                                                slide.logoImage ?? slide.image,
                                                            )}
                                                            alt={
                                                                slide.logoAlt ??
                                                                slide.title ??
                                                                "Brand logo"
                                                            }
                                                            sx={{
                                                                width: "100%",
                                                                maxWidth: 860,
                                                                maxHeight: {
                                                                    xs: 300,
                                                                    md: 500,
                                                                },
                                                                objectFit: "contain",
                                                                filter: "drop-shadow(0 14px 28px rgba(0,0,0,0.14))",
                                                            }}
                                                        />
                                                    </Box>
                                                </Grid>

                                                <Grid size={{ xs: 12, md: 4 }}>
                                                    <Box
                                                        sx={{
                                                            borderRadius: 3,
                                                            p: { xs: 2.5, md: 3.5 },
                                                            bgcolor: "rgba(255,255,255,0.92)",
                                                            border: "1px solid rgba(23,59,33,0.15)",
                                                            boxShadow:
                                                                "0 12px 32px rgba(20,39,24,0.12)",
                                                            color: "#173b21",
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="overline"
                                                            sx={{
                                                                ...HOME_SECTION_TYPOGRAPHY.overline,
                                                                color: "rgba(23,59,33,0.74)",
                                                                display: "block",
                                                                mb: 1,
                                                            }}
                                                        >
                                                            {slide.weatherCity}
                                                        </Typography>
                                                        <Typography
                                                            variant="h2"
                                                            sx={{
                                                                fontWeight: 800,
                                                                lineHeight: 1,
                                                                mb: 0.75,
                                                            }}
                                                        >
                                                            {timeLabel}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                color: "rgba(23,59,33,0.72)",
                                                                mb: 3,
                                                            }}
                                                        >
                                                            {dateLabel}
                                                        </Typography>

                                                        <Stack spacing={1.25}>
                                                            <Typography
                                                                variant="h3"
                                                                sx={{ fontWeight: 800 }}
                                                            >
                                                                {weather.temperatureC == null
                                                                    ? "--"
                                                                    : `${Math.round(weather.temperatureC)}°C`}
                                                            </Typography>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{
                                                                    color: "rgba(23,59,33,0.88)",
                                                                }}
                                                            >
                                                                {getWeatherLabel(
                                                                    weather.weatherCode,
                                                                )}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    color: "rgba(23,59,33,0.72)",
                                                                }}
                                                            >
                                                                Wind:{" "}
                                                                {weather.windSpeedKmh == null
                                                                    ? "--"
                                                                    : `${Math.round(weather.windSpeedKmh)} km/h`}
                                                            </Typography>
                                                            {weather.isLoading && (
                                                                <Typography
                                                                    variant="caption"
                                                                    sx={{
                                                                        color: "rgba(23,59,33,0.62)",
                                                                    }}
                                                                >
                                                                    Updating weather...
                                                                </Typography>
                                                            )}
                                                            {!weather.isLoading &&
                                                                weather.error && (
                                                                    <Typography
                                                                        variant="caption"
                                                                        sx={{
                                                                            color: "rgba(23,59,33,0.72)",
                                                                        }}
                                                                    >
                                                                        {weather.error}
                                                                    </Typography>
                                                                )}
                                                            {whatsappLink && (
                                                                <Button
                                                                    variant="contained"
                                                                    startIcon={<WhatsAppIcon />}
                                                                    onClick={() =>
                                                                        window.open(
                                                                            whatsappLink,
                                                                            "_blank",
                                                                            "noopener,noreferrer",
                                                                        )
                                                                    }
                                                                    sx={{
                                                                        mt: 1,
                                                                        alignSelf: "flex-start",
                                                                        px: 5,
                                                                        py: 2,
                                                                        borderRadius: 2,
                                                                        fontWeight: 800,
                                                                        fontSize: "1.1rem",
                                                                        textTransform: "none",
                                                                        boxShadow:
                                                                            "0 8px 24px rgba(0,0,0,0.2)",
                                                                    }}
                                                                >
                                                                    {t(
                                                                        "inquiryModal.actions.whatsapp",
                                                                    )}
                                                                </Button>
                                                            )}
                                                        </Stack>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </Container>
                                    </Box>
                                </SwiperSlide>
                            );
                        }

                        return (
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
                                            bgcolor: "rgba(0, 0, 0, 0.45)",
                                            zIndex: 1,
                                        },
                                    }}
                                >
                                    <Container
                                        maxWidth="xl"
                                        sx={{
                                            maxWidth: "1440px",
                                            px: { xs: 2, sm: 4, md: 6 },
                                            position: "relative",
                                            zIndex: 2,
                                        }}
                                    >
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
                                                        ...HOME_SECTION_TYPOGRAPHY.overline,
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
                                                        ...HOME_SECTION_TYPOGRAPHY.heading,
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
                                                        ...HOME_SECTION_TYPOGRAPHY.subtitle,
                                                        maxWidth: 600,
                                                        mb: 4,
                                                        color: "rgba(255, 255, 255, 0.95)",
                                                        fontSize: { xs: "1rem", md: "1.2rem" },
                                                        textShadow: "0 2px 6px rgba(0,0,0,0.3)",
                                                    }}
                                                >
                                                    {slide.description}
                                                </Typography>
                                            </Box>
                                            <Stack
                                                direction={{ xs: "column", sm: "row" }}
                                                useFlexGap
                                                gap={2.5}
                                            >
                                                <Button
                                                    variant="contained"
                                                    size="large"
                                                    endIcon={<ArrowForwardIcon />}
                                                    onClick={() =>
                                                        slide.primaryLink &&
                                                        handleCtaNavigation(slide.primaryLink)
                                                    }
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
                                                    onClick={() =>
                                                        slide.secondaryLink &&
                                                        handleCtaNavigation(slide.secondaryLink)
                                                    }
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
                        );
                    })}
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
