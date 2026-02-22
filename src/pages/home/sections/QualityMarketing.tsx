import { Box, Typography, Container, Grid, Stack, Card, CardContent } from "@mui/material";
import { Scheme } from "../../../components/scheme/Scheme";
import type { GetHomeDataQuery } from "../../../gql/graphql";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import { hasAnyLocalizedContent, hasNonEmptyText } from "../../../utils/localizedContent";

type QualityMarketingData = NonNullable<GetHomeDataQuery["homepage"]>["qualityMarketing"];

interface QualityMarketingProps {
    data?: QualityMarketingData;
}

export const QualityMarketing = ({ data }: QualityMarketingProps) => {
    const points =
        data?.points?.filter(
            (point): point is NonNullable<typeof point> =>
                !!point && hasNonEmptyText(point.title) && hasNonEmptyText(point.subtitle),
        ) ?? [];
    const general = data?.general;
    const hasGeneralContent =
        !!general &&
        hasNonEmptyText(general.title) &&
        hasNonEmptyText(general.subtitle) &&
        hasAnyLocalizedContent(general.text);

    if (!hasGeneralContent || points.length === 0) {
        return null;
    }

    return (
        <Scheme id={1}>
            <Box
                sx={{
                    py: { xs: 8, md: 12 },
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Container
                    maxWidth="xl"
                    sx={{
                        maxWidth: "1440px",
                        px: { xs: 2, sm: 4, md: 6 },
                    }}
                >
                    <Grid container spacing={{ xs: 4, lg: 10 }} alignItems="center">
                        <Grid size={{ xs: 12, lg: 5 }}>
                            <Stack spacing={3}>
                                <Typography
                                    variant="overline"
                                    color="primary"
                                    fontWeight={800}
                                    sx={{ letterSpacing: 3 }}
                                >
                                    {general.subtitle}
                                </Typography>
                                <Typography variant="h2" fontWeight={900} sx={{ lineHeight: 1.1 }}>
                                    {general.title
                                        ? general.title.split(",").map((part, i) => (
                                              <span key={i}>
                                                  {part}
                                                  {general.title && general.title.includes(",") && (
                                                      <br />
                                                  )}
                                              </span>
                                          ))
                                        : general.title}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    component="div"
                                    color="text.secondary"
                                    sx={{ fontWeight: 400 }}
                                >
                                    <BlocksRenderer content={general.text} />
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid size={{ xs: 12, lg: 7 }}>
                            <Grid container spacing={3}>
                                {points.map((point, index) => {
                                    return (
                                        <Grid size={{ xs: 12, sm: 6 }} key={point?.id ?? index}>
                                            <Card
                                                elevation={0}
                                                sx={{
                                                    height: "100%",
                                                    borderRadius: 3,
                                                    bgcolor: "background.paper",
                                                    border: "1px solid",
                                                    borderColor: "transparent",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        borderColor: "primary.main",
                                                        transform: "translateY(-5px)",
                                                        boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
                                                    },
                                                }}
                                            >
                                                <CardContent sx={{ p: 4 }}>
                                                    <Typography
                                                        variant="h5"
                                                        fontWeight={800}
                                                        gutterBottom
                                                    >
                                                        {point?.title}
                                                    </Typography>
                                                    <Typography
                                                        variant="body1"
                                                        color="text.secondary"
                                                        lineHeight={1.6}
                                                    >
                                                        {point?.subtitle}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Scheme>
    );
};
