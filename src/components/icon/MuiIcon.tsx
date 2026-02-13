import * as MuiIcons from "@mui/icons-material";
import type { ElementType } from "react";

type Props = { iconName?: string | null };

export function StrapiMuiIcon({ iconName }: Props) {
    if (!iconName) return null;

    // normalize: "PublicOutlinedIcon" -> "PublicOutlined"
    const normalized = iconName.replace(/Icon$/, "");

    const Icon = (MuiIcons as Record<string, ElementType>)[normalized];
    if (!Icon) {
        console.warn(`Unknown MUI icon "${iconName}" (normalized to "${normalized}")`);
        return null;
    }

    return <Icon />;
}
