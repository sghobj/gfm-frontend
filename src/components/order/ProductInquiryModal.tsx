import React, { useMemo, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Stack,
    TextField,
    MenuItem,
    Typography,
    Box,
    Divider,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import type { GetOfferingQuery } from "../../gql/graphql";
import { StrapiImage } from "../image/StrapiImage";
import { useForm, Controller, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
    formatApproxPackageCount,
    getApproxPackageCount,
    type PackagingApproxInput,
} from "../../utils/packagingMath";

type Offering = NonNullable<GetOfferingQuery["offering"]>;

interface ProductOrderModalProps {
    open: boolean;
    onClose: () => void;
    offering: Offering;
}

interface OrderFormValues {
    grade: string;
    size: string;
    packOption: string;
    quantityKg: number;
    name: string;
    email: string;
    company: string;
    message: string;
}

type DateSpec = NonNullable<NonNullable<Offering["dateSpecifications"]>[number]>;
type DatePackOption = NonNullable<NonNullable<DateSpec["pack_options"]>[number]>;
type NonDatePackOption = NonNullable<NonNullable<Offering["pack_options"]>[number]>;

function formatNonDatePackOption(opt: NonDatePackOption): string {
    return opt.displayLabel || `${opt.amount ?? ""} ${opt.unit ?? ""}`.trim() || "";
}

function formatDatePackOption(opt: DatePackOption): string {
    if (opt.displayLabel) return opt.displayLabel;
    if (opt.amountMin != null && opt.amountMax != null)
        return `${opt.amountMin}-${opt.amountMax} ${opt.unit ?? ""}`.trim();
    if (opt.amount != null) return `${opt.amount} ${opt.unit ?? ""}`.trim();
    return "";
}

function normalizeApplicableSizes(value: unknown): string[] {
    if (value == null) return [];
    if (Array.isArray(value))
        return value.filter((v): v is string => typeof v === "string" && v.length > 0);
    if (typeof value === "string" && value.length > 0) return [value];
    return [];
}

function dedupeByDocumentId<T extends { documentId: string }>(items: T[]): T[] {
    const map = new Map<string, T>();
    for (const item of items) map.set(item.documentId, item);
    return Array.from(map.values());
}

function idxValue(i: number) {
    return `__idx:${i}`;
}
function parseIdxValue(v: string): number | null {
    if (!v.startsWith("__idx:")) return null;
    const n = Number(v.slice(6));
    return Number.isFinite(n) ? n : null;
}

export const ProductInquiryModal: React.FC<ProductOrderModalProps> = ({
    open,
    onClose,
    offering,
}) => {
    const { t } = useTranslation("common");
    const specs = useMemo(() => {
        const raw = offering.dateSpecifications ?? [];
        return raw.filter((s): s is DateSpec => Boolean(s));
    }, [offering.dateSpecifications]);

    const nonDatePackOptions = useMemo(() => {
        const raw = offering.pack_options ?? [];
        return raw.filter((p): p is NonDatePackOption => Boolean(p));
    }, [offering.pack_options]);

    const isDatesFlow = Boolean(offering.isMedjoolDate && specs.length > 0);

    const {
        control,
        handleSubmit,
        setValue,
        register,
        formState: { errors },
    } = useForm<OrderFormValues>({
        defaultValues: {
            grade: "",
            size: "",
            packOption: "",
            quantityKg: 1,
            name: "",
            email: "",
            company: "",
            message: "",
        },
    });

    const selectedGrade = useWatch({ control, name: "grade" });
    const selectedSize = useWatch({ control, name: "size" });
    const selectedPackOption = useWatch({ control, name: "packOption" });
    const quantityKg = Number(useWatch({ control, name: "quantityKg" }) ?? 0);

    // Clear date-only fields when switching to non-dates flow
    useEffect(() => {
        if (!isDatesFlow) {
            setValue("grade", "");
        }
    }, [isDatesFlow, setValue]);

    // ----- Dates: grades -----
    const availableGrades = useMemo((): string[] => {
        if (!isDatesFlow) return [];
        return Array.from(new Set(specs.map((s) => s.grade).filter((v) => Boolean(v))));
    }, [isDatesFlow, specs]);

    const availableSizes = useMemo((): Array<{ value: string; label: string }> => {
        if (isDatesFlow) {
            if (!selectedGrade) return [];
            const sizes = Array.from(
                new Set(
                    specs
                        .filter((s) => s.grade === selectedGrade)
                        .map((s) => s.sizes)
                        .filter((v) => Boolean(v)),
                ),
            );
            return sizes.map((s) => ({ value: s, label: s }));
        }

        return nonDatePackOptions.map((opt, i) => ({
            value: idxValue(i),
            label: formatNonDatePackOption(opt),
        }));
    }, [isDatesFlow, specs, selectedGrade, nonDatePackOptions]);

    // ----- Dates: pack options filtered by size (applicable_sizes) -----
    const availableDatePackOptions = useMemo((): DatePackOption[] => {
        if (!isDatesFlow) return [];
        if (!selectedGrade) return [];

        const candidates: DatePackOption[] = [];
        for (const s of specs) {
            if (s.grade !== selectedGrade) continue;
            const opts = (s.pack_options ?? []).filter((o): o is DatePackOption => Boolean(o));
            candidates.push(...opts);
        }

        if (!selectedSize) return dedupeByDocumentId(candidates);

        return dedupeByDocumentId(
            candidates.filter((o) => {
                const applicable = normalizeApplicableSizes(o.applicable_sizes as unknown);
                if (applicable.length === 0) return true;
                return applicable.includes(selectedSize);
            }),
        );
    }, [isDatesFlow, specs, selectedGrade, selectedSize]);

    // ----- Auto-select grade (dates) -----
    useEffect(() => {
        if (!isDatesFlow) return;
        if (availableGrades.length === 1 && !selectedGrade) {
            setValue("grade", availableGrades[0]);
        }
    }, [isDatesFlow, availableGrades, selectedGrade, setValue]);

    // ----- Reset/auto-select size -----
    useEffect(() => {
        const currentValues = availableSizes.map((x) => x.value);

        if (availableSizes.length === 1 && !selectedSize) {
            setValue("size", availableSizes[0].value);
            return;
        }

        if (selectedSize && !currentValues.includes(selectedSize)) {
            setValue("size", "");
            setValue("packOption", "");
        }
    }, [availableSizes, selectedSize, setValue]);

    useEffect(() => {
        if (isDatesFlow) return;
        setValue("packOption", selectedSize ?? "");
    }, [isDatesFlow, selectedSize, setValue]);

    useEffect(() => {
        if (!isDatesFlow) return;

        if (availableDatePackOptions.length === 1) {
            setValue("packOption", availableDatePackOptions[0].documentId);
            return;
        }

        if (
            selectedPackOption &&
            !availableDatePackOptions.some((o) => o.documentId === selectedPackOption)
        ) {
            setValue("packOption", "");
        }
    }, [isDatesFlow, availableDatePackOptions, selectedPackOption, setValue]);

    // ----- Resolve selected non-date pack option object (for later calculations) -----
    const selectedNonDatePack = useMemo(() => {
        if (isDatesFlow) return null;
        const idx = selectedSize ? parseIdxValue(selectedSize) : null;
        if (idx == null) return null;
        return nonDatePackOptions[idx] ?? null;
    }, [isDatesFlow, selectedSize, nonDatePackOptions]);

    const selectedDatePackForEstimate = useMemo(() => {
        if (!isDatesFlow) return null;
        return (
            availableDatePackOptions.find((option) => option.documentId === selectedPackOption) ??
            null
        );
    }, [isDatesFlow, availableDatePackOptions, selectedPackOption]);

    const selectedPackForEstimate = useMemo<PackagingApproxInput | null>(() => {
        if (isDatesFlow) return selectedDatePackForEstimate;
        return selectedNonDatePack;
    }, [isDatesFlow, selectedDatePackForEstimate, selectedNonDatePack]);

    const approxPackages = useMemo(() => {
        return getApproxPackageCount(quantityKg, selectedPackForEstimate);
    }, [quantityKg, selectedPackForEstimate]);

    // ----- Submit handlers -----
    const onSubmitEmail = (data: OrderFormValues) => {
        const selectedDatePack = isDatesFlow
            ? (availableDatePackOptions.find((o) => o.documentId === data.packOption) ?? null)
            : null;

        const packLabel = isDatesFlow
            ? selectedDatePack?.displayLabel ||
              formatDatePackOption(selectedDatePack as DatePackOption)
            : selectedNonDatePack
              ? formatNonDatePackOption(selectedNonDatePack)
              : data.size;

        const approxPackagesForMessage = getApproxPackageCount(
            Number(data.quantityKg),
            (isDatesFlow ? selectedDatePack : selectedNonDatePack) ?? null,
        );

        const subject = `Inquiry: ${offering.product?.name} - ${offering.brand?.name}`;
        const body = `Hello, I am interested in:
Product: ${offering.product?.name}
Brand: ${offering.brand?.name}
${isDatesFlow ? `Grade: ${data.grade}\nSize: ${data.size}\n` : ""}Packaging: ${packLabel}
Quantity (Kg): ${data.quantityKg}
Approx. Number of Packages: ${formatApproxPackageCount(approxPackagesForMessage) || "N/A"}

My Details:
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}`;

        const mailtoUrl = `mailto:sales@gfm.jo?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.assign(mailtoUrl);
        onClose();
    };

    const onSubmitWhatsApp = (data: OrderFormValues) => {
        const selectedDatePack = isDatesFlow
            ? (availableDatePackOptions.find((o) => o.documentId === data.packOption) ?? null)
            : null;

        const packLabel = isDatesFlow
            ? selectedDatePack?.displayLabel ||
              formatDatePackOption(selectedDatePack as DatePackOption)
            : selectedNonDatePack
              ? formatNonDatePackOption(selectedNonDatePack)
              : data.size;

        const approxPackagesForMessage = getApproxPackageCount(
            Number(data.quantityKg),
            (isDatesFlow ? selectedDatePack : selectedNonDatePack) ?? null,
        );

        const text = `Hello, I am interested in:
*Product:* ${offering.product?.name}
*Brand:* ${offering.brand?.name}
${isDatesFlow ? `*Grade:* ${data.grade}\n*Size:* ${data.size}\n` : ""}*Packaging:* ${packLabel}
*Quantity (Kg):* ${data.quantityKg}
*Approx. Number of Packages:* ${formatApproxPackageCount(approxPackagesForMessage) || "N/A"}

*My Details:*
*Name:* ${data.name}
*Company:* ${data.company}
*Email:* ${data.email}

*Message:*
${data.message}`;

        window.open(`https://wa.me/962779500599?text=${encodeURIComponent(text)}`, "_blank");
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle sx={{ m: 0, p: 2, pr: 6, fontWeight: 900 }}>
                {t("inquiryModal.title")}
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <form>
                <DialogContent dividers>
                    <Stack spacing={3}>
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            {offering.product?.image && (
                                <StrapiImage
                                    media={offering.product.image}
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 1,
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <Box>
                                <Typography variant="subtitle2" color="primary" fontWeight={800}>
                                    {offering.brand?.name}
                                </Typography>
                                <Typography variant="h6" fontWeight={900} lineHeight={1.1}>
                                    {offering.product?.name}
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: -1 }}>
                            {t("inquiryModal.sections.specifications")}
                        </Typography>

                        {isDatesFlow && (
                            <Controller
                                name="grade"
                                control={control}
                                rules={{ required: t("inquiryModal.validation.gradeRequired") }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label={t("inquiryModal.fields.grade")}
                                        error={!!errors.grade}
                                        helperText={errors.grade?.message}
                                    >
                                        {availableGrades.map((g) => (
                                            <MenuItem key={g} value={g}>
                                                {g}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        )}

                        {/* Size (dates: real sizes, non-dates: pack option label choices) */}
                        <Controller
                            name="size"
                            control={control}
                            rules={{ required: t("inquiryModal.validation.selectionRequired") }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label={
                                        isDatesFlow
                                            ? t("inquiryModal.fields.size")
                                            : t("inquiryModal.fields.option")
                                    }
                                    disabled={isDatesFlow ? !selectedGrade : false}
                                    error={!!errors.size}
                                    helperText={errors.size?.message}
                                >
                                    {availableSizes.map((opt) => (
                                        <MenuItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        {/* Packaging only for dates */}
                        {isDatesFlow && (
                            <Controller
                                name="packOption"
                                control={control}
                                rules={{ required: t("inquiryModal.validation.packagingRequired") }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label={t("inquiryModal.fields.packagingOption")}
                                        disabled={!selectedSize}
                                        error={!!errors.packOption}
                                        helperText={errors.packOption?.message}
                                    >
                                        {availableDatePackOptions.map((opt) => (
                                            <MenuItem key={opt.documentId} value={opt.documentId}>
                                                {opt.displayLabel || formatDatePackOption(opt)}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        )}

                        <Controller
                            name="quantityKg"
                            control={control}
                            rules={{
                                required: t("inquiryModal.validation.quantityRequired"),
                                min: {
                                    value: 0.1,
                                    message: t("inquiryModal.validation.quantityMin"),
                                },
                            }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    fullWidth
                                    label={t("inquiryModal.fields.quantityKg")}
                                    inputProps={{ min: 0.1, step: 0.1 }}
                                    error={!!errors.quantityKg}
                                    helperText={errors.quantityKg?.message}
                                />
                            )}
                        />

                        <TextField
                            fullWidth
                            label={t("inquiryModal.fields.approxPackages")}
                            value={
                                approxPackages
                                    ? t("inquiryModal.fields.packagesCount", {
                                          value: formatApproxPackageCount(approxPackages),
                                      })
                                    : t("inquiryModal.fields.selectPackaging")
                            }
                            InputProps={{ readOnly: true }}
                            helperText={t("inquiryModal.fields.approximationHelp")}
                        />

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: -1 }}>
                            {t("inquiryModal.sections.yourInformation")}
                        </Typography>

                        <TextField
                            {...register("name", {
                                required: t("inquiryModal.validation.nameRequired"),
                            })}
                            fullWidth
                            label={t("inquiryModal.fields.fullName")}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} useFlexGap gap={2}>
                            <TextField
                                {...register("email", {
                                    required: t("inquiryModal.validation.emailRequired"),
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: t("inquiryModal.validation.invalidEmail"),
                                    },
                                })}
                                fullWidth
                                label={t("inquiryModal.fields.email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                {...register("company")}
                                fullWidth
                                label={t("inquiryModal.fields.company")}
                            />
                        </Stack>

                        <TextField
                            {...register("message")}
                            fullWidth
                            label={t("inquiryModal.fields.additionalMessage")}
                            multiline
                            rows={3}
                        />
                    </Stack>
                </DialogContent>

                <Box sx={{ p: 2, pt: 0 }}>
                    <Stack direction="row" useFlexGap gap={2}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<EmailIcon />}
                            onClick={handleSubmit(onSubmitEmail)}
                            sx={{ fontWeight: 900, py: 1.5 }}
                        >
                            {t("inquiryModal.actions.email")}
                        </Button>

                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            startIcon={<WhatsAppIcon />}
                            onClick={handleSubmit(onSubmitWhatsApp)}
                            sx={{
                                fontWeight: 900,
                                py: 1.5,
                                bgcolor: "#25D366",
                                "&:hover": { bgcolor: "#128C7E" },
                            }}
                        >
                            {t("inquiryModal.actions.whatsapp")}
                        </Button>
                    </Stack>
                </Box>
            </form>
        </Dialog>
    );
};
