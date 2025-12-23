import {
    AppBar,
    Box,
    Button,
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
import { useMemo, useState } from "react";
import { Logo } from "../logo/Logo.tsx";

type NavItem = { label: string; to: string };

export function DesktopNav() {
    const { t, i18n } = useTranslation("common");
    const isRtl = i18n.language.startsWith("ar");
    const currentLang = isRtl ? "ar" : "en";

    const toggleLanguage = () => {
        const nextLang = currentLang === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang);
    };

    const navItems: NavItem[] = useMemo(
        () => [
            { label: t("nav.home"), to: "/" },
            { label: t("nav.about"), to: "/about-us" },
            { label: t("nav.contact"), to: "/contact-us" },
        ],
        [t],
    );

    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <Box component="header" sx={{ width: "100%" }}>
            <Scheme id={1}>
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{ background: "transparent", height: "fit-content" }}
                >
                    {/* consistent width across breakpoints */}
                    <Box>
                        <Paper
                            elevation={3}
                            sx={{
                                borderRadius: 0,
                                background: `white`,
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Toolbar sx={{ minHeight: 64, px: 2, width: "100%" }}>
                                {/* LEFT AREA (mobile): burger left, logo right */}
                                <Box
                                    sx={{
                                        flex: 1,
                                        display: { xs: "flex", md: "none" },
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <IconButton
                                        onClick={() => setMobileOpen(true)}
                                        edge="start"
                                        aria-label="open navigation menu"
                                    >
                                        <MenuIcon />
                                    </IconButton>

                                    <Logo width={50} />
                                </Box>

                                {/* Desktop logo */}
                                <Box
                                    sx={{
                                        display: { xs: "none", md: "flex" },
                                        alignItems: "center",
                                        gap: 1,
                                        color: "var(--app-text)",
                                    }}
                                >
                                    <Logo width={50} />
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
                                                color: "color-mix(in srgb, var(--app-highlight) 100%, transparent)",
                                            },
                                            display: { xs: "none", md: "inline-flex" },
                                        }}
                                    >
                                        {currentLang === "en" ? "عربي" : "EN"}
                                    </Button>
                                </Box>
                            </Toolbar>
                        </Paper>
                    </Box>
                </AppBar>
            </Scheme>

            <Scheme id={4}>
                {/* MOBILE DRAWER */}
                <Drawer
                    anchor={isRtl ? "right" : "left"}
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    PaperProps={{
                        sx: {
                            width: 280,
                            background: "white",
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
