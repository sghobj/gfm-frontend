import {
    Typography,
    Stack, Box, Divider,
} from "@mui/material";
import type { AboutQuery } from "../../../gql/graphql.ts";
import { type BlocksContent } from "@strapi/blocks-react-renderer";
import {BlocksTypography} from "../../../components/typography/BlocksTypography.tsx";
import { SectionSubtitle, SectionTitle } from "../../../components/typography/SectionTypography.tsx";
import { SectionLayout } from "../../../components/layout/SectionLayout.tsx";

type ValuesType = NonNullable<AboutQuery["about"]>["values"];

type ValuesSectionProps = {
    data: ValuesType;
};

export const ValuesSection = ({ data }: ValuesSectionProps) => {

    const values = data?.values ?? [];

    return (
        <SectionLayout
            schemeId={1}
            reverse={{ xs: false, lg: true }}
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
                        headingSx={{
                            mt: 2,
                            mb: 1,
                            fontWeight: 600,
                            fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                        }}
                    />
                    <Divider
                        sx={{
                            my: { xs: 2.5, md: 3 },
                        }}
                    />
                    {values.map((item) => {

                        return (
                            <Box
                                key={item?.title}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: { xs: "1fr", md: "300px 1fr" }, // left column fixed on sm+
                                    columnGap: 2,
                                    rowGap: 0.5,
                                    alignItems: "start",
                                    overflowWrap: "anywhere",
                                }}
                            >
                                <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>{item?.title}</Typography>
                                <Typography variant="body1">{item?.value}</Typography>
                            </Box>

                        );
                    })}
                </Stack>
            }
        />
    );
};

