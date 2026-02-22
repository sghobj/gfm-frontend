// src/theme/muiTheme.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { COLORS } from "./colors";
import { SCHEMES, type SchemeId } from "./schemes";
import { alpha } from "@mui/material";

export function muiTheme(schemeId: SchemeId, direction: "ltr" | "rtl" = "ltr") {
    const s = SCHEMES[schemeId] ?? SCHEMES[1];
    const buttonIconGap = 12;

    const theme = createTheme({
        direction,
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
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
            h1: {
                fontFamily: '"Playfair Display", serif',
                fontSize: "3.5rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
            },
            h2: {
                fontFamily: '"Playfair Display", serif',
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: "-0.01em",
            },
            h3: {
                fontFamily: '"Inter", sans-serif',
                fontSize: "1.25rem",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "0.01em",
            },
            h4: {
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
            },
            h5: {
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
            },
            h6: {
                fontFamily: '"Inter", sans-serif',
                fontWeight: 600,
            },
            subtitle1: {
                fontFamily: '"Inter", sans-serif',
                fontWeight: 500,
            },
            body1: {
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1.7,
            },
            overline: {
                fontFamily: '"Inter", sans-serif',
                fontWeight: 700,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
            },
        },
        shape: { borderRadius: 8 },
        components: {
            MuiStack: {
                // Use CSS gap instead of margin-based spacing so RTL/LTR behaves consistently.
                defaultProps: {
                    useFlexGap: true,
                },
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        display: "inline-flex",
                        alignItems: "center",
                    },
                    // Keep icon/text spacing consistent in both LTR and RTL.
                    startIcon:
                        direction === "rtl"
                            ? {
                                  marginLeft: buttonIconGap,
                                  marginRight: 0,
                              }
                            : {
                                  marginLeft: 0,
                                  marginRight: buttonIconGap,
                              },
                    endIcon:
                        direction === "rtl"
                            ? {
                                  marginLeft: 0,
                                  marginRight: buttonIconGap,
                              }
                            : {
                                  marginLeft: buttonIconGap,
                                  marginRight: 0,
                              },
                },
            },
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

    return responsiveFontSizes(theme);
}
