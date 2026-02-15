import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import i18n from "i18next";

const httpLink = new HttpLink({
    uri: `${import.meta.env.VITE_STRAPI_URL}/graphql`,
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

export const apolloClient = new ApolloClient({
    link: ApolloLink.from([localeLink, httpLink]),
    cache: new InMemoryCache(),
});

export const toStrapiLocale = (lng: string) => (lng?.startsWith("ar") ? "ar" : "en");
