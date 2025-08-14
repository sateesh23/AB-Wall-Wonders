import React, { useState } from 'react';
import { Card, CardContent } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { MapPin, Calendar, User, RotateCcw } from 'lucide-react';
import type { FirebaseProject } from '@/lib/firebase-service';

interface ProjectCardProps {
  project: FirebaseProject;
  className?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, className = "" }) => {
  const [showAfter, setShowAfter] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'wallpapers':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'blinds':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'flooring':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getServiceLabel = (service: string) => {
    switch (service) {
      case 'wallpapers':
        return 'Wallpapers';
      case 'blinds':
        return 'Window Blinds';
      case 'flooring':
        return 'Flooring';
      default:
        return service;
    }
  };

  return (
    <Card className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden ${className}`}>
      {/* Image Section with Before/After Toggle */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <img
          src={showAfter ? project.afterImageURL : project.beforeImageURL}
          alt={`${project.title} - ${showAfter ? 'After' : 'Before'}`}
          className="w-full h-full object-contain transition-all duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder.svg';
          }}
        />
        
        {/* Before/After Toggle Button */}
        <Button
          size="sm"
          variant="secondary"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 border-0 shadow-lg"
          onClick={() => setShowAfter(!showAfter)}
        >
          <RotateCcw className="w-3 h-3 mr-1" />
          {showAfter ? 'Before' : 'After'}
        </Button>

        {/* Service Badge */}
        <div className="absolute top-3 left-3">
          <Badge className={`${getServiceColor(project.service)} border font-medium`}>
            {getServiceLabel(project.service)}
          </Badge>
        </div>

        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="absolute bottom-3 left-3">
            <Badge className="bg-yellow-500 text-white border-0">
              ⭐ Featured
            </Badge>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      {/* Content Section */}
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Project Details */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-primary" />
              <span>{project.customerName}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>{formatDate(project.completedDate)}</span>
            </div>
          </div>

          {/* Subcategory */}
          {project.subcategory && (
            <div className="text-sm text-gray-500">
              <span className="font-medium">Type:</span> {project.subcategory}
            </div>
          )}

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {project.description}
          </p>

          {/* Status */}
          <div className="flex items-center justify-between pt-2">
            <Badge 
              variant={project.status === 'completed' ? 'default' : 'outline'}
              className={
                project.status === 'completed' 
                  ? 'bg-green-100 text-green-800 border-green-200' 
                  : project.status === 'in-progress'
                  ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                  : 'bg-gray-100 text-gray-800 border-gray-200'
              }
            >
              {project.status === 'completed' ? '✓ Completed' : 
               project.status === 'in-progress' ? '⏳ In Progress' : 
               '📋 Planning'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
