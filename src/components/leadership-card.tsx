"use client";

import Image from "next/image";
import { useState } from "react";

/*
  Leadership portraits. Kept as its own client component so /about stays a
  Server Component and can keep exporting metadata.

  site.ts points at the final filenames. onError falls back to initials so a
  missing file shows a clean monogram instead of a broken-image icon.
*/
function LeaderPortrait({ name, src }: { name: string; src: string }) {
  const [failed, setFailed] = useState(false);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  if (!src || failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-brand-accent text-xl font-black text-black"
      >
        {initials}
      </span>
    );
  }
  return (
    <Image
      src={src}
      alt={`Portrait of ${name}`}
      width={72}
      height={72}
      className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

export function LeaderCard({
  name,
  role,
  bio,
  photo,
}: {
  name: string;
  role: string;
  bio: string;
  photo: string;
}) {
  return (
    <div className="flex h-full gap-5 rounded-[2rem] border border-gray-200 bg-white p-7">
      <LeaderPortrait name={name} src={photo} />
      <div className="min-w-0">
        <h3 className="text-xl font-bold leading-tight">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-brand-green-ink">{role}</p>
        {bio ? (
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{bio}</p>
        ) : null}
      </div>
    </div>
  );
}