import React from "react";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

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
    return (
        <BlocksRenderer
            content={content}
            blocks={{
                paragraph: ({ children }) => (
                    <Typography
                        className={paragraphClassName}
                        variant="body1"
                        sx={{ textAlign: "justify", ...paragraphSx }}
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
                        <Typography className={headingClassName} variant={variant} sx={headingSx}>
                            {children}
                        </Typography>
                    );
                },
            }}
        />
    );
};
