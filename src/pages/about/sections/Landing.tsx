import type { AboutQuery } from "../../../gql/graphql.ts";
import { Box, Stack } from "@mui/material";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia.ts";
import { SectionLayout } from "../../../components/layout/SectionLayout.tsx";
import { BlocksTypography } from "../../../components/typography/BlocksTypography.tsx";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography.tsx";

type LandingType = NonNullable<AboutQuery["about"]>["landing"];

type LandingProps = {
    data: LandingType;
};

export const Landing = ({ data }: LandingProps) => {
    const landingText = (data?.text ?? []) as BlocksContent;

    return (
        <SectionLayout
            schemeId={3}
            className="about-landing"
            left={
                <Stack spacing={2}>
                    <SectionTitle>
                        {data?.title}
                    </SectionTitle>

                    <SectionSubtitle>
                        {data?.subtitle}
                    </SectionSubtitle>

                    <BlocksTypography
                        content={landingText}
                        paragraphSx={{ textAlign: "justify" }}
                    />
                </Stack>
            }
            right={
                data?.image ? (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={resolveStrapiMediaUrl(data.image.url)}
                            alt={data.image.alternativeText || "About Landing"}
                            sx={{
                                display: "block",
                                width: { xs: "100%", md: "90%" },
                                height: "auto",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                ) : null
            }
        />
    );
};
