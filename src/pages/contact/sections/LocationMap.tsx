import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Link as MuiLink,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { type ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useContactLinks } from "../../../providers/ContactLinksProvider";
import { buildSafeMailtoHref } from "../../../utils/contactLinks";

function buildPhoneHref(rawPhone: string): string | null {
    const trimmed = rawPhone.trim();
    if (!trimmed) return null;

    const digits = trimmed.replace(/\D+/g, "");
    if (!digits) return null;

    return `tel:${trimmed.startsWith("+") ? `+${digits}` : digits}`;
}

function buildPhoneHref(rawPhone: string): string | null {
    const trimmed = rawPhone.trim();
    if (!trimmed) return null;

    const digits = trimmed.replace(/\D+/g, "");
    if (!digits) return null;

    return `tel:${trimmed.startsWith("+") ? `+${digits}` : digits}`;
}

const InfoRow = ({
    icon,
    label,
    value,
    infoLink,
}: {
    icon: ReactNode;
    label: string;
    value: string;
    infoLink?: string | null;
}) => {
    const shouldOpenInNewTab = Boolean(infoLink && /^https?:\/\//i.test(infoLink));
    return (
        <Stack direction="row" useFlexGap gap={1.5} alignItems="flex-start">
            <Box
                sx={{
                    width: 22,
                    display: "flex",
                    justifyContent: "center",
                    mt: "2px",
                    color: "text.primary",
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.1 }}>
                    {label}
                </Typography>
                {infoLink ? (
                    <MuiLink
                        href={infoLink}
                        underline="hover"
                        color="inherit"
                        target={shouldOpenInNewTab ? "_blank" : undefined}
                        rel={shouldOpenInNewTab ? "noopener noreferrer" : undefined}
                        sx={{ mt: 0.4, display: "inline-block", color: "text.secondary" }}
                    >
                        {value}
                    </MuiLink>
                ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                        {value}
                    </Typography>
                )}
            </Box>
        </Stack>
    );
};

export const LocationMap = () => {
    const { t } = useTranslation("common");
    const [isMapLoading, setIsMapLoading] = useState(true);
    const { infoEmail, whatsappNumber, whatsappLink } = useContactLinks();

    const phoneValue = "+962 (6) 465-0000";
    const emailValue = infoEmail ?? "hello@organicjordanian.com";
    const whatsappValue = whatsappNumber ? `+${whatsappNumber}` : "+962 77 000000";

    return (
        <Box component="section">
            <Grid container spacing={4}>
                <Grid size={{ lg: 4, md: 6, xs: 12 }} alignItems="center" alignContent="center">
                    <Card
                        sx={{
                            borderRadius: 3,
                            background: "white",
                            boxShadow: "none",
                            margin: "auto 0",
                        }}
                    >
                        <CardHeader
                            avatar={
                                <img
                                    src={
                                        "https://res.cloudinary.com/ds8bdxtzs/image/upload/v1772815392/prod-gfm/large_gfmco_a364972fe8.jpg"
                                    }
                                    width={100}
                                    alt={"logo"}
                                />
                            }
                            title={
                                <Typography variant={"h5"}>
                                    {t("contactPage.location.companyName")}
                                </Typography>
                            }
                        />
                        <Divider />
                        <CardContent
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                mt: 1,
                            }}
                        >
                            <Stack spacing={2}>
                                <InfoRow
                                    icon={<EmailIcon fontSize="small" />}
                                    label={t("contactPage.location.emailLabel")}
                                    value={emailValue}
                                    infoLink={buildSafeMailtoHref(emailValue)}
                                />
                                <InfoRow
                                    icon={<PhoneIcon fontSize="small" />}
                                    label={t("contactPage.location.phoneLabel")}
                                    value={phoneValue}
                                    infoLink={buildPhoneHref(phoneValue)}
                                />
                                <InfoRow
                                    icon={<WhatsAppIcon fontSize={"small"} />}
                                    label={t("inquiryModal.actions.whatsapp")}
                                    value={whatsappValue}
                                    infoLink={whatsappLink}
                                />
                                {whatsappNumber && (
                                    <InfoRow
                                        icon={<WhatsAppIcon fontSize={"small"} />}
                                        label={t("inquiryModal.actions.whatsapp")}
                                        value={whatsappNumber}
                                        infoLink={whatsappLink}
                                    />
                                )}
                                <InfoRow
                                    icon={<LocationOnIcon fontSize="small" />}
                                    label={t("contactPage.location.officeLabel")}
                                    value={t("contactPage.location.officeValue")}
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ lg: 8, md: 6, xs: 12 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            position: "relative",
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                        }}
                    >
                        {isMapLoading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    inset: 0,
                                    zIndex: 1,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    bgcolor: "rgba(255,255,255,0.84)",
                                    backdropFilter: "blur(1px)",
                                }}
                            >
                                <CircularProgress size={34} thickness={4} color="primary" />
                            </Box>
                        )}
                        <Box
                            component="iframe"
                            src={mapSrc}
                            height={{ xs: 500, md: "100%" }}
                            minHeight={{ md: 400 }}
                            width={"100%"}
                            loading="lazy"
                            title={t("contactPage.location.companyName")}
                            referrerPolicy="no-referrer-when-downgrade"
                            sx={{ border: 0, display: "block" }}
                            onLoad={() => setIsMapLoading(false)}
                            onError={() => setIsMapLoading(false)}
                            allowFullScreen
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
