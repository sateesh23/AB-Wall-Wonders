import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { MapPin, Calendar, Eye, ArrowRight } from "lucide-react"
import { memo } from "react"

import { ProjectData as BaseProjectData } from "@/lib/types"

export interface ProjectData extends BaseProjectData {
  aspectRatio?: "landscape" | "portrait" | "square" | "wide"
}

interface ProjectGalleryProps {
  title: string
  description: string
  projects: ProjectData[]
  className?: string
  showViewAll?: boolean
  viewAllLink?: string
}

// Memoized project card component for better performance
const ProjectCard = memo(function ProjectCard({ project }: { project: ProjectData }) {
  const aspectRatioClasses = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[3/4]",
    square: "aspect-square",
    wide: "aspect-[16/9]"
  }

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 bg-white">
      <div className="relative">
        <div className={cn("overflow-hidden", aspectRatioClasses[project.aspectRatio || "landscape"])}>
          <img
            src={project.thumbnail || project.thumbnailUrl || project.thumbnail_url || project.image || '/placeholder.svg'}
            alt={project.title || 'Project'}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder.svg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {(project.isFeatured || project.featured) && (
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        
        <Badge 
          variant="secondary" 
          className="absolute top-3 left-3 bg-white/90 text-foreground"
        >
          {project.category}
        </Badge>
      </div>
      
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2 line-clamp-2">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{project.date}</span>
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <Eye className="h-4 w-4 mr-2" />
            View Project
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

export const ProjectGallery = memo(function ProjectGallery({
  title,
  description,
  projects,
  className,
  showViewAll = true,
  viewAllLink = "/gallery"
}: ProjectGalleryProps) {
  return (
    <section className={cn("py-20 bg-white", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Responsive grid with mixed layouts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className={cn(
                // Base responsive classes
                "col-span-1",
                // Special layouts for featured projects
                project.featured && "md:col-span-2",
                // Wide aspect ratio takes more space on larger screens
                project.aspectRatio === "wide" && "lg:col-span-2",
                // Portrait images can span 2 rows on larger screens
                project.aspectRatio === "portrait" && "xl:row-span-2"
              )}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-12">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary hover:bg-primary/90 rounded-full font-semibold"
            >
              <a href={viewAllLink}>
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
})
