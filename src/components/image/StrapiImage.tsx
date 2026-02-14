import React from "react";
import { Box, type BoxProps } from "@mui/material";
import { resolveStrapiMediaUrl } from "../../utils/strapiMedia.ts";

type Media = { url?: string | null; alternativeText?: string | null } | undefined | null;

type StrapiImageProps = {
    media?: Media;
    alt?: string;
} & Omit<BoxProps, "component">;

export const StrapiImage: React.FC<StrapiImageProps> = ({ media, alt, sx, ...rest }) => {
    if (!media?.url) return null;
    return (
        <Box
            component="img"
            src={resolveStrapiMediaUrl(media.url)}
            alt={media.alternativeText ?? alt ?? "image"}
            sx={{
                width: "100%",
                height: "auto",
                display: "block",
                objectFit: "contain",
                ...sx,
            }}
            {...rest}
        />
    );
};
