import Box from "@mui/material/Box";
import { ThemeProvider, type Theme, useTheme } from "@mui/material/styles";
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
    const parentTheme = useTheme();
    const direction = parentTheme.direction === "rtl" ? "rtl" : "ltr";
    const theme = useMemo(() => muiTheme(id, direction), [id, direction]);

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
