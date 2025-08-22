import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  quality?: number;
  sizes?: string;
  loading?: "lazy" | "eager";
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  placeholder = "empty",
  blurDataURL,
  sizes,
  loading = "lazy",
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observerRef.current?.disconnect();
          }
        });
      },
      {
        rootMargin: "50px", // Start loading 50px before the image comes into view
      },
    );

    if (imgRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [priority, isInView]);

  // Generate srcSet for responsive images
  const generateSrcSet = (baseSrc: string) => {
    if (!width) return undefined;

    const breakpoints = [480, 768, 1024, 1280, 1536];
    const srcSet = breakpoints
      .filter((bp) => bp <= width * 2) // Don't generate larger than 2x the target size
      .map((bp) => {
        // In a real implementation, you'd use a service like Cloudinary or similar
        // For now, we'll use the original image
        return `${baseSrc} ${bp}w`;
      })
      .join(", ");

    return srcSet || undefined;
  };

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
    onError?.();
  };

  // Fallback image for errors
  const fallbackSrc = "/images/placeholder.svg";

  // Generate blur placeholder
  const getBlurDataURL = () => {
    if (blurDataURL) return blurDataURL;

    // Generate a simple blur placeholder
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIHN0b3AtY29sb3I9IiNmM2Y0ZjYiIG9mZnNldD0iMCUiLz48c3RvcCBzdG9wLWNvbG9yPSIjZTVlN2ViIiBvZmZzZXQ9IjEwMCUiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwMCIgZmlsbD0idXJsKCNnKSIvPjwvc3ZnPg==";
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        !isLoaded && placeholder === "blur" && "bg-gray-200",
        className,
      )}
      style={{ width, height }}
    >
      {/* Blur placeholder */}
      {!isLoaded && placeholder === "blur" && (
        <img
          src={getBlurDataURL()}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {(isInView || priority) && (
        <img
          ref={imgRef}
          src={hasError ? fallbackSrc : src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : loading}
          decoding="async"
          sizes={sizes}
          srcSet={generateSrcSet(src)}
          className={cn(
            "transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0",
            "w-full h-full object-cover",
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Loading state */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-2 opacity-50">📷</div>
            <span>Image not available</span>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper component for hero images with specific optimizations
export function HeroImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      priority={true}
      loading="eager"
      placeholder="blur"
      quality={95}
      sizes="100vw"
      className={cn("project-image", className)}
      {...props}
    />
  );
}

// Helper component for project gallery images
export function ProjectImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      className={cn("project-image", className)}
      {...props}
    />
  );
}

// Helper component for service thumbnails
export function ServiceImage({
  src,
  alt,
  className,
  ...props
}: OptimizedImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
      className={cn("project-image", className)}
      {...props}
    />
  );
}
