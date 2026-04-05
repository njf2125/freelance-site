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
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
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
      <p className="text-sm text-teal-400">
        Message sent. I&apos;ll be in touch within a day or two.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-mono text-xs text-zinc-500">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none"
            placeholder="Jane Smith"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-mono text-xs text-zinc-500">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none"
            placeholder="jane@company.com"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="message" className="font-mono text-xs text-zinc-500">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="rounded border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 placeholder-zinc-600 focus:border-teal-400 focus:outline-none resize-none"
          placeholder="Tell me about your project..."
        />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        className="self-start rounded bg-teal-400 px-5 py-2 text-sm font-semibold text-zinc-950 hover:bg-teal-300 disabled:opacity-50"
      >
        {status === "loading" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
