import { useState } from "react";
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Tooltip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Scheme } from "../../../components/scheme/Scheme";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia";
import type { CertificatesQuery } from "../../../graphql/gql/graphql";
import { HOME_SECTION_TYPOGRAPHY } from "./homeSectionTypography";

type CertificateType = NonNullable<CertificatesQuery["certificates"]>[number];

type CertificationsProps = {
    certificates: CertificateType[];
};

export const Certifications = ({ certificates }: CertificationsProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation("common");
    const [selectedCert, setSelectedCert] = useState<CertificateType | null>(null);

    const handleClose = () => setSelectedCert(null);

    const sortedCertificates = certificates.filter((cert): cert is NonNullable<CertificateType> =>
        Boolean(cert),
    );
    if (sortedCertificates.length === 0) {
        return null;
    }
    const MAX_HOME_CERTIFICATES = 6;
    const displayedCertificates = sortedCertificates.slice(0, MAX_HOME_CERTIFICATES);

    return (
        <Scheme id={1}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                }}
            >
                {/* Background Gradient similar to Brands/CustomersMap */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        zIndex: 0,
                    }}
                />

                <Container
                    maxWidth="xl"
                    sx={{
                        maxWidth: "1440px",
                        px: { xs: 2, sm: 4, md: 6 },
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    <Grid container spacing={{ xs: 6, lg: 10 }} alignItems="center">
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Stack spacing={3}>
                                <Typography
                                    variant="overline"
                                    sx={HOME_SECTION_TYPOGRAPHY.overline}
                                >
                                    {t("home.certifications.overline")}
                                </Typography>

                                <Typography variant="h2" sx={HOME_SECTION_TYPOGRAPHY.heading}>
                                    {t("home.certifications.title")}
                                </Typography>

                                <Typography variant="body1" sx={HOME_SECTION_TYPOGRAPHY.subtitle}>
                                    {t("home.certifications.subtitle")}
                                </Typography>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    p: { xs: 0, md: 0.5 },
                                }}
                            >
                                <Stack spacing={{ xs: 2, md: 2.5 }}>
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        useFlexGap
                                        gap={{ xs: 2.5, md: 3 }}
                                        sx={{
                                            alignItems: { xs: "flex-start", sm: "center" },
                                            justifyContent: "end",
                                        }}
                                    >
                                        <Button
                                            variant="text"
                                            endIcon={<ArrowOutwardRoundedIcon />}
                                            onClick={() => navigate("/certificates")}
                                            sx={{
                                                px: 0,
                                                minWidth: 0,
                                                fontWeight: 700,
                                                fontSize: "0.78rem",
                                                fontFamily: '"Inter",sans-serif',
                                                textTransform: "uppercase",
                                                color: "primary.main",
                                                letterSpacing: "0.18em",
                                                alignSelf: { xs: "flex-start", sm: "flex-end" },
                                                "&:hover": {
                                                    bgcolor: "transparent",
                                                    textDecoration: "underline",
                                                },
                                            }}
                                        >
                                            {t("home.certifications.moreDetails")}
                                        </Button>
                                    </Stack>

                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "repeat(2, minmax(0, 1fr))",
                                                sm: "repeat(3, minmax(0, 1fr))",
                                            },
                                            gap: { xs: 2, md: 2.5 },
                                            pt: { xs: 0.75, md: 1.25 },
                                        }}
                                    >
                                        {displayedCertificates.map((cert, idx) => {
                                            return (
                                                <Tooltip
                                                    key={cert.documentId ?? idx}
                                                    title={cert.name}
                                                    arrow
                                                >
                                                    <Box
                                                        onClick={() => setSelectedCert(cert)}
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection: "column",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            p: { xs: 1.75, md: 2 },
                                                            minHeight: { xs: 138, md: 168 },
                                                            borderRadius: 2.5,
                                                            cursor: "pointer",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                transform: "translateY(-4px)",
                                                                bgcolor: "rgba(255,255,255,0.7)",
                                                                "& img": {
                                                                    opacity: 1,
                                                                    transform: "scale(1.05)",
                                                                    filter: "grayscale(0%)",
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        <Box
                                                            component="img"
                                                            src={resolveStrapiMediaUrl(
                                                                cert.logo?.url,
                                                            )}
                                                            alt={
                                                                cert.name ??
                                                                t("home.certifications.logoAlt")
                                                            }
                                                            loading="lazy"
                                                            sx={{
                                                                width: "100%",
                                                                maxWidth: 210,
                                                                height: { xs: 74, md: 90 },
                                                                objectFit: "contain",
                                                                filter: "grayscale(18%)",
                                                                opacity: 0.9,
                                                                transition: "all 0.3s ease",
                                                            }}
                                                        />
                                                    </Box>
                                                </Tooltip>
                                            );
                                        })}
                                    </Box>
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Certificate Dialog */}
            <Dialog
                open={Boolean(selectedCert)}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                sx={{ borderRadius: 4, overflow: "hidden", backgroundColor: "#fff" }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        backgroundColor: "#fff",
                    }}
                >
                    <Typography variant="h6" fontWeight={800}>
                        {selectedCert?.name}
                    </Typography>
                    <Stack direction="row" useFlexGap gap={1}>
                        {selectedCert?.certificate?.url && (
                            <Tooltip title={t("home.certifications.download")}>
                                <IconButton
                                    component="a"
                                    href={resolveStrapiMediaUrl(selectedCert.certificate.url)}
                                    download
                                    target="_blank"
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 2, bgcolor: "#f8fafc", minHeight: 400 }}>
                    {selectedCert?.certificate?.url ? (
                        selectedCert.certificate.url.toLowerCase().endsWith(".pdf") ? (
                            <Box
                                component="iframe"
                                src={resolveStrapiMediaUrl(selectedCert.certificate.url)}
                                sx={{ width: "100%", height: "60vh", border: "none" }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                    maxHeight: "70vh",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={resolveStrapiMediaUrl(selectedCert.certificate.url)}
                                    alt={selectedCert.name}
                                    sx={{ maxWidth: "100%", height: "auto", objectFit: "contain" }}
                                />
                            </Box>
                        )
                    ) : (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                            <Typography color="text.secondary">
                                {t("home.certifications.noDocument")}
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <Box
                    sx={{
                        p: 2,
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        backgroundColor: "#fff",
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                        {t("home.certifications.close")}
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<OpenInNewIcon />}
                        onClick={() => {
                            handleClose();
                            navigate("/certificates");
                        }}
                        sx={{
                            borderRadius: 2,
                            fontWeight: 700,
                            fontFamily: (theme) => theme.typography.h2.fontFamily,
                            textTransform: "none",
                        }}
                    >
                        {t("home.certifications.moreDetails")}
                    </Button>
                </Box>
            </Dialog>
        </Scheme>
    );
};
