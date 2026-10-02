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
  image?: string;
  order?: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags?: string[];
  draft?: boolean;
}

export interface NavLink {
  label: string;
  href: string;
}
