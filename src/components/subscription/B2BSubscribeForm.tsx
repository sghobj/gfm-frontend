import { useApolloClient, useQuery } from "@apollo/client/react";
import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    FormControl,
    FormHelperText,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient";
import {
    SubscriptionProductsDocument,
    type SubscriptionProductsQuery,
    type SubscriptionProductsQueryVariables,
} from "../../graphql/gql/graphql";
import { upsertSubscriberCustomer } from "../../services/subscription/upsertSubscriberCustomer";

type SubscribeFormValues = {
    email: string;
    company: string;
    name: string;
    phone: string;
    productDocumentIds: string[];
    consent: boolean;
    website: string;
};

export interface B2BSubscribeFormProps {
    variant: "homepage" | "footer";
    compact?: boolean;
    onSuccess?: () => void;
}

export const B2BSubscribeForm = ({
    variant,
    compact = false,
    onSuccess,
}: B2BSubscribeFormProps) => {
    const client = useApolloClient();
    const theme = useTheme();
    const { t, i18n } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const { data: productsData, loading: productsLoading } = useQuery<
        SubscriptionProductsQuery,
        SubscriptionProductsQueryVariables
    >(SubscriptionProductsDocument, {
        variables: { locale },
        context: { skipAuth: true },
    });

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SubscribeFormValues>({
        defaultValues: {
            email: "",
            company: "",
            name: "",
            phone: "",
            productDocumentIds: [],
            consent: false,
            website: "",
        },
    });
    const productOptions = useMemo(() => {
        return (productsData?.products ?? []).flatMap((item) => {
            if (!item?.documentId || !item?.name) return [];
            return [{ documentId: item.documentId, name: item.name }];
        });
    }, [productsData?.products]);
    const requiresProductSelection = productOptions.length > 0;

    const isCompact = compact || variant === "footer";
    const isRtl = theme.direction === "rtl";
    const fieldInputSx = {
        textAlign: isRtl ? "right" : "left",
        backgroundColor: "white",
        borderColor: "divider",
        color: "text.secondary",
        "&::placeholder": {
            textAlign: isRtl ? "right" : "left",
            opacity: 1,
        },
    };

    const onSubmit = async (values: SubscribeFormValues) => {
        setSubmitError(null);
        setIsSuccess(false);

        // Honeypot: silently accept probable bot submissions.
        if (values.website.trim().length > 0) {
            setIsSuccess(true);
            reset({
                email: "",
                company: "",
                name: "",
                phone: "",
                productDocumentIds: [],
                consent: false,
                website: "",
            });
            return;
        }

        setIsSubmitting(true);

        try {
            await upsertSubscriberCustomer(client, {
                email: values.email,
                company: values.company,
                name: values.name,
                phone: values.phone,
                source: variant === "footer" ? "footer" : "homepage",
                subscribeGlobal: true,
                productDocumentIds: values.productDocumentIds,
            });

            setIsSuccess(true);
            reset({
                email: "",
                company: "",
                name: "",
                phone: "",
                productDocumentIds: [],
                consent: false,
                website: "",
            });
            onSuccess?.();
        } catch {
            setSubmitError(t("subscription.error"));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={isCompact ? 1.5 : 2}>
                {variant === "footer" && (
                    <Stack spacing={0.6}>
                        <Typography variant="h6" sx={{ fontWeight: 800 }}>
                            {t("subscription.footerTitle")}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.82 }}>
                            {t("subscription.footerSubtitle")}
                        </Typography>
                    </Stack>
                )}

                {isSuccess && <Alert severity="success">{t("subscription.success")}</Alert>}
                {submitError && <Alert severity="error">{submitError}</Alert>}

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    useFlexGap
                    gap={isCompact ? 1.25 : 2}
                >
                    <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, textAlign: isRtl ? "right" : "left" }}
                        >
                            {t("subscription.fields.workEmail")}
                        </Typography>
                        <TextField
                            size={isCompact ? "small" : "medium"}
                            fullWidth
                            placeholder={t("subscription.fields.workEmailPlaceholder")}
                            inputProps={{
                                dir: "ltr",
                                "aria-label": t("subscription.fields.workEmail"),
                            }}
                            sx={{
                                "& .MuiInputBase-input": fieldInputSx,
                                backgroundColor: "white",
                            }}
                            error={Boolean(errors.email)}
                            helperText={
                                errors.email?.message ?? t("subscription.fields.workEmailHint")
                            }
                            {...register("email", {
                                required: t("subscription.validation.emailRequired"),
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: t("subscription.validation.emailInvalid"),
                                },
                            })}
                        />
                    </Stack>

                    <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, textAlign: isRtl ? "right" : "left" }}
                        >
                            {t("subscription.fields.company")}
                        </Typography>
                        <TextField
                            size={isCompact ? "small" : "medium"}
                            fullWidth
                            placeholder={t("subscription.fields.companyPlaceholder")}
                            inputProps={{
                                dir: isRtl ? "rtl" : "ltr",
                                "aria-label": t("subscription.fields.company"),
                            }}
                            sx={{
                                "& .MuiInputBase-input": fieldInputSx,
                            }}
                            error={Boolean(errors.company)}
                            helperText={errors.company?.message}
                            {...register("company", {
                                required: t("subscription.validation.companyRequired"),
                                setValueAs: (value: string) => value.trim(),
                                validate: (value) =>
                                    value.length > 0 ||
                                    t("subscription.validation.companyRequired"),
                            })}
                        />
                    </Stack>
                </Stack>

                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    useFlexGap
                    gap={isCompact ? 1.25 : 2}
                >
                    <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, textAlign: isRtl ? "right" : "left" }}
                        >
                            {t("subscription.fields.fullNameOptional")}
                        </Typography>
                        <TextField
                            size={isCompact ? "small" : "medium"}
                            fullWidth
                            placeholder={t("subscription.fields.fullNamePlaceholder")}
                            inputProps={{
                                dir: isRtl ? "rtl" : "ltr",
                                "aria-label": t("subscription.fields.fullNameOptional"),
                            }}
                            sx={{
                                "& .MuiInputBase-input": fieldInputSx,
                            }}
                            {...register("name", {
                                setValueAs: (value: string) => value.trim(),
                            })}
                        />
                    </Stack>

                    <Stack spacing={0.5} sx={{ flex: 1 }}>
                        <Typography
                            variant="subtitle2"
                            sx={{ fontWeight: 700, textAlign: isRtl ? "right" : "left" }}
                        >
                            {t("subscription.fields.phoneOptional")}
                        </Typography>
                        <TextField
                            size={isCompact ? "small" : "medium"}
                            fullWidth
                            placeholder={t("subscription.fields.phonePlaceholder")}
                            inputProps={{
                                dir: "ltr",
                                "aria-label": t("subscription.fields.phoneOptional"),
                            }}
                            sx={{
                                "& .MuiInputBase-input": fieldInputSx,
                            }}
                            {...register("phone", {
                                setValueAs: (value: string) => value.trim(),
                            })}
                        />
                    </Stack>
                </Stack>

                <Controller
                    name="productDocumentIds"
                    control={control}
                    rules={{
                        validate: (value) =>
                            !requiresProductSelection ||
                            value.length > 0 ||
                            t("subscription.validation.productsRequired"),
                    }}
                    render={({ field }) => {
                        const selectedValues = Array.isArray(field.value) ? field.value : [];
                        return (
                            <FormControl
                                error={Boolean(errors.productDocumentIds)}
                                component="fieldset"
                            >
                                <Stack spacing={0.8}>
                                    <Typography
                                        variant="subtitle2"
                                        sx={{
                                            fontWeight: 700,
                                            textAlign: isRtl ? "right" : "left",
                                        }}
                                    >
                                        {t("subscription.fields.products")}
                                    </Typography>

                                    {productsLoading && (
                                        <Typography variant="body2" sx={{ opacity: 0.75 }}>
                                            {t("subscription.productsLoading")}
                                        </Typography>
                                    )}

                                    {!productsLoading && productOptions.length === 0 && (
                                        <Typography variant="body2" sx={{ opacity: 0.75 }}>
                                            {t("subscription.productsUnavailable")}
                                        </Typography>
                                    )}

                                    {productOptions.length > 0 && (
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: {
                                                    xs: "1fr",
                                                    sm: "1fr 1fr",
                                                },
                                                gap: 0.4,
                                                border: "1px solid",
                                                borderColor: "divider",
                                                borderRadius: 2,
                                                p: { xs: 1, md: 1.25 },
                                            }}
                                        >
                                            {productOptions.map((product) => (
                                                <FormControlLabel
                                                    key={product.documentId}
                                                    sx={{ m: 0 }}
                                                    control={
                                                        <Checkbox
                                                            size={isCompact ? "small" : "medium"}
                                                            checked={selectedValues.includes(
                                                                product.documentId,
                                                            )}
                                                            onChange={(event) => {
                                                                const nextValues = event.target
                                                                    .checked
                                                                    ? [
                                                                          ...selectedValues,
                                                                          product.documentId,
                                                                      ]
                                                                    : selectedValues.filter(
                                                                          (id) =>
                                                                              id !==
                                                                              product.documentId,
                                                                      );
                                                                field.onChange(
                                                                    Array.from(new Set(nextValues)),
                                                                );
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Typography variant="body2">
                                                            {product.name}
                                                        </Typography>
                                                    }
                                                />
                                            ))}
                                        </Box>
                                    )}
                                </Stack>

                                {errors.productDocumentIds?.message && (
                                    <FormHelperText>
                                        {String(errors.productDocumentIds.message)}
                                    </FormHelperText>
                                )}
                            </FormControl>
                        );
                    }}
                />

                <Controller
                    name="consent"
                    control={control}
                    rules={{
                        validate: (value) => value || t("subscription.validation.consentRequired"),
                    }}
                    render={({ field, fieldState }) => (
                        <FormControl error={Boolean(fieldState.error)} component="fieldset">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size={isCompact ? "small" : "medium"}
                                        color="primary"
                                        checked={Boolean(field.value)}
                                        onChange={(_event, checked) => field.onChange(checked)}
                                        onBlur={field.onBlur}
                                        inputRef={field.ref}
                                    />
                                }
                                label={
                                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                                        {t("subscription.consent")}
                                    </Typography>
                                }
                            />
                            {fieldState.error?.message && (
                                <FormHelperText>{fieldState.error.message}</FormHelperText>
                            )}
                        </FormControl>
                    )}
                />

                <Typography variant="caption" sx={{ opacity: 0.75 }}>
                    {t("subscription.privacy")}
                </Typography>

                <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    style={{
                        position: "absolute",
                        left: "-9999px",
                        width: "1px",
                        height: "1px",
                        opacity: 0,
                    }}
                    {...register("website")}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                        alignSelf: "flex-start",
                        px: isCompact ? 2.5 : 3.5,
                        py: isCompact ? 1 : 1.2,
                        borderRadius: 2,
                        fontWeight: 800,
                        textTransform: "none",
                    }}
                >
                    {isSubmitting ? t("subscription.submitting") : t("subscription.submit")}
                </Button>
            </Stack>
        </Box>
    );
};
