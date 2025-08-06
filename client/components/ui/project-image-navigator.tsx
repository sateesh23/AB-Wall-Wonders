import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProjectImageNavigatorProps {
  beforeImage?: string;
  executionImage?: string;
  afterImage?: string;
  projectImages?: {
    before?: string;
    execution?: string;
    after?: string;
  };
  fallbackImage?: string;
  alt: string;
  className?: string;
}

type ImagePhase = 'before' | 'execution' | 'after';

export function ProjectImageNavigator({
  beforeImage,
  executionImage,
  afterImage,
  projectImages,
  fallbackImage = '/placeholder.svg',
  alt,
  className = ''
}: ProjectImageNavigatorProps) {
  const [currentPhase, setCurrentPhase] = useState<ImagePhase>('before');

  // Get images from either direct props or projectImages object
  const images = {
    before: beforeImage || projectImages?.before || fallbackImage,
    execution: executionImage || projectImages?.execution || fallbackImage,
    after: afterImage || projectImages?.after || fallbackImage
  };

  // Check which images are available
  const availablePhases: ImagePhase[] = [];
  if (images.before && images.before !== fallbackImage) availablePhases.push('before');
  if (images.execution && images.execution !== fallbackImage) availablePhases.push('execution');
  if (images.after && images.after !== fallbackImage) availablePhases.push('after');

  // If no specific phase images, show fallback
  if (availablePhases.length === 0) {
    return (
      <div className={`aspect-[4/3] relative overflow-hidden ${className}`}>
        <img
          src={fallbackImage}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
          }}
        />
      </div>
    );
  }

  // If only one image available, show it without navigation
  if (availablePhases.length === 1) {
    const singlePhase = availablePhases[0];
    return (
      <div className={`aspect-[4/3] relative overflow-hidden ${className}`}>
        <img
          src={images[singlePhase]}
          alt={`${alt} - ${singlePhase}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackImage;
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge className="bg-primary/90 text-white text-xs font-medium">
            {singlePhase.charAt(0).toUpperCase() + singlePhase.slice(1)}
          </Badge>
        </div>
      </div>
    );
  }

  // Ensure current phase is available
  if (!availablePhases.includes(currentPhase)) {
    setCurrentPhase(availablePhases[0]);
  }

  const currentIndex = availablePhases.indexOf(currentPhase);
  const totalImages = availablePhases.length;

  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? totalImages - 1 : currentIndex - 1;
    setCurrentPhase(availablePhases[prevIndex]);
  };

  const goToNext = () => {
    const nextIndex = currentIndex === totalImages - 1 ? 0 : currentIndex + 1;
    setCurrentPhase(availablePhases[nextIndex]);
  };

  const getPhaseLabel = (phase: ImagePhase) => {
    switch (phase) {
      case 'before': return 'Before';
      case 'execution': return 'Execution';
      case 'after': return 'After';
      default: return phase;
    }
  };

  const getPhaseColor = (phase: ImagePhase) => {
    switch (phase) {
      case 'before': return 'bg-red-500/90';
      case 'execution': return 'bg-yellow-500/90';
      case 'after': return 'bg-green-500/90';
      default: return 'bg-primary/90';
    }
  };

  return (
    <div className={`aspect-[4/3] relative overflow-hidden group ${className}`}>
      {/* Main Image */}
      <img
        src={images[currentPhase]}
        alt={`${alt} - ${currentPhase}`}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = fallbackImage;
        }}
      />

      {/* Phase Badge */}
      <div className="absolute top-2 left-2">
        <Badge className={`${getPhaseColor(currentPhase)} text-white text-xs font-medium`}>
          {getPhaseLabel(currentPhase)}
        </Badge>
      </div>

      {/* Navigation Arrows */}
      {totalImages > 1 && (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </>
      )}

      {/* Phase Indicators */}
      {totalImages > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {availablePhases.map((phase) => (
            <button
              key={phase}
              onClick={() => setCurrentPhase(phase)}
              className={`w-2 h-2 rounded-full transition-colors ${
                phase === currentPhase ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
