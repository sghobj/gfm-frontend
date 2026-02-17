import { DesktopNav } from "../navigation/DesktopNav";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Box, Fab } from "@mui/material";
import { ScrollToTop } from "./scrollToTop/ScrollToTop.tsx";
import { HashScrollHandler } from "./HashScrollHandler.tsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { COLORS } from "../../theme/colors.ts";

export const Layout = () => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <HashScrollHandler />
            <DesktopNav />

            {/* Anchor used by ScrollTop */}
            <div id="back-to-top-anchor" />

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Outlet />
            </Box>

            <ScrollToTop>
                <Fab
                    size="small"
                    aria-label="scroll back to top"
                    sx={{
                        borderRadius: 1,
                        background: COLORS.secondary.light,
                        "&:hover": { background: COLORS.secondary.lighter },
                    }}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollToTop>

            <Footer />
        </Box>
    );
};
