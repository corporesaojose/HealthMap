import Header from "@/components/sections/Header";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import WhatIsSection from "@/components/sections/WhatIsSection";
import PreviewSection from "@/components/sections/PreviewSection";
import ScienceSection from "@/components/sections/ScienceSection";
import ProfilesSection from "@/components/sections/ProfilesSection";
import AboutSection from "@/components/sections/AboutSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaFinalSection from "@/components/sections/CtaFinalSection";
import Footer from "@/components/sections/Footer";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <ScrollReveal />
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <WhatIsSection />
        <PreviewSection />
        <ScienceSection />
        <ProfilesSection />
        <AboutSection />
        <FaqSection />
        <CtaFinalSection />
      </main>
      <Footer />
    </>
  );
}
