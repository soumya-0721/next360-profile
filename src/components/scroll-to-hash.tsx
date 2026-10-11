"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/*
  Scrolls to the element named in the URL hash after navigation.

  Next's client router restores scroll on route changes, which can leave a
  same-page hash link (for example the navbar's /#institutional-partner) at the
  top of the page instead of on the target section. This listens for hash
  changes and scrolls the target into view once the new route has painted.

  scrollIntoView() is called with no arguments so the html scroll-behavior and
  scroll-padding-top rules in globals.css are honoured: the jump is smooth by
  default, instant under prefers-reduced-motion, and always clears the fixed
  pill navbar.
*/
export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      if (!id) return;
      const target = document.getElementById(id);
      if (target) target.scrollIntoView();
    };

    const timer = window.setTimeout(scrollToHash, 0);
    window.addEventListener("hashchange", scrollToHash);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  return null;
}
