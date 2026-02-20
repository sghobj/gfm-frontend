import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scrolling to an element when the URL contains a hash (e.g., /about-us#vision).
 * Standard browser behavior often fails in SPAs when content loads asynchronously.
 */
export const HashScrollHandler = () => {
    const { hash, pathname } = useLocation();

    useEffect(() => {
        if (hash) {
            // Use a slight timeout to ensure the DOM has rendered,
            // especially if data is being fetched.
            const timeoutId = setTimeout(() => {
                const id = hash.replace("#", "");
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);

            return () => clearTimeout(timeoutId);
        }
    }, [hash, pathname]);

    return null;
};
