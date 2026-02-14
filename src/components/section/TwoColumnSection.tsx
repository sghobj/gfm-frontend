import { Grid, type SxProps, type Theme } from "@mui/material";
import type { ResponsiveStyleValue } from "@mui/system";
import "./TwoColumnSection.css";
import type { ReactNode } from "react";

type TwoColumnSectionProps = {
    left: ReactNode;
    right: ReactNode;

    /** MUI Grid spacing (same as your current 10) */
    spacing?: ResponsiveStyleValue<number>;

    /** Optional className for the Grid container */
    className?: string;

    /** Optional sx for the Grid container */
    sx?: SxProps<Theme>;

    /** Column sizes (defaults match your example) */
    leftSize?: { lg?: number; sm?: number; xs?: number };
    rightSize?: { lg?: number; sm?: number; xs?: number };

    /** Swap columns visually on desktop (or any breakpoint you choose via order props) */
    reverse?: boolean | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", boolean>>;

    /** Align items in the right/left cell (handy for image centering) */
    leftSx?: SxProps<Theme>;
    rightSx?: SxProps<Theme>;

    /** Vertical alignment of the content within the columns (defaults to center) */
    alignItems?: ResponsiveStyleValue<"flex-start" | "center" | "flex-end" | "stretch" | "baseline">;
};

export const TwoColumnSection = ({
    left,
    right,
    spacing = { xs: 2, md: 10 },
    className,
    sx,
    leftSize = { lg: 6, sm: 12, xs: 12 },
    rightSize = { lg: 6, sm: 12, xs: 12 },
    reverse,
    leftSx,
    rightSx,
    alignItems = "center",
}: TwoColumnSectionProps) => {
    // Helper to determine order based on reverse prop
    const getOrder = (col: "left" | "right") => {
        if (typeof reverse === "boolean") {
            if (col === "left") return reverse ? 2 : 1;
            return reverse ? 1 : 2;
        }
        if (typeof reverse === "object") {
            const order: Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", number>> = {};
            const breakpoints = ["xs", "sm", "md", "lg", "xl"] as const;
            breakpoints.forEach((bp) => {
                if (reverse[bp] !== undefined) {
                    if (col === "left") order[bp] = reverse[bp] ? 2 : 1;
                    else order[bp] = reverse[bp] ? 1 : 2;
                }
            });
            return order;
        }
        return col === "left" ? 1 : 2;
    };

    return (
        <Grid
            container
            spacing={spacing}
            className={className}
            sx={{
                alignItems: alignItems as any,
                ...sx,
            }}
        >
            <Grid
                size={leftSize}
                sx={{
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    order: getOrder("left"),
                    ...leftSx,
                }}
            >
                {left}
            </Grid>

            <Grid
                size={rightSize}
                sx={{
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    order: getOrder("right"),
                    ...rightSx,
                }}
            >
                {right}
            </Grid>
        </Grid>
    );
};
