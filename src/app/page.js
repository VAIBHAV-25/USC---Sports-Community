import Hero from "@/components/Hero";
import EventsSection from "@/components/EventsSection";
import PollsSection from "@/components/PollsSection";
import ParticipationForm from "@/components/ParticipationForm";
import SuggestionsSection from "@/components/SuggestionsSection";
import GallerySection from "@/components/GallerySection";

export default function Home() {
  return (
    <main>
      <Hero />
      <EventsSection />
      <PollsSection />
      <ParticipationForm />
      <SuggestionsSection />
      <GallerySection />
    </main>
  );
}
