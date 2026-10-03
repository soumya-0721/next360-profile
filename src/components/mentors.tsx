"use client";

import Image from "next/image";
import { useState } from "react";

import { collaborators, mentorship, panelMembers } from "@/lib/site";

/*
  Two distinct blocks, deliberately not a scrolling loop:

  - MentorPanels: three static panels, one per mentor. A marquee was wrong
    here: these are three named positions, not a stream, and a loop hid half
    of them while repeating them. Panels also stop implying these are staff
    portraits, which matters because the site publishes roles, not people.
  - PartnerLogos: the six collaborator marks, static and wrapping. Logos are
    proof, so they stay still long enough to be read.

  Both degrade gracefully: a missing portrait or logo falls back to
  initials or the company name rather than a broken image.

  Drop real files at the paths in site.ts to replace every fallback:
    /public/images/mentors/mentor-google.jpg
    /public/images/mentors/mentor-intown.jpg
    /public/images/mentors/mentor-thub.jpg
    /public/images/partners/partner-acs.png
    /public/images/partners/partner-logiq-gen.png
    /public/images/partners/partner-intown.png
*/

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function Panel({
  title,
  org,
  note,
  image,
  profile,
  fallback,
}: {
  title: string;
  org: string;
  note: string;
  image: string;
  profile: string;
  fallback: string;
}) {
  /*
    onError drops to the fallback when the file is not in /public yet. Without
    it a missing file renders as a broken-image icon, because site.ts points at
    the final filenames rather than leaving the slots empty.
  */
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(image) && !failed;

  return (
    <article className="flex h-full flex-col rounded-[1.75rem] border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-4">
        {showImage ? (
          <Image
            src={image}
            alt={`Portrait of the ${title} at ${org}`}
            width={52}
            height={52}
            className="h-[52px] w-[52px] shrink-0 rounded-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-brand-accent text-base font-black text-black"
          >
            {fallback}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="text-lg font-bold leading-tight text-neutral-900">
            {title}
          </h3>
          <p className="text-[13px] font-medium text-neutral-500">{org}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-neutral-600">{note}</p>
      {profile ? (
        <a
          href={profile}
          target="_blank"
          rel="noopener noreferrer"
          className="group/prof mt-4 inline-flex items-center gap-1.5 self-start text-[13px] font-bold text-neutral-900 underline-offset-4 hover:underline"
        >
          View profile
          <span
            aria-hidden="true"
            className="transition-transform group-hover/prof:-translate-y-0.5 group-hover/prof:translate-x-0.5"
          >
            &#8599;
          </span>
        </a>
      ) : null}
    </article>
  );
}

export function MentorPanels() {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
        Mentorship &amp; Guidance
      </p>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-600">
        Next360 is guided by experienced technology, business and startup
        professionals.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {mentorship.map((entry) => (
          <Panel
            key={entry.title}
            title={entry.title}
            org={entry.org}
            note={entry.note}
            image={entry.photo}
            profile={entry.profile}
            fallback={initials(entry.org)}
          />
        ))}
      </div>

      {/*
        Named panel members. Rendered as a separate row from the mentorship
        panels: these are people, so they carry a portrait and a link to their
        own profile rather than a note about the guidance they give.
      */}
      {panelMembers.length > 0 ? (
        <>
          <p className="mt-10 text-xs font-bold uppercase tracking-widest text-gray-500">
            Panel Members
          </p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {panelMembers.map((member) => (
              <MemberCard key={member.name} member={member} />
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}

function MemberCard({
  member,
}: {
  member: (typeof panelMembers)[number];
}) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(member.photo) && !failed;
  const hasRole = Boolean(member.role);

  return (
    <li className="flex h-full items-center gap-4 rounded-[1.75rem] border border-gray-200 bg-white p-5">
      {showImage ? (
        <Image
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          width={56}
          height={56}
          className="h-14 w-14 shrink-0 rounded-full object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-accent text-base font-black text-black"
        >
          {initials(member.name)}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="text-base font-bold leading-tight text-neutral-900">
          {member.name}
        </p>
        {hasRole ? (
          <p className="text-[13px] font-medium text-neutral-500">
            {[member.role, member.org].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        <a
          href={member.profile}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-bold text-neutral-900 underline-offset-4 hover:underline"
        >
          LinkedIn
          <span aria-hidden="true">&#8599;</span>
          <span className="sr-only"> profile of {member.name}</span>
        </a>
      </div>
    </li>
  );
}

function Logo({ partner }: { partner: (typeof collaborators)[number] }) {
  const [failed, setFailed] = useState(false);
  const showLogo = Boolean(partner.logo) && !failed;

  if (!showLogo) {
    return (
      <span className="flex h-14 min-w-[140px] items-center justify-center rounded-xl border border-gray-200 bg-white px-6 text-sm font-bold tracking-tight text-neutral-900">
        {partner.name}
      </span>
    );
  }
  return (
    <Image
      src={partner.logo}
      alt={`${partner.name} logo`}
      width={168}
      height={56}
      className="h-14 w-auto max-w-[200px] rounded-xl border border-gray-200 bg-white object-contain p-2.5"
      onError={() => setFailed(true)}
    />
  );
}

export function PartnerLogos() {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {collaborators.map((partner) => (
        <li key={partner.name} className="flex">
          <Logo partner={partner} />
        </li>
      ))}
    </ul>
  );
}
