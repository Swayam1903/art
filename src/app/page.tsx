import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import HorizontalScroll from "@/components/home/HorizontalScroll";
import CustomerSpaces from "@/components/home/CustomerSpaces";
import WhyChoose from "@/components/home/WhyChoose";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-foreground bg-background selection:bg-accent selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <FeaturedCategories />
        <HorizontalScroll />
        <CustomerSpaces />
        <WhyChoose />
      </main>
      <Footer />
    </div>
  );
}
