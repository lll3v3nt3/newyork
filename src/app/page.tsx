import { ContactSection } from "@/components/contact-section";
import { HeroSection } from "@/components/hero-section";
import { HistorySection } from "@/components/history-section";
import { Navbar } from "@/components/navbar";
import { ProductsSection } from "@/components/products-section";
import { ProgramsSection } from "@/components/programs-section";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <HistorySection/>
      <ProductsSection/>
      <ProgramsSection/>
      <ContactSection/>
    </main>
  );
}
