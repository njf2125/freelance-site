import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Nick Figliolia — Freelance Frontend Engineer",
  description:
    "I build custom web apps and dashboards for teams that have outgrown their off-the-shelf tools.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-300 antialiased flex flex-col">
        <Nav />
        <div className="flex-1">{children}</div>
        <Footer />
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "YOUR_TOKEN_HERE"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
