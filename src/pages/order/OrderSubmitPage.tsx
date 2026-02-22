import { useEffect, useMemo, useState } from "react";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
    formatApproxPackageCount,
    getApproxPackageCount,
    type PackagingApproxInput,
} from "../../utils/packagingMath";

const GET_INVITATION = gql`
    query GetInvitation($token: String!) {
        getInvitation(token: $token) {
            documentId
            token
            customerEmail
            customerName
            customerCompany
            grade
            size
            packaging
            quantity
            offering {
                documentId
                isMedjoolDate
                product {
                    documentId
                    name
                }
                brand {
                    documentId
                    name
                }
                dateSpecifications {
                    grade
                    sizes
                    pack_options {
                        documentId
                        displayLabel
                        amount
                        amountMin
                        amountMax
                        unit
                        applicable_sizes
                    }
                }
                pack_options {
                    documentId
                    displayLabel
                    amount
                    amountMin
                    amountMax
                    unit
                }
            }
        }
    }
`;

const SUBMIT_ORDER = gql`
    mutation SubmitOrder($data: OrderSubmissionInput!) {
        submitOrder(data: $data) {
            documentId
            orderNumber
            status
        }
    }
`;

type PackOption = {
    documentId: string;
    displayLabel?: string | null;
    amount?: number | null;
    amountMin?: number | null;
    amountMax?: number | null;
    unit?: string | null;
    applicable_sizes?: string | string[] | null;
};

type DateSpec = {
    grade?: string | null;
    sizes?: string | null;
    pack_options?: Array<PackOption | null> | null;
};

type Invitation = {
    documentId: string;
    token: string;
    customerEmail?: string | null;
    customerName?: string | null;
    customerCompany?: string | null;
    grade?: string | null;
    size?: string | null;
    packaging?: string | null;
    quantity?: number | null;
    offering?: {
        documentId: string;
        isMedjoolDate?: boolean | null;
        product?: {
            documentId?: string | null;
            name?: string | null;
        } | null;
        brand?: {
            documentId?: string | null;
            name?: string | null;
        } | null;
        dateSpecifications?: Array<DateSpec | null> | null;
        pack_options?: Array<PackOption | null> | null;
    } | null;
};

type GetInvitationData = {
    getInvitation?: Invitation | null;
};

type GetInvitationVars = {
    token: string;
};

type SubmitOrderData = {
    submitOrder?: {
        documentId: string;
        orderNumber?: string | null;
        status?: string | null;
    } | null;
};

type SubmitOrderVars = {
    data: {
        invitationToken: string;
        grade?: string;
        size?: string;
        packaging?: string;
        packOption?: string;
        quantity: number;
        message?: string;
        customerName: string;
        customerEmail: string;
        customerCompany?: string;
    };
};

const normalize = (value: string) => value.trim().toLowerCase();
const SUBMIT_ORDER_TIMEOUT_MS = 20000;

const formatPackOptionLabel = (option: PackOption | null | undefined): string => {
    if (!option) return "";
    if (option.displayLabel) return option.displayLabel;
    if (option.amountMin != null && option.amountMax != null) {
        return `${option.amountMin}-${option.amountMax} ${option.unit ?? ""}`.trim();
    }
    if (option.amount != null) {
        return `${option.amount} ${option.unit ?? ""}`.trim();
    }
    return "";
};

const normalizeApplicableSizes = (value: unknown): string[] => {
    if (!value) return [];
    if (Array.isArray(value)) return value.map((item) => String(item)).filter(Boolean);
    return [String(value)];
};

