import { SvgIcon, Box, Typography } from "@mui/material";

type Props = { iconName?: string | null };

export function StrapiMuiIcon({ iconName }: Props) {
    if (!iconName) return null;

    const name = iconName.trim();

    // If it looks like an emoji (non-alphanumeric at start), just render it
    if (/^[^\w\s]/.test(name)) {
        return (
            <Typography variant="h4" sx={{ lineHeight: 1 }}>
                {name}
            </Typography>
        );
    }

    return (
        <Box
            sx={{
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                bgcolor: "primary.light",
                color: "primary.main",
                opacity: 0.8,
            }}
        >
            <SvgIcon fontSize="small">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
            </SvgIcon>
        </Box>
    );
}
