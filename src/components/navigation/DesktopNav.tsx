import * as React from "react";
import {
    AppBar,
    Box,
    Button,
    Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Paper,
    Toolbar,
    Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { MdLanguage } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Scheme } from "../scheme/Scheme.tsx";

export const AcmeLogo = () => (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
            clipRule="evenodd"
            d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
            fill="currentColor"
            fillRule="evenodd"
        />
    </svg>
);

type NavItem = { label: string; to: string };

export function DesktopNav() {
    const { t, i18n } = useTranslation("common");
    const isRtl = i18n.language.startsWith("ar");
    const currentLang = isRtl ? "ar" : "en";

    const toggleLanguage = () => {
        const nextLang = currentLang === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang);
    };

    const navItems: NavItem[] = React.useMemo(
        () => [
            { label: t("nav.home"), to: "/" },
            { label: t("nav.about"), to: "/about-us" },
            // { label: t("nav.contact"), to: "/contact-us" },
        ],
        [t],
    );

    const [mobileOpen, setMobileOpen] = React.useState(false);

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <Scheme id={4}>
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{ background: "transparent", py: 2, height: "10vh" }}
                >
                    {/* consistent width across breakpoints */}
                    <Container disableGutters sx={{ width: "min(1100px, calc(100% - 24px))" }}>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 3,
                                background: "white",
                                border: "1px solid var(--app-border)",
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Toolbar sx={{ minHeight: 64, px: 2 }}>
                                {/* LEFT: hamburger (mobile) + brand */}
                                <IconButton
                                    onClick={() => setMobileOpen(true)}
                                    edge="start"
                                    aria-label="open navigation menu"
                                    sx={{
                                        mr: 1,
                                        display: { xs: "inline-flex", md: "none" },
                                        // color: "var(--app-text)",
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        color: "var(--app-text)",
                                    }}
                                >
                                    <AcmeLogo />
                                    <Typography fontWeight={800} sx={{ letterSpacing: 0.5 }}>
                                        ACME
                                    </Typography>
                                </Box>

                                {/* CENTER: desktop links */}
                                <Box
                                    dir={isRtl ? "rtl" : "ltr"}
                                    sx={{
                                        flex: 1,
                                        display: { xs: "none", md: "flex" },
                                        justifyContent: "center",
                                        gap: 3,
                                    }}
                                >
                                    {navItems.map((item) => (
                                        <Button
                                            key={item.to}
                                            component={NavLink}
                                            to={item.to}
                                            sx={{
                                                textTransform: "none",
                                                fontWeight: 600,
                                                color: "var(--app-text)",
                                                "&.active": {
                                                    color: "var(--app-link-active)",
                                                    "& .MuiListItemText-primary": {
                                                        fontWeight: 700,
                                                    },
                                                    textDecoration: "underline",
                                                    textUnderlineOffset: 6,
                                                },
                                                "&:hover": {
                                                    backgroundColor:
                                                        "color-mix(in srgb, var(--app-highlight) 100%, transparent)",
                                                    color: "var(--app-bg)",
                                                },
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    ))}
                                </Box>

                                {/* RIGHT: language toggle */}
                                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                    <Button
                                        onClick={toggleLanguage}
                                        startIcon={<MdLanguage />}
                                        sx={{
                                            textTransform: "none",
                                            color: "var(--app-text)",
                                            "&:hover": {
                                                backgroundColor:
                                                    "color-mix(in srgb, var(--app-accent) 12%, transparent)",
                                            },
                                            display: { xs: "none", md: "inline-flex" },
                                        }}
                                    >
                                        {currentLang === "en" ? "عربي" : "EN"}
                                    </Button>
                                </Box>
                            </Toolbar>
                        </Paper>
                    </Container>
                </AppBar>
            </Scheme>

            <Scheme id={1}>
                {/* MOBILE DRAWER */}
                <Drawer
                    anchor={isRtl ? "right" : "left"}
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 280,
                            background: "var(--app-foreground)",
                            color: "var(--app-text)",
                        },
                    }}
                >
                    <Box sx={{ p: 2 }}>
                        <Typography fontWeight={800}>ACME</Typography>
                    </Box>

                    <Divider sx={{ borderColor: "var(--app-border)" }} />

                    <List>
                        {navItems.map((item) => (
                            <ListItemButton
                                key={item.to}
                                component={NavLink}
                                to={item.to}
                                onClick={() => setMobileOpen(false)}
                                sx={{
                                    color: "var(--app-text)",
                                    "&.active": {
                                        color: "var(--app-link-active)",
                                        "& .MuiListItemText-primary": { fontWeight: 700 },
                                    },
                                    "&:hover": {
                                        backgroundColor:
                                            "color-mix(in srgb, var(--app-accent) 12%, transparent)",
                                    },
                                }}
                            >
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        ))}
                    </List>

                    <Box sx={{ p: 2 }}>
                        <Button
                            onClick={toggleLanguage}
                            startIcon={<MdLanguage />}
                            fullWidth
                            sx={{
                                textTransform: "none",
                                border: "1px solid var(--app-border)",
                                color: "var(--app-text)",
                                justifyContent: "flex-start",
                            }}
                        >
                            {currentLang === "en" ? "عربي" : "EN"}
                        </Button>
                    </Box>
                </Drawer>
            </Scheme>
        </Box>
    );
}
