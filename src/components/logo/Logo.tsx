import { useQuery } from "@apollo/client/react";
import { GoodFoodMoodLogoDocument } from "../../graphql/gql/graphql";
import { resolveStrapiMediaUrl } from "../../utils/strapiMedia";

type LogoProps = {
    width?: number | string;
};

const FALLBACK_NAV_LOGO_URL =
    "https://res.cloudinary.com/ds8bdxtzs/image/upload/v1772346627/gfm/large_shear_mzaj_alghdhae_aljyd_879b4f3f61.png";

export const Logo = ({ width }: LogoProps) => {
    const { data } = useQuery(GoodFoodMoodLogoDocument);

    const logo = data?.goodFoodMoodLogo?.logo;
    const logoUrl = resolveStrapiMediaUrl(logo?.url) || FALLBACK_NAV_LOGO_URL;
    const logoAlt = logo?.alternativeText || logo?.caption || "logo";

    return <img src={logoUrl} alt={logoAlt} width={width} />;
};
