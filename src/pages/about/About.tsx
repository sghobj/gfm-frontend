import { Box } from "@mui/material";
import { VisionSection } from "./sections/Vision.tsx";
import { ValuesSection } from "./sections/Values.tsx";
import { CsrSection } from "./sections/Csr.tsx";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient.ts";
import { useEffect, useState } from "react";
import { AboutDocument } from "../../gql/graphql";
import type { AboutQuery } from "../../gql/graphql.ts";
import { Mission } from "./sections/Mission.tsx";
import { Landing } from "./sections/Landing.tsx";
import { WhyUs } from "./sections/WhyUs.tsx";

export type AboutState = AboutQuery["about"];

export const About = () => {
    const { i18n } = useTranslation();
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const { data } = useQuery(AboutDocument, {
        variables: { locale },
    });

    const [aboutData, setAboutData] = useState<AboutState>(null);

    useEffect(() => {
        if (data) {
            setAboutData(data?.about);
        }
    }, [data]);

    const isRtl = i18n.language.startsWith("ar");

    return (
        <Box className={"section about"} dir={isRtl ? "rtl" : "ltr"}>
            {aboutData?.landing ? <Landing data={aboutData?.landing} /> : null}

            {aboutData?.mission ? <Mission data={aboutData?.mission} /> : null}

            {aboutData?.vision ? <VisionSection data={aboutData?.vision} /> : null}

            {aboutData?.values ? <ValuesSection data={aboutData?.values} /> : null}

            {aboutData?.whyUs ? <WhyUs data={aboutData.whyUs} /> : null}

            {aboutData?.csr ? <CsrSection data={aboutData?.csr} /> : null}
        </Box>
    );
};
