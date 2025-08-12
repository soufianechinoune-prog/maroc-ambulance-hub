export function track(event: string, params?: Record<string, any>) {
  // @ts-ignore
  if (window.gtag) window.gtag('event', event, params || {});
}
