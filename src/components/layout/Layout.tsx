import { DesktopNav } from "../navigation/DesktopNav.tsx";
import "./Layout.css";
import { Outlet } from "react-router-dom";
import { Footer } from "../footer/Footer.tsx";

export const Layout = () => {
    return (
        <>
            <DesktopNav />
            <div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};
