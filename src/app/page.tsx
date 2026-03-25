import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FortuneCollection from "@/components/FortuneCollection";
import MisaSection from "@/components/MisaSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FortuneCollection />
      <MisaSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </>
  );
}
