import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n/i18n";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { muiTheme } from "./theme/muiTheme";
import { apolloClient } from "./apollo/apolloClient.ts";
import { BreakpointProvider } from "./providers/BreakpointProvider";
import { AdminAuthProvider } from "./auth/AdminAuthProvider";

function AppShell() {
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

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <AdminAuthProvider>
                    <AppShell />
                </AdminAuthProvider>
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>,
);
