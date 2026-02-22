import { Box, Grid, Stack, Typography, Link as MuiLink, Divider, IconButton } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useQuery } from "@apollo/client/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Scheme } from "../scheme/Scheme";
import { FooterDocument } from "../../gql/graphql";
import { toStrapiLocale } from "../../apollo/apolloClient";
import {
    hasAnyLocalizedContent,
    hasNonEmptyText,
    isContentForLocale,
} from "../../utils/localizedContent";

type FooterLink = {
    label: string;
    href: string;
};

type FooterFallbackContent = {
    brandName: string;
    brandDescription: string;
    address: string;
    email: string;
    quickLinks: FooterLink[];
    legalLinks: FooterLink[];
    copyrightText: string;
    unavailableNote: string;
};

const buildFallbackFooter = (
    translate: (key: string, options?: Record<string, unknown>) => string,
    year: number,
): FooterFallbackContent => {
    const brandName = translate("footer.fallback.brandName");

    return {
        brandName,
        brandDescription: translate("footer.fallback.brandDescription"),
        address: translate("footer.fallback.address"),
        email: translate("footer.fallback.email"),
        quickLinks: [
            { label: translate("footer.fallback.quickLinks.home"), href: "/" },
            { label: translate("footer.fallback.quickLinks.products"), href: "/products" },
            { label: translate("footer.fallback.quickLinks.contact"), href: "/contact-us" },
        ],
        legalLinks: [
            { label: translate("footer.fallback.legalLinks.privacy"), href: "/privacy" },
            { label: translate("footer.fallback.legalLinks.terms"), href: "/terms" },
        ],
        copyrightText: translate("footer.fallback.copyright", {
            year,
            brandName,
        }),
        unavailableNote: translate("footer.fallback.unavailableNote"),
    };
};

