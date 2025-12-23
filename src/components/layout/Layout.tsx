import { DesktopNav } from "../navigation/DesktopNav";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer";
import { Fab } from "@mui/material";
import { ScrollToTop } from "./scrollToTop/ScrollToTop.tsx";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { COLORS } from "../../theme/colors.ts";

export const Layout = () => {
    return (
        <>
            <DesktopNav />

            {/* Anchor used by ScrollTop */}
            <div id="back-to-top-anchor" />

            <Outlet />

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
        </>
    );
};
