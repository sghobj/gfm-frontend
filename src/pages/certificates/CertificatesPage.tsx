import { useMemo, useState } from "react";
import {
    Box,
    Container,
    Grid,
    InputAdornment,
    Stack,
    TextField,
    Typography,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Button,
    Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AssessmentIcon from "@mui/icons-material/Assessment";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useQuery } from "@apollo/client/react";
import type { BlocksContent } from "@strapi/blocks-react-renderer";
import { useTranslation } from "react-i18next";

import { CertificatesDocument, type CertificatesQuery } from "../../gql/graphql.ts";
import { resolveStrapiMediaUrl, toSearchableText } from "../../utils/strapiMedia";
import { Scheme } from "../../components/scheme/Scheme.tsx";
import { SectionSubtitle, SectionTitle } from "../../components/typography/SectionTypography.tsx";
import { BlocksTypography } from "../../components/typography/BlocksTypography.tsx";
import { LoadingState } from "../../components/state/LoadingState";
import { hasNonEmptyText, isContentForLocale } from "../../utils/localizedContent.ts";
import { toStrapiLocale } from "../../apollo/apolloClient.ts";

// ----------------------------
// UI Types (derived from GQL)
// ----------------------------
type GQLCertificate = NonNullable<NonNullable<CertificatesQuery["certificates"]>[number]>;

