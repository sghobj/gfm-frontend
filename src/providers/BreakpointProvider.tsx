/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, type ReactNode } from "react";
import { useBreakpoints } from "../hooks/useBreakpoints";

interface BreakpointContextProps {
    isXs: boolean;
    isSm: boolean;
    isMd: boolean;
    isLg: boolean;
    isXl: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTabletUp: boolean;
    isDesktopUp: boolean;
    isLargeDesktopUp: boolean;
}

const BreakpointContext = createContext<BreakpointContextProps | undefined>(undefined);

export const useGlobalBreakpoints = () => {
    const context = useContext(BreakpointContext);
    if (context === undefined) {
        throw new Error("useGlobalBreakpoints must be used within a BreakpointProvider");
    }
    return context;
};

export const BreakpointProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const breakpoints = useBreakpoints();

    return <BreakpointContext.Provider value={breakpoints}>{children}</BreakpointContext.Provider>;
};
