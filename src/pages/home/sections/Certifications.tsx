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
    const [selectedCert, setSelectedCert] = useState<CertificateType | null>(null);

    if (!certificates || certificates.length === 0) return null;

    const handleClose = () => setSelectedCert(null);

    return (
        <Scheme id={1}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {/* Background Gradient similar to Brands/CustomersMap */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(800px 400px at 10% 80%, rgba(99,102,241,0.04), transparent 70%)," +
                            "radial-gradient(600px 400px at 90% 20%, rgba(16,185,129,0.04), transparent 70%)," +
                            "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
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
                                    CERTIFICATIONS
                                </Typography>

                                <Typography
                                    variant="h2"
                                    sx={{
                                        fontWeight: 900,
                                        lineHeight: 1.05,
                                        letterSpacing: -0.5,
                                    }}
                                >
                                    Commitment to Quality
                                </Typography>

                                <SectionSubtitle
                                    sx={{
                                        fontWeight: 400,
                                        fontSize: "1.1rem",
                                        lineHeight: 1.6,
                                        color: "text.secondary",
                                    }}
                                >
                                    We uphold the highest international standards in food safety and
                                    organic farming, backed by globally recognized certifications.
                                </SectionSubtitle>
                            </Stack>
                        </Grid>

                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "repeat(2, 1fr)",
                                        sm: "repeat(3, 1fr)",
                                    },
                                    gap: { xs: 4, md: 6 },
                                    alignItems: "center",
                                }}
                            >
                                {certificates.map((cert, idx) => (
                                    <Box
                                        key={cert?.documentId ?? idx}
                                        onClick={() => setSelectedCert(cert)}
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            cursor: "pointer",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                "& img": {
                                                    filter: "grayscale(0%) opacity(1)",
                                                },
                                                "& .cert-name": {
                                                    color: "primary.main",
                                                },
                                            },
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={resolveStrapiMediaUrl(cert?.logo?.url)}
                                            alt={cert?.name ?? "Certificate"}
                                            sx={{
                                                maxHeight: { xs: 60, md: 80 },
                                                width: "100%",
                                                maxWidth: 140,
                                                objectFit: "contain",
                                                filter: "grayscale(100%) opacity(0.6)",
                                                transition: "all 0.3s ease",
                                                mb: 1.5,
                                            }}
                                        />
                                        <Typography
                                            className="cert-name"
                                            variant="caption"
                                            sx={{
                                                fontWeight: 700,
                                                textAlign: "center",
                                                color: "text.secondary",
                                                transition: "color 0.3s ease",
                                                textTransform: "uppercase",
                                                letterSpacing: 1,
                                            }}
                                        >
                                            {cert?.name}
                                        </Typography>
                                    </Box>
                                ))}
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
                PaperProps={{
                    sx: { borderRadius: 4, overflow: "hidden" },
                }}
            >
                <DialogTitle
                    sx={{
                        m: 0,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="h6" fontWeight={800}>
                        {selectedCert?.name}
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        {selectedCert?.certificate?.url && (
                            <Tooltip title="Download">
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
                <DialogContent dividers sx={{ p: 0, bgcolor: "#f8fafc", minHeight: 400 }}>
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
                                No document available for this certification.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={handleClose}
                        sx={{ borderRadius: 2, fontWeight: 700 }}
                    >
                        Close
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
                        More Details
                    </Button>
                </Box>
            </Dialog>
        </Scheme>
    );
};