export function Footer() {
    const { t, i18n } = useTranslation("common");
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data, loading } = useQuery(FooterDocument, {
        variables: { locale },
        context: { skipAuth: true },
    });
    const year = new Date().getFullYear();

    const footer =
        data?.footer && isContentForLocale(data.footer.locale, activeLocale) ? data.footer : null;
    const quickLinks: FooterLink[] = useMemo(() => {
        return (footer?.quickLinks ?? []).flatMap((link) => {
            if (!link || !hasNonEmptyText(link.label) || !hasNonEmptyText(link.href)) {
                return [];
            }
            return [{ label: link.label, href: link.href }];
        });
    }, [footer?.quickLinks]);
    const legalLinks: FooterLink[] = useMemo(() => {
        return (footer?.legalLinks ?? []).flatMap((link) => {
            if (!link || !hasNonEmptyText(link.label) || !hasNonEmptyText(link.href)) {
                return [];
            }
            return [{ label: link.label, href: link.href }];
        });
    }, [footer?.legalLinks]);

    const brandName = footer?.brandName ?? "";
    const brandDescription = footer?.brandDescription ?? "";
    const address = footer?.address ?? "";
    const email = footer?.email ?? "";
    const copyrightText = footer?.copyrightText ?? "";

    const showBrandSection = hasAnyLocalizedContent(brandName, brandDescription);
    const showQuickLinksSection = quickLinks.length > 0;
    const showContactSection = hasAnyLocalizedContent(address, email);
    const showBottomSection = hasNonEmptyText(copyrightText) || legalLinks.length > 0;
    const hasDynamicFooterContent =
        showBrandSection || showQuickLinksSection || showContactSection || showBottomSection;

    const fallbackFooter = useMemo(() => buildFallbackFooter(t, year), [t, year]);
    const shouldUseFallback = !loading && !hasDynamicFooterContent;

    const effectiveBrandName = shouldUseFallback ? fallbackFooter.brandName : brandName;
    const effectiveBrandDescription = shouldUseFallback
        ? fallbackFooter.brandDescription
        : brandDescription;
    const effectiveAddress = shouldUseFallback ? fallbackFooter.address : address;
    const effectiveEmail = shouldUseFallback ? fallbackFooter.email : email;
    const effectiveQuickLinks = shouldUseFallback ? fallbackFooter.quickLinks : quickLinks;
    const effectiveLegalLinks = shouldUseFallback ? fallbackFooter.legalLinks : legalLinks;
    const effectiveCopyrightText = shouldUseFallback ? fallbackFooter.copyrightText : copyrightText;

    const showEffectiveBrandSection = hasAnyLocalizedContent(
        effectiveBrandName,
        effectiveBrandDescription,
    );
    const showEffectiveQuickLinksSection = effectiveQuickLinks.length > 0;
    const showEffectiveContactSection = hasAnyLocalizedContent(effectiveAddress, effectiveEmail);
    const showEffectiveBottomSection =
        hasNonEmptyText(effectiveCopyrightText) || effectiveLegalLinks.length > 0;
    const hasRenderableFooter =
        showEffectiveBrandSection ||
        showEffectiveQuickLinksSection ||
        showEffectiveContactSection ||
        showEffectiveBottomSection;

    if (!hasRenderableFooter) {
        return null;
    }

    return (
        <Scheme id={2}>
            <Box
                className={"footer"}
                component="footer"
                sx={{ borderTop: "1px solid", borderColor: "divider" }}
            >
                <Grid container spacing={4}>
                    {showEffectiveBrandSection && (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Stack spacing={1.2}>
                                <Typography
                                    sx={{ fontWeight: 800, letterSpacing: "0.02em" }}
                                    variant="h6"
                                >
                                    {effectiveBrandName}
                                </Typography>

                                <Typography sx={{ opacity: 0.85, lineHeight: 1.75, maxWidth: 420 }}>
                                    {effectiveBrandDescription}
                                </Typography>

                                <Stack direction="row" useFlexGap gap={1}>
                                    <IconButton
                                        aria-label="LinkedIn"
                                        size="small"
                                        component="a"
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <LinkedInIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        aria-label="Instagram"
                                        size="small"
                                        component="a"
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <InstagramIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        aria-label="X"
                                        size="small"
                                        component="a"
                                        href="https://x.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <XIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Grid>
                    )}

                    {showEffectiveQuickLinksSection && (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={{ fontWeight: 700, mb: 1.2 }}>
                                {t("footer.quickLinksTitle")}
                            </Typography>
                            <Stack spacing={0.8}>
                                {effectiveQuickLinks.map((link) => (
                                    <MuiLink
                                        key={`${link.label}-${link.href}`}
                                        href={link.href}
                                        underline="hover"
                                        sx={{
                                            color: "text.primary",
                                            opacity: 0.85,
                                            width: "fit-content",
                                        }}
                                    >
                                        {link.label}
                                    </MuiLink>
                                ))}
                            </Stack>
                        </Grid>
                    )}

                    {showEffectiveContactSection && (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={{ fontWeight: 700, mb: 1.2 }}>
                                {t("footer.contactTitle")}
                            </Typography>

                            <Stack spacing={1.2}>
                                {hasNonEmptyText(effectiveAddress) && (
                                    <Stack
                                        direction="row"
                                        useFlexGap
                                        gap={1}
                                        alignItems="flex-start"
                                    >
                                        <LocationOnOutlinedIcon
                                            fontSize="small"
                                            sx={{ mt: "2px", opacity: 0.8 }}
                                        />
                                        <Typography
                                            sx={{
                                                opacity: 0.85,
                                                lineHeight: 1.6,
                                                whiteSpace: "pre-line",
                                            }}
                                        >
                                            {effectiveAddress}
                                        </Typography>
                                    </Stack>
                                )}

                                {hasNonEmptyText(effectiveEmail) && (
                                    <Stack direction="row" useFlexGap gap={1} alignItems="center">
                                        <EmailOutlinedIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                        <MuiLink
                                            href={`mailto:${effectiveEmail}`}
                                            underline="hover"
                                            sx={{ color: "text.primary", opacity: 0.85 }}
                                        >
                                            {effectiveEmail}
                                        </MuiLink>
                                    </Stack>
                                )}
                            </Stack>
                        </Grid>
                    )}
                </Grid>

                {shouldUseFallback && hasNonEmptyText(fallbackFooter.unavailableNote) && (
                    <Typography sx={{ mt: 2.5, opacity: 0.65, fontSize: "0.85rem" }}>
                        {fallbackFooter.unavailableNote}
                    </Typography>
                )}

                {showEffectiveBottomSection && (
                    <>
                        <Divider sx={{ my: 3 }} />

                        <Stack
                            direction={{ xs: "column", sm: "row" }}
                            useFlexGap
                            gap={1}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", sm: "center" }}
                        >
                            <Typography sx={{ opacity: 0.75 }}>
                                {hasNonEmptyText(effectiveCopyrightText)
                                    ? effectiveCopyrightText
                                    : `© ${year} ${effectiveBrandName}`}
                            </Typography>
                        </Stack>
                    </>
                )}
            </Box>
        </Scheme>
    );
}