export function OrderSubmitPage() {
    const { t } = useTranslation("common");
    const [searchParams] = useSearchParams();
    const token = (searchParams.get("token") ?? "").trim();

    const { data, loading, error } = useQuery<GetInvitationData, GetInvitationVars>(
        GET_INVITATION,
        {
            variables: { token },
            skip: !token,
            fetchPolicy: "no-cache",
        },
    );
    const [submitOrder] = useMutation<SubmitOrderData, SubmitOrderVars>(SUBMIT_ORDER);

    const invitation = data?.getInvitation ?? null;
    const offering = invitation?.offering ?? null;

    const dateSpecs = useMemo<DateSpec[]>(() => {
        const raw = (offering?.dateSpecifications ?? []) as Array<DateSpec | null | undefined>;
        return raw.filter((item): item is DateSpec => Boolean(item));
    }, [offering?.dateSpecifications]);

    const nonDatePackOptions = useMemo<PackOption[]>(() => {
        const raw = (offering?.pack_options ?? []) as Array<PackOption | null | undefined>;
        return raw.filter((item): item is PackOption => Boolean(item));
    }, [offering?.pack_options]);

    const isDatesFlow = Boolean(offering?.isMedjoolDate && dateSpecs.length > 0);

    const gradeOptions = useMemo<string[]>(() => {
        return Array.from(new Set(dateSpecs.map((spec) => spec.grade).filter(Boolean) as string[]));
    }, [dateSpecs]);

    const [selectedGrade, setSelectedGrade] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedPackOption, setSelectedPackOption] = useState("");
    const [manualPackaging, setManualPackaging] = useState("");
    const [quantityKg, setQuantityKg] = useState(1);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");
    const [customerCompany, setCustomerCompany] = useState("");
    const [message, setMessage] = useState("");

    const [submitError, setSubmitError] = useState<string | null>(null);
    const [busy, setBusy] = useState(false);
    const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);

    useEffect(() => {
        if (!invitation) return;
        setCustomerName(invitation.customerName ?? "");
        setCustomerEmail(invitation.customerEmail ?? "");
        setCustomerCompany(invitation.customerCompany ?? "");
        setQuantityKg(invitation.quantity && invitation.quantity > 0 ? invitation.quantity : 1);
        setSelectedGrade(invitation.grade ?? "");
        setSelectedSize(invitation.size ?? "");
        setSelectedPackOption("");
        setManualPackaging(invitation.packaging ?? "");
    }, [invitation?.documentId]);

    const filteredSizeOptions = useMemo<string[]>(() => {
        if (!isDatesFlow || !selectedGrade) return [];
        return Array.from(
            new Set(
                dateSpecs
                    .filter((spec) => spec.grade === selectedGrade)
                    .map((spec) => spec.sizes)
                    .filter((value): value is string => Boolean(value)),
            ),
        );
    }, [dateSpecs, isDatesFlow, selectedGrade]);

    const datePackOptions = useMemo<PackOption[]>(() => {
        if (!isDatesFlow || !selectedGrade) return [];

        const candidates: PackOption[] = [];
        for (const spec of dateSpecs) {
            if (spec.grade !== selectedGrade) continue;
            const packOptions = (spec.pack_options ?? []).filter((option): option is PackOption =>
                Boolean(option),
            );
            candidates.push(...packOptions);
        }

        const deduped = Array.from(
            candidates
                .reduce(
                    (map, option) => map.set(option.documentId, option),
                    new Map<string, PackOption>(),
                )
                .values(),
        );

        if (!selectedSize) return deduped;

        return deduped.filter((option) => {
            const applicableSizes = normalizeApplicableSizes(option.applicable_sizes);
            if (applicableSizes.length === 0) return true;
            return applicableSizes.includes(selectedSize);
        });
    }, [dateSpecs, isDatesFlow, selectedGrade, selectedSize]);

    const selectedPackForEstimate = useMemo<PackagingApproxInput | null>(() => {
        if (isDatesFlow) {
            return (
                datePackOptions.find((option) => option.documentId === selectedPackOption) ?? null
            );
        }
        return (
            nonDatePackOptions.find((option) => option.documentId === selectedPackOption) ?? null
        );
    }, [isDatesFlow, datePackOptions, nonDatePackOptions, selectedPackOption]);

    const approxPackages = useMemo(() => {
        return getApproxPackageCount(quantityKg, selectedPackForEstimate);
    }, [quantityKg, selectedPackForEstimate]);

    useEffect(() => {
        if (!isDatesFlow) return;
        if (!selectedGrade && gradeOptions.length === 1) {
            setSelectedGrade(gradeOptions[0]);
        }
    }, [isDatesFlow, selectedGrade, gradeOptions]);

    useEffect(() => {
        if (!isDatesFlow) return;
        if (!selectedSize && filteredSizeOptions.length === 1) {
            setSelectedSize(filteredSizeOptions[0]);
            return;
        }
        if (selectedSize && !filteredSizeOptions.includes(selectedSize)) {
            setSelectedSize("");
            setSelectedPackOption("");
        }
    }, [isDatesFlow, selectedSize, filteredSizeOptions]);

    useEffect(() => {
        if (isDatesFlow) return;
        if (!selectedPackOption && nonDatePackOptions.length === 1) {
            setSelectedPackOption(nonDatePackOptions[0].documentId);
        }
    }, [isDatesFlow, nonDatePackOptions, selectedPackOption]);

    useEffect(() => {
        if (!isDatesFlow) return;
        if (!selectedPackOption && datePackOptions.length === 1) {
            setSelectedPackOption(datePackOptions[0].documentId);
            return;
        }
        if (
            selectedPackOption &&
            !datePackOptions.some((option) => option.documentId === selectedPackOption)
        ) {
            setSelectedPackOption("");
        }
    }, [isDatesFlow, selectedPackOption, datePackOptions]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (busy) return;
        setBusy(true);
        setSubmitError(null);

        try {
            if (!token) throw new Error(t("orderSubmit.errors.missingInvitationToken"));
            if (!invitation || !offering)
                throw new Error(t("orderSubmit.errors.invalidInvitation"));
            if (!customerName.trim()) throw new Error(t("orderSubmit.errors.customerNameRequired"));
            if (!customerEmail.trim())
                throw new Error(t("orderSubmit.errors.customerEmailRequired"));
            if (normalize(customerEmail) !== normalize(invitation.customerEmail ?? "")) {
                throw new Error(t("orderSubmit.errors.customerEmailMustMatch"));
            }
            if (!Number.isFinite(quantityKg) || quantityKg < 0.1) {
                throw new Error(t("orderSubmit.errors.quantityMin"));
            }

            let grade: string | undefined;
            let size: string | undefined;
            let packOption: string | undefined;
            let packaging: string | undefined;
            let selectedOptionForSubmit: PackagingApproxInput | null = null;

            if (isDatesFlow) {
                if (!selectedGrade) throw new Error(t("orderSubmit.errors.gradeRequired"));
                if (!selectedSize) throw new Error(t("orderSubmit.errors.sizeRequired"));
                if (!selectedPackOption) throw new Error(t("orderSubmit.errors.packagingRequired"));

                const selectedOption =
                    datePackOptions.find((option) => option.documentId === selectedPackOption) ??
                    null;

                grade = selectedGrade;
                size = selectedSize;
                packOption = selectedOption?.documentId ?? selectedPackOption;
                packaging = formatPackOptionLabel(selectedOption);
                selectedOptionForSubmit = selectedOption;
            } else {
                const selectedOption =
                    nonDatePackOptions.find((option) => option.documentId === selectedPackOption) ??
                    null;
                if (nonDatePackOptions.length > 0) {
                    if (!selectedOption) {
                        throw new Error(t("orderSubmit.errors.packagingRequired"));
                    }

                    packOption = selectedOption.documentId;
                    packaging = formatPackOptionLabel(selectedOption);
                    selectedOptionForSubmit = selectedOption;
                } else {
                    const customPackaging = manualPackaging.trim();
                    if (!customPackaging) {
                        throw new Error(t("orderSubmit.errors.packagingRequired"));
                    }
                    packOption = undefined;
                    packaging = customPackaging;
                }
            }

            const approxCount = getApproxPackageCount(quantityKg, selectedOptionForSubmit);
            const quantityPackages = Math.max(1, Math.ceil(approxCount ?? quantityKg));
            const approxText = formatApproxPackageCount(approxCount);
            const appendedApproxNote = `${t("orderSubmit.summary.requestedQuantity", {
                quantity: quantityKg,
            })}${approxText ? `\n${t("orderSubmit.summary.approxPackages", { value: approxText })}` : ""}
            `;
            const finalSummaryNote = appendedApproxNote.trimEnd();
            const finalMessage = message.trim()
                ? `${message.trim()}\n\n${finalSummaryNote}`
                : finalSummaryNote;

            const abortController = new AbortController();
            const timeoutHandle = setTimeout(() => {
                abortController.abort();
            }, SUBMIT_ORDER_TIMEOUT_MS);

            const { data: submitResponse } = await submitOrder({
                variables: {
                    data: {
                        invitationToken: token,
                        grade,
                        size,
                        packaging,
                        packOption,
                        quantity: quantityPackages,
                        message: finalMessage,
                        customerName: customerName.trim(),
                        customerEmail: normalize(customerEmail),
                        customerCompany: customerCompany.trim() || undefined,
                    },
                },
                context: {
                    fetchOptions: {
                        signal: abortController.signal,
                    },
                },
            }).finally(() => {
                clearTimeout(timeoutHandle);
            });

            const orderId =
                submitResponse?.submitOrder?.orderNumber ?? submitResponse?.submitOrder?.documentId;
            setSuccessOrderNumber(orderId ?? t("orderSubmit.orderCreatedFallback"));
        } catch (err: any) {
            const rawMessage = String(err?.message ?? "");
            if (err?.name === "AbortError" || rawMessage.toLowerCase().includes("abort")) {
                setSubmitError(t("orderSubmit.errors.timeout"));
            } else {
                setSubmitError(rawMessage || t("orderSubmit.errors.unableToSubmit"));
            }
        } finally {
            setBusy(false);
        }
    };

    if (!token) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Alert severity="error">{t("orderSubmit.errors.missingTokenInUrl")}</Alert>
            </Container>
        );
    }

    if (loading) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Paper sx={{ p: 4 }}>
                    <Stack spacing={2} alignItems="center">
                        <CircularProgress />
                        <Typography>{t("orderSubmit.validating")}</Typography>
                    </Stack>
                </Paper>
            </Container>
        );
    }

    if (error || !invitation || !offering) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Alert severity="error">{t("orderSubmit.errors.invalidExpiredOrUsed")}</Alert>
            </Container>
        );
    }

    if (successOrderNumber) {
        return (
            <Container maxWidth="sm" sx={{ py: 8 }}>
                <Alert severity="success">
                    {t("orderSubmit.success", { reference: successOrderNumber })}
                </Alert>
            </Container>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={2.5}>
                    <Box>
                        <Typography variant="h5" fontWeight={800}>
                            {t("orderSubmit.title")}
                        </Typography>
                        <Typography color="text.secondary">
                            {offering.product?.name || t("orderSubmit.productFallback")} -{" "}
                            {offering.brand?.name || t("orderSubmit.brandFallback")}
                        </Typography>
                    </Box>

                    {submitError && <Alert severity="error">{submitError}</Alert>}

                    <Box component="form" onSubmit={handleSubmit}>
                        <Stack spacing={2}>
                            {isDatesFlow && (
                                <TextField
                                    select
                                    label={t("orderSubmit.fields.grade")}
                                    value={selectedGrade}
                                    onChange={(event) => setSelectedGrade(event.target.value)}
                                    fullWidth
                                    required
                                >
                                    {gradeOptions.map((grade) => (
                                        <MenuItem key={grade} value={grade}>
                                            {grade}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}

                            {isDatesFlow && (
                                <TextField
                                    select
                                    label={t("orderSubmit.fields.size")}
                                    value={selectedSize}
                                    onChange={(event) => setSelectedSize(event.target.value)}
                                    fullWidth
                                    required
                                    disabled={!selectedGrade}
                                >
                                    {filteredSizeOptions.map((size) => (
                                        <MenuItem key={size} value={size}>
                                            {size}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}

                            {!isDatesFlow && nonDatePackOptions.length === 0 ? (
                                <TextField
                                    label={t("orderSubmit.fields.packagingOption")}
                                    value={manualPackaging}
                                    onChange={(event) => setManualPackaging(event.target.value)}
                                    fullWidth
                                    required
                                    helperText={t("orderSubmit.fields.packagingManualHelp")}
                                />
                            ) : (
                                <TextField
                                    select
                                    label={t("orderSubmit.fields.packagingOption")}
                                    value={selectedPackOption}
                                    onChange={(event) => setSelectedPackOption(event.target.value)}
                                    fullWidth
                                    required={
                                        (isDatesFlow && datePackOptions.length > 0) ||
                                        nonDatePackOptions.length > 0
                                    }
                                    disabled={isDatesFlow ? !selectedGrade : false}
                                >
                                    {(isDatesFlow ? datePackOptions : nonDatePackOptions).map(
                                        (option) => (
                                            <MenuItem
                                                key={option.documentId}
                                                value={option.documentId}
                                            >
                                                {formatPackOptionLabel(option)}
                                            </MenuItem>
                                        ),
                                    )}
                                </TextField>
                            )}

                            <TextField
                                label={t("orderSubmit.fields.quantityKg")}
                                type="number"
                                value={quantityKg}
                                onChange={(event) => setQuantityKg(Number(event.target.value || 0))}
                                inputProps={{ min: 0.1, step: 0.1 }}
                                required
                                fullWidth
                            />

                            <TextField
                                label={t("orderSubmit.fields.approxPackages")}
                                value={
                                    approxPackages
                                        ? t("orderSubmit.fields.packagesCount", {
                                              value: formatApproxPackageCount(approxPackages),
                                          })
                                        : t("orderSubmit.fields.selectPackagingOption")
                                }
                                InputProps={{ readOnly: true }}
                                helperText={t("orderSubmit.fields.approximationHelp")}
                                fullWidth
                            />

                            <TextField
                                label={t("orderSubmit.fields.fullName")}
                                value={customerName}
                                onChange={(event) => setCustomerName(event.target.value)}
                                required
                                fullWidth
                            />

                            <TextField
                                label={t("orderSubmit.fields.email")}
                                value={customerEmail}
                                type="email"
                                required
                                fullWidth
                                disabled
                            />

                            <TextField
                                label={t("orderSubmit.fields.company")}
                                value={customerCompany}
                                onChange={(event) => setCustomerCompany(event.target.value)}
                                fullWidth
                            />

                            <TextField
                                label={t("orderSubmit.fields.message")}
                                value={message}
                                onChange={(event) => setMessage(event.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                            />

                            <Button type="submit" variant="contained" disabled={busy}>
                                {busy
                                    ? t("orderSubmit.actions.submitting")
                                    : t("orderSubmit.actions.submit")}
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Paper>
        </Container>
    );
}
