"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const topics = [
  "Company profile",
  "Digital Commerce",
  "Business Technology",
  "AI & Computer Vision",
  "Digital Infrastructure",
  "Digital Advertising",
  "Digital Growth",
  "Partnership",
  "Careers",
];

/*
  Loading, success and error states are all real (antislop R-27), and the form
  posts to a live route rather than only looking interactive (R-26).
*/
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [topic, setTopic] = useState<string>(topics[0]!);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const nextErrors: Record<string, string> = {};
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Enter your name.";
    if (!email) nextErrors.email = "Enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    if (!message) nextErrors.message = "Tell us what you need.";

    setErrors(nextErrors);
    setServerError("");

    if (Object.keys(nextErrors).length > 0) {
      const firstKey = Object.keys(nextErrors)[0]!;
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation: String(data.get("organisation") ?? ""),
          topic,
          message,
        }),
      });

      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      setStatus("success");
      form.reset();
      setTopic(topics[0]!);
    } catch {
      setStatus("error");
      setServerError(
        "The message could not be sent. Please try again or use the contact details listed.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-[2rem] border border-gray-200 bg-gray-100 p-8 sm:p-10"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
          Message sent
        </span>
        <h2 className="mt-4 text-3xl font-black tracking-tight">
          Thank you, it is received.
        </h2>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-600">
          The Next360 team will respond using the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 inline-flex min-h-11 items-center rounded-full border border-gray-300 px-5 text-sm font-bold transition hover:border-black"
        >
          Send another message
        </button>
      </div>
    );
  }

  /*
    Height lives here only. Callers used to append `min-h-12`, which collided
    with the `min-h-11` returned below - two conflicting utilities on one node.
  */
  const inputClass = (hasError: boolean) =>
    `mt-2 min-h-12 w-full rounded-full border bg-white px-4 text-[15px] transition placeholder:text-gray-400 focus:border-brand-green ${
      hasError ? "border-red-500" : "border-gray-200"
    }`;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-[2rem] border border-gray-200 bg-white p-6 sm:p-8"
    >
      <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">
        Enquiry
      </h2>

      <fieldset className="mt-5">
        <legend className="text-[13px] font-bold text-gray-900">
          Which line is this about?
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              aria-pressed={topic === t}
              className={`min-h-10 rounded-full border px-4 text-[13.5px] font-semibold transition ${
                topic === t
                  ? "border-black bg-black text-white"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-400"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-[13px] font-bold text-gray-900">
            Name<span className="ml-1 text-brand-green-ink">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(!!errors.name)}
          />
          {errors.name ? (
            <p id="name-error" className="mt-1.5 text-[13px] font-medium text-red-600">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-[13px] font-bold text-gray-900">
            Email<span className="ml-1 text-brand-green-ink">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(!!errors.email)}
            placeholder="you@company.com"
          />
          {errors.email ? (
            <p id="email-error" className="mt-1.5 text-[13px] font-medium text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="organisation"
            className="block text-[13px] font-bold text-gray-900"
          >
            Organisation
            <span className="ml-2 font-normal text-gray-500">(optional)</span>
          </label>
          <input
            id="organisation"
            name="organisation"
            type="text"
            autoComplete="organization"
            className={inputClass(false)}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block text-[13px] font-bold text-gray-900"
          >
            Message<span className="ml-1 text-brand-green-ink">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            aria-invalid={errors.message ? true : undefined}
            aria-describedby={errors.message ? "message-error" : undefined}
            className={`mt-2 w-full rounded-3xl border bg-white px-4 py-3 text-[15px] leading-relaxed transition placeholder:text-gray-400 focus:border-brand-green ${
              errors.message ? "border-red-500" : "border-gray-200"
            }`}
            placeholder="What do you need from Next360?"
          />
          {errors.message ? (
            <p id="message-error" className="mt-1.5 text-[13px] font-medium text-red-600">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="mt-5 rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] leading-relaxed text-red-700"
        >
          {serverError}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex min-h-12 items-center justify-center rounded-full bg-brand-accent px-7 text-sm font-bold text-black transition hover:bg-brand-green hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending..." : "Send enquiry"}
        </button>
        <p className="text-[13px] text-gray-500">
          Fields marked <span className="text-brand-green-ink">*</span> are required.
        </p>
      </div>
    </form>
  );
}
