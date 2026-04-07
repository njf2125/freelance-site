export interface StatCard {
  label: string;
  value: string;
  highlight?: boolean;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  stack: string[];
  problem: string;
  whatWasBuilt: string;
  outcome: string;
  featured: boolean;
  stats?: StatCard[];
}

export interface NavLink {
  label: string;
  href: string;
}
