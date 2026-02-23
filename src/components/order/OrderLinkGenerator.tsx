import { useEffect, useMemo, useState } from "react";
import { Alert, Box, Button, MenuItem, Paper, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client/react";
import {
    GenerateOrderInvitationDocument,
    GetAllOfferingsDocument,
    type GenerateOrderInvitationMutation,
    type GenerateOrderInvitationMutationVariables,
} from "../../graphql/gql/graphql";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient";
import { isContentForLocale } from "../../utils/localizedContent";

const FRONTEND_URL = import.meta.env.VITE_APP_URL ?? window.location.origin;

type OfferingOption = {
    documentId: string;
    locale?: string | null;
    availability?: string | null;
    product?: {
        locale?: string | null;
        name?: string | null;
    } | null;
    brand?: {
        locale?: string | null;
        name?: string | null;
    } | null;
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
    const { i18n, t } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data, loading } = useQuery(GetAllOfferingsDocument, {
        variables: { locale },
    });
    const [createInvitation] = useMutation<
        GenerateOrderInvitationMutation,
        GenerateOrderInvitationMutationVariables
    >(GenerateOrderInvitationDocument);

    const offerings = useMemo<OfferingOption[]>(() => {
        const raw = (data?.offerings ?? []) as Array<OfferingOption | null | undefined>;
        return raw.filter(
            (item): item is OfferingOption =>
                Boolean(item) &&
                isContentForLocale(item?.locale, activeLocale) &&
                isContentForLocale(item?.brand?.locale, activeLocale) &&
                isContentForLocale(item?.product?.locale, activeLocale) &&
                String(item?.availability ?? "").toLowerCase() !== "no",
        );
    }, [data?.offerings, activeLocale]);

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
            if (!offeringId) throw new Error(t("adminOrderLinks.errors.selectOffering"));
            if (!customerEmail || !looksLikeEmail(customerEmail)) {
                throw new Error(t("adminOrderLinks.errors.validCustomerEmail"));
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
            if (!token) throw new Error(t("adminOrderLinks.errors.missingToken"));

            const link = `${FRONTEND_URL.replace(/\/$/, "")}/order/submit?token=${encodeURIComponent(
                token,
            )}`;
            setResultLink(link);
        } catch (err: unknown) {
            const message =
                err instanceof Error ? err.message : t("adminOrderLinks.errors.createFailed");
            setError(message);
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
                    {t("adminOrderLinks.title")}
                </Typography>

                {error && <Alert severity="error">{error}</Alert>}

                <TextField
                    select
                    label={t("adminOrderLinks.fields.offering")}
                    value={offeringId}
                    onChange={(event) => setOfferingId(event.target.value)}
                    disabled={loading}
                    fullWidth
                >
                    {offerings.map((offering) => (
                        <MenuItem key={offering.documentId} value={offering.documentId}>
                            {(offering.product?.name ||
                                t("adminOrderLinks.labels.unknownProduct")) +
                                " - " +
                                (offering.brand?.name || t("adminOrderLinks.labels.unknownBrand"))}
                        </MenuItem>
                    ))}
                </TextField>

                <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2}>
                    <TextField
                        label={t("adminOrderLinks.fields.customerEmail")}
                        type="email"
                        required
                        fullWidth
                        value={customerEmail}
                        onChange={(event) => setCustomerEmail(event.target.value)}
                    />
                    <TextField
                        label={t("adminOrderLinks.fields.customerName")}
                        fullWidth
                        value={customerName}
                        onChange={(event) => setCustomerName(event.target.value)}
                    />
                </Stack>

                <TextField
                    label={t("adminOrderLinks.fields.customerCompany")}
                    fullWidth
                    value={customerCompany}
                    onChange={(event) => setCustomerCompany(event.target.value)}
                />

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    useFlexGap
                    gap={2}
                    alignItems="center"
                >
                    <TextField
                        label={t("adminOrderLinks.fields.expiryDate")}
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
                        {t("adminOrderLinks.actions.noExpiry")}
                    </Button>
                </Stack>

                <Stack direction="row" useFlexGap gap={1.5}>
                    <Button variant="contained" onClick={handleCreate} disabled={busy}>
                        {busy
                            ? t("adminOrderLinks.actions.generating")
                            : t("adminOrderLinks.actions.generate")}
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
                        {t("adminOrderLinks.actions.reset")}
                    </Button>
                </Stack>

                {resultLink && (
                    <Box>
                        <Alert severity="success" sx={{ mb: 1.5 }}>
                            {t("adminOrderLinks.success.linkGenerated")}
                        </Alert>
                        <TextField
                            fullWidth
                            value={resultLink}
                            InputProps={{ readOnly: true }}
                            sx={{ mb: 1.5 }}
                        />
                        <Stack direction="row" useFlexGap gap={1.5}>
                            <Button variant="outlined" onClick={handleCopy}>
                                {t("adminOrderLinks.actions.copyLink")}
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
                                {t("adminOrderLinks.actions.sendByEmail")}
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Stack>
        </Paper>
    );
}

export default OrderLinkGenerator;

