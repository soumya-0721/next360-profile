import {
  Cctv,
  Code2,
  Leaf,
  Megaphone,
  Store,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/reveal";

export type BrandList = {
  name: string;
  image?: string;
  lightimg?: string;
  icon?: LucideIcon;
};

const DOMAIN_ICONS: Record<string, LucideIcon> = {
  "Digital Commerce": Store,
  "Business Technology": Code2,
  "AI & Computer Vision": Cctv,
  "Digital Infrastructure": Cctv,
  "Digital Advertising": Megaphone,
  "Digital Growth": TrendingUp,
  "Next360 Organic": Leaf,
};

export default function BrandSlider({
  brandList,
}: {
  brandList: BrandList[];
}) {
  const items =
    brandList.length > 0
      ? brandList
      : [
          { name: "Digital Commerce" },
          { name: "Business Technology" },
          { name: "AI & Computer Vision" },
          { name: "Digital Infrastructure" },
          { name: "Digital Advertising" },
          { name: "Digital Growth" },
        ];

  return (
    <section
      aria-label="Technology domains"
      className="relative border-t border-white/10 bg-black py-10"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-bold uppercase tracking-widest text-gray-400">
          Six domains · One delivery team
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-3">
          {items.map((brand, i) => {
            const Icon =
              brand.icon ?? DOMAIN_ICONS[brand.name] ?? TrendingUp;
            return (
              <Reveal
                key={brand.name}
                as="li"
                duration={650}
                delay={i * 70}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-200 backdrop-blur-md"
              >
                <Icon
                  className="h-4 w-4 text-brand-accent"
                  aria-hidden="true"
                />
                {brand.name}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
