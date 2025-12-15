// src/theme/muiTheme.ts
import { createTheme } from "@mui/material/styles";
import { COLORS } from "./colors";
import { SCHEMES, type SchemeId } from "./schemes";

export function muiTheme(schemeId: SchemeId) {
    const s = SCHEMES[schemeId] ?? SCHEMES[1];

    return createTheme({
        palette: {
            primary: { main: COLORS.primary.main },
            secondary: { main: COLORS.secondary.main },
            success: { main: COLORS.semantic.success },
            error: { main: COLORS.semantic.error },

            background: {
                default: s.bg,
                paper: s.surface,
            },
            text: {
                primary: s.text,
            },
            divider: s.border,
        },
        shape: { borderRadius: 8 },
    });
}
