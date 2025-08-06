import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectImageNavigator } from "@/components/ui/project-image-navigator";
import { ChevronLeft, ChevronRight, Eye, Phone, MessageCircle, MapPin, Building } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectData } from "@/data/projects-data";

interface ProjectsCarouselProps {
  projects: ProjectData[];
  className?: string;
}

export function ProjectsCarousel({ projects, className = "" }: ProjectsCarouselProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wallpapers': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blinds': return 'bg-green-100 text-green-800 border-green-200';
      case 'flooring': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'mixed': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'wallpapers': return 'Wallpapers';
      case 'blinds': return 'Window Blinds';
      case 'flooring': return 'Flooring';
      case 'mixed': return 'Mixed Services';
      default: return category;
    }
  };

  // Display first 6 projects
  const visibleProjects = projects.slice(0, 6);

  return (
    <div className={`relative ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
          Recent Projects
        </h2>
        <p className="text-muted-foreground mt-2">
          Discover our latest work and trending designs
        </p>
      </div>

      {/* Projects Grid - 6 projects: 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {visibleProjects.map((project, index) => (
          <Card
            key={project.id}
            className="group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden border-primary/10 hover:border-primary/20 transform hover:-translate-y-1 cursor-pointer"
          >
            <CardContent className="p-0">
              {/* Project Image with Navigation */}
              <div className="relative">
                <ProjectImageNavigator
                  beforeImage={project.beforeImage}
                  executionImage={project.executionImage}
                  afterImage={project.afterImage}
                  projectImages={project.projectImages}
                  fallbackImage={project.thumbnail || project.image || '/images/placeholder.jpg'}
                  alt={project.title || project.customerName}
                  className="overflow-hidden"
                />

                {/* Service Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-primary/90 text-white text-xs">
                    {project.serviceName || project.category}
                  </Badge>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-4 md:p-6">
                <div className="space-y-3">
                  {/* Category Badge */}
                  <Badge className={`${getCategoryColor(project.category)} font-medium text-xs`}>
                    {getCategoryLabel(project.category)}
                  </Badge>

                  {/* Customer Info */}
                  <div>
                    <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {project.title || project.businessName || project.customerName}
                    </h3>
                    {project.businessName && project.title !== project.businessName && (
                      <p className="text-sm text-muted-foreground">
                        Client: {project.customerName}
                      </p>
                    )}
                  </div>

                  {/* Location - Single display */}
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{project.location}</p>
                      {project.area && project.area !== project.location && (
                        <p className="text-xs">{project.area}</p>
                      )}
                    </div>
                  </div>

                  {/* Description - Moved after location */}
                  {project.description && (
                    <div>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  )}

                  {/* Service */}
                  <div className="flex items-start gap-2 text-sm pt-2 border-t border-gray-100">
                    <Building className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                    <p className="font-medium text-foreground">{project.serviceName}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>


    </div>
  );
}
