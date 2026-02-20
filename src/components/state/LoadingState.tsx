import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { COLORS } from "../../theme/colors";

export type LoadingStateProps = {
    message?: string;
    sx?: SxProps<Theme>;
};

export function LoadingState({ message, sx }: LoadingStateProps) {
    return (
        <Box sx={{ py: 20, textAlign: "center", ...sx }}>
            <Stack spacing={2} alignItems="center">
                <CircularProgress sx={{ color: COLORS.secondary.light }} />
                <Typography color="text.secondary">
                    {message ?? "Warming things up… fetching content. Thank you for your patience."}
                </Typography>
                <Typography variant="caption" color="text.disabled">
                    Running on a minimal tier while we prepare the full experience.
                </Typography>
            </Stack>
        </Box>
    );
}

export default LoadingState;
