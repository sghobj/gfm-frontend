import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
    schema: "http://localhost:1337/graphql",
    documents: ["src/**/*.graphql"],
    generates: {
        "src/gql/": {
            preset: "client",
            config: {
                useTypeImports: true,
                enumsAsTypes: true,
            },
        },
    },
};

export default config;
