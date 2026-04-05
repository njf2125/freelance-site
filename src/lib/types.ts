export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  featured: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
