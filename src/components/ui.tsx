import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { Reveal } from "@/components/reveal";

/* Reference section marker: uppercase tracked label (dot removed per owner request). */
export function SectionLabel({
  label,
  tone = "light",
  className = "",
}: {
  label: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span
        className={`text-sm font-bold uppercase tracking-widest ${
          tone === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* Reference heading sizes, split by tone. */
export function SectionTitle({
  children,
  tone = "light",
  align = "left",
  className = "",
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "right" | "center";
  className?: string;
}) {
  const color = tone === "dark" ? "text-white" : "text-gray-900";
  const alignClass =
    align === "right"
      ? "text-right"
      : align === "center"
        ? "text-center"
        : "";
  return (
    <h2
      className={`text-3xl font-bold leading-tight md:text-5xl ${color} ${alignClass} ${className}`}
    >
      {children}
    </h2>
  );
}

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "accent" | "dark" | "white" | "outline" | "green";
  className?: string;
};

/* Reference pill buttons: rounded-full, bold, arrow that straightens on hover. */
export function ButtonLink({
  href,
  children,
  variant = "accent",
  className = "",
}: ButtonLinkProps) {
  const styles = {
    accent:
      "bg-brand-accent text-black hover:bg-brand-green hover:text-black shadow-[0_4px_20px_rgba(204,255,0,0.3)]",
    dark: "bg-black text-white hover:bg-gray-800",
    white: "bg-white text-black hover:bg-brand-accent",
    outline:
      "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-black",
    green: "bg-[#5a8c23] text-white hover:bg-[#4a751a] shadow-lg shadow-green-900/20",
  }[variant];

  return (
    <Link
      href={href}
      className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold tracking-wide transition duration-300 ${styles} ${className}`}
    >
      {children}
      <i
        className="fa-solid fa-arrow-right -rotate-45 text-[10px] transition-transform duration-300 group-hover:rotate-0"
        aria-hidden="true"
      />
    </Link>
  );
}

type ImageCardProps = {
  href: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  children?: ReactNode;
  sizes?: string;
};

/* Reference media card: rounded-[2rem], 400px tall, scrim, hover zoom. */
export function ImageCard({
  href,
  src,
  alt,
  title,
  description,
  children,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: ImageCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[400px] overflow-hidden rounded-[2rem]"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-8 left-8 text-white">
        <h3 className="mb-2 text-2xl font-bold uppercase">{title}</h3>
        {description ? (
          <p className="max-w-xs text-sm text-gray-200 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {description}
          </p>
        ) : null}
      </div>
      {children}
      <span className="absolute bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-brand-accent text-black transition group-hover:scale-110">
        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </span>
    </Link>
  );
}

type PhotoBandProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  height?: string;
};

/*
  Large editorial photo: full container width at a fixed height so nothing
  shifts while it loads. No on-image caption pill (removed per owner request);
  the alt text still describes the image for assistive technology.
  ImageCard stays for linked media tiles.
*/
export function PhotoBand({
  src,
  alt,
  caption = "",
  className = "",
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 1152px",
  height = "h-64 md:h-[26rem]",
}: PhotoBandProps) {
  return (
    <figure
      className={`relative overflow-hidden rounded-[2rem] bg-gray-100 ${height} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent"
        aria-hidden="true"
      />
      {caption ? (
        <figcaption className="absolute bottom-5 left-6 rounded-full border border-white/25 bg-black/45 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/*
  Reference dark section turn: near-black floating card with a 2.5rem radius
  on all four sides. Side and bottom margins keep every corner visible
  against the light page and the footer below it.
*/
export function DarkSection({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`relative z-10 mx-4 mb-10 mt-4 rounded-[2.5rem] bg-[#0a0a0a] py-24 text-white md:mx-6 ${className}`}
    >
      {children}
    </section>
  );
}

/* Reference page hero for interior routes: same pill nav clearance and type. */
export function PageHero({
  label,
  title,
  intro,
  children,
}: {
  label: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] pb-20 pt-36 text-white md:pb-24 md:pt-44">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[40px] border-[#1a1a1a]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal>
          <SectionLabel label={label} tone="dark" />
        </Reveal>
        <Reveal delay={80}>
          <h1 className="mt-4 max-w-4xl text-5xl font-black leading-[0.95] tracking-tighter md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {intro ? (
          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              {intro}
            </p>
          </Reveal>
        ) : null}
        {children ? <Reveal delay={240}>{children}</Reveal> : null}
      </div>
    </section>
  );
}
