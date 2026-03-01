import { useMemo } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { useTranslation } from "react-i18next";
import App from "./App";
import { BreakpointProvider } from "./providers/BreakpointProvider";
import { muiTheme } from "./theme/muiTheme";

export function AppShell() {
    const { i18n } = useTranslation();
    const direction: "ltr" | "rtl" = (i18n.resolvedLanguage ?? i18n.language ?? "en").startsWith(
        "ar",
    )
        ? "rtl"
        : "ltr";
    const theme = useMemo(() => muiTheme(1, direction), [direction]);

    return (
        <ThemeProvider theme={theme}>
            <BreakpointProvider>
                <CssBaseline />
                <Box dir={direction} sx={{ minHeight: "100vh" }}>
                    <App />
                </Box>
            </BreakpointProvider>
        </ThemeProvider>
    );
}
