import React from "react";
import type { SxProps } from "@mui/system";
import { TwoColumnSection } from "../section/TwoColumnSection.tsx";
import { Scheme } from "../scheme/Scheme.tsx";
import type { SchemeId } from "../../theme/schemes.ts";
import type { ResponsiveStyleValue } from "@mui/system";

type SectionLayoutProps = {
    schemeId: SchemeId;
    left?: React.ReactNode;
    right?: React.ReactNode;
    className?: string;
    sx?: SxProps;
    rightSx?: SxProps;
    leftSx?: SxProps;
    reverse?: boolean | Partial<Record<"xs" | "sm" | "md" | "lg" | "xl", boolean>>;
    spacing?: ResponsiveStyleValue<number>;
    alignItems?: ResponsiveStyleValue<
        "flex-start" | "center" | "flex-end" | "stretch" | "baseline"
    >;
};

export const SectionLayout: React.FC<SectionLayoutProps> = ({
    left,
    right,
    className,
    sx,
    rightSx,
    schemeId,
    leftSx,
    reverse,
    spacing = { xs: 4, md: 10 },
    alignItems = "center",
}) => {
    return (
        <Scheme
            id={schemeId}
            sx={[
                {
                    py: { xs: 8, md: 12 },
                    display: "flex",
                    justifyContent: "center",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <TwoColumnSection
                className={className}
                left={left}
                right={right}
                sx={{
                    maxWidth: "1440px",
                    width: "100%",
                    mx: "auto",
                    px: { xs: 2, sm: 4, md: 6 },
                }}
                rightSx={rightSx}
                leftSx={leftSx}
                reverse={reverse}
                spacing={spacing}
                alignItems={alignItems}
            />
        </Scheme>
    );
};
