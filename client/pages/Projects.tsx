import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTACard } from "@/components/ui/cta-card";
import { ProjectsSection } from "@/components/ui/projects-section";


import {
  Phone,
  MessageCircle,
  MapPin,
  Building,
  Filter,
  Loader2,
  Database,
} from "lucide-react";
import { SanityService } from "@/lib/sanity-service";
import type { ProjectData } from "@/lib/types";
import { SanityStatus } from "@/components/ui/sanity-status";
import { EmptyState } from "@/components/ui/empty-state";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load projects and categories
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [projectsData, categoriesData] = await Promise.all([
          SanityService.getAllProjects(),
          SanityService.getProjectCategories(),
        ]);
        setProjects(projectsData);
        setCategories(categoriesData);
      } catch (err) {
        setError("Failed to load projects. Please try again later.");
        console.error("Error loading projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "wallpapers":
        return "Wallpapers";
      case "blinds":
        return "Window Blinds";
      case "flooring":
        return "Flooring";
      case "mixed":
        return "Mixed Services";
      default:
        return category;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/herooo.png)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
        width: "100%",
        height: "100%",
      }}
    >
      {/* Hero Section - 100vh with navbar background */}
      <section className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-20">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
              Our Project Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-primary/70 max-w-2xl mx-auto">
              Professional Wallpapers, Blinds & Flooring Services across Andhra Pradesh
            </p>


            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 py-6">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <MapPin className="mr-2 h-4 w-4" />
                Andhra Pradesh
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <Building className="mr-2 h-4 w-4" />
                100+ Happy Clients
              </Badge>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 font-bold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a href="tel:+918500900827">
                  <Phone className="mr-2 h-6 w-6" />
                  Call Now
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <a
                  href="https://wa.me/918688723648"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-6 w-6" />
                  WhatsApp Me
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
              Our Completed Projects
            </h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Browse our latest work and get inspired for your next project
            </p>
          </div>



          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              onClick={() => setSelectedCategory("all")}
              className="rounded-full"
              disabled={loading}
            >
              <Filter className="mr-2 h-4 w-4" />
              All Projects ({projects.length})
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
                disabled={loading}
              >
                {getCategoryLabel(category)} (
                {projects.filter((p) => p.category === category).length})
              </Button>
            ))}
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading projects...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <EmptyState
                title="Failed to Load Projects"
                description={error}
                showAddButton={true}
              />
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <ProjectsSection
              showFeatured={false}
              className="animate-in fade-in-50 duration-500"
            />
          )}

          {/* No Results Message */}
          {!loading && !error && filteredProjects.length === 0 && projects.length > 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>


      {/* Bottom CTA Section */}
      <CTACard
        title="Ready to Start Your Project?"
        description="Join our satisfied clients across Andhra Pradesh. Get a free consultation and quote today for your wallpaper, blinds, or flooring project."
        primaryCTA={{
          text: "Call Now",
          href: "tel:+918500900827",
          icon: <Phone className="mr-2 h-4 w-4" />,
        }}
        secondaryCTA={{
          text: "WhatsApp Me",
          href: "https://wa.me/918688723648",
          icon: <MessageCircle className="mr-2 h-4 w-4" />,
        }}
      />
    </div>
  );
}
