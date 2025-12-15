import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: import.meta.env.VITE_STRAPI_BASE_URL + "/graphql",
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});
