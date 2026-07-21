import { BadgeGenerator } from "@/components/BadgeGenerator";
import { CtaBand } from "@/components/CtaBand";
import { GallerySection } from "@/components/GallerySection";
import { Hero } from "@/components/Hero";
import { ProgrammeTimeline } from "@/components/ProgrammeTimeline";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
// import { SpeakersSection } from "@/components/SpeakersSection";
// import { speakerFlyers } from "@/data/speakers";
import { fetchPublicBadges } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dbBadges = await fetchPublicBadges();

  // --- Intervenants (flyers designer) : décommenter quand tous les flyers sont prêts ---
  // const flyers = speakerFlyers;
  // <SpeakersSection flyers={flyers} />
  // ------------------------------------------------------------------------------------

  const badges = dbBadges.map((b) => ({
    id: b.id,
    name: b.display_name ?? "",
    photo: b.image_url,
  }));

  return (
    <div className="grid-bg min-h-[100dvh]">
      <SiteNav />
      <main>
        <Hero />
        <ProgrammeTimeline />
        {/* Section intervenants masquée en attendant les flyers designer. */}
        {/* <SpeakersSection flyers={speakerFlyers} /> */}
        <BadgeGenerator />
        <GallerySection badges={badges} fromDatabase />
        <CtaBand />
      </main>
      <SiteFooter />
    </div>
  );
}
