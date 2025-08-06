import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface FastImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  className?: string
  fallbackSrc?: string
  showPlaceholder?: boolean
}

export function FastImage({ 
  src, 
  alt, 
  className, 
  fallbackSrc = '/placeholder.svg',
  showPlaceholder = true,
  ...props 
}: FastImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [currentSrc, setCurrentSrc] = useState(src)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)
      setHasError(false) // Reset error state when trying fallback
    } else {
      setHasError(true)
      setIsLoading(false)
    }
  }

  if (hasError && !showPlaceholder) {
    return null
  }

  return (
    <div className={cn('relative', className)}>
      {/* Loading placeholder */}
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      {/* Actual image */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  )
}
