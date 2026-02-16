import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Custom hook to determine screen size based on MUI breakpoints.
 *
 * xs: 0px
 * sm: 600px
 * md: 900px
 * lg: 1200px
 * xl: 1536px
 */
export const useBreakpoints = () => {
    const theme = useTheme();

    const isXs = useMediaQuery(theme.breakpoints.only("xs"));
    const isSm = useMediaQuery(theme.breakpoints.only("sm"));
    const isMd = useMediaQuery(theme.breakpoints.only("md"));
    const isLg = useMediaQuery(theme.breakpoints.only("lg"));
    const isXl = useMediaQuery(theme.breakpoints.only("xl"));

    const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // < 600px
    const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // 600px - 900px
    const isDesktop = useMediaQuery(theme.breakpoints.up("md")); // > 900px

    return {
        isXs,
        isSm,
        isMd,
        isLg,
        isXl,
        isMobile,
        isTablet,
        isDesktop,
        // Helpers for common ranges
        isTabletUp: useMediaQuery(theme.breakpoints.up("sm")),
        isDesktopUp: useMediaQuery(theme.breakpoints.up("md")),
        isLargeDesktopUp: useMediaQuery(theme.breakpoints.up("lg")),
    };
};
