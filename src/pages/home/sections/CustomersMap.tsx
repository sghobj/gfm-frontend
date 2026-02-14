import { useMemo, useState } from "react";
import {
    Box,
    Container,
    Paper,
    Stack,
    Typography,
    Chip,
    Divider,
    TextField,
    InputAdornment,
    useTheme,
    Zoom,
    Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { lighten } from "@mui/material/styles";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

export const CustomersMap = () => {
    const theme = useTheme();
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const geoUrl =
        "https://raw.githubusercontent.com/lotusms/world-map-data/main/world.json";

    // --- Your exported countries list ---
    const exportedCountries = [
        "United Kingdom",
        "France",
        "Italy",
        "Netherlands",
        "Turkey",
        "Switzerland",
        "Belgium",
        "Germany",
        "Syria",
        "Lebanon",
        "Saudi Arabia",
        "United Arab Emirates",
        "Qatar",
        "Oman",
        "Bahrain",
        "Kuwait",
        "Malaysia",
        "Japan",
        "Singapore",
        "Maldives",
        "Mauritius",
        "Hong Kong",
        "Nigeria",
        "Philippines",
        "Thailand",
        "Kenya",
        "Seychelles",
        "Senegal",
        "Poland",
        "Kazakhstan",
        "Cyprus",
        "Georgia",
        "Sweden",
        "Canada",
        "Jordan",
        "United States of America",
    ];

    const activeCountries = exportedCountries;

    // --- Flag mapping (keep your original) ---
    const countryToIso: Record<string, string> = {
        Jordan: "JO",
        "United Kingdom": "GB",
        "United Arab Emirates": "AE",
        "United States of America": "US",
        Germany: "DE",
        "Saudi Arabia": "SA",
        France: "FR",
        Italy: "IT",
        Netherlands: "NL",
        Turkey: "TR",
        Switzerland: "CH",
        Belgium: "BE",
        Syria: "SY",
        Lebanon: "LB",
        Qatar: "QA",
        Oman: "OM",
        Bahrain: "BH",
        Kuwait: "KW",
        Malaysia: "MY",
        Japan: "JP",
        Singapore: "SG",
        Maldives: "MV",
        Mauritius: "MU",
        "Hong Kong": "HK",
        Nigeria: "NG",
        Philippines: "PH",
        Thailand: "TH",
        Kenya: "KE",
        Seychelles: "SC",
        Senegal: "SN",
        Poland: "PL",
        Kazakhstan: "KZ",
        Cyprus: "CY",
        Georgia: "GE",
        Sweden: "SE",
        Canada: "CA",
    };

    const getFlagEmoji = (countryName: string) => {
        const isoCode = countryToIso[countryName];
        if (!isoCode) return null;
        return `https://flagcdn.com/w40/${isoCode.toLowerCase()}.png`;
    };

    // --- Continents count (lightweight mapping) ---
    const countryToContinent: Record<string, string> = {
        Jordan: "Asia",
        "United Kingdom": "Europe",
        France: "Europe",
        Italy: "Europe",
        Netherlands: "Europe",
        Turkey: "Asia", // transcontinental; pick one for counting consistency
        Switzerland: "Europe",
        Belgium: "Europe",
        Germany: "Europe",
        Syria: "Asia",
        Lebanon: "Asia",
        "Saudi Arabia": "Asia",
        "United Arab Emirates": "Asia",
        Qatar: "Asia",
        Oman: "Asia",
        Bahrain: "Asia",
        Kuwait: "Asia",
        Malaysia: "Asia",
        Japan: "Asia",
        Singapore: "Asia",
        Maldives: "Asia",
        Mauritius: "Africa",
        "Hong Kong": "Asia",
        Nigeria: "Africa",
        Philippines: "Asia",
        Thailand: "Asia",
        Kenya: "Africa",
        Seychelles: "Africa",
        Senegal: "Africa",
        Poland: "Europe",
        Kazakhstan: "Asia",
        Cyprus: "Europe", // can be Asia; choose one consistently
        Georgia: "Asia",  // can be Europe; choose one consistently
        Sweden: "Europe",
        Canada: "North America",
        "United States of America": "North America",
    };

    const continentsCount = useMemo(() => {
        const set = new Set<string>();
        activeCountries.forEach((c) => {
            const cont = countryToContinent[c];
            if (cont) set.add(cont);
        });
        return set.size;
    }, [activeCountries]);

    const filteredCountries = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return activeCountries;
        return activeCountries.filter((c) => c.toLowerCase().includes(q));
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
        activeCountries.forEach((name, idx) => {
            map[name] = nudePalette[idx % nudePalette.length];
        });
        return map;
    }, [activeCountries]);

    // Make inactive land visible vs background
    const inactiveFill = "#DADDE3";
    const inactiveStroke = "#C3C7D0";

    return (
        <Box sx={{ py: { xs: 8, md: 10 }, position: "relative", overflow: "hidden" }}>
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "radial-gradient(900px 500px at 20% 10%, rgba(99,102,241,0.10), transparent 60%)," +
                        "radial-gradient(700px 500px at 85% 30%, rgba(16,185,129,0.10), transparent 55%)," +
                        "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
                <Stack direction={{ xs: "column", md: "row" }} spacing={{ xs: 4, md: 6 }}>
                    {/* Left column */}
                    <Stack spacing={2.5} sx={{ flex: 1, minWidth: { md: 420 }, justifyContent: "center" }}>
                        <Typography
                            variant="overline"
                            sx={{ letterSpacing: 3, fontWeight: 800, color: theme.palette.primary.main }}
                        >
                            GLOBAL REACH
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 900, lineHeight: 1.05, letterSpacing: -0.5 }}>
                            Connecting Jordan to the world.
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 520, fontSize: "1.05rem" }}>
                            Premium organic produce trusted by partners across continents — bridging local heritage and global demand.
                        </Typography>

                        {/* Minimal stats */}
                        <Stack direction="row" spacing={1.5} sx={{ pt: 1 }}>
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
                                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.3 }}>
                                    {activeCountries.length}+
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                                    COUNTRIES
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
                                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: -0.3 }}>
                                    {continentsCount}
                                </Typography>
                                <Typography variant="caption" color="text.secondary" fontWeight={700}>
                                    CONTINENTS
                                </Typography>
                            </Paper>
                        </Stack>

                        <Divider sx={{ my: 1 }} />

                        <TextField
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search markets…"
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

                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                            {filteredCountries.slice(0, 16).map((c) => (
                                <Chip
                                    key={c}
                                    label={c}
                                    onMouseEnter={() => setHoveredCountry(c)}
                                    onMouseLeave={() => setHoveredCountry(null)}
                                    sx={{ borderRadius: 999, fontWeight: 700 }}
                                    variant="outlined"
                                />
                            ))}
                            {filteredCountries.length > 16 && (
                                <Chip label={`+${filteredCountries.length - 16} more`} variant="outlined" sx={{ borderRadius: 999 }} />
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
                        <ComposableMap projectionConfig={{ scale: 190, center: [10, 5] }} style={{ width: "100%", height: "100%" }}>
                            <Geographies geography={geoUrl}>
                                {({ geographies }) =>
                                    geographies.map((geo) => {
                                        const countryName = geo.properties.name as string;
                                        const isJordan = countryName === "Jordan";
                                        const isActive = activeCountries.includes(countryName) || isJordan;
                                        const isHovered = hoveredCountry === countryName;

                                        const baseColor = countryColors[countryName] || theme.palette.primary.main;

                                        const geography = (
                                            <Geography
                                                geography={geo}
                                                onMouseEnter={() => setHoveredCountry(countryName)}
                                                onMouseLeave={() => setHoveredCountry(null)}
                                                fill={isActive ? (isHovered ? lighten(baseColor, 0.08) : baseColor) : inactiveFill}
                                                stroke={isActive ? "#fff" : inactiveStroke}
                                                strokeWidth={isActive ? 0.55 : 0.45}
                                                style={{
                                                    default: { outline: "none", transition: "all 0.25s ease" },
                                                    hover: { fill: isActive ? lighten(baseColor, 0.08) : inactiveFill, outline: "none" },
                                                    pressed: { outline: "none" },
                                                }}
                                            />
                                        );

                                        // Tooltip only for active countries (same as your original behavior)
                                        if (!isActive) return geography;

                                        return (
                                            <Tooltip
                                                key={geo.rsmKey}
                                                title={
                                                    <Stack direction="row" spacing={1} alignItems="center">
                                                        {getFlagEmoji(countryName) ? (
                                                            <Box
                                                                component="img"
                                                                src={getFlagEmoji(countryName)!}
                                                                alt={countryName}
                                                                sx={{ width: 20, height: "auto", borderRadius: "2px", display: "block" }}
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
                                                followCursor
                                            >
                                                {geography}
                                            </Tooltip>
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
