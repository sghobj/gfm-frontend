import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n/i18n";
import { ApolloProvider } from "@apollo/client/react";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { apolloClient } from "./apollo/apolloClient.ts";
import { AdminAuthProvider } from "./auth/AdminAuthProvider";
import { AppShell } from "./AppShell";

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
