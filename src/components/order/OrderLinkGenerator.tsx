import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { GetAllOfferingsDocument } from "../../gql/graphql";

const FRONTEND_URL = import.meta.env.VITE_APP_URL ?? window.location.origin;

const CREATE_ORDER_INVITATION = gql`
    mutation GenerateOrderInvitation($input: CreateOrderInvitationInput!) {
        generateOrderInvitation(input: $input) {
            documentId
            token
            expiresAt
            customerEmail
            customerName
            customerCompany
            offering {
                documentId
                product {
                    name
                }
                brand {
                    name
                }
            }
        }
    }
`;

type OfferingOption = {
    documentId: string;
    product?: {
        name?: string | null;
    } | null;
    brand?: {
        name?: string | null;
    } | null;
};

type CreateInvitationResult = {
    generateOrderInvitation?: {
        documentId: string;
        token: string;
        expiresAt?: string | null;
    } | null;
};

type CreateInvitationVars = {
    input: {
        offeringDocumentId: string;
        customerEmail: string;
        customerName?: string;
        customerCompany?: string;
        expiresAt?: string | null;
        quantity?: number;
    };
};

const DEFAULT_EXPIRY_DAYS = 7;

const toInputDate = (date: Date): string => date.toISOString().slice(0, 10);

const buildDefaultExpiryDate = (): string => {
    const date = new Date();
    date.setDate(date.getDate() + DEFAULT_EXPIRY_DAYS);
    return toInputDate(date);
};

const expiryToIso = (value: string): string | null => {
    if (!value) return null;
    const date = new Date(`${value}T23:59:59`);
    if (Number.isNaN(date.getTime())) {
        throw new Error("Invalid expiry date.");
    }
    return date.toISOString();
};

const looksLikeEmail = (value: string): boolean => /^\S+@\S+\.\S+$/.test(value);

export function OrderLinkGenerator() {
    const { data, loading } = useQuery(GetAllOfferingsDocument);
    const [createInvitation] = useMutation<CreateInvitationResult, CreateInvitationVars>(
        CREATE_ORDER_INVITATION,
    );

    const offerings = useMemo<OfferingOption[]>(() => {
        const raw = (data?.offerings ?? []) as Array<OfferingOption | null | undefined>;
        return raw.filter((item): item is OfferingOption => Boolean(item));
    }, [data?.offerings]);

    const [offeringId, setOfferingId] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [customerCompany, setCustomerCompany] = useState("");
    const [expiryDate, setExpiryDate] = useState<string>(buildDefaultExpiryDate());

    const [busy, setBusy] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [resultLink, setResultLink] = useState<string | null>(null);

    useEffect(() => {
        if (!loading && offerings.length > 0 && !offeringId) {
            setOfferingId(offerings[0].documentId);
        }
    }, [loading, offerings, offeringId]);

    const handleCreate = async () => {
        setBusy(true);
        setError(null);
        setResultLink(null);

        try {
            if (!offeringId) throw new Error("Select an offering.");
            if (!customerEmail || !looksLikeEmail(customerEmail)) {
                throw new Error("Valid customer email is required.");
            }

            const { data: response } = await createInvitation({
                variables: {
                    input: {
                        offeringDocumentId: offeringId,
                        customerEmail: customerEmail.trim().toLowerCase(),
                        customerName: customerName.trim() || undefined,
                        customerCompany: customerCompany.trim() || undefined,
                        expiresAt: expiryToIso(expiryDate),
                        quantity: 1,
                    },
                },
            });

            const token = response?.generateOrderInvitation?.token;
            if (!token) throw new Error("Server did not return a token.");

            const link = `${FRONTEND_URL.replace(/\/$/, "")}/order/submit?token=${encodeURIComponent(
                token,
            )}`;
            setResultLink(link);
        } catch (err: any) {
            setError(err?.message ?? "Unable to create order link.");
        } finally {
            setBusy(false);
        }
    };

    const handleCopy = async () => {
        if (!resultLink) return;
        await navigator.clipboard.writeText(resultLink);
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Stack spacing={2.5}>
                <Typography variant="h6" fontWeight={800}>
                    Generate Protected Order Link
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    select
                    label="Offering"
                    value={offeringId}
                    onChange={(event) => setOfferingId(event.target.value)}
                    disabled={loading}
                    fullWidth
                >
                    {offerings.map((offering) => (
                        <MenuItem key={offering.documentId} value={offering.documentId}>
                            {(offering.product?.name || "Unknown product") +
                                " - " +
                                (offering.brand?.name || "Unknown brand")}
                        </MenuItem>
                    ))}
                </TextField>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <TextField
                        label="Customer Email"
                        type="email"
                        required
                        fullWidth
                        value={customerEmail}
                        onChange={(event) => setCustomerEmail(event.target.value)}
                    />
                    <TextField
                        label="Customer Name (optional)"
                        fullWidth
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                    />
                </Stack>

                <TextField
                    label="Customer Company (optional)"
                    fullWidth
                    value={customerCompany}
                    onChange={(event) => setCustomerCompany(event.target.value)}
                />

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center">
                    <TextField
                        label="Expiry Date"
                        type="date"
                        value={expiryDate}
                        onChange={(event) => setExpiryDate(event.target.value)}
                        InputLabelProps={{ shrink: true }}
                        sx={{ width: { xs: "100%", sm: 240 } }}
                    />
                    <Button
                        variant="text"
                        onClick={() => setExpiryDate("")}
                        sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
                    >
                        No expiry
                    </Button>
                </Stack>

                <Stack direction="row" spacing={1.5}>
                    <Button variant="contained" onClick={handleCreate} disabled={busy}>
                        {busy ? "Generating..." : "Generate Link"}
                    </Button>
                    <Button
                        variant="outlined"
                        onClick={() => {
                            setCustomerName("");
                            setCustomerCompany("");
                            setCustomerEmail("");
                            setExpiryDate(buildDefaultExpiryDate());
                            setError(null);
                            setResultLink(null);
                        }}
                    >
                        Reset
                    </Button>
                </Stack>

                {resultLink && (
                    <Box>
                        <Alert severity="success" sx={{ mb: 1.5 }}>
                            Invitation link generated. This link can be used once.
                        </Alert>
                        <TextField
                            fullWidth
                            value={resultLink}
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 1.5 }}
                        />
                        <Stack direction="row" spacing={1.5}>
                            <Button variant="outlined" onClick={handleCopy}>
                                Copy link
                            </Button>
                            <Button
                                variant="contained"
                                onClick={() =>
                                    window.open(
                                        `mailto:?subject=Complete your B2B order&body=${encodeURIComponent(
                                            `Use this link to submit your order: ${resultLink}`,
                                        )}`,
                                    )
                                }
                            >
                                Send by email
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
}

export default OrderLinkGenerator;
