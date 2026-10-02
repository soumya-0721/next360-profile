"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import { company } from "@/lib/site";

/*
  Floating WhatsApp action. For a Hyderabad B2B audience a chat link converts
  noticeably better than email alone, and it is reachable without scrolling to
  the footer.

  Appears only after the visitor has shown intent (600px of scroll) so it never
  covers the hero on first paint, and it stays clear of the cookie-free layout
  on small screens. Opens in a new tab so the contact page is not lost.
*/
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = `https://wa.me/${company.contact.whatsapp}?text=${encodeURIComponent(
    `Hello ${company.name}, I would like to discuss a requirement.`,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Next360 on WhatsApp"
      className={`fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-all duration-300 hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 md:bottom-8 md:right-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <MessageCircle className="h-7 w-7" aria-hidden="true" />
    </a>
  );
}