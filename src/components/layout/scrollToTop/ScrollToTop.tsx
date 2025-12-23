import * as React from "react";
import { Box, Fade, useScrollTrigger } from "@mui/material";

type ScrollTopProps = {
    children: React.ReactElement;
    window?: () => Window;
};

export const ScrollToTop = (props: ScrollTopProps) => {
    const { children, window } = props;

    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const doc = event.currentTarget.ownerDocument || document;
        const anchor = doc.querySelector("#back-to-top-anchor");

        anchor?.scrollIntoView({
            behavior: "smooth",
            block: "center",
        });
    };

    return (
        <Fade in={trigger}>
            <Box
                onClick={handleClick}
                role="presentation"
                sx={{ position: "fixed", bottom: 16, right: 16, zIndex: (t) => t.zIndex.tooltip }}
            >
                {children}
            </Box>
        </Fade>
    );
};
