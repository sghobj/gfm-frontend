import type { ApolloClient } from "@apollo/client";
import {
    CreateSubscriberCustomerDocument,
    FindCustomerByEmailDocument,
    UpdateSubscriberCustomerDocument,
    UpsertCustomerSubscriptionDocument,
    type CreateSubscriberCustomerMutation,
    type CreateSubscriberCustomerMutationVariables,
    type FindCustomerByEmailQuery,
    type FindCustomerByEmailQueryVariables,
    type UpdateSubscriberCustomerMutation,
    type UpdateSubscriberCustomerMutationVariables,
    type UpsertCustomerSubscriptionMutation,
    type UpsertCustomerSubscriptionMutationVariables,
} from "../../graphql/gql/graphql";

type CustomerLookupRecord = {
    documentId: string;
};

type CustomMutationAvailability = "unknown" | "supported" | "unsupported";

let customMutationAvailability: CustomMutationAvailability = "unknown";

export type UpsertSubscriberCustomerInput = {
    email: string;
    company?: string;
    name?: string;
    phone?: string;
    source?: string;
    subscribeGlobal?: boolean;
    productDocumentId?: string;
    productDocumentIds?: string[];
};

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const sanitizeOptionalText = (value?: string) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
};

const normalizeProductDocumentIds = (singleId?: string, manyIds?: string[]) => {
    const ids = [...(manyIds ?? []), singleId ?? ""]
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
    return Array.from(new Set(ids));
};

const toErrorMessage = (error: unknown) => {
    if (error instanceof Error) return error.message;
    return String(error ?? "");
};

const isCustomMutationUnsupported = (error: unknown) => {
    const message = toErrorMessage(error);
    return (
        /Cannot query field\s+"upsertCustomerSubscription"/i.test(message) ||
        /Unknown type\s+"UpsertCustomerSubscriptionInput"/i.test(message) ||
        /Unknown argument\s+"input"/i.test(message) ||
        /Field "upsertCustomerSubscription" argument "input"/i.test(message)
    );
};

const looksLikeDuplicateError = (message: string) =>
    /(unique|already exists|duplicate|taken|exists)/i.test(message);

const buildLegacyCustomerData = (input: {
    email: string;
    company?: string;
    name?: string;
    phone?: string;
    subscribeGlobal: boolean;
}) => {
    const data: CreateSubscriberCustomerMutationVariables["data"] = {
        email: input.email,
        isSubscriber: input.subscribeGlobal,
    };

    if (input.company) data.company = input.company;
    if (input.name) data.name = input.name;
    if (input.phone) data.phone = input.phone;

    return data;
};

const upsertViaLegacyCustomerModel = async (
    client: ApolloClient,
    input: {
        email: string;
        company?: string;
        name?: string;
        phone?: string;
        subscribeGlobal: boolean;
    },
) => {
    const data = buildLegacyCustomerData(input);

    const lookup = await client.query<FindCustomerByEmailQuery, FindCustomerByEmailQueryVariables>(
        {
            query: FindCustomerByEmailDocument,
            variables: { email: input.email },
            fetchPolicy: "network-only",
            context: { skipAuth: true },
        },
    );

    const customers = (lookup.data?.customers ?? []) as Array<CustomerLookupRecord | null>;
    const existingCustomer = customers.find((record): record is CustomerLookupRecord =>
        Boolean(record?.documentId),
    );

    if (existingCustomer?.documentId) {
        await client.mutate<UpdateSubscriberCustomerMutation, UpdateSubscriberCustomerMutationVariables>(
            {
                mutation: UpdateSubscriberCustomerDocument,
                variables: {
                    documentId: existingCustomer.documentId,
                    data,
                },
                context: { skipAuth: true },
            },
        );
        return;
    }

    try {
        await client.mutate<CreateSubscriberCustomerMutation, CreateSubscriberCustomerMutationVariables>(
            {
                mutation: CreateSubscriberCustomerDocument,
                variables: { data },
                context: { skipAuth: true },
            },
        );
    } catch (error) {
        const firstErrorMessage = toErrorMessage(error);
        if (!looksLikeDuplicateError(firstErrorMessage)) {
            throw error;
        }

        // Handle create race by re-querying then updating.
        const retryLookup = await client.query<
            FindCustomerByEmailQuery,
            FindCustomerByEmailQueryVariables
        >({
            query: FindCustomerByEmailDocument,
            variables: { email: input.email },
            fetchPolicy: "network-only",
            context: { skipAuth: true },
        });
        const retryCustomers = (retryLookup.data?.customers ??
            []) as Array<CustomerLookupRecord | null>;
        const retryCustomer = retryCustomers.find((record): record is CustomerLookupRecord =>
            Boolean(record?.documentId),
        );

        if (!retryCustomer?.documentId) {
            throw error;
        }

        await client.mutate<UpdateSubscriberCustomerMutation, UpdateSubscriberCustomerMutationVariables>(
            {
                mutation: UpdateSubscriberCustomerDocument,
                variables: {
                    documentId: retryCustomer.documentId,
                    data,
                },
                context: { skipAuth: true },
            },
        );
    }
};

