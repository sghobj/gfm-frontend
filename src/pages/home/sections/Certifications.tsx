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
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Scheme } from "../../../components/scheme/Scheme";
import { SectionSubtitle } from "../../../components/typography/SectionTypography";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia";
import type { CertificatesQuery } from "../../../gql/graphql";

type CertificateType = NonNullable<CertificatesQuery["certificates"]>[number];

type CertificationsProps = {
    certificates: CertificateType[];
};

export const Certifications = ({ certificates }: CertificationsProps) => {
    const navigate = useNavigate();
    const { t } = useTranslation("common");
    const [selectedCert, setSelectedCert] = useState<CertificateType | null>(null);

    const handleClose = () => setSelectedCert(null);

    const sortedCertificates = [...certificates];

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
                                    color="primary"
                                    fontWeight={800}
                                    sx={{ letterSpacing: 3 }}
                                >
                                    {t("home.certifications.overline")}
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.05,
                                        letterSpacing: -0.5,
                                    }}
                                >
                                    {t("home.certifications.title")}
                                </Typography>

                                <SectionSubtitle
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "1.1rem",
                                        lineHeight: 1.6,
                                        color: "text.secondary",
                                    }}
                                >
                                    {t("home.certifications.subtitle")}
                                </SectionSubtitle>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    gap: 6,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: { xs: 3, md: 4 },
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    {sortedCertificates.map((cert, idx) => (
                                        <Tooltip
                                            key={cert?.documentId ?? idx}
                                            title={cert?.name}
                                            arrow
                                        >
                                            <Box
                                                onClick={() => setSelectedCert(cert)}
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    minWidth: { xs: 100, md: 130 },
                                                    transition: "all 0.3s ease",
                                                    cursor: "pointer",
                                                    "&:hover": {
                                                        transform: "translateY(-4px)",
                                                        "& img": {
                                                            opacity: 1,
                                                            filter: "grayscale(0%) drop-shadow(0 10px 15px rgba(0,0,0,0.05))",
                                                        },
                                                    },
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={resolveStrapiMediaUrl(cert?.logo?.url)}
                                                    alt={
                                                        cert?.name ??
                                                        t("home.certifications.logoAlt")
                                                    }
                                                    loading="lazy"
                                                    sx={{
                                                        // maxHeight: { xs: 70, md: 90 },
                                                        width: "100%",
                                                        maxWidth: 160,
                                                        objectFit: "contain",
                                                        opacity: 0.6,
                                                        // filter: "grayscale(100%)",
                                                        transition: "all 0.4s ease",
                                                        borderRadius: 2,
                                                    }}
                                                />
                                            </Box>
                                        </Tooltip>
                                    ))}
                                </Box>
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
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                        {t("home.certifications.moreDetails")}
                    </Button>
                </Box>
            </Dialog>
        </Scheme>
    );
};
