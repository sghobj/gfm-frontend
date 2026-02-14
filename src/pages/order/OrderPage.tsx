import { useMemo, useEffect } from "react";
import {
    Container,
    Typography,
    Box,
    Stack,
    TextField,
    MenuItem,
    Button,
    Divider,
    Paper,
    Grid,
    CircularProgress,
    Alert,
} from "@mui/material";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";
import { useForm, Controller } from "react-hook-form";
import { GetOfferingDocument } from "../../gql/graphql";
import { Scheme } from "../../components/scheme/Scheme";
import { StrapiImage } from "../../components/image/StrapiImage";

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

export const OrderPage = () => {
    const { id } = useParams<{ id: string }>();
    const [searchParams] = useSearchParams();
    const isSecret = searchParams.get("secret") === "true"; // Simple dummy "private" check

    const { data, loading, error } = useQuery(GetOfferingDocument, {
        variables: { id: id || "" },
        skip: !id,
    });

    const offering = data?.offering;
    const specs = offering?.dateSpecifications || [];

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors, isSubmitting, isSubmitSuccessful },
        register,
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

    useEffect(() => {
        if (availableGrades.length === 1 && !selectedGrade) {
            setValue("grade", availableGrades[0] as string);
        }
    }, [availableGrades, setValue, selectedGrade]);

    useEffect(() => {
        if (availableSizes.length === 1 && !selectedSize) {
            setValue("size", availableSizes[0] as string);
        }
    }, [availableSizes, setValue, selectedSize]);

    const onSubmit = async (data: OrderFormValues) => {
        console.log("Submitting Official Order:", data);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // After DB save, also send email to sales
        const selectedPack = availablePackOptions.find(o => o?.documentId === data.packOption);
        const subject = `OFFICIAL ORDER: ${offering?.product?.name} - ${offering?.brand?.name}`;
        const body = `Official Order Submitted:
Product: ${offering?.product?.name}
Brand: ${offering?.brand?.name}
Grade: ${data.grade}
Size: ${data.size}
Packaging: ${selectedPack?.displayLabel || data.packOption}
Quantity: ${data.quantity}

Customer Details:
Name: ${data.name}
Company: ${data.company}
Email: ${data.email}

Message:
${data.message}`;

        console.log("Triggering sales email notification...", { subject, body });
        // In a real app, the backend would send this email.
    };

    if (!isSecret) {
        return (
            <Container sx={{ py: 20, textAlign: "center" }}>
                <Typography variant="h4" fontWeight={900}>Access Denied</Typography>
                <Typography color="text.secondary">This order form is private. Please contact us to get a valid link.</Typography>
            </Container>
        );
    }

    if (loading) return <Box sx={{ py: 20, textAlign: "center" }}><CircularProgress /></Box>;
    if (error || !offering) return <Box sx={{ py: 20, textAlign: "center" }}><Typography color="error">Error loading product</Typography></Box>;

    return (
        <Scheme id={1}>
            <Container maxWidth="md" sx={{ py: { xs: 8, md: 12 } }}>
                <Paper elevation={4} sx={{ p: { xs: 3, md: 6 }, borderRadius: 4 }}>
                    <Stack spacing={4}>
                        <Box textAlign="center">
                            <Typography variant="overline" color="primary" fontWeight={800} sx={{ letterSpacing: 2 }}>
                                Official Order Form
                            </Typography>
                            <Typography variant="h3" fontWeight={900}>
                                {offering.product?.name}
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                                by {offering.brand?.name}
                            </Typography>
                        </Box>

                        <Divider />

                        {isSubmitSuccessful ? (
                            <Alert severity="success" sx={{ py: 4, borderRadius: 2 }}>
                                <Typography variant="h6" fontWeight={800}>Order Submitted Successfully!</Typography>
                                <Typography>Your order has been saved in our system and sent to the sales department. We will contact you shortly for confirmation.</Typography>
                            </Alert>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={4}>
                                    <Grid container spacing={3}>
                                        <Grid size={{ xs: 12, md: 4 }}>
                                            {offering.product?.image && (
                                                <StrapiImage
                                                    media={offering.product.image}
                                                    sx={{ width: "100%", borderRadius: 2, aspectRatio: "1/1", objectFit: "cover" }}
                                                />
                                            )}
                                        </Grid>
                                        <Grid size={{ xs: 12, md: 8 }}>
                                            <Stack spacing={3}>
                                                <Typography variant="subtitle1" fontWeight={800} sx={{ mb: -1 }}>Specifications</Typography>
                                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                                    <Controller
                                                        name="grade"
                                                        control={control}
                                                        rules={{ required: "Grade is required" }}
                                                        render={({ field }) => (
                                                            <TextField {...field} select fullWidth label="Grade" error={!!errors.grade} helperText={errors.grade?.message}>
                                                                {availableGrades.map((g) => <MenuItem key={g} value={g as string}>{g}</MenuItem>)}
                                                            </TextField>
                                                        )}
                                                    />
                                                    <Controller
                                                        name="size"
                                                        control={control}
                                                        rules={{ required: "Size is required" }}
                                                        render={({ field }) => (
                                                            <TextField {...field} select fullWidth label="Size" disabled={!selectedGrade} error={!!errors.size} helperText={errors.size?.message}>
                                                                {availableSizes.map((s) => <MenuItem key={s} value={s as string}>{s}</MenuItem>)}
                                                            </TextField>
                                                        )}
                                                    />
                                                </Stack>
                                                <Controller
                                                    name="packOption"
                                                    control={control}
                                                    rules={{ required: "Packaging is required" }}
                                                    render={({ field }) => (
                                                        <TextField {...field} select fullWidth label="Packaging Option" disabled={!selectedSize} error={!!errors.packOption} helperText={errors.packOption?.message}>
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
                                                        <TextField {...field} type="number" fullWidth label="Order Quantity" error={!!errors.quantity} helperText={errors.quantity?.message} />
                                                    )}
                                                />
                                            </Stack>
                                        </Grid>
                                    </Grid>

                                    <Divider />

                                    <Typography variant="subtitle1" fontWeight={800} sx={{ mb: -1 }}>Customer Information</Typography>
                                    <TextField {...register("name", { required: "Name is required" })} fullWidth label="Full Name" error={!!errors.name} helperText={errors.name?.message} />
                                    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                                        <TextField {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })} fullWidth label="Email Address" error={!!errors.email} helperText={errors.email?.message} />
                                        <TextField {...register("company")} fullWidth label="Company Name" />
                                    </Stack>
                                    <TextField {...register("message")} fullWidth label="Notes / Special Instructions" multiline rows={4} />

                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        disabled={isSubmitting}
                                        sx={{ py: 2, fontWeight: 900, fontSize: "1.2rem", borderRadius: 2 }}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit Official Order"}
                                    </Button>
                                </Stack>
                            </form>
                        )}
                    </Stack>
                </Paper>
            </Container>
        </Scheme>
    );
};
