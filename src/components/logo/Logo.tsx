type LogoProps = {
    width?: number | string;
};

export const Logo = ({ width }: LogoProps) => {
    return (
        <img
            src={new URL("../../assets/gfmco-bgn.png", import.meta.url).href}
            alt={"logo"}
            width={width}
        />
    );
};
