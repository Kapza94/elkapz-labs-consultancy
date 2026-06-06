export type Locale = "en" | "sr-Latn";

export interface ServiceItem {
  title: string;
  description: string;
  deliverables: string[];
}

export interface PricingItem {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Dictionary {
  meta: {
    title: string;
    description: string;
  };
  common: {
    brandLabel: string;
    location: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    bookAudit: string;
    seeServices: string;
    getStarted: string;
    selectedLanguage: string;
  };
  nav: {
    services: string;
    whyUs: string;
    process: string;
    pricing: string;
    faq: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    proof: string[];
    workflow: {
      label: string;
      input: string;
      inputItems: string[];
      system: string;
      systemItems: string[];
      output: string;
      outputItems: string[];
      status: string;
    };
  };
  problem: {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{ title: string; detail: string }>;
    conclusion: string;
  };
  services: {
    eyebrow: string;
    title: string;
    description: string;
    items: ServiceItem[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    description: string;
    bridge: string;
    roles: Array<{
      label: string;
      title: string;
      experience: string;
      skills: string[];
    }>;
  };
  process: {
    eyebrow: string;
    title: string;
    description: string;
    steps: Array<{ title: string; description: string; output: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    items: PricingItem[];
    note: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    items: FaqItem[];
  };
  cta: {
    eyebrow: string;
    title: string;
    description: string;
    response: string;
  };
  contact: {
    title: string;
    description: string;
    fields: {
      name: string;
      email: string;
      company: string;
      phone: string;
      service: string;
      challenge: string;
      consent: string;
    };
    placeholders: {
      name: string;
      email: string;
      company: string;
      phone: string;
      challenge: string;
    };
    services: {
      prompt: string;
      audit: string;
      launch: string;
      build: string;
      automate: string;
      advisor: string;
      unsure: string;
    };
    submit: string;
    submitting: string;
    success: string;
    error: string;
    unavailable: string;
    privacy: string;
    invalidField: string;
  };
  footer: {
    description: string;
    navigation: string;
    contact: string;
    contactForm: string;
    rights: string;
  };
}
