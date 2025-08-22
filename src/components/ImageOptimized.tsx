import { useState } from 'react';

interface ImageOptimizedProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  priority?: boolean;
}

const ImageOptimized = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}: ImageOptimizedProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Generate srcSet for responsive images with WebP support
  const generateSrcSet = (originalSrc: string) => {
    // For external images, return as-is
    if (originalSrc.startsWith('http')) {
      return originalSrc;
    }

    // For local images, generate WebP versions
    const baseName = originalSrc.replace(/\.[^/.]+$/, '');
    const extension = originalSrc.split('.').pop();
    
    // If already WebP, generate different sizes
    if (extension === 'webp') {
      return [
        `${baseName} 400w`,
        `${baseName} 800w`, 
        `${baseName} 1200w`,
        `${baseName} 1600w`
      ].join(', ');
    }

    // Generate WebP alternatives with fallback - TEMPORARILY DISABLED
    // return [
    //   `${baseName}.webp 400w`,
    //   `${baseName}.webp 800w`, 
    //   `${baseName}.webp 1200w`,
    //   `${originalSrc} 1600w`
    // ].join(', ');
    
    // Use only original format for now
    if (originalSrc.includes('400w')) {
      return [
        `${baseName} 400w`,
        `${baseName} 800w`, 
        `${baseName} 1200w`,
        `${baseName} 1600w`
      ].join(', ');
    }
    
    return originalSrc;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-muted flex items-center justify-center text-muted-foreground ${className}`}
        style={{ width, height }}
      >
        <span className="text-sm">Image non disponible</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-muted animate-pulse ${className}`}
          style={{ width, height }}
        />
      )}
      <picture>
        {/* WebP source temporarily disabled */}
        {/* <source 
          srcSet={generateSrcSet(src.replace(/\.(jpg|jpeg|png)$/i, '.webp'))}
          sizes={sizes}
          type="image/webp"
        /> */}
        <img
          src={src}
          srcSet={generateSrcSet(src)}
          sizes={sizes}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-300'}`}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          onLoad={handleLoad}
          onError={handleError}
          decoding="async"
          fetchPriority={priority ? 'high' : 'auto'}
        />
      </picture>
    </div>
  );
};

export default ImageOptimized;