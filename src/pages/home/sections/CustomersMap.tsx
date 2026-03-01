import { useMemo, useState } from "react";
import {
    Box,
    Chip,
    Container,
    Divider,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Tooltip,
    Typography,
    useTheme,
    Zoom,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { lighten } from "@mui/material/styles";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { useTranslation } from "react-i18next";
import type { GetHomeDataQuery } from "../../../graphql/gql/graphql";
import { countryToContinent, getFlagUrl, normalizeCountryName } from "../../../utils/countries.ts";
import { hasNonEmptyText } from "../../../utils/localizedContent";
import { HOME_SECTION_TYPOGRAPHY } from "./homeSectionTypography";

type MapData = NonNullable<GetHomeDataQuery["homepage"]>["map"];

interface CustomersMapProps {
    data?: MapData;
}

interface CountryGeographyProps {
    geo: { rsmKey: string };
    countryName: string;
    isActive: boolean;
    isHovered: boolean;
    baseColor: string;
    inactiveFill: string;
    inactiveStroke: string;
    onMouseEnter: (name: string) => void;
    onMouseLeave: () => void;
    getFlagEmoji: (name: string) => string | null;
}

const CountryGeography = ({
    geo,
    countryName,
    isActive,
    isHovered,
    baseColor,
    inactiveFill,
    inactiveStroke,
    onMouseEnter,
    onMouseLeave,
    getFlagEmoji,
}: CountryGeographyProps) => {
    const geography = useMemo(
        () => (
            <Geography
                geography={geo}
                onMouseEnter={() => onMouseEnter(countryName)}
                onMouseLeave={() => onMouseLeave()}
                fill={isActive ? (isHovered ? lighten(baseColor, 0.08) : baseColor) : inactiveFill}
                stroke={isActive ? "#fff" : inactiveStroke}
                strokeWidth={isActive ? 0.55 : 0.45}
                style={{
                    default: { outline: "none", transition: "all 0.25s ease" },
                    hover: {
                        fill: isActive ? lighten(baseColor, 0.08) : inactiveFill,
                        outline: "none",
                    },
                    pressed: { outline: "none" },
                }}
            />
        ),
        [
            geo,
            isActive,
            isHovered,
            baseColor,
            inactiveFill,
            inactiveStroke,
            countryName,
            onMouseEnter,
            onMouseLeave,
        ],
    );

    if (!isActive) return geography;

    return (
        <Tooltip
            key={geo.rsmKey}
            title={
                <Stack direction="row" useFlexGap gap={1} alignItems="center">
                    {getFlagEmoji(countryName) ? (
                        <Box
                            component="img"
                            src={getFlagEmoji(countryName)!}
                            alt={countryName}
                            sx={{
                                width: 20,
                                height: "auto",
                                borderRadius: "2px",
                                display: "block",
                            }}
                        />
                    ) : (
                        <Typography variant="body2" sx={{ fontSize: "1.2rem" }}>
                            🌍
                        </Typography>
                    )}
                    <Typography variant="body2" fontWeight={700}>
                        {countryName}
                    </Typography>
                </Stack>
            }
            arrow
            TransitionComponent={Zoom}
            placement="top"
        >
            {geography}
        </Tooltip>
    );
};

export const CustomersMap = ({ data }: CustomersMapProps) => {
    const theme = useTheme();
    const { t } = useTranslation("common");
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const geoUrl = "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

    const rawExportedCountries = data?.exportedCountries;
    const activeCountries = useMemo(() => {
        return rawExportedCountries
            ?.split("\n")
            .map((c) => c.trim())
            .filter((c) => c !== "");
    }, [rawExportedCountries]);
    const subtitle = data?.subtitle ?? "";
    const title = data?.title ?? "";
    const description = data?.description ?? "";

    const getFlagEmoji = (countryName: string) => getFlagUrl(countryName);

    const continentsCount = useMemo(() => {
        const set = new Set<string>();
        activeCountries?.forEach((c) => {
            const cont = countryToContinent[normalizeCountryName(c)];
            if (cont) set.add(cont);
        });
        return set.size;
    }, [activeCountries]);

    const filteredCountries = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return activeCountries;
        return activeCountries?.filter((c) => c.toLowerCase().includes(q));
    }, [activeCountries, query]);

    // --- Palette (same as before) ---
    const countryColors: Record<string, string> = useMemo(() => {
        const nudePalette = [
            "#D7C9B8",
            "#CDBAAB",
            "#BBA997",
            "#A89B8C",
            "#C2B2A3",
            "#B6A699",
            "#C5B4AC",
            "#A99A91",
            "#9C8F84",
            "#B2B2A2",
            "#9BA093",
            "#8D9488",
            "#A3ADA0",
            "#BDC3B9",
            "#ADB3AF",
            "#9AA2A0",
        ];
        const map: Record<string, string> = {};
        activeCountries?.forEach((name, idx) => {
            map[name] = nudePalette[idx % nudePalette.length];
        });
        return map;
    }, [activeCountries]);
    const hasMapContent =
        hasNonEmptyText(subtitle) &&
        hasNonEmptyText(title) &&
        hasNonEmptyText(description) &&
        Array.isArray(activeCountries) &&
        activeCountries.length > 0;

    if (!hasMapContent) return null;

    // Make inactive land visible vs background
    const inactiveFill = "#DADDE3";
    const inactiveStroke = "#C3C7D0";

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, position: "relative", overflow: "hidden" }}>
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
                <Stack direction={{ xs: "column", md: "row" }} useFlexGap gap={{ xs: 4, lg: 10 }}>
                    {/* Left column */}
                    <Stack
                        spacing={2.5}
                        sx={{ flex: 1, minWidth: { md: 420 }, justifyContent: "center" }}
                    >
                        <Typography variant="overline" sx={HOME_SECTION_TYPOGRAPHY.overline}>
                            {subtitle}
                        </Typography>

                        <Typography variant="h2" sx={HOME_SECTION_TYPOGRAPHY.heading}>
                            {title}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{ ...HOME_SECTION_TYPOGRAPHY.subtitle, maxWidth: 520 }}
                        >
                            {description}
                        </Typography>

                        {/* Minimal stats */}
                        <Stack direction="row" useFlexGap gap={1.5} sx={{ pt: 1 }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    flex: 1,
                                    borderRadius: 3,
                                    p: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "rgba(255,255,255,0.7)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 900, letterSpacing: -0.3 }}
                                >
                                    {activeCountries?.length}+
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight={700}
                                >
                                    {t("home.map.countriesLabel")}
                                </Typography>
                            </Paper>

                            <Paper
                                elevation={0}
                                sx={{
                                    flex: 1,
                                    borderRadius: 3,
                                    p: 2,
                                    border: "1px solid",
                                    borderColor: "divider",
                                    bgcolor: "rgba(255,255,255,0.7)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{ fontWeight: 900, letterSpacing: -0.3 }}
                                >
                                    {continentsCount}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    fontWeight={700}
                                >
                                    {t("home.map.continentsLabel")}
                                </Typography>
                            </Paper>
                        </Stack>

                        <Divider sx={{ my: 1 }} />

                        <TextField
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t("home.map.searchPlaceholder")}
                            size="small"
                            sx={{ maxWidth: 420 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Stack direction="row" useFlexGap gap={1} flexWrap="wrap">
                            {filteredCountries?.slice(0, 16).map((c) => (
                                <Chip
                                    key={c}
                                    label={c}
                                    onMouseEnter={() => setHoveredCountry(c)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                    sx={{ borderRadius: 999, fontWeight: 700 }}
                                    variant="outlined"
                                />
                            ))}
                            {filteredCountries && filteredCountries.length > 16 && (
                                <Chip
                                    label={t("home.map.moreLabel", {
                                        count: filteredCountries.length - 16,
                                    })}
                                    variant="outlined"
                                    sx={{ borderRadius: 999 }}
                                />
                            )}
                        </Stack>
                    </Stack>

                    {/* Map Card */}
                    <Paper
                        elevation={0}
                        sx={{
                            flex: 1.35,
                            borderRadius: 5,
                            overflow: "hidden",
                            border: "1px solid",
                            borderColor: "divider",
                            position: "relative",
                            bgcolor: "#F3F5F7",
                            boxShadow: "0 18px 50px rgba(0,0,0,0.06)",
                            minHeight: { xs: 420, md: 560 },
                        }}
                    >
                        <ComposableMap
                            projectionConfig={{ scale: 190, center: [10, 5] }}
                            style={{ width: "100%", height: "100%" }}
                        >
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryName = geo.properties.name as string;
                                        const isJordan = countryName === "Jordan";
                                        const isActive =
                                            activeCountries?.includes(countryName) || isJordan;
                                        const isHovered = hoveredCountry === countryName;
                                        const baseColor =
                                            countryColors[countryName] ||
                                            theme.palette.primary.main;

                                        return (
                                            <CountryGeography
                                                key={geo.rsmKey}
                                                geo={geo}
                                                countryName={countryName}
                                                isActive={isActive}
                                                isHovered={isHovered}
                                                baseColor={baseColor}
                                                inactiveFill={inactiveFill}
                                                inactiveStroke={inactiveStroke}
                                                onMouseEnter={setHoveredCountry}
                                                onMouseLeave={() => setHoveredCountry(null)}
                                                getFlagEmoji={getFlagEmoji}
                                            />
                                        );
                                    })
                                }
                            </Geographies>
                        </ComposableMap>
                    </Paper>
                </Stack>
            </Container>
        </Box>
    );
};
