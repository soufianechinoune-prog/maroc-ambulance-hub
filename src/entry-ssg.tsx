import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import AppRoutes from "./AppRoutes";

export function render(url: string) {
  const helmetContext: any = {};
  const queryClient = new QueryClient();

  const app = (
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <StaticRouter location={url}>
            <Toaster />
            <Sonner />
            <AppRoutes />
          </StaticRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );

  const html = renderToString(app);

  const helmet = (helmetContext as any).helmet;
  const head = [
    helmet?.title?.toString?.() || "",
    helmet?.meta?.toString?.() || "",
    helmet?.link?.toString?.() || "",
    helmet?.script?.toString?.() || "",
  ].join("\n");

  const htmlAttrs = helmet?.htmlAttributes?.toString?.() || "";
  const bodyAttrs = helmet?.bodyAttributes?.toString?.() || "";

  return { html, head, htmlAttrs, bodyAttrs };
}
