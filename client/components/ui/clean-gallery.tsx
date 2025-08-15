import { cn } from "@/lib/utils";
import { GalleryProject } from "@/data/projects-data";

interface CleanGalleryProps {
  title: string;
  description: string;
  projects: GalleryProject[];
  className?: string;
}

export function CleanGallery({
  title,
  description,
  projects,
  className,
}: CleanGalleryProps) {
  const getAspectRatioClass = (aspectRatio: string = "landscape") => {
    switch (aspectRatio) {
      case "square":
        return "aspect-square";
      case "portrait":
        return "aspect-[3/4]";
      case "wide":
        return "aspect-[16/9]";
      case "landscape":
      default:
        return "aspect-[4/3]";
    }
  };

  return (
    <section className={cn("py-20 bg-gray-50", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div
                className={cn(
                  "relative overflow-hidden",
                  getAspectRatioClass(project.aspectRatio),
                )}
              >
                <img
                  src={
                    project.thumbnail ||
                    project.image ||
                    project.thumbnailUrl ||
                    project.thumbnail_url ||
                    "/placeholder.svg"
                  }
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
