import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, Wrench } from 'lucide-react';
import type { ProjectData } from '@/data/projects-data';

interface DynamicProjectsGridProps {
  projects: ProjectData[];
}

export function DynamicProjectsGrid({ projects }: DynamicProjectsGridProps) {
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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch (error) {
      return 'Recently';
    }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No projects available. Add projects through the admin panel.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {projects.slice(0, 6).map((project) => (
        <Card
          key={project.id || project._id || Math.random()}
          className="group hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-primary/10 hover:border-primary/20"
        >
          {/* Project Image */}
          <div className="relative overflow-hidden">
            <img
              src={project.thumbnail || project.image || '/images/services/wallpapers-hero.svg'}
              alt={`${project.serviceName || project.service || project.title} at ${project.location}`}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/services/wallpapers-hero.svg';
              }}
            />
            
            {/* Category Badge Overlay */}
            <div className="absolute top-3 left-3">
              <Badge className={`${getCategoryColor(project.category || project.service || 'mixed')} font-medium text-xs`}>
                {getCategoryLabel(project.category || project.service || 'mixed')}
              </Badge>
            </div>

            {/* Date Badge */}
            <div className="absolute top-3 right-3">
              <Badge className="bg-black/70 text-white font-medium text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {formatDate(project.completedDate || project.date || new Date().toISOString())}
              </Badge>
            </div>
          </div>

          <CardContent className="p-4 lg:p-6">
            <div className="space-y-3">
              {/* Project Title */}
              <h3 className="text-lg lg:text-xl font-bold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                {project.title || `${project.serviceName || 'Service'} Project`}
              </h3>

              {/* Customer Name */}
              <p className="text-sm font-medium text-primary">
                {project.customerName || 'Customer'}
                {project.businessName && project.businessName !== (project.customerName || '') && (
                  <span className="text-muted-foreground"> • {project.businessName}</span>
                )}
              </p>

              {/* Location */}
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{project.location}</span>
              </div>

              {/* Service Type */}
              <div className="flex items-center text-sm text-muted-foreground">
                <Wrench className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="line-clamp-1">{project.serviceName || project.service || 'Service'}</span>
              </div>

              {/* Description */}
              {project.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {typeof project.description === 'string' 
                    ? project.description.replace(/<[^>]*>/g, '') // Remove HTML tags
                    : 'Professional installation with quality materials.'
                  }
                </p>
              )}

              {/* Featured Badge */}
              {(project.featured || project.isFeatured) && (
                <div className="pt-2">
                  <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 font-medium text-xs">
                    ⭐ Featured Project
                  </Badge>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
