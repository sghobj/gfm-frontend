import React from "react";
import { Box, Container, Stack, alpha } from "@mui/material";
import { SectionTitle, SectionSubtitle } from "../typography/SectionTypography";

interface HeroSectionProps {
    title: string;
    subtitle?: string;
    image?: string;
    children?: React.ReactNode; // For filters or additional content
    height?: { xs: string | number; md: string | number };
}

export const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    subtitle,
    image = "https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=1920&auto=format&fit=crop", // Default nature/organic image
    children,
    height = { xs: "50vh", md: "60vh" },
}) => {
    return (
        <Box
            sx={{
                width: "100%",
                height: height,
                minHeight: { xs: 400, md: 500 },
                position: "relative",
                display: "flex",
                alignItems: "center",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0, 0, 0, 0.5)", // Dark overlay for readability
                    zIndex: 1,
                },
            }}
        >
            <Container
                maxWidth="xl"
                sx={{
                    position: "relative",
                    zIndex: 2,
                    maxWidth: "1440px",
                    px: { xs: 2, sm: 4, md: 6 },
                    color: "white",
                }}
            >
                <Stack spacing={4}>
                    <Stack spacing={1}>
                        <SectionTitle
                            sx={{
                                color: "white",
                                textShadow: "0 2px 10px rgba(0,0,0,0.3)",
                                fontSize: { xs: "2.5rem", md: "4rem" },
                                mb: 0,
                            }}
                        >
                            {title}
                        </SectionTitle>
                        {subtitle && (
                            <SectionSubtitle
                                sx={{
                                    color: alpha("#fff", 0.9),
                                    maxWidth: 700,
                                    fontSize: { xs: "1.2rem", md: "1.8rem" },
                                    fontWeight: 400,
                                    textShadow: "0 1px 4px rgba(0,0,0,0.3)",
                                    mt: 0,
                                }}
                            >
                                {subtitle}
                            </SectionSubtitle>
                        )}
                    </Stack>
                    {children && <Box sx={{ mt: 2 }}>{children}</Box>}
                </Stack>
            </Container>
        </Box>
    );
};
