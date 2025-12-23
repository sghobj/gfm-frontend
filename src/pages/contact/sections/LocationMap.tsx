import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { Logo } from "../../../components/logo/Logo";
import type { ReactNode } from "react";

const InfoRow = ({ icon, label, value }: { icon: ReactNode; label: string; value: string }) => {
    return (
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box
                sx={{
                    width: 22,
                    display: "flex",
                    justifyContent: "center",
                    mt: "2px",
                    color: "text.primary",
                }}
            >
                {icon}
            </Box>

            <Box>
                <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.1 }}>
                    {label}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.4 }}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    );
};

export const LocationMap = () => {
    return (
        <Box component="section" sx={{ py: { md: 1 } }}>
            <Grid container spacing={4}>
                <Grid size={{ lg: 4, md: 6, xs: 12 }}>
                    <Card
                        sx={{
                            borderRadius: 3,
                            background: "white",
                            boxShadow: "none",
                            height: "100%",
                            p: 4,
                        }}
                    >
                        <CardHeader
                            avatar={<Logo width={100} />}
                            title={<Typography variant={"h5"}>Good Food Mood Co.</Typography>}
                        />
                        <Divider />
                        <CardContent
                            sx={{
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                                mt: 1,
                            }}
                        >
                            <Stack spacing={2}>
                                <InfoRow
                                    icon={<EmailIcon fontSize="small" />}
                                    label="Email"
                                    value="hello@organicjordanian.com"
                                />
                                <InfoRow
                                    icon={<PhoneIcon fontSize="small" />}
                                    label="Phone"
                                    value="+962 (6) 465-0000"
                                />
                                <InfoRow
                                    icon={<LocationOnIcon fontSize="small" />}
                                    label="Office"
                                    value="Amman, Jordan near downtown district"
                                />
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ lg: 8, md: 6, xs: 12 }}>
                    <Paper
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            overflow: "hidden",
                            border: "1px solid rgba(0,0,0,0.08)",
                            boxShadow: "0 12px 30px rgba(0,0,0,0.06)",
                        }}
                    >
                        <Box
                            component="iframe"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3384.6023027198144!2d35.90720517611209!3d31.97168422470498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca194cbdaecaf%3A0xd96ed3b9c3083bff!2zR29vZCBGb29kIE1vb2QgQ28uINi02LHZg9ipINmF2LLYp9isINin2YTYutiw2KfYoSDYp9mE2KzZitiv!5e0!3m2!1sen!2sjo!4v1766145454698!5m2!1sen!2sjo"
                            height={{ xs: 500, md: "100%" }}
                            minHeight={{ md: 400 }}
                            width={"100%"}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            sx={{ border: 0, display: "block" }}
                            allowFullScreen
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};
