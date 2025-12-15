import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import "./i18n/i18n";
import { client } from "./utils/apollo";
import { ApolloProvider } from "@apollo/client/react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { muiTheme } from "./theme/muiTheme";

const theme = muiTheme(1);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </ApolloProvider>
        </BrowserRouter>
    </StrictMode>,
);