const upsertViaCustomMutation = async (
    client: ApolloClient,
    input: {
        email: string;
        company?: string;
        name?: string;
        phone?: string;
        source?: string;
        subscribeGlobal: boolean;
        productDocumentId?: string;
    },
) => {
    const variables: UpsertCustomerSubscriptionMutationVariables = {
        input: {
            email: input.email,
            subscribeGlobal: input.subscribeGlobal,
            source: input.source,
            company: input.company,
            name: input.name,
            phone: input.phone,
            productDocumentId: input.productDocumentId,
        },
    };

    await client.mutate<UpsertCustomerSubscriptionMutation, UpsertCustomerSubscriptionMutationVariables>(
        {
            mutation: UpsertCustomerSubscriptionDocument,
            variables,
            context: { skipAuth: true },
        },
    );
};

export const upsertSubscriberCustomer = async (
    client: ApolloClient,
    input: UpsertSubscriberCustomerInput,
) => {
    const normalizedEmail = normalizeEmail(input.email);
    const sanitizedCompany = sanitizeOptionalText(input.company);
    const sanitizedName = sanitizeOptionalText(input.name);
    const sanitizedPhone = sanitizeOptionalText(input.phone);
    const subscribeGlobal = input.subscribeGlobal ?? true;
    const productDocumentIds = normalizeProductDocumentIds(
        input.productDocumentId,
        input.productDocumentIds,
    );

    if (customMutationAvailability !== "unsupported") {
        try {
            if (productDocumentIds.length === 0) {
                await upsertViaCustomMutation(client, {
                    email: normalizedEmail,
                    company: sanitizedCompany,
                    name: sanitizedName,
                    phone: sanitizedPhone,
                    source: input.source,
                    subscribeGlobal,
                });
            } else {
                for (const productDocumentId of productDocumentIds) {
                    await upsertViaCustomMutation(client, {
                        email: normalizedEmail,
                        company: sanitizedCompany,
                        name: sanitizedName,
                        phone: sanitizedPhone,
                        source: input.source,
                        subscribeGlobal,
                        productDocumentId,
                    });
                }
            }
            customMutationAvailability = "supported";
            return;
        } catch (error) {
            if (isCustomMutationUnsupported(error)) {
                customMutationAvailability = "unsupported";
            } else {
                const message = toErrorMessage(error);
                if (
                    /Field "phone" is not defined by type "UpsertCustomerSubscriptionInput"/i.test(
                        message,
                    )
                ) {
                    customMutationAvailability = "unsupported";
                } else {
                    throw error;
                }
            }
        }
    }

    await upsertViaLegacyCustomerModel(client, {
        email: normalizedEmail,
        company: sanitizedCompany,
        name: sanitizedName,
        phone: sanitizedPhone,
        subscribeGlobal,
    });
};

