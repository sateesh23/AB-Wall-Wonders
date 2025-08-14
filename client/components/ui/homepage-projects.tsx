import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';
import { ProjectCard } from './project-card';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { FirebaseProject } from '@/lib/firebase-service';

interface HomepageProjectsProps {
  projects: FirebaseProject[];
  loading?: boolean;
}

export const HomepageProjects: React.FC<HomepageProjectsProps> = ({ 
  projects, 
  loading = false 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Get latest 6 projects
  const latestProjects = projects.slice(0, 6);

  // Update scroll state
  const updateScrollState = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    updateScrollState();
    const handleResize = () => updateScrollState();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [latestProjects]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: -cardWidth - 24, // card width + gap
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 300;
      scrollContainerRef.current.scrollBy({
        left: cardWidth + 24, // card width + gap
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Latest Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most recent transformations
            </p>
          </div>
          
          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (latestProjects.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
              Latest Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              No projects found. Check back soon for our latest work!
            </p>
            <Button asChild>
              <Link to="/admin">
                Add First Project
              </Link>
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Latest Completed Work
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-4">
            Our Recent Projects
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our most recent transformations showcasing premium wallpapers, window blinds, and luxury flooring installations
          </p>
        </div>

        {/* Responsive Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {latestProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="w-full"
            />
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl"
            asChild
          >
            <Link to="/projects">
              <ArrowRight className="mr-2 h-5 w-5" />
              View All Projects
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
