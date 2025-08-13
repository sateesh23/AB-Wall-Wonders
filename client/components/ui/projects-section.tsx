import React, { useEffect, useState } from 'react';
import type { ProjectData } from '@/lib/types';
import { projectsData, featuredProjects } from '@/data/projects-data';
import { EmptyState } from '@/components/ui/empty-state';

interface ProjectsSectionProps {
  showFeatured?: boolean;
  limit?: number;
  className?: string;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  showFeatured = false, 
  limit,
  className = "" 
}) => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = () => {
      try {
        let data: ProjectData[];

        if (showFeatured) {
          data = featuredProjects;
        } else {
          data = projectsData;
        }

        if (limit) {
          data = data.slice(0, limit);
        }

        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [showFeatured, limit]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Loading projects...</span>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className={className}>
        <EmptyState
          title={showFeatured ? "Featured Projects Coming Soon" : "Projects Gallery Coming Soon"}
          description={showFeatured
            ? "We're working on showcasing our best work. Check back soon to see our featured projects."
            : "We're adding our latest projects to showcase our work. Please check back soon!"
          }
          showAddButton={false}
        />
      </div>
    );
  }

  return (
    <section className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ${className}`}>
      {projects.map((proj, index) => (
        <div key={proj.id || index} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
          <div className="relative w-full aspect-square overflow-hidden">
            <img
              src={proj.thumbnailUrl || proj.images?.[0] || '/placeholder.svg'}
              alt={proj.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="p-4 md:p-6">
            <h2 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-foreground leading-tight">{proj.title}</h2>
            <p className="text-muted-foreground mb-3 md:mb-4 line-clamp-2 leading-relaxed">{proj.description}</p>

            {/* Project Details */}
            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
              <div className="flex items-center text-sm">
                <span className="font-semibold text-foreground w-20">Customer:</span>
                <span className="ml-2 flex-1 text-muted-foreground">{proj.customerName}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-semibold text-foreground w-20">Location:</span>
                <span className="ml-2 flex-1 text-muted-foreground">{proj.location}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-semibold text-foreground w-20">Service:</span>
                <span className="ml-2 flex-1 text-muted-foreground">{proj.serviceName}</span>
              </div>
            </div>

            {/* Category Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {proj.category === 'wallpapers' ? '🎨 Wallpapers' :
                 proj.category === 'blinds' ? '🏠 Blinds' :
                 proj.category === 'flooring' ? '🪑 Flooring' :
                 '⭐ Mixed'}
              </span>
              
              {proj.featured && (
                <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                  ⭐ Featured
                </span>
              )}
            </div>

            {/* Action Button */}
            {(proj as any).link && (
              <a
                href={(proj as any).link}
                className="inline-block mt-4 text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                target="_blank"
                rel="noreferrer"
              >
                View Project →
              </a>
            )}
          </div>
        </div>
      ))}
      
      {projects.length === 0 && (
        <div className="col-span-full text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
          <p className="text-gray-600">
            We're currently updating our gallery. Please check back soon to see our latest work!
          </p>
        </div>
      )}
    </section>
  );
};

export default ProjectsSection;
