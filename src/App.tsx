import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import CoreWebVitalsOptimized from "@/components/CoreWebVitalsOptimized";
import { track } from "@/lib/track";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target.tagName !== 'A') target = target.parentElement;
      if (target && target instanceof HTMLAnchorElement) {
        const href = target.getAttribute('href') || '';
        if (href.startsWith('tel:')) track('click_call');
        if (href.includes('wa.me') || href.includes('api.whatsapp.com')) track('click_whatsapp');
      }
    };
    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <CoreWebVitalsOptimized />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
