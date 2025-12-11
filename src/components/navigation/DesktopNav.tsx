import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem,
    Link,
    Button,
} from "@heroui/react";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import './DesktopNav.css'

export const AcmeLogo = () => {
    return (
        <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
            />
        </svg>
    );
};

export const DesktopNav = () => {
    const { t, i18n } = useTranslation("common");

    const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

    const toggleLanguage = () => {
        const nextLang = currentLang === "en" ? "ar" : "en";
        i18n.changeLanguage(nextLang);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        t('nav.home'),
        t("nav.about"),
        t('nav.contact')
    ];

    return (
        <Navbar className={'navbar'} maxWidth="full" onMenuOpenChange={setIsMenuOpen} >
            <NavbarContent>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">ACME</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-10" justify="start" dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        {t('nav.home')}
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link aria-current="page" href="#">
                        {t("nav.about")}
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        {        t('nav.contact')
                        }                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <NavbarItem className="hidden lg:flex">
                    <Button
                        onClick={toggleLanguage}
                        style={{
                            padding: "0.3rem",
                            borderRadius: "999px",
                            border: "1px solid #ccc",
                            background: "white",
                            cursor: "pointer"
                        }}
                    >
                        {currentLang === "en" ? "عربي" : "EN"}
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu dir={i18n.language.startsWith("ar") ? "rtl" : "ltr"}>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

