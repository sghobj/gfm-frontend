import { Box } from "@mui/material";
import { VisionSection } from "./sections/Vision.tsx";
import { ValuesSection } from "./sections/Values.tsx";
import { CsrSection } from "./sections/Csr.tsx";
import { useQuery } from "@apollo/client/react";
import { useTranslation } from "react-i18next";
import { toStrapiLocale } from "../../apollo/apolloClient.ts";
import { AboutDocument } from "../../graphql/gql/graphql";
import type { AboutQuery } from "../../graphql/gql/graphql.ts";
import { Mission } from "./sections/Mission.tsx";
import { Landing } from "./sections/Landing.tsx";
import { WhyUs } from "./sections/WhyUs.tsx";
import { hasAnyLocalizedContent, isContentForLocale } from "../../utils/localizedContent";

export type AboutState = AboutQuery["about"];

export const About = () => {
    const { i18n } = useTranslation();
    const locale = toStrapiLocale(i18n.resolvedLanguage ?? i18n.language ?? "en");
    const activeLocale = locale as "en" | "ar";
    const { data } = useQuery(AboutDocument, {
        variables: { locale },
    });
    const rawAboutData: AboutState = data?.about ?? null;
    const aboutData: AboutState =
        rawAboutData && isContentForLocale(rawAboutData.locale, activeLocale) ? rawAboutData : null;

    const landing = aboutData?.landing;
    const mission = aboutData?.mission;
    const vision = aboutData?.vision;
    const values = aboutData?.values;
    const whyUs = aboutData?.whyUs;
    const csr = aboutData?.csr;

    const hasLandingSection =
        !!landing &&
        hasAnyLocalizedContent(landing.title, landing.subtitle, landing.text, landing.image?.url);
    const hasMissionSection =
        !!mission &&
        hasAnyLocalizedContent(mission.title, mission.subtitle, mission.text, mission.image?.url);
    const hasVisionGoals =
        vision?.goals?.some((goal) => !!goal && hasAnyLocalizedContent(goal.title, goal.value)) ??
        false;
    const hasVisionSection =
        !!vision &&
        (hasAnyLocalizedContent(
            vision.general?.title,
            vision.general?.subtitle,
            vision.general?.text,
            vision.general?.image?.url,
        ) ||
            hasVisionGoals);
    const hasValuesRows =
        values?.values?.some(
            (value) => !!value && hasAnyLocalizedContent(value.title, value.value),
        ) ?? false;
    const hasValuesSection =
        !!values &&
        (hasAnyLocalizedContent(
            values.general?.title,
            values.general?.subtitle,
            values.general?.text,
            values.general?.image?.url,
        ) ||
            hasValuesRows);
    const hasWhyUsPoints =
        whyUs?.points?.some(
            (point) => !!point && hasAnyLocalizedContent(point.title, point.subtitle),
        ) ?? false;
    const hasWhyUsSection =
        !!whyUs &&
        (hasAnyLocalizedContent(
            whyUs.general?.title,
            whyUs.general?.subtitle,
            whyUs.general?.text,
            whyUs.general?.image?.url,
        ) ||
            hasWhyUsPoints);
    const hasCsrGoals =
        csr?.goals?.some((goal) => !!goal && hasAnyLocalizedContent(goal.title, goal.subtitle)) ??
        false;
    const hasCsrSection =
        !!csr && (hasAnyLocalizedContent(csr.title, csr.subtitle, csr.text) || hasCsrGoals);

    return (
        <Box className={"section about"}>
            {hasLandingSection ? (
                <Box id="landing">
                    <Landing data={landing} />
                </Box>
            ) : null}

            {hasMissionSection ? (
                <Box id="mission">
                    <Mission data={mission} />
                </Box>
            ) : null}

            {hasVisionSection ? (
                <Box id="vision">
                    <VisionSection data={vision} />
                </Box>
            ) : null}

            {hasValuesSection ? (
                <Box id="values">
                    <ValuesSection data={values} />
                </Box>
            ) : null}

            {hasWhyUsSection ? (
                <Box id="why-us">
                    <WhyUs data={whyUs} />
                </Box>
            ) : null}

            {hasCsrSection ? (
                <Box id="csr">
                    <CsrSection data={csr} />
                </Box>
            ) : null}
        </Box>
    );
};

