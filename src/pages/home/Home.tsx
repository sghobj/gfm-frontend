import { Box, Typography } from "@mui/material";
import { HomeHero } from "./sections/HomeHero";
import { QualityMarketing } from "./sections/QualityMarketing";
import { CustomersMap } from "./sections/CustomersMap";
import { Brands } from "./sections/Brands";
import { Certifications } from "./sections/Certifications";
import { B2BSubscribe } from "./sections/B2BSubscribe";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient";
import { GetHomeDataDocument, CertificatesDocument } from "../../gql/graphql";
import { LoadingState } from "../../components/state/LoadingState";
import {
    hasAnyLocalizedContent,
    hasNonEmptyText,
    isContentForLocale,
} from "../../utils/localizedContent";

export const Home = () => {
    const { i18n, t } = useTranslation();
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data, loading, error } = useQuery(GetHomeDataDocument, {
        variables: { locale },
    });

    const { data: certData, loading: certLoading } = useQuery(CertificatesDocument);

    const brands =
        data?.brands?.filter(
            (brand): brand is NonNullable<typeof brand> =>
                !!brand &&
                isContentForLocale(brand.locale, activeLocale) &&
                hasNonEmptyText(brand.name),
        ) ?? [];
    const certificates =
        certData?.certificates?.filter(
            (certificate): certificate is NonNullable<typeof certificate> =>
                !!certificate && hasNonEmptyText(certificate.name),
        ) ?? [];
    const homepage =
        data?.homepage && isContentForLocale(data.homepage.locale, activeLocale)
            ? data.homepage
            : null;
    const qualityMarketing = homepage?.qualityMarketing;
    const mapSection = homepage?.map;

    const hasHeroSection =
        (homepage?.hero ?? []).filter(
            (slide) =>
                !!slide &&
                hasNonEmptyText(slide.title) &&
                hasNonEmptyText(slide.subtitle) &&
                hasNonEmptyText(slide.description) &&
                hasNonEmptyText(slide.ctaPrimary) &&
                hasNonEmptyText(slide.ctaSecondary) &&
                hasNonEmptyText(slide.primaryLink) &&
                hasNonEmptyText(slide.secondaryLink) &&
                hasNonEmptyText(slide.image?.url),
        ).length > 0;

    const qualityPoints =
        qualityMarketing?.points?.filter(
            (point) => !!point && hasNonEmptyText(point.title) && hasNonEmptyText(point.subtitle),
        ) ?? [];
    const hasQualitySection =
        !!qualityMarketing?.general &&
        hasNonEmptyText(qualityMarketing.general.title) &&
        hasNonEmptyText(qualityMarketing.general.subtitle) &&
        hasAnyLocalizedContent(qualityMarketing.general.text) &&
        qualityPoints.length > 0;

    const hasBrandsSection = brands.length > 0;
    const hasCertificatesSection = certificates.length > 0;
    const hasMapSection =
        !!mapSection &&
        hasNonEmptyText(mapSection.subtitle) &&
        hasNonEmptyText(mapSection.title) &&
        hasNonEmptyText(mapSection.description) &&
        hasNonEmptyText(mapSection.exportedCountries);

    if (loading || certLoading) {
        return <LoadingState message={t("home.loading")} />;
    }

    if (error) {
        return (
            <Box sx={{ py: 20, textAlign: "center" }}>
                <Typography color="error">{t("home.errorLoading")}</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {hasHeroSection && <HomeHero data={homepage?.hero} />}

            <Box>
                {hasQualitySection && <QualityMarketing data={qualityMarketing} />}

                {hasBrandsSection && <Brands brands={brands} />}

                {hasCertificatesSection && <Certifications certificates={certificates} />}

                {hasMapSection && <CustomersMap data={mapSection} />}

                <B2BSubscribe />
            </Box>
        </Box>
    );
};
