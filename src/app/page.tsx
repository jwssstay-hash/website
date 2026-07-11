import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { StayTypes } from "@/components/sections/StayTypes";
import { Attractions } from "@/components/sections/Attractions";
import { Testimonials } from "@/components/sections/Testimonials";
import { Footer } from "@/components/ui/Footer";
import { FloatingWidgets } from "@/components/ui/FloatingWidgets";
import { Navbar } from "@/components/ui/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-woodside-950">
      <Navbar />
      <Hero />
      <About />
      <StayTypes />
      <Attractions />
      <Testimonials />
      <Footer />
      <FloatingWidgets />
    </main>
  );
}
