import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ReassuranceSection from "@/components/ReassuranceSection";
import ServicesSection from "@/components/ServicesSection";
import ZonesSection from "@/components/ZonesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header city="Casablanca" />
      <HeroSection city="Casablanca" />
      <ReassuranceSection />
      <ServicesSection />
      <ZonesSection />
      <TestimonialsSection />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
