"use client";

import Image from "next/image";
import { useState } from "react";

import { collaborators, mentorship } from "@/lib/site";

/* Initials fallback while the real portrait file is on its way. */
function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function MentorCard({
  mentor,
}: {
  mentor: (typeof mentorship)[number];
}) {
  const [failed, setFailed] = useState(false);
  const showPhoto = mentor.photo !== "" && !failed;

  return (
    <div className="flex w-72 shrink-0 items-center gap-4 rounded-3xl border border-gray-200 bg-white p-5">
      {showPhoto ? (
        <Image
          src={mentor.photo}
          alt={`Portrait of ${mentor.name}`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent text-lg font-black text-black"
        >
          {initials(mentor.name)}
        </span>
      )}
      <div className="min-w-0">
        <p className="truncate text-base font-bold text-neutral-900">
          {mentor.name}
        </p>
        <p className="truncate text-[13px] font-medium text-neutral-500">
          {mentor.title} · {mentor.org}
        </p>
      </div>
    </div>
  );
}

function PartnerCard({
  partner,
}: {
  partner: (typeof collaborators)[number];
}) {
  const [failed, setFailed] = useState(false);
  const showLogo = partner.logo !== "" && !failed;

  return (
    <div className="flex h-20 shrink-0 items-center justify-center rounded-2xl border border-gray-200 bg-white px-10">
      {showLogo ? (
        <Image
          src={partner.logo}
          alt={`${partner.name} logo`}
          width={160}
          height={48}
          className="h-10 w-auto object-contain"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="whitespace-nowrap text-xl font-black tracking-tight text-neutral-900">
          {partner.name}
        </span>
      )}
    </div>
  );
}

/*
  Scrolling mentors + partners strip. Person portraits scroll in row one,
  company logos in row two (reverse). Duplicated content makes the loop
  seamless; the copy is aria-hidden. Pauses on hover; static under
  prefers-reduced-motion (see globals.css).
*/
export function MentorMarquee() {
  return (
    <div className="space-y-4" aria-label="Mentors and partners">
      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {mentorship.map((m) => (
            <MentorCard key={m.name} mentor={m} />
          ))}
          {mentorship.map((m) => (
            <div key={`dup-${m.name}`} aria-hidden="true" className="contents">
              <MentorCard mentor={m} />
            </div>
          ))}
        </div>
      </div>

      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-marquee gap-4 [animation-direction:reverse] group-hover:[animation-play-state:paused]">
          {collaborators.map((c) => (
            <PartnerCard key={c.name} partner={c} />
          ))}
          {collaborators.map((c) => (
            <div key={`dup-${c.name}`} aria-hidden="true" className="contents">
              <PartnerCard partner={c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
