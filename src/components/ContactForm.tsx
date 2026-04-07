"use client";

import { useState, FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      access_key: "2d154c79-ba64-4b38-8a38-b6c1986fdd53",
      subject: "New inquiry — nickfig.dev",
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error ?? "Something went wrong.");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <p className="text-sm" style={{ color: "var(--accent)" }}>
        Message sent. I&apos;ll be in touch within a day or two.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded border px-4 py-3 text-sm focus:outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            placeholder="Jane Smith"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border px-4 py-3 text-sm focus:outline-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
            style={{
              backgroundColor: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-widest text-[var(--faint)]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded border px-4 py-3 text-sm focus:outline-none resize-none transition-colors focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]"
          style={{
            backgroundColor: "var(--surface)",
            borderColor: "var(--border)",
            color: "var(--text)",
          }}
          placeholder="Tell me about your project..."
        />
      </div>
      {status === "error" && (
        <p className="text-sm" style={{ color: "var(--text)" }}>{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded-md px-6 py-3 text-sm font-medium text-white transition-opacity disabled:opacity-50"
        style={{ backgroundColor: "var(--accent)" }}
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
