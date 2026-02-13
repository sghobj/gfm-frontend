import React from "react";
import { Typography, type TypographyProps } from "@mui/material";

/**
 * Common Section Title (h1) with consistent styling and responsiveness.
 */
export const SectionTitle: React.FC<TypographyProps> = ({ children, sx, ...props }) => {
    return (
        <Typography
            variant="h1"
            sx={{
                mb: 1,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};

/**
 * Common Section Subtitle with consistent styling and responsiveness.
 */
export const SectionSubtitle: React.FC<TypographyProps> = ({ children, sx, ...props }) => {
    return (
        <Typography
            variant="h3"
            sx={{
                mt: 0,
                mb: 3,
                fontWeight: 400,
                opacity: 0.85,
                ...sx,
            }}
            {...props}
        >
            {children}
        </Typography>
    );
};
