import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  priority?: boolean;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  priority = false,
  onError,
  onLoad,
  style,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    // Fallback to placeholder
    const target = e.target as HTMLImageElement;
    target.src = "/placeholder.svg";
    onError?.(e);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        loading={priority ? "eager" : loading}
        decoding="async"
        onLoad={handleLoad}
        onError={handleError}
        {...(width && { width })}
        {...(height && { height })}
        {...props}
      />

      {/* Preload hint for critical images */}
      {priority && (
        <link
          rel="preload"
          as="image"
          href={src}
          // Add media query for responsive images if needed
        />
      )}
    </div>
  );
}

// WebP detection and fallback utility
export function getOptimizedImageSrc(baseSrc: string): string {
  // Check if browser supports WebP
  const supportsWebP = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0;
  };

  // In a real app, you'd have WebP versions of your images
  // For now, return the original source
  if (typeof window !== "undefined" && supportsWebP()) {
    // Return WebP version if available
    const webpSrc = baseSrc.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    return webpSrc;
  }

  return baseSrc;
}

// Hook for responsive image sizes
export function useResponsiveImageSizes() {
  return {
    mobile: "(max-width: 768px) 100vw",
    tablet: "(max-width: 1024px) 50vw",
    desktop: "33vw",
  };
}
