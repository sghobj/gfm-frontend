import { Box, Typography, Stack, Divider } from "@mui/material";
import type { AboutQuery } from "../../../gql/graphql.ts";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography.tsx";
import {SectionLayout} from "../../../components/layout/SectionLayout.tsx";
import { BlocksTypography } from "../../../components/typography/BlocksTypography.tsx";

type VisionType = NonNullable<AboutQuery["about"]>["vision"];

type VisionSectionProps = {
    data: VisionType;
};

export const VisionSection = ({ data }: VisionSectionProps) => {

    return (
        <SectionLayout
            schemeId={4}
            className={"section"}
            reverse={false}
            left={
                <Stack>
                    <SectionTitle>
                        {data?.general?.title}
                    </SectionTitle>
                    <SectionSubtitle>
                        {data?.general?.subtitle}
                    </SectionSubtitle>
                </Stack>
            }
            right={
                <Stack>
                    <BlocksTypography
                        content={(data?.general?.text ?? []) as BlocksContent}
                        paragraphSx={{
                            textAlign: "justify",
                            opacity: 0.95,
                        }}
                        headingSx={{ mt: 2, mb: 1, fontWeight: 600 }}
                    />

                    {data?.goals?.length && (
                        <>
                            <Divider
                                sx={{
                                    my: { xs: 2.5, md: 3 },
                                    borderColor: "rgba(255,255,255,0.22)",
                                }}
                            />

                            <Stack spacing={1.2}>
                                {data?.goals?.map((goal, idx) => (
                                    <Line
                                        key={goal?.id ?? `${goal?.title ?? "goal"}-${idx}`}
                                        label={goal?.title}
                                        value={goal?.value}
                                    />
                                ))}
                            </Stack>
                        </>
                    )}
                </Stack>
            }
        />
    );
};

type LineProps = {
    label?: string | null;
    value?: string | null;
};

export function Line({ label, value }: LineProps) {
    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                alignItems: "baseline",
                justifyContent: "space-between",
                flexWrap: { xs: "wrap", sm: "nowrap" },
                overflowWrap: "anywhere",
            }}
        >
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>{label}</Typography>
            <Typography variant="body1" sx={{ fontWeight: 600 }}>{value}</Typography>
        </Box>
    );
}
