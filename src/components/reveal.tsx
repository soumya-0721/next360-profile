"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Override the default 800ms rise. Hero entrances run at 700ms. */
  duration?: number;
  as?: "div" | "section" | "li" | "article" | "header";
};

/*
  The reference marks blocks with [data-animation-on-scroll] and toggles
  .animate-on-scroll-hidden -> .animate-on-scroll-visible through an
  IntersectionObserver at threshold 0.05. Same classes, same threshold.
  Unobserves after first fire, and shows immediately when JS or the observer
  is unavailable so content is never left invisible.
*/
export function Reveal({
  children,
  className = "",
  delay = 0,
  duration,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const Tag = as;

  const style: { transitionDelay?: string; transitionDuration?: string } = {};
  if (delay) style.transitionDelay = `${delay}ms`;
  if (duration) style.transitionDuration = `${duration}ms`;

  return (
    <Tag
      ref={ref as never}
      data-animation-on-scroll=""
      className={`${
        visible ? "animate-on-scroll-visible" : "animate-on-scroll-hidden"
      } ${className}`}
      style={delay || duration ? style : undefined}
    >
      {children}
    </Tag>
  );
}
