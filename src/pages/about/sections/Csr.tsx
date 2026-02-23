import { Box, Divider, Stack, Typography } from "@mui/material";
import type { AboutQuery } from "../../../graphql/gql/graphql";
import { BlocksTypography } from "../../../components/typography/BlocksTypography";
import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography";
import { hasAnyLocalizedContent } from "../../../utils/localizedContent";

type CSRType = NonNullable<AboutQuery["about"]>["csr"];

type CSRSectionProps = {
    data: CSRType;
};

export const CsrSection = ({ data }: CSRSectionProps) => {
    const goals =
        data?.goals?.filter(
            (goal): goal is NonNullable<typeof goal> =>
                !!goal && hasAnyLocalizedContent(goal.title, goal.subtitle),
        ) ?? [];

    return (
        <SectionLayout
            schemeId={1}
            className="section csr"
            reverse={{ xs: false, lg: false }}
            left={
                <Stack>
                    <SectionTitle>{data?.title}</SectionTitle>

                    <SectionSubtitle>{data?.subtitle}</SectionSubtitle>

                    {data?.text && (
                        <BlocksTypography
                            content={data.text}
                            paragraphSx={{ mt: 1.2, opacity: 0.9, lineHeight: 1.85 }}
                        />
                    )}
                </Stack>
            }
            right={
                <Stack spacing={0} sx={{ width: "100%" }}>
                    {goals.map((goal, idx) => (
                        <Box key={goal?.id ?? idx} sx={{ position: "relative" }}>
                            <Box
                                sx={{
                                    display: "block",
                                    py: { xs: 1.6, sm: 2 },
                                    borderRadius: 3,
                                    transition: "transform 180ms ease, background-color 180ms ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="subtitle1">{goal?.title}</Typography>

                                    <Typography
                                        variant="body1"
                                        sx={{
                                            mt: 0.6,
                                            opacity: 0.88,
                                            overflowWrap: "anywhere",
                                        }}
                                    >
                                        {goal?.subtitle}
                                    </Typography>
                                </Box>
                            </Box>

                            {idx !== goals.length - 1 ? (
                                <Divider
                                    sx={{
                                        mt: 0.2,
                                        opacity: 0.6,
                                        borderColor: "divider",
                                    }}
                                />
                            ) : null}
                        </Box>
                    ))}
                </Stack>
            }
        />
    );
};

