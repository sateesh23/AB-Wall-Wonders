import React, { useState } from "react";
import { Card } from "./card";
import { Badge } from "./badge";
import { MapPin, Calendar, User } from "lucide-react";
import type { SupabaseProject } from "@/lib/supabase";

interface ProjectCardProps {
  project: SupabaseProject;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  className = "",
}) => {
  const [showAfter, setShowAfter] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get before and after images
  const beforeImage = project.image_url; // Main image is "before"
  const afterImage = project.image_urls && project.image_urls.length > 0 
    ? project.image_urls[0] // First additional image is "after"
    : null;

  // Preload both images for faster switching
  React.useEffect(() => {
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };

    if (beforeImage) preloadImage(beforeImage);
    if (afterImage) preloadImage(afterImage);
  }, [beforeImage, afterImage]);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case "wallpapers":
        return "Wallpapers";
      case "blinds":
        return "Window Blinds";
      case "flooring":
        return "Flooring";
      default:
        return service;
    }
  };

  // Get current image to display
  const getCurrentImage = () => {
    if (showAfter && afterImage) {
      return afterImage;
    }
    return beforeImage || "/placeholder.svg";
  };

  // Check if we have both before and after images
  const hasBeforeAfter = beforeImage && afterImage;

  return (
    <Card
      className={`group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50">
        <img
          src={getCurrentImage()}
          alt={`${project.title} - ${showAfter ? "After" : "Before"}`}
          className={`w-full h-full object-cover transition-all duration-500 project-image ${imageLoaded ? "loaded" : ""}`}
          loading="eager"
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            console.warn("Image load failed, using placeholder");
            (e.target as HTMLImageElement).src = "/placeholder.svg";
            setImageLoaded(true);
          }}
        />

        {/* Before/After Toggle - Only show if we have both images */}
        {hasBeforeAfter && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center bg-white/95 backdrop-blur-sm rounded-full p-0.5 shadow-lg border border-white/20">
              <button
                onClick={() => setShowAfter(false)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  !showAfter
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Before
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                  showAfter
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                After
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Top Row: Customer & Date */}
        <div className="flex items-center justify-between mb-2 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <User className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{project.customer_name}</span>
          </div>
          <div className="flex items-center space-x-1 text-gray-500">
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>{formatDate(project.completed_date)}</span>
          </div>
        </div>

        {/* Bottom Row: Location & Type */}
        <div className="flex items-center justify-between mb-3 text-sm">
          <div className="flex items-center space-x-1 text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-primary" />
            <span>{project.location}</span>
          </div>
          <div className="text-gray-500">
            <span className="font-medium">Type:</span>{" "}
            {project.subcategory || getServiceLabel(project.service)}
          </div>
        </div>

        {/* Description */}
        {project.description && (
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        )}
      </div>
    </Card>
  );
};
