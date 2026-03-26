import { medicalBusinessJsonLd } from "@/lib/jsonld";
import { WaveDivider } from "@/components/shared/WaveDivider";
import { Hero } from "@/components/sections/Hero";
import { QuizCTA } from "@/components/sections/QuizCTA";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { Results } from "@/components/sections/Results";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { PartnershipCTA } from "@/components/sections/PartnershipCTA";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd()) }}
      />
      <Hero />

      <WaveDivider
        fromColor="var(--color-brand-cream)"
        toColor="var(--color-teal-bg)"
        variant={1}
      />

      <QuizCTA />

      <WaveDivider
        fromColor="var(--color-teal-bg)"
        toColor="var(--color-brand-cream)"
        variant={2}
      />

      <ThreePillars />

      <WaveDivider
        fromColor="var(--color-brand-cream)"
        toColor="var(--color-teal-bg)"
        variant={3}
      />

      <Results />

      <WaveDivider
        fromColor="var(--color-teal-bg)"
        toColor="var(--color-brand-bg)"
        variant={4}
      />

      <AboutPreview />

      <WaveDivider
        fromColor="var(--color-brand-bg)"
        toColor="var(--color-teal-bg)"
        variant={1}
      />

      <Testimonials />

      <WaveDivider
        fromColor="var(--color-teal-bg)"
        toColor="var(--color-brand)"
        variant={2}
      />

      <PartnershipCTA />

      <WaveDivider
        fromColor="var(--color-brand)"
        toColor="var(--color-warm-bg)"
        variant={3}
      />

      <BlogPreview />
    </>
  );
}
