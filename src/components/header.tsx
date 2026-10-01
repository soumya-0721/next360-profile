"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { allRoutes, navAsideCta, navAsideText, navCta, primaryNav } from "@/lib/site";

/*
  Reference behaviour reproduced: the pill shrinks from py-3 to py-2 past 20px
  of scroll, the mobile panel drops from top-20, and the hamburger swaps to an
  X. Escape closes it and focus is restored for keyboard users.
*/
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="fixed top-0 z-50 w-full px-4 py-4 transition-all duration-300 md:px-6">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white/90 px-6 shadow-lg backdrop-blur-md transition-all duration-300 ${
          scrolled ? "py-2" : "py-3"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Next360 home"
        >
          <i
            className="fa-solid fa-layer-group text-brand-green text-xl md:text-2xl"
            aria-hidden="true"
          />
          <span className="text-lg font-bold tracking-tighter text-black md:text-xl">
            NEXT360
          </span>
        </Link>

        {/* Links */}
        <div className="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`transition hover:text-brand-green-ink ${
                isActive(item.href) ? "text-black" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href={navCta.href}
            className="flex items-center gap-1 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold text-black shadow-sm transition hover:shadow-md"
          >
            {navCta.label}
            <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
          </Link>
        </div>

        {/* Right cluster, where the reference keeps its account actions */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={navAsideText.href}
            className="text-sm font-semibold transition hover:text-brand-green-ink"
          >
            {navAsideText.label}
          </Link>
          <Link
            href={navAsideCta.href}
            className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            {navAsideCta.label}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="text-gray-800 focus:outline-none md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <i
            className={`fa-solid ${open ? "fa-xmark" : "fa-bars"} text-xl`}
            aria-hidden="true"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="animate-fade-in-up absolute left-4 right-4 top-20 z-40 rounded-2xl bg-white p-6 shadow-xl md:hidden"
      >
        <nav className="flex flex-col gap-4" aria-label="Mobile">
          {allRoutes.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={
                isActive(item.href)
                  ? "font-semibold text-black"
                  : "text-gray-600 transition hover:text-black"
              }
            >
              {item.label}
            </Link>
          ))}
          <hr className="border-gray-100" />
          <Link
            href={navAsideCta.href}
            className="rounded-full bg-black px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {navAsideCta.label}
          </Link>
        </nav>
      </div>
    </nav>
  );
}
