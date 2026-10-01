import BrandSlider, {
  type BrandList,
} from "@/components/ui/hero-01-utils/brand-slider";
import Header, {
  type NavigationSection,
} from "@/components/ui/hero-01-utils/header";
import HeroSection, {
  type AvatarList,
} from "@/components/ui/hero-01-utils/hero";

export default function AgencyHeroSection() {
  // Unsplash stock portraits (stable photo IDs) — no fake 21st.dev assets.
  const avatarList: AvatarList[] = [
    {
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&q=80&auto=format&fit=crop",
      name: "Network member",
    },
    {
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&q=80&auto=format&fit=crop",
      name: "Network member",
    },
    {
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop",
      name: "Network member",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=80&auto=format&fit=crop",
      name: "Network member",
    },
  ];

  // Real Next360 routes — every href resolves (no "#" placeholders).
  const navigationData: NavigationSection[] = [
    { title: "Home", href: "/", isActive: true },
    { title: "About", href: "/about" },
    { title: "Organic", href: "/organic" },
    { title: "Projects", href: "/projects" },
    { title: "Capabilities", href: "/capabilities" },
    { title: "Contact", href: "/contact" },
  ];

  // Verified domains from src/lib/site.ts — rendered with lucide icons,
  // not the template's generic brand SVGs.
  const brandList: BrandList[] = [
    { name: "Digital Commerce" },
    { name: "Business Technology" },
    { name: "AI & Computer Vision" },
    { name: "Digital Infrastructure" },
    { name: "Digital Advertising" },
    { name: "Digital Growth" },
  ];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}
