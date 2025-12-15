import Box from "@mui/material/Box";
import { ThemeProvider, type Theme } from "@mui/material/styles";
import type { SxProps } from "@mui/material/styles";
import type { SchemeId } from "../../theme/schemes";
import { muiTheme } from "../../theme/muiTheme";
import { type ReactNode, useMemo } from "react";

export const Scheme = ({
    id,
    sx,
    children,
}: {
    id: SchemeId;
    sx?: SxProps<Theme>;
    children: ReactNode;
}) => {
    const theme = useMemo(() => muiTheme(id), [id]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                className={"scheme"}
                sx={[
                    {
                        bgcolor: "background.default",
                        color: "text.primary",
                        width: "100%",
                        boxSizing: "border-box",
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                ]}
            >
                {children}
            </Box>
        </ThemeProvider>
    );
};
