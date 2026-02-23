export const HOME_SECTION_TYPOGRAPHY = {
    overline: {
        color: "primary.main",
        fontWeight: 800,
        letterSpacing: "0.18em",
        fontSize: { xs: "0.72rem", md: "0.78rem" },
    },
    heading: {
        fontWeight: 800,
        lineHeight: 1.1,
        letterSpacing: "-0.015em",
        fontSize: { xs: "2rem", sm: "2.3rem", md: "2.8rem" },
    },
    subtitle: {
        color: "text.secondary",
        fontWeight: 400,
        fontSize: { xs: "1rem", md: "1.1rem" },
        lineHeight: 1.7,
        maxWidth: "60ch",
    },
    cardTitle: {
        fontWeight: 700,
        letterSpacing: "-0.01em",
        lineHeight: 1.3,
        fontSize: { xs: "1.15rem", md: "1.25rem" },
    },
    cardBody: {
        color: "text.secondary",
        fontWeight: 400,
        fontSize: { xs: "0.98rem", md: "1rem" },
        lineHeight: 1.65,
    },
} as const;
