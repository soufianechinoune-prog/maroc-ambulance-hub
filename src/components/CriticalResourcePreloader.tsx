import { useEffect } from 'react';

// Preload critical resources for Core Web Vitals optimization
const CriticalResourcePreloader = () => {
  useEffect(() => {
    // Critical images to preload
    const criticalImages = [
      '/src/assets/ambulance-hero-optimized.webp',
      '/src/assets/medical-team-optimized.webp',
      '/src/assets/logo-optimized.webp'
    ];

    // Critical fonts (if any)
    const criticalFonts = [
      // Add font URLs here when fonts are used
    ];

    // Preload critical images
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.type = 'image/webp';
      document.head.appendChild(link);
    });

    // Preload critical fonts
    criticalFonts.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = src;
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // DNS prefetch for external domains
    const externalDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];

    externalDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = domain;
      document.head.appendChild(link);
    });

    // Preconnect to critical third-party origins
    const preconnectDomains = [
      'https://fonts.gstatic.com'
    ];

    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

  }, []);

  return null; // This component doesn't render anything
};

export default CriticalResourcePreloader;