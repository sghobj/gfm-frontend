import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n/i18n";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { muiTheme } from "./theme/muiTheme";
import { apolloClient } from "./apollo/apolloClient.ts";
import { BreakpointProvider } from "./providers/BreakpointProvider";
import { AdminAuthProvider } from "./auth/AdminAuthProvider";

const theme = muiTheme(1);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ApolloProvider client={apolloClient}>
                <AdminAuthProvider>
                    <ThemeProvider theme={theme}>
                        <BreakpointProvider>
                            <CssBaseline />
                            <App />
                        </BreakpointProvider>
                    </ThemeProvider>
                </AdminAuthProvider>
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>,
);
