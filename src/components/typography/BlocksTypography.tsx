import React from "react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { Typography } from "@mui/material";
import { useTheme, type SxProps, type Theme } from "@mui/material/styles";

type BlocksTypographyProps = {
    content: BlocksContent;
    paragraphSx?: SxProps<Theme>;
    headingSx?: SxProps<Theme>;
    paragraphClassName?: string;
    headingClassName?: string;
};

export const BlocksTypography: React.FC<BlocksTypographyProps> = ({
    content,
    paragraphSx,
    headingSx,
    paragraphClassName,
    headingClassName,
}) => {
    const theme = useTheme();
    const isRtl = theme.direction === "rtl";

    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => (
                    <Typography
                        className={paragraphClassName}
                        variant="body1"
                        sx={{
                            ...(paragraphSx as Record<string, unknown>),
                            direction: isRtl ? "rtl" : "ltr",
                            textAlign: "justify",
                            textAlignLast: isRtl ? "right" : "left",
                        }}
                    >
                        {children}
                    </Typography>
                ),
                heading: ({ children, level }) => {
                    const variant =
                        level === 1
                            ? "h1"
                            : level === 2
                              ? "h2"
                              : level === 3
                                ? "h3"
                                : level === 4
                                  ? "h4"
                                  : level === 5
                                    ? "h5"
                                    : "h6";
                    return (
                        <Typography
                            className={headingClassName}
                            variant={variant}
                            sx={{
                                ...(headingSx as Record<string, unknown>),
                                direction: isRtl ? "rtl" : "ltr",
                                textAlign: isRtl ? "right" : "left",
                            }}
                        >
                            {children}
                        </Typography>
                    );
                },
            }}
        />
    );
};
