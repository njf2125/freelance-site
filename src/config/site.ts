export interface SiteConfig {
  availability: "available" | "busy";
  rate: string;
  maxClients: string;
  analyticsToken?: string;
}

export const siteConfig: SiteConfig = {
  availability: "available",
  rate: "$2,500",
  maxClients: "1–2",
  analyticsToken: "", // Paste your Cloudflare Web Analytics token here
};
