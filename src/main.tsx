import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import Analytics from "@/components/Analytics";
import CriticalResourcePreloader from "@/components/CriticalResourcePreloader";
import App from './App.tsx'
import './index.css'

// Register service worker (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
        // Preload critical images - temporarily disabled
        // if ('caches' in window) {
        //   caches.open('ambulance-maroc-v1.1.0').then(cache => {
        //     cache.addAll([
        //       '/src/assets/ambulance-hero.jpg',
        //       '/src/assets/medical-team.jpg',
        //       '/src/assets/logo.jpg'
        //     ]).catch(err => console.log('Cache preload failed:', err));
        //   });
        // }
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <CriticalResourcePreloader />
      <Analytics />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
// test hook vercel - 22/08
