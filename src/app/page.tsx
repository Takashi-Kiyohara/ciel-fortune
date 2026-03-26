import HeroSection from "@/components/HeroSection";
import Separator from "@/components/Separator";
import FortuneCollection from "@/components/FortuneCollection";
import MisaSection from "@/components/MisaSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Separator />
      <FortuneCollection />
      <Separator />
      <MisaSection />
      <Separator />
      <PricingSection />
      <Separator />
      <FAQSection />
      <Footer />
    </>
  );
}
