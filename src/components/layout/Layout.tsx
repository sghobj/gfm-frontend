import {DesktopNav} from "../navigation/DesktopNav.tsx";
import type {ReactNode} from "react";

type LayoutProps = {
    children: ReactNode;
};

export const Layout = ({children}: LayoutProps) => {
    return (
        <>
            <DesktopNav />
            <div className={"content-container"}>{children}</div>
        </>
    )
}