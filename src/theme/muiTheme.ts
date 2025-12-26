// src/theme/muiTheme.ts
import { createTheme } from "@mui/material/styles";
import { COLORS } from "./colors";
import { SCHEMES, type SchemeId } from "./schemes";
import { alpha } from "@mui/material";

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
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: ({ theme }) => ({
                        // Background for the input "box"
                        backgroundColor: theme.palette.background.default,
                        borderRadius: 10,

                        // Default (out of focus) border
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(theme.palette.primary.main, 0.25),
                        },

                        // Hover border
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: alpha(theme.palette.primary.main, 0.45),
                        },

                        // Focused border
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main,
                            borderWidth: 2,
                        },

                        // Error border (both focused + unfocused)
                        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.error.main,
                        },

                        // Optional: text color + placeholder
                        "& input::placeholder": {
                            color: alpha(theme.palette.text.primary, 0.45),
                            opacity: 1,
                        },
                    }),
                },
            },
        },
    });
}
