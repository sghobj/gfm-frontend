import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import i18n from "i18next";
import { getAdminJwtToken } from "../auth/adminSession";

const baseUrl = import.meta.env.VITE_STRAPI_URL ?? "http://localhost:1337";

const httpLink = new HttpLink({
    uri: `${baseUrl.replace(/\/$/, "")}/graphql`,
});

const localeLink = new SetContextLink((prevContext) => {
    const lang = i18n.resolvedLanguage || i18n.language || "en";
    const locale = lang.startsWith("ar") ? "ar" : "en";

    return {
        headers: {
            ...(prevContext.headers ?? {}),
            "x-strapi-locale": locale,
        },
    };
});

const authLink = new SetContextLink((prevContext) => {
    const jwt = getAdminJwtToken();
    if (!jwt) {
        return {
            headers: {
                ...(prevContext.headers ?? {}),
            },
        };
    }

    return {
        headers: {
            ...(prevContext.headers ?? {}),
            Authorization: `Bearer ${jwt}`,
        },
    };
});

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([authLink, localeLink, httpLink]),
    cache: new InMemoryCache(),
});

export const toStrapiLocale = (lng: string) => (lng?.startsWith("ar") ? "ar" : "en");
