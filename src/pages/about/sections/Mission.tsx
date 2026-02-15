import { Box, Stack } from "@mui/material";
import { resolveStrapiMediaUrl } from "../../../utils/strapiMedia.ts";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { SectionLayout } from "../../../components/layout/SectionLayout.tsx";
import type { AboutQuery } from "../../../gql/graphql.ts";
import { SectionTitle } from "../../../components/typography/SectionTypography.tsx";
import { BlocksTypography } from "../../../components/typography/BlocksTypography.tsx";

type MissionType = NonNullable<AboutQuery["about"]>["mission"];

type MissionProps = {
    data: MissionType;
};

export const Mission = ({ data }: MissionProps) => {
    const missionText = (data?.text ?? []) as BlocksContent;

    return (
        <SectionLayout
            schemeId={1}
            className={"section"}
            reverse={{ xs: false, lg: true }}
            right={
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        component="img"
                        src={resolveStrapiMediaUrl(data?.image?.url)}
                        alt={data?.image?.alternativeText ?? "Mission Image"}
                        sx={{
                            width: { xs: "100%", md: "90%" },
                            height: "auto",
                            display: "block",
                            objectFit: "contain",
                        }}
                    />
                </Box>
            }
            left={
                <Stack spacing={2}>
                    <SectionTitle>{data?.title}</SectionTitle>
                    <BlocksTypography
                        content={missionText}
                        paragraphSx={{ textAlign: "justify" }}
                        paragraphClassName="mission-text"
                        headingClassName="mission-text"
                    />
                </Stack>
            }
        />
    );
};
