"use client";

import { useState, type FormEvent } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import { db } from "@/lib/firebase";
import { track } from "@/lib/analytics";
import { contactForm, contactEmail } from "@/content/contact";

type Fields = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
};
type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const empty: Fields = { name: "", email: "", projectType: "", budget: "", timeline: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputCls =
  "w-full rounded-2xl border border-[var(--glass-border)] bg-[var(--bg)] px-4 py-3.5 text-fg outline-none transition-colors duration-200 placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25";

export default function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [honey, setHoney] = useState(""); // hidden field: humans leave it empty

  function set<K extends keyof Fields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function validate() {
    const e: Errors = {};
    if (fields.name.trim().length < 2) e.name = "Please enter your name.";
    if (!EMAIL_RE.test(fields.email.trim())) e.email = "Please enter a valid email address.";
    if (!fields.projectType) e.projectType = "Choose the kind of project.";
    if (fields.message.trim().length < 20) e.message = "Tell me a little more (at least 20 characters).";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();

    // Bots fill the hidden field. Show success without sending anything.
    if (honey) {
      setStatus("sent");
      return;
    }
    if (!validate()) return;

    setStatus("sending");
    const data = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      projectType: fields.projectType,
      budget: fields.budget,
      timeline: fields.timeline,
      message: fields.message.trim(),
    };

    try {
      await addDoc(collection(db, "quotes"), { ...data, createdAt: serverTimestamp() });
    } catch {
      setStatus("error");
      return;
    }

    // The enquiry is saved. The email alert is best effort.
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
        data,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "" },
      );
    } catch {
      /* the brief is in Firestore even if the alert email fails */
    }

    track("quote_submitted", { project_type: data.projectType });
    setStatus("sent");
    setFields(empty);
    setErrors({});
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <span aria-hidden className="glow-node" />
        <h2 className="font-display text-3xl font-bold tracking-[-0.02em]">{contactForm.successTitle}</h2>
        <p className="max-w-[460px] text-lg text-muted">{contactForm.successText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="glass cursor-pointer rounded-full bg-ghost px-6 py-3 text-fg"
        >
          {contactForm.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      {/* Honeypot: hidden from people, visible to bots */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Your name" error={errors.name}>
          <input
            id="name"
            name="name"
            autoComplete="name"
            className={inputCls}
            value={fields.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
        </Field>
        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={inputCls}
            value={fields.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <Field id="projectType" label="Project type" error={errors.projectType}>
          <select
            id="projectType"
            name="projectType"
            className={inputCls}
            value={fields.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            aria-invalid={!!errors.projectType}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
          >
            <option value="" disabled>
              Choose one
            </option>
            {contactForm.projectTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
        <Field id="budget" label="Budget">
          <select id="budget" name="budget" className={inputCls} value={fields.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Choose one</option>
            {contactForm.budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </Field>
        <Field id="timeline" label="Timing">
          <select id="timeline" name="timeline" className={inputCls} value={fields.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Choose one</option>
            {contactForm.timelines.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="message" label="Tell me about the project" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${inputCls} resize-y`}
          placeholder="What do you need built, who will use it, and what does success look like?"
          value={fields.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
      </Field>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-sm text-muted">{contactForm.privacy}</p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="cursor-pointer rounded-full bg-accent px-7 py-3.5 font-medium !text-on-accent transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
        >
          {status === "sending" ? contactForm.sending : contactForm.submit}
        </button>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-2xl border border-highlight/40 px-4 py-3 text-sm">
          {contactForm.errorText}{" "}
          <a href={`mailto:${contactEmail}`} className="font-medium">
            {contactEmail}
          </a>
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-highlight">
          {error}
        </p>
      )}
    </div>
  );
}