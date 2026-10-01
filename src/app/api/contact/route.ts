import { NextResponse } from "next/server";

/*
  Contact endpoint. The form must have a real destination (antislop R-26),
  so this route validates input and returns structured success/error.
  Delivery is not wired to a mail provider yet: pending client contact
  configuration. Until it is, this confirms receipt only and does not claim
  delivery to an inbox.
*/
type Payload = {
  name?: unknown;
  email?: unknown;
  organisation?: unknown;
  topic?: unknown;
  message?: unknown;
};

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
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";

  const errors: Record<string, string> = {};

  if (!name) errors.name = "Name is required.";
  if (!email) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Email address is invalid.";
  if (!message) errors.message = "Message is required.";
  if (message.length > 5000) errors.message = "Message is too long.";

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      { ok: false, errors },
      { status: 422 },
    );
  }

  // TODO: forward to the client's inbox once contact configuration is confirmed.
  console.info("[contact] enquiry accepted", {
    name,
    email,
    topic: typeof payload.topic === "string" ? payload.topic : "",
  });

  return NextResponse.json({ ok: true });
}
