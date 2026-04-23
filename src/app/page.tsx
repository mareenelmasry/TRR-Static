import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { Portfolio } from "@/components/portfolio";
import { About } from "@/components/about";
import { Stats } from "@/components/stats";
import { CTA } from "@/components/cta";
import { ContactForm } from "@/components/contact-form";
import { Footer } from "@/components/footer";
import { SiteBackground } from "@/components/site-background";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <main className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Stats />
        <CTA />
        <ContactForm />

        <Footer />
      </main>
    </>
  );
}
