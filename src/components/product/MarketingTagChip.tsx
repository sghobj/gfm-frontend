import { Box, Chip, type ChipProps } from "@mui/material";
import { useTheme, type Theme } from "@mui/material/styles";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import NewReleasesOutlinedIcon from "@mui/icons-material/NewReleasesOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import RecyclingOutlinedIcon from "@mui/icons-material/RecyclingOutlined";
import SpaOutlinedIcon from "@mui/icons-material/SpaOutlined";
import * as MuiIcons from "@mui/icons-material";

type IconComponent = typeof LocalOfferOutlinedIcon;
const DEFAULT_TAG_BACKGROUND = "rgba(46, 111, 58, 0.14)";
const DEFAULT_TAG_BORDER = "rgba(46, 111, 58, 0.28)";

const MUI_ICONS_BY_NAME: Record<string, IconComponent> = {
    LocalOfferOutlined: LocalOfferOutlinedIcon,
    GrassOutlined: GrassOutlinedIcon,
    EventOutlined: EventOutlinedIcon,
    NewReleasesOutlined: NewReleasesOutlinedIcon,
    WorkspacePremiumOutlined: WorkspacePremiumOutlinedIcon,
    VerifiedOutlined: VerifiedOutlinedIcon,
    PublicOutlined: PublicOutlinedIcon,
    StarOutlineOutlined: StarOutlineOutlinedIcon,
    Inventory2Outlined: Inventory2OutlinedIcon,
    RecyclingOutlined: RecyclingOutlinedIcon,
    SpaOutlined: SpaOutlinedIcon,
};

const ICONS_BY_KEY: Record<string, IconComponent> = {
    organic: GrassOutlinedIcon,
    eco: GrassOutlinedIcon,
    ecofriendly: RecyclingOutlinedIcon,
    seasonal: EventOutlinedIcon,
    limited: NewReleasesOutlinedIcon,
    limitededition: NewReleasesOutlinedIcon,
    premium: WorkspacePremiumOutlinedIcon,
    certified: VerifiedOutlinedIcon,
    export: PublicOutlinedIcon,
    bestseller: StarOutlineOutlinedIcon,
    popular: StarOutlineOutlinedIcon,
    available: Inventory2OutlinedIcon,
    fresh: SpaOutlinedIcon,
};

function normalizeIconKey(value: string): string {
    return value
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+/g, "");
}

function isRenderableIconComponent(value: unknown): boolean {
    return (typeof value === "function" || typeof value === "object") && value != null;
}

const MUI_ICONS_BY_NORMALIZED_NAME: Record<string, IconComponent> = Object.entries(
    MuiIcons as Record<string, unknown>,
).reduce<Record<string, IconComponent>>((acc, [exportName, iconComponent]) => {
    if (isRenderableIconComponent(iconComponent)) {
        acc[normalizeIconKey(exportName)] = iconComponent as IconComponent;
    }
    return acc;
}, {});

function resolveMuiIconByName(iconName: string): IconComponent | null {
    const raw = iconName.trim().replace(/^['"`]+|['"`]+$/g, "");
    if (!raw) return null;

    const candidates = new Set<string>([
        raw,
        raw.replace(/\s+/g, ""),
        raw.replace(/[^a-zA-Z0-9]/g, ""),
    ]);

    for (const candidate of Array.from(candidates)) {
        const trimmedCandidate = candidate.trim();
        if (/icon$/i.test(trimmedCandidate)) {
            candidates.add(trimmedCandidate.replace(/icon$/i, ""));
        }
    }

    for (const candidate of candidates) {
        const normalizedCandidate = candidate.trim();
        if (!normalizedCandidate) continue;

        const mappedIcon = MUI_ICONS_BY_NAME[normalizedCandidate];
        if (mappedIcon) return mappedIcon;

        const exportedIcon = (MuiIcons as Record<string, unknown>)[normalizedCandidate];
        if (isRenderableIconComponent(exportedIcon)) {
            return exportedIcon as IconComponent;
        }

        const normalizedLookup =
            MUI_ICONS_BY_NORMALIZED_NAME[normalizeIconKey(normalizedCandidate)];
        if (normalizedLookup) return normalizedLookup;
    }

    return null;
}

function resolveIconElement(iconName?: string | null) {
    const raw = iconName?.trim();
    if (!raw) {
        return <LocalOfferOutlinedIcon sx={{ fontSize: 18 }} />;
    }

    if (/^[^\w\s]/.test(raw)) {
        return (
            <Box component="span" sx={{ fontSize: "0.9rem", lineHeight: 1 }}>
                {raw}
            </Box>
        );
    }

    const muiIcon = resolveMuiIconByName(raw);
    if (muiIcon) {
        const Icon = muiIcon;
        return <Icon sx={{ fontSize: 18 }} />;
    }

    const Icon = ICONS_BY_KEY[normalizeIconKey(raw)] ?? LocalOfferOutlinedIcon;
    return <Icon sx={{ fontSize: 18 }} />;
}

function getReadableTextColor(theme: Theme, backgroundColor: string): string {
    try {
        return theme.palette.getContrastText(backgroundColor);
    } catch {
        return theme.palette.text.primary;
    }
}

type MarketingTagChipProps = {
    label: string;
    iconName?: string | null;
    backgroundColor?: string | null;
    size?: ChipProps["size"];
};

export function MarketingTagChip({
    label,
    iconName,
    backgroundColor,
    size = "small",
}: MarketingTagChipProps) {
    const theme = useTheme();
    const rawBackgroundColor = backgroundColor?.trim() || "";
    const resolvedBackground = rawBackgroundColor || DEFAULT_TAG_BACKGROUND;
    const resolvedBorder = rawBackgroundColor || DEFAULT_TAG_BORDER;
    const resolvedTextColor = rawBackgroundColor
        ? getReadableTextColor(theme, resolvedBackground)
        : theme.palette.text.primary;

    return (
        <Chip
            size={size}
            variant="outlined"
            icon={resolveIconElement(iconName)}
            label={label}
            sx={{
                fontWeight: 700,
                borderRadius: 1.5,
                bgcolor: resolvedBackground,
                borderColor: resolvedBorder,
                color: resolvedTextColor,
                "& .MuiChip-icon": {
                    color: resolvedTextColor,
                },
            }}
        />
    );
}
