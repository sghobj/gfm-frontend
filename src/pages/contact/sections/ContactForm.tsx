import {
    Alert,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { COLORS } from "../../../theme/colors.ts";

type BusinessType = "retail" | "horeca" | "distributor" | "corporate" | "online" | "other";
type Volume = "lt200" | "200_500" | "500_1000" | "1000plus" | "";

type FormValues = {
    name: string;
    company: string;
    role?: string;
    email: string;
    phone: string;
    businessType: BusinessType | "";
    city: string;
    products: string[]; // keys
    volume: Volume;
    message: string;
    catalog: boolean;
    consent: boolean;
};

const PRODUCT_KEYS = [
    "snacks",
    "spreads",
    "granola",
    "honey",
    "oils",
    "pickles",
    "spices",
    "other",
] as const;

export const ContactForm = () => {
    const { t, i18n } = useTranslation("common");
    const isRtl = i18n.language?.startsWith("ar");

    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            company: "",
            role: "",
            email: "",
            phone: "",
            businessType: "",
            city: "",
            products: [],
            volume: "",
            message: "",
            catalog: false,
            consent: false,
        },
    });

    const [serverState, setServerState] = useState<"idle" | "success" | "error">("idle");

    const onSubmit = async (data: FormValues) => {
        setServerState("idle");

        console.log(data);

        // TODO: replace with your API endpoint
        try {
            // Example:
            // await fetch("/api/b2b-inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
            await new Promise((r) => setTimeout(r, 300)); // demo
            setServerState("success");
            reset();
        } catch {
            setServerState("error");
        }
    };

    return (
        <Box
            component="section"
            sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    // 🔑 Never exceed viewport width on mobile
                    width: { xs: "calc(100vw - 32px)", sm: "100%" }, // 32px = 16px*2 padding
                    maxWidth: { xs: "calc(100vw - 32px)", sm: "100%" },
                    boxSizing: "border-box",
                    mx: "auto",
                    background: "transparent",
                }}
            >
                <Box dir={isRtl ? "rtl" : "ltr"} sx={{ mx: "auto" }}>
                    <Typography
                        color={COLORS.primary.darker}
                        variant="h4"
                        fontWeight={800}
                        gutterBottom
                    >
                        {t("contact.hero.title")}
                    </Typography>
                    <Typography color={"black"} sx={{ mb: 3, opacity: 0.9 }}>
                        {t("contact.hero.subtitle")}
                    </Typography>

                    {serverState === "success" && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            {t("contact.form.success")}
                        </Alert>
                    )}
                    {serverState === "error" && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {t("contact.form.error")}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <Grid container spacing={2}>
                            {/* Name */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("contact.form.name")}
                                            placeholder={t("contact.form.namePh")}
                                            sx={{ bg: "white" }}
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors.name ? "Required" : " "}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Company */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="company"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("contact.form.company")}
                                            placeholder={t("contact.form.companyPh")}
                                            fullWidth
                                            error={!!errors.company}
                                            helperText={errors.company ? "Required" : " "}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Email */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="email"
                                    control={control}
                                    rules={{
                                        required: true,
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email",
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("contact.form.email")}
                                            placeholder={t("contact.form.emailPh")}
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={
                                                errors.email
                                                    ? (errors.email.message ?? "Required")
                                                    : " "
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Phone */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("contact.form.phone")}
                                            placeholder={t("contact.form.phonePh")}
                                            fullWidth
                                            error={!!errors.phone}
                                            helperText={errors.phone ? "Required" : " "}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Products (multi-select) */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="products"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel>{t("contact.form.products")}</InputLabel>
                                            <Select
                                                {...field}
                                                label={t("contact.form.products")}
                                                multiple
                                                renderValue={(selected) =>
                                                    (selected as string[])
                                                        .map((k) =>
                                                            t(`contact.options.products.${k}`),
                                                        )
                                                        .join(isRtl ? "، " : ", ")
                                                }
                                            >
                                                {PRODUCT_KEYS.map((k) => (
                                                    <MenuItem key={k} value={k}>
                                                        {t(`contact.options.products.${k}`)}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            <Typography
                                                variant="caption"
                                                sx={{ minHeight: 20, px: 1, opacity: 0.7 }}
                                            >
                                                {" "}
                                            </Typography>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            {/* Volume */}
                            <Grid size={{ sm: 12, md: 6, lg: 4 }}>
                                <Controller
                                    name="volume"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth>
                                            <InputLabel>{t("contact.form.volume")}</InputLabel>
                                            <Select {...field} label={t("contact.form.volume")}>
                                                <MenuItem value="">{isRtl ? "—" : "—"}</MenuItem>
                                                <MenuItem value="lt200">
                                                    {t("contact.options.volumes.lt200")}
                                                </MenuItem>
                                                <MenuItem value="200_500">
                                                    {t("contact.options.volumes.200_500")}
                                                </MenuItem>
                                                <MenuItem value="500_1000">
                                                    {t("contact.options.volumes.500_1000")}
                                                </MenuItem>
                                                <MenuItem value="1000plus">
                                                    {t("contact.options.volumes.1000plus")}
                                                </MenuItem>
                                            </Select>
                                            <Typography
                                                variant="caption"
                                                sx={{ minHeight: 20, px: 1, opacity: 0.7 }}
                                            >
                                                {" "}
                                            </Typography>
                                        </FormControl>
                                    )}
                                />
                            </Grid>

                            {/* Message */}
                            <Grid size={{ sm: 12 }}>
                                <Controller
                                    name="message"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t("contact.form.message")}
                                            placeholder={t("contact.form.messagePh")}
                                            fullWidth
                                            multiline
                                            minRows={4}
                                            error={!!errors.message}
                                            helperText={errors.message ? "Required" : " "}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Catalog checkbox */}
                            <Grid size={{ sm: 12 }} color={"black"}>
                                <Controller
                                    name="catalog"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={field.value}
                                                    onChange={(e) =>
                                                        field.onChange(e.target.checked)
                                                    }
                                                />
                                            }
                                            label={t("contact.form.catalog")}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Consent (required) */}
                            <Grid size={{ sm: 12 }} color={"black"}>
                                <Controller
                                    name="consent"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field }) => (
                                        <>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={field.value}
                                                        onChange={(e) =>
                                                            field.onChange(e.target.checked)
                                                        }
                                                    />
                                                }
                                                label={t("contact.form.consent")}
                                            />
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    display: "block",
                                                    minHeight: 18,
                                                    color: errors.consent
                                                        ? "error.main"
                                                        : "transparent",
                                                    px: 1,
                                                }}
                                            >
                                                {errors.consent ? "Required" : "."}
                                            </Typography>
                                        </>
                                    )}
                                />
                            </Grid>

                            {/* Submit */}
                            <Grid size={{ sm: 12 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isSubmitting}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 700,
                                        bg: COLORS.primary.darkest,
                                        color: "white",
                                    }}
                                >
                                    {t("contact.form.submit")}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};
