import { ArrowRight, BadgeCheck, Sprout } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { company, photos } from "@/lib/site";

export type AvatarList = {
  image: string;
  name?: string;
};

const FALLBACK_AVATARS: AvatarList[] = [
  {
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=96&q=80&auto=format&fit=crop",
    name: "Partner",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&q=80&auto=format&fit=crop",
    name: "Collaborator",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&q=80&auto=format&fit=crop",
    name: "Developer",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=96&q=80&auto=format&fit=crop",
    name: "Producer",
  },
];

export default function HeroSection({
  avatarList = FALLBACK_AVATARS,
}: {
  avatarList?: AvatarList[];
}) {
  const avatars = avatarList.length > 0 ? avatarList : FALLBACK_AVATARS;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Keep the existing site hero image — same asset as the homepage. */}
      <div className="absolute inset-0">
        <Image
          src={photos.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-24 pt-36">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-4 shadow-lg backdrop-blur-md">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-accent text-[10px] font-bold text-brand-dark">
              360
            </span>
            <span className="text-xs font-bold uppercase tracking-wide text-white">
              Digital Commerce + AI + Infrastructure
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-black leading-[0.9] tracking-tighter text-white drop-shadow-xl lg:text-8xl">
            BUILDING
            <br />
            <span className="bg-gradient-to-r from-brand-accent to-brand-green bg-clip-text text-transparent">
              TECHNOLOGY.
            </span>
          </h1>

          <p className="mb-4 max-w-xl text-xl font-bold leading-relaxed text-white drop-shadow-md">
            {company.tagline}
          </p>
          <p className="mb-10 max-w-xl text-lg font-medium leading-relaxed text-gray-200 drop-shadow-md">
            {company.heroLede}
          </p>

          <div className="mb-12 flex flex-col gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-brand-accent px-8 py-4 font-bold text-black hover:bg-brand-green"
            >
              <Link href="/organic">
                <Sprout className="mr-1 h-4 w-4" aria-hidden="true" />
                See the flagship project
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-white/20 bg-white/10 px-8 py-4 font-bold text-white backdrop-blur-md hover:bg-white hover:text-black"
            >
              <Link href="/contact">
                Request Company Profile
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.slice(0, 4).map((avatar, i) => (
                <Image
                  key={`${avatar.image}-${i}`}
                  src={avatar.image}
                  alt={avatar.name ?? `Next360 network member ${i + 1}`}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full border-2 border-white object-cover"
                />
              ))}
            </div>
            <p className="flex items-center gap-2 text-sm font-medium text-gray-200">
              <BadgeCheck
                className="h-4 w-4 text-brand-accent"
                aria-hidden="true"
              />
              {company.team.extended} professionals across the extended network
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
