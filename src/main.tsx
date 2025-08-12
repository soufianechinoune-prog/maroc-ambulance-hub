import React from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import Analytics from "@/components/Analytics";
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <Analytics />
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
