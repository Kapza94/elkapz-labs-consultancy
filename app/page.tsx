import { Faq } from "@/components/landing/faq";
import { FinalCta } from "@/components/landing/final-cta";
import { Footer } from "@/components/landing/footer";
import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Pricing } from "@/components/landing/pricing";
import { Problem } from "@/components/landing/problem";
import { Process } from "@/components/landing/process";
import { Services } from "@/components/landing/services";
import { WhyUs } from "@/components/landing/why-us";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "elkapz labs",
  description:
    "Practical AI implementation and automation for small businesses.",
  email: "elkapzlabs@gmail.com",
  areaServed: "Europe",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Belgrade",
    addressCountry: "RS",
  },
  serviceType: [
    "AI business audit",
    "AI implementation",
    "Business process automation",
    "Software integration",
  ],
};

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-3 z-[100] -translate-y-20 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-ink transition-transform duration-150 focus:translate-y-0"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Services />
        <WhyUs />
        <Process />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
