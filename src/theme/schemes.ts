// src/theme/schemes.ts
import { COLORS } from "./colors";

export type SchemeId = 1 | 2 | 3 | 4;

export const SCHEMES: Record<
    SchemeId,
    {
        bg: string;
        surface: string; // your “foreground” surface
        text: string;
        border: string; // rgba
        accent: string;
        accentFg: string;
        fields: string;
    }
> = {
    1: {
        bg: "#ffffff",
        surface: COLORS.primary.lightest, // #F1EDE5
        text: COLORS.text.primary, // #000
        border: "rgba(0,0,0,0.15)",
        accent: COLORS.secondary.main, // cinnamon
        accentFg: COLORS.text.secondary,
        fields: "#ffffff",
    },
    2: {
        bg: COLORS.secondary.lightest, // #F1EDE5
        surface: COLORS.secondary.lighter, // #E4DBCC
        text: COLORS.text.primary,
        border: "rgba(0,0,0,0.15)",
        accent: COLORS.secondary.main,
        accentFg: COLORS.text.secondary,
        fields: "#ffffff",
    },
    3: {
        bg: COLORS.primary.darker, // #122C17
        surface: COLORS.primary.darkest, // #0D2111
        text: COLORS.text.secondary, // #fff
        border: "rgba(255,255,255,0.20)",
        accent: "#ffffff",
        accentFg: "#000000",
        fields: "#ffffff",
    },
    4: {
        bg: COLORS.primary.lighter, // #D5E2D7
        surface: COLORS.primary.lightest, // #EAF0EB
        text: COLORS.text.primary,
        border: "rgba(0,0,0,0.15)",
        accent: COLORS.secondary.main,
        accentFg: COLORS.text.secondary,
        fields: "#ffffff",
    },
};
