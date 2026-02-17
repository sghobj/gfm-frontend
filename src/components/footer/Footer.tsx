import {
    Box,
    Grid,
    Stack,
    Typography,
    Link as MuiLink,
    Divider,
    IconButton,
} from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Scheme } from "../scheme/Scheme";

type FooterLink = { label: string; href: string };

const quickLinks: FooterLink[] = [
    { label: "About", href: "/about" },
    { label: "Products", href: "/products" },
    { label: "CSR", href: "/about#csr" },
    { label: "Contact", href: "/contact" },
];

export function Footer() {
    const year = new Date().getFullYear();

    return (
        <Scheme id={2}>
            <Box
                className={"footer"}
                component="footer"
                sx={{ borderTop: "1px solid", borderColor: "divider" }} >
                    <Grid container spacing={4}>
                        {/* Brand */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Stack spacing={1.2}>
                                <Typography
                                    sx={{ fontWeight: 800, letterSpacing: "0.02em" }}
                                    variant="h6"
                                >
                                    Good Food Mood Co.
                                </Typography>

                                <Typography sx={{ opacity: 0.85, lineHeight: 1.75, maxWidth: 420 }}>
                                    Premium organic exports from Jordan — built for reliable
                                    volumes, consistent quality, and smooth international
                                    operations.
                                </Typography>

                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        aria-label="LinkedIn"
                                        size="small"
                                        component="a"
                                        href="https://www.linkedin.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <LinkedInIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        aria-label="Instagram"
                                        size="small"
                                        component="a"
                                        href="https://www.instagram.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <InstagramIcon fontSize="small" />
                                    </IconButton>

                                    <IconButton
                                        aria-label="X"
                                        size="small"
                                        component="a"
                                        href="https://x.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        <XIcon fontSize="small" />
                                    </IconButton>
                                </Stack>
                            </Stack>
                        </Grid>

                        {/* Links */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={{ fontWeight: 700, mb: 1.2 }}>Quick links</Typography>
                            <Stack spacing={0.8}>
                                {quickLinks.map((l) => (
                                    <MuiLink
                                        key={l.label}
                                        href={l.href}
                                        underline="hover"
                                        sx={{
                                            color: "text.primary",
                                            opacity: 0.85,
                                            width: "fit-content",
                                        }}
                                    >
                                        {l.label}
                                    </MuiLink>
                                ))}
                            </Stack>
                        </Grid>

                        {/* Contact */}
                        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                            <Typography sx={{ fontWeight: 700, mb: 1.2 }}>Contact</Typography>

                            <Stack spacing={1.2}>
                                <Stack direction="row" spacing={1} alignItems="flex-start">
                                    <LocationOnOutlinedIcon
                                        fontSize="small"
                                        sx={{ mt: "2px", opacity: 0.8 }}
                                    />
                                    <Typography sx={{ opacity: 0.85, lineHeight: 1.6 }}>
                                        Amman, Jordan
                                        <br />
                                        Serving international markets
                                    </Typography>
                                </Stack>

                                <Stack direction="row" spacing={1} alignItems="center">
                                    <EmailOutlinedIcon fontSize="small" sx={{ opacity: 0.8 }} />
                                    <MuiLink
                                        href="mailto:info@example.com"
                                        underline="hover"
                                        sx={{ color: "text.primary", opacity: 0.85 }}
                                    >
                                        info@example.com
                                    </MuiLink>
                                </Stack>
                            </Stack>
                        </Grid>
                    </Grid>

                    <Divider sx={{ my: 3 }} />

                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={1}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        <Typography sx={{ opacity: 0.75 }}>
                            © {year} Good Food Mood Co. All rights reserved.
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <MuiLink
                                href="/privacy"
                                underline="hover"
                                sx={{ opacity: 0.75, color: "text.primary" }}
                            >
                                Privacy
                            </MuiLink>
                            <MuiLink
                                href="/terms"
                                underline="hover"
                                sx={{ opacity: 0.75, color: "text.primary" }}
                            >
                                Terms
                            </MuiLink>
                        </Stack>
                    </Stack>
            </Box>
        </Scheme>
    );
}
