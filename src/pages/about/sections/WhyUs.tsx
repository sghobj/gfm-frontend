import { Box, Stack, Divider, Typography } from "@mui/material";
import type { AboutQuery } from "../../../gql/graphql";
import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography";

type WhyUsType = NonNullable<AboutQuery["about"]>["whyUs"];
type WhyUsSectionProps = { data: WhyUsType };

export function WhyUs({ data }: WhyUsSectionProps) {
    const points = data?.points ?? [];
    if (!data) return null;

    return (
        <SectionLayout
            schemeId={3}
            className="why-us"
            left={
                <Stack spacing={2}>
                    <SectionTitle>
                        {data?.general?.title}
                    </SectionTitle>

                    <SectionSubtitle>
                        {data?.general?.subtitle}
                    </SectionSubtitle>
                </Stack>
            }
            right={
                <Stack spacing={1.2} sx={{ width: "100%" }}>
                    {points.map((item, idx) => (
                        <Box key={item?.id ?? idx}>
                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "240px 1fr" },
                                    gap: 2,
                                    alignItems: "start",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                                    {item?.title}
                                </Typography>

                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    {item?.subtitle}
                                </Typography>
                            </Box>

                            {idx !== points.length - 1 ? <Divider sx={{ mt: 1.2 }} /> : null}
                        </Box>
                    ))}
                </Stack>
            }
        />
    );
}
