import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Star, User, Building } from 'lucide-react';
import type { ProjectData } from '@/lib/types';

interface ProjectCardsProps {
  projects: ProjectData[];
  showFeatured?: boolean;
  className?: string;
}

export function ProjectCards({ projects, showFeatured = false, className = "" }: ProjectCardsProps) {
  const displayProjects = showFeatured ? projects.filter(p => p.featured) : projects;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'wallpapers':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'blinds':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'flooring':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'mixed':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'wallpapers':
        return '🎨';
      case 'blinds':
        return '🏠';
      case 'flooring':
        return '🪑';
      case 'mixed':
        return '⭐';
      default:
        return '📋';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'wallpapers':
        return 'Wallpapers';
      case 'blinds':
        return 'Window Blinds';
      case 'flooring':
        return 'Flooring';
      case 'mixed':
        return 'Mixed Services';
      default:
        return category;
    }
  };

  // Helper functions to handle both data formats (camelCase and snake_case)
  const getCustomerName = (project: any) => {
    return project.customer_name || project.customerName || 'Unknown Customer';
  };

  const getBusinessName = (project: any) => {
    return project.business_name || project.businessName;
  };

  const getServiceName = (project: any) => {
    return project.service_name || project.serviceName || getCategoryLabel(project.category);
  };

  const getProjectTitle = (project: any) => {
    return project.title || getBusinessName(project) || getCustomerName(project);
  };

  const getCompletedDate = (project: any) => {
    const date = project.completed_date || project.completedDate || project.date;
    if (!date) return 'Date not available';
    
    try {
      const dateObj = new Date(date);
      if (isNaN(dateObj.getTime())) return 'Date not available';
      return dateObj.toLocaleDateString();
    } catch (error) {
      return 'Date not available';
    }
  };

  const getProjectImage = (project: any) => {
    return project.thumbnail_url || 
           project.thumbnailUrl ||
           project.thumbnail ||
           project.image ||
           project.images?.[0] ||
           '/placeholder.svg';
  };

  const getServiceTypes = (project: any) => {
    return project.service_types || project.serviceTypes || [];
  };

  if (displayProjects.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Projects Found</h3>
        <p className="text-gray-600">
          {showFeatured ? 'No featured projects available.' : 'No projects available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {displayProjects.map((project) => {
        const customerName = getCustomerName(project);
        const businessName = getBusinessName(project);
        const serviceName = getServiceName(project);
        const projectTitle = getProjectTitle(project);
        const completedDate = getCompletedDate(project);
        const projectImage = getProjectImage(project);
        const serviceTypes = getServiceTypes(project);

        return (
          <Card key={project.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <img
                  src={projectImage}
                  alt={projectTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/placeholder.svg';
                  }}
                />
                {project.featured && (
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 flex-1">
                  {projectTitle}
                </h3>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="font-medium">{customerName}</span>
                  {businessName && businessName !== projectTitle && (
                    <>
                      <Building className="w-4 h-4 ml-2 mr-1 text-gray-400" />
                      <span className="text-gray-500">({businessName})</span>
                    </>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{project.location}</span>
                  {project.area && (
                    <span className="text-gray-500 ml-1">• {project.area}</span>
                  )}
                </div>

                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  <span>{completedDate}</span>
                </div>
              </div>

              <div className="mb-4">
                <Badge 
                  variant="outline" 
                  className={`${getCategoryColor(project.category)} font-medium`}
                >
                  {getCategoryIcon(project.category)} {serviceName}
                </Badge>
              </div>

              {project.description && (
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {project.description}
                </p>
              )}

              {serviceTypes && serviceTypes.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {serviceTypes.slice(0, 3).map((type: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                  {serviceTypes.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{serviceTypes.length - 3} more
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default ProjectCards;
