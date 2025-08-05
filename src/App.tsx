import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Zones from "./pages/Zones";
import Contact from "./pages/Contact";
import CityPage from "./pages/CityPage";
import NotFound from "./pages/NotFound";
import { cities } from "./data/cities";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* City routes - dynamically generated */}
          {cities.map(city => (
            <Route 
              key={city.slug} 
              path={`/${city.slug}`} 
              element={<CityPage />} 
            />
          ))}
          
          {/* Legal pages */}
          <Route path="/mentions-legales" element={<NotFound />} />
          <Route path="/politique-confidentialite" element={<NotFound />} />
          <Route path="/conditions-utilisation" element={<NotFound />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
