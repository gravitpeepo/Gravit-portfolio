import GlobalAtmosphere from "@/components/GlobalAtmosphere";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import VideoInterlude from "@/components/VideoInterlude";
import FeaturedWork from "@/components/FeaturedWork";
import ToolsetSection from "@/components/ToolsetSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <GlobalAtmosphere />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <main className="relative">
        <HeroSection />
        <VideoInterlude />
        <FeaturedWork />
        <ToolsetSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