// ---------- Component ----------
export function CertificatesPage() {
    const { t, i18n } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data, loading, error } = useQuery(CertificatesDocument, {
        variables: { locale },
    });

    const [search, setSearch] = useState("");
    const [selectedDoc, setSelectedDoc] = useState<{ url: string; name: string } | null>(null);

    const handleCloseDoc = () => setSelectedDoc(null);

    const certificates = useMemo(() => {
        if (!data?.certificates) return [];
        return data.certificates.filter(
            (certificate): certificate is GQLCertificate =>
                !!certificate &&
                hasNonEmptyText(certificate.name) &&
                hasNonEmptyText(certificate.logo?.url) &&
                isContentForLocale(certificate.locale, activeLocale),
        );
    }, [data, activeLocale]);

    // Filtering
    const filteredCertificates = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return certificates;

        return certificates.filter((c) => {
            const name = (c.name ?? "").toLowerCase();

            const descText = toSearchableText(c.description).toLowerCase();

            return name.includes(term) || descText.includes(term);
        });
    }, [certificates, search]);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {/* Hero & Filters */}
            <Scheme id={3}>
                <Box
                    sx={{
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        py: { xs: 8, md: 12 },
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Container
                        maxWidth="xl"
                        sx={{
                            maxWidth: "1440px",
                            px: { xs: 2, sm: 4, md: 6 },
                        }}
                    >
                        <Stack spacing={6}>
                            <Stack spacing={2} sx={{ color: "text.primary" }}>
                                <SectionTitle>{t("certificates.hero.title")}</SectionTitle>
                                <SectionSubtitle>{t("certificates.hero.subtitle")}</SectionSubtitle>
                            </Stack>

                            <Stack direction={{ xs: "column", md: "row" }} useFlexGap gap={2}>
                                <TextField
                                    size="small"
                                    placeholder={t("certificates.hero.searchPlaceholder")}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    sx={{
                                        maxWidth: 500,
                                        flex: 1,
                                        "& .MuiOutlinedInput-root": {
                                            bgcolor: "white",
                                            borderRadius: 2,
                                            color: "black",
                                        },
                                    }}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon fontSize="small" />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Stack>
                        </Stack>
                    </Container>
                </Box>
            </Scheme>

            {/* Content */}
            <Container
                maxWidth="xl"
                sx={{
                    maxWidth: "1440px",
                    px: { xs: 2, sm: 4, md: 6 },
                    py: { xs: 8, md: 12 },
                }}
            >
                {loading ? (
                    <LoadingState message={t("certificates.loading")} />
                ) : error ? (
                    <Box sx={{ py: 10, textAlign: "center" }}>
                        <Typography variant="h5" color="error" fontWeight={900}>
                            {t("certificates.errorLoading")}
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            {error.message}
                        </Typography>
                    </Box>
                ) : (
                    <Stack spacing={8}>
                        {filteredCertificates.length === 0 ? (
                            <Box sx={{ py: 10, textAlign: "center" }}>
                                <Typography variant="h6" color="text.secondary">
                                    {t("certificates.empty")}
                                </Typography>
                            </Box>
                        ) : (
                            filteredCertificates.map((cert) => (
                                <Box key={cert.documentId}>
                                    <Grid container spacing={{ xs: 4, lg: 10 }} alignItems="center">
                                        <Grid size={{ xs: 12, lg: 4 }}>
                                            <Box
                                                sx={{
                                                    bgcolor: "white",
                                                    borderRadius: 4,
                                                    p: 4,
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    aspectRatio: "1/1",
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
                                                        borderColor: "primary.main",
                                                    },
                                                }}
                                            >
                                                <Box
                                                    component="img"
                                                    src={resolveStrapiMediaUrl(cert.logo?.url)}
                                                    alt={cert.name}
                                                    sx={{
                                                        maxWidth: "100%",
                                                        maxHeight: "100%",
                                                        objectFit: "contain",
                                                        filter: "grayscale(10%)",
                                                    }}
                                                />
                                            </Box>
                                        </Grid>
                                        <Grid size={{ xs: 12, lg: 8 }}>
                                            <Stack spacing={4}>
                                                <Stack spacing={2}>
                                                    <Typography
                                                        variant="h3"
                                                        fontWeight={900}
                                                        sx={{
                                                            letterSpacing: "-0.02em",
                                                            fontSize: { xs: "2rem", md: "2.75rem" },
                                                            lineHeight: 1.1,
                                                        }}
                                                    >
                                                        {cert.name}
                                                    </Typography>
                                                    {cert.description && (
                                                        <BlocksTypography
                                                            content={
                                                                cert.description as BlocksContent
                                                            }
                                                            paragraphSx={{
                                                                fontSize: "1.1rem",
                                                                lineHeight: 1.6,
                                                                color: "text.secondary",
                                                                width: "100%",
                                                            }}
                                                        />
                                                    )}
                                                </Stack>

                                                <Stack
                                                    direction={{ xs: "column", sm: "row" }}
                                                    useFlexGap
                                                    gap={2}
                                                >
                                                    {cert.certificate?.url && (
                                                        <Button
                                                            variant="contained"
                                                            size="large"
                                                            startIcon={<VisibilityIcon />}
                                                            onClick={() =>
                                                                setSelectedDoc({
                                                                    url: cert.certificate!.url,
                                                                    name: cert.name,
                                                                })
                                                            }
                                                            sx={{
                                                                borderRadius: 2,
                                                                fontWeight: 700,
                                                                py: 1.5,
                                                                px: 3,
                                                            }}
                                                        >
                                                            {t(
                                                                "certificates.actions.viewCertificate",
                                                            )}
                                                        </Button>
                                                    )}
                                                    {cert.audit_report?.url && (
                                                        <Button
                                                            variant="outlined"
                                                            size="large"
                                                            startIcon={<AssessmentIcon />}
                                                            onClick={() =>
                                                                setSelectedDoc({
                                                                    url: cert.audit_report!.url,
                                                                    name: t(
                                                                        "certificates.actions.auditReportFor",
                                                                        { name: cert.name },
                                                                    ),
                                                                })
                                                            }
                                                            sx={{
                                                                borderRadius: 2,
                                                                fontWeight: 700,
                                                                py: 1.5,
                                                                px: 3,
                                                            }}
                                                        >
                                                            {t("certificates.actions.auditReport")}
                                                        </Button>
                                                    )}
                                                    {/* Validation link placeholder - using a generic URL or if a field exists in future */}
                                                    <Button
                                                        variant="text"
                                                        size="large"
                                                        startIcon={<VerifiedIcon />}
                                                        component="a"
                                                        href="#" // To be updated when validation URLs are available
                                                        target="_blank"
                                                        sx={{
                                                            borderRadius: 2,
                                                            fontWeight: 700,
                                                            py: 1.5,
                                                            px: 3,
                                                            color: "text.secondary",
                                                            "&:hover": { color: "primary.main" },
                                                        }}
                                                    >
                                                        {t(
                                                            "certificates.actions.officialValidation",
                                                        )}
                                                    </Button>
                                                </Stack>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </Box>
                            ))
                        )}
                    </Stack>
                )}
            </Container>

            {/* Document Viewer Modal */}
            <Dialog
                open={Boolean(selectedDoc)}
                onClose={handleCloseDoc}
                maxWidth="lg"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 4, height: "90vh" },
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
                    <Typography component="span" variant="h6" fontWeight={800}>
                        {selectedDoc?.name}
                    </Typography>
                    <Stack direction="row" useFlexGap gap={1}>
                        {selectedDoc && (
                            <Tooltip title={t("certificates.actions.download")}>
                                <IconButton
                                    component="a"
                                    href={resolveStrapiMediaUrl(selectedDoc.url)}
                                    download
                                    target="_blank"
                                >
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                        <IconButton onClick={handleCloseDoc}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>
                <DialogContent dividers sx={{ p: 0, bgcolor: "#f8fafc" }}>
                    {selectedDoc?.url ? (
                        selectedDoc.url.toLowerCase().endsWith(".pdf") ? (
                            <iframe
                                title="PDF"
                                src={resolveStrapiMediaUrl(selectedDoc.url)}
                                style={{ width: "100%", height: "calc(100% - 48px)", border: 0 }}
                            />
                        ) : (
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    p: 2,
                                    height: "100%",
                                }}
                            >
                                <Box
                                    component="img"
                                    src={resolveStrapiMediaUrl(selectedDoc.url)}
                                    alt={selectedDoc.name}
                                    sx={{
                                        maxWidth: "100%",
                                        maxHeight: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>
                        )
                    ) : null}
                </DialogContent>
            </Dialog>
        </Box>
    );
}
