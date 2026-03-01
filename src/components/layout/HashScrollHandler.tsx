import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Handles scrolling to an element when the URL contains a hash (e.g., /about-us#vision).
 * Standard browser behavior often fails in SPAs when content loads asynchronously.
 */
export const HashScrollHandler = () => {
    const { hash, pathname, search, key } = useLocation();

    useEffect(() => {
        if (!("scrollRestoration" in window.history)) return;

        const previous = window.history.scrollRestoration;
        window.history.scrollRestoration = "manual";

        return () => {
            window.history.scrollRestoration = previous;
        };
    }, []);

    useEffect(() => {
        if (!hash) {
            // Reset scroll on route changes without hash fragments.
            window.scrollTo({ top: 0, left: 0, behavior: "auto" });

            // Re-apply after paint in case a late browser restore/layout shift occurs.
            const rafId = window.requestAnimationFrame(() => {
                window.scrollTo({ top: 0, left: 0, behavior: "auto" });
            });

            return () => window.cancelAnimationFrame(rafId);
        }

        const id = (() => {
            try {
                return decodeURIComponent(hash.replace("#", ""));
            } catch {
                return hash.replace("#", "");
            }
        })();

        const scrollToTarget = () => {
            const element = document.getElementById(id);
            if (!element) return false;
            element.scrollIntoView({ behavior: "auto", block: "start" });
            return true;
        };

        // Fast path when target is already mounted.
        if (scrollToTarget()) return;

        let stopped = false;

        const stop = () => {
            if (stopped) return;
            stopped = true;
            observer.disconnect();
            window.clearInterval(intervalId);
            window.clearTimeout(timeoutId);
        };

        // Watch for async-rendered sections (e.g. data-loaded page content).
        const observer = new MutationObserver(() => {
            if (scrollToTarget()) {
                stop();
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Poll as a fallback for non-mutation layout timing.
        const intervalId = window.setInterval(() => {
            if (scrollToTarget()) {
                stop();
            }
        }, 100);

        // Avoid keeping observers forever if the id does not exist.
        const timeoutId = window.setTimeout(() => {
            stop();
        }, 7000);

        return () => {
            stop();
        };
    }, [hash, pathname, search, key]);

    return null;
};
