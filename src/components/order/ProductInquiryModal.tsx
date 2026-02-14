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
import { useForm, Controller } from "react-hook-form";
import type { GetOfferingQuery } from "../../gql/graphql";
import { StrapiImage } from "../image/StrapiImage";

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
    quantity: number;
    name: string;
    email: string;
    company: string;
    message: string;
}

export const ProductInquiryModal: React.FC<ProductOrderModalProps> = ({ open, onClose, offering }) => {
    const specs = offering.dateSpecifications || [];

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<OrderFormValues>({
        defaultValues: {
            grade: "",
            size: "",
            packOption: "",
            quantity: 1,
            name: "",
            email: "",
            company: "",
            message: "",
        },
    });

    const selectedGrade = watch("grade");
    const selectedSize = watch("size");

    // Memoized options based on selections
    const availableGrades = useMemo(() => {
        return Array.from(new Set(specs.map((s) => s?.grade).filter(Boolean)));
    }, [specs]);

    const availableSizes = useMemo(() => {
        if (!selectedGrade) return [];
        return Array.from(
            new Set(
                specs
                    .filter((s) => s?.grade === selectedGrade)
                    .map((s) => s?.sizes)
                    .filter((s): s is NonNullable<typeof s> => !!s),
            ),
        );
    }, [specs, selectedGrade]);

    const availablePackOptions = useMemo(() => {
        if (!selectedGrade || !selectedSize) return [];
        const currentSpec = specs.find((s) => s?.grade === selectedGrade && s?.sizes === selectedSize);
        return currentSpec?.pack_options?.filter((o): o is NonNullable<typeof o> => !!o) || [];
    }, [specs, selectedGrade, selectedSize]);

    // Reset dependent fields
    useEffect(() => {
        if (availableGrades.length === 1 && !selectedGrade) {
            setValue("grade", availableGrades[0] as string);
        }
    }, [availableGrades, setValue, selectedGrade]);

    useEffect(() => {
        if (availableSizes.length === 1 && !selectedSize) {
            setValue("size", availableSizes[0] as string);
        } else if (!availableSizes.includes(selectedSize as any)) {
            setValue("size", "");
        }
    }, [availableSizes, setValue, selectedSize]);

    useEffect(() => {
        if (availablePackOptions.length === 1) {
            setValue("packOption", availablePackOptions[0].documentId);
        } else if (!availablePackOptions.some((o) => o?.documentId === watch("packOption"))) {
            setValue("packOption", "");
        }
    }, [availablePackOptions, setValue, watch("packOption")]);

    const onSubmitEmail = (data: OrderFormValues) => {
        const selectedPack = availablePackOptions.find(o => o?.documentId === data.packOption);
        
        const subject = `Inquiry: ${offering.product?.name} - ${offering.brand?.name}`;
        const body = `Hello, I am interested in:
Product: ${offering.product?.name}
Brand: ${offering.brand?.name}
Grade: ${data.grade}
Size: ${data.size}
Packaging: ${selectedPack?.displayLabel || data.packOption}
Quantity: ${data.quantity}

My Details:
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}`;

        window.location.href = `mailto:sales@gfm.jo?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        onClose();
    };

    const onSubmitWhatsApp = (data: OrderFormValues) => {
        const selectedPack = availablePackOptions.find(o => o?.documentId === data.packOption);

        const text = `Hello, I am interested in:
*Product:* ${offering.product?.name}
*Brand:* ${offering.brand?.name}
*Grade:* ${data.grade}
*Size:* ${data.size}
*Packaging:* ${selectedPack?.displayLabel || data.packOption}
*Quantity:* ${data.quantity}

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
                Product Inquiry
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
                        {/* Product Summary */}
                        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                            {offering.product?.image && (
                                <StrapiImage
                                    media={offering.product.image}
                                    sx={{ width: 60, height: 60, borderRadius: 1, objectFit: "cover" }}
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
                            Specifications
                        </Typography>

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <Controller
                                name="grade"
                                control={control}
                                rules={{ required: "Grade is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Grade"
                                        error={!!errors.grade}
                                        helperText={errors.grade?.message}
                                    >
                                        {availableGrades.map((g) => (
                                            <MenuItem key={g} value={g as string}>
                                                {g}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />

                            <Controller
                                name="size"
                                control={control}
                                rules={{ required: "Size is required" }}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        select
                                        fullWidth
                                        label="Size"
                                        disabled={!selectedGrade}
                                        error={!!errors.size}
                                        helperText={errors.size?.message}
                                    >
                                        {availableSizes.map((s) => (
                                            <MenuItem key={s} value={s as string}>
                                                {s}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                )}
                            />
                        </Stack>

                        <Controller
                            name="packOption"
                            control={control}
                            rules={{ required: "Packaging is required" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    select
                                    fullWidth
                                    label="Packaging Option"
                                    disabled={!selectedSize}
                                    error={!!errors.packOption}
                                    helperText={errors.packOption?.message}
                                >
                                    {availablePackOptions.map((opt) => (
                                        <MenuItem key={opt.documentId} value={opt.documentId}>
                                            {opt.displayLabel || `${opt.amount} ${opt.unit}`}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )}
                        />

                        <Controller
                            name="quantity"
                            control={control}
                            rules={{ required: "Quantity is required", min: { value: 1, message: "Min quantity is 1" } }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="number"
                                    fullWidth
                                    label="Desired Quantity"
                                    error={!!errors.quantity}
                                    helperText={errors.quantity?.message}
                                />
                            )}
                        />

                        <Divider sx={{ my: 1 }} />

                        <Typography variant="subtitle1" fontWeight={800} sx={{ mb: -1 }}>
                            Your Information
                        </Typography>

                        <TextField
                            {...control.register("name", { required: "Name is required" })}
                            fullWidth
                            label="Full Name"
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />

                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                            <TextField
                                {...control.register("email", { 
                                    required: "Email is required",
                                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                })}
                                fullWidth
                                label="Email Address"
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                {...control.register("company")}
                                fullWidth
                                label="Company (Optional)"
                            />
                        </Stack>

                        <TextField
                            {...control.register("message")}
                            fullWidth
                            label="Additional Message"
                            multiline
                            rows={3}
                        />
                    </Stack>
                </DialogContent>
            <Box sx={{ p: 2, pt: 0 }}>
                <Stack direction="row" spacing={2}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        startIcon={<EmailIcon />}
                        onClick={handleSubmit(onSubmitEmail)}
                        sx={{ fontWeight: 900, py: 1.5 }}
                    >
                        Inquire via Email
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
                        WhatsApp
                    </Button>
                </Stack>
            </Box>
            </form>
        </Dialog>
    );
};
