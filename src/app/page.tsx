import { BadgeGenerator } from "@/components/BadgeGenerator";
import { CtaBand } from "@/components/CtaBand";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { ProgrammeTimeline } from "@/components/ProgrammeTimeline";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { SpeakersSection } from "@/components/SpeakersSection";

export default function HomePage() {
  return (
    <div className="grid-bg min-h-[100dvh]">
      <SiteNav />
      <main>
        <Hero />
        <ProgrammeTimeline />
        <SpeakersSection />
        <BadgeGenerator />
        <GallerySection />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
