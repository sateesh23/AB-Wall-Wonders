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
  const afterImage =
    project.image_urls && project.image_urls.length > 0
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
        <h3 className="font-semibold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        {/* Stack Layout: Customer Name */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Customer
            </span>
            <p className="font-semibold text-gray-900">
              {project.customer_name}
            </p>
          </div>
        </div>

        {/* Stack Layout: Location */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Location
            </span>
            <p className="font-semibold text-gray-900">{project.location}</p>
          </div>
        </div>

        {/* Stack Layout: Date */}
        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
            <Calendar className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Completed
            </span>
            <p className="font-semibold text-gray-900">
              {formatDate(project.completed_date)}
            </p>
          </div>
        </div>

        {/* Service Type Badge */}
        <div className="mb-4">
          <Badge
            variant="secondary"
            className="bg-primary/10 text-primary border-primary/20"
          >
            {project.subcategory || getServiceLabel(project.service)}
          </Badge>
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
