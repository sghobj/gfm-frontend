import { Box, Typography } from "@mui/material";
import { HomeHero } from "./sections/HomeHero";
import { QualityMarketing } from "./sections/QualityMarketing";
import { CustomersMap } from "./sections/CustomersMap";
import { Brands } from "./sections/Brands";
import { Certifications } from "./sections/Certifications";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient";
import { GetHomeDataDocument, CertificatesDocument } from "../../gql/graphql";
import { LoadingState } from "../../components/state/LoadingState";

export const Home = () => {
    const { i18n } = useTranslation();
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const { data, loading, error } = useQuery(GetHomeDataDocument, {
        variables: { locale },
    });

    const { data: certData, loading: certLoading } = useQuery(CertificatesDocument);

    const brands = data?.brands?.filter((b): b is NonNullable<typeof b> => !!b) ?? [];
    const certificates =
        certData?.certificates?.filter((c): c is NonNullable<typeof c> => !!c) ?? [];
    const homepage = data?.homepage;
    const qualityMarketing = homepage?.qualityMarketing;

    if (loading || certLoading) {
        return <LoadingState message="Preparing the homepage… This may take a moment." />;
    }

    if (error) {
        return (
            <Box sx={{ py: 20, textAlign: "center" }}>
                <Typography color="error">Error loading homepage data</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {homepage?.hero && <HomeHero data={homepage?.hero} />}

            <Box>
                {qualityMarketing && <QualityMarketing data={qualityMarketing} />}

                {brands && <Brands brands={brands} />}

                {certificates && <Certifications certificates={certificates} />}

                <CustomersMap data={homepage?.map} />
            </Box>
        </Box>
    );
};
