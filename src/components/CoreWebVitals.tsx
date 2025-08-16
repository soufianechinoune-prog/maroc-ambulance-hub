import { useEffect } from 'react';

interface WebVitalsMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
}

const CoreWebVitals = () => {
  useEffect(() => {
    // Only measure in production
    if (import.meta.env.DEV) return;

    // Dynamically import web-vitals to avoid affecting the main bundle
    import('web-vitals').then((webVitals) => {
      
      const sendToAnalytics = (metric: WebVitalsMetric) => {
        // Send to Google Analytics if available
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            non_interaction: true,
          });
        }

        // Log to console in development
        console.log(`📊 ${metric.name}:`, {
          value: metric.value,
          rating: getMetricRating(metric.name, metric.value),
          id: metric.id
        });
      };

      // Get all Core Web Vitals using correct import structure
      if (webVitals.onCLS) webVitals.onCLS(sendToAnalytics);
      if (webVitals.onINP) webVitals.onINP(sendToAnalytics); // FID is replaced by INP
      if (webVitals.onFCP) webVitals.onFCP(sendToAnalytics);
      if (webVitals.onLCP) webVitals.onLCP(sendToAnalytics);
      if (webVitals.onTTFB) webVitals.onTTFB(sendToAnalytics);
    }).catch(error => {
      console.warn('Failed to load web-vitals:', error);
    });
  }, []);

  return null;
};

// Helper function to rate metrics
function getMetricRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 }
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

export default CoreWebVitals;