import { Box, Divider, Stack, Typography } from "@mui/material";
import type { AboutQuery } from "../../../gql/graphql";
import { StrapiMuiIcon } from "../../../components/icon/MuiIcon";
import { BlocksTypography } from "../../../components/typography/BlocksTypography";
import { SectionLayout } from "../../../components/layout/SectionLayout";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography";

type CSRType = NonNullable<AboutQuery["about"]>["csr"];

type CSRSectionProps = {
    data: CSRType;
};

export const CsrSection = ({ data }: CSRSectionProps) => {
    const goals = data?.goals ?? [];

    return (
        <SectionLayout
            schemeId={1}
            className="section csr"
            reverse={{ xs: false, lg: true }}
            left={
                <Stack>
                    <SectionTitle>
                        {data?.title}
                    </SectionTitle>

                    <SectionSubtitle>
                        {data?.subtitle}
                    </SectionSubtitle>

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
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", sm: "56px 1fr" },
                                    gap: 2,
                                    py: { xs: 1.6, sm: 2 },
                                    px: { xs: 0.5, sm: 1 },
                                    borderRadius: 3,
                                    transition: "transform 180ms ease, background-color 180ms ease",
                                    "&:hover": {
                                        transform: "translateY(-2px)",
                                        backgroundColor: "action.hover",
                                    },
                                }}
                            >
                                {/* Icon badge */}
                                <Box
                                    sx={{
                                        width: 44,
                                        height: 44,
                                        borderRadius: "14px",
                                        display: "grid",
                                        placeItems: "center",
                                        border: "1px solid",
                                        borderColor: "divider",
                                        background:
                                            "linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.65) 100%)",
                                        boxShadow: "0 10px 26px rgba(0,0,0,0.06)",
                                    }}
                                >
                                    <StrapiMuiIcon iconName={goal?.icon} />
                                </Box>

                                {/* Copy */}
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography variant="subtitle1">
                                        {goal?.title}
                                    </Typography>

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
                                        mx: { xs: 0.5, sm: 1 },
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
