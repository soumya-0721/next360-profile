import { NextResponse } from "next/server";

import { company } from "@/lib/site";

/*
  Contact endpoint. Validates input, then delivers for real.

  Delivery (antislop R-26): enquiries used to be accepted and logged only,
  so every submission silently disappeared. This now sends through Resend to
  the company inbox. Two deliberate behaviours:

  - If RESEND_API_KEY is absent the request still validates and still returns
    200, but the response carries delivery:false and the server logs loudly.
    That keeps local previews working without ever telling a visitor their
    enquiry arrived when it did not.
  - A provider failure returns 502 so the form shows its error state instead
    of a false confirmation.

  Required env:
    RESEND_API_KEY   re_...            (resend.com, free tier)
    CONTACT_TO       inbox to receive   (defaults to office@next360.in)
*/
type Payload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  topic?: unknown;
  message?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE = 5000;

export async function POST(req: Request) {
  let payload: Payload;

  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const name = typeof payload.name === "string" ? payload.name.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const organisation =
    typeof payload.organisation === "string" ? payload.organisation.trim() : "";
  const topic = typeof payload.topic === "string" ? payload.topic.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) errors.email = "Email address is invalid.";
  if (!message) errors.message = "Message is required.";
  if (message.length > MAX_MESSAGE) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? company.contact.email;

  /*
    No key configured (local dev, or a deploy missing its secret). Say so in
    the server log rather than pretending the enquiry was delivered.
  */
  if (!apiKey) {
    console.warn(
      "[contact] RESEND_API_KEY missing — enquiry validated but NOT delivered",
      { name, email, topic, organisation },
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  const subject = `Next360 enquiry: ${topic || "General"}${name ? ` — ${name}` : ""}`;
  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    organisation ? `Organisation: ${organisation}` : null,
    topic ? `Topic: ${topic}` : null,
    "",
    "Message:",
    message,
    "",
    "--",
    `Sent from ${company.contact.website}`,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Next360 Website <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject,
        text,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[contact] Resend rejected the enquiry: ${res.status}`, detail.slice(0, 500));
      return NextResponse.json(
        { ok: false, error: "Could not send your message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] delivery threw", err);
    return NextResponse.json(
      { ok: false, error: "Could not send your message. Please try again." },
      { status: 502 },
    );
  }
}