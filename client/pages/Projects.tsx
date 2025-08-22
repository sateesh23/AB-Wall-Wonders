import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CTACard } from "@/components/ui/cta-card";
import { ProjectCard } from "@/components/ui/project-card";
import SEO, { generateFAQSchema } from "@/components/SEO";

import {
  Phone,
  MessageCircle,
  MapPin,
  Building,
  Filter,
  Loader2,
} from "lucide-react";
import type { SupabaseProject } from "@/lib/supabase";
import { EmptyState } from "@/components/ui/empty-state";

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Generate FAQ structured data for projects
  const projectsFAQs = [
    {
      question: "Can I see examples of your previous work?",
      answer: "Yes, our projects gallery showcases completed wallpaper, flooring, and blinds installations across Andhra Pradesh with before/after photos and detailed descriptions."
    },
    {
      question: "Do you work on both residential and commercial projects?",
      answer: "Yes, we handle both residential homes and commercial spaces including offices, restaurants, hotels, and retail establishments."
    },
    {
      question: "How long do your typical projects take?",
      answer: "Project duration varies by scope: wallpaper installations take 1-2 days, flooring 2-3 days, and blinds installation typically takes 1 day."
    },
    {
      question: "Can you provide references from past clients?",
      answer: "Absolutely! We can provide references and testimonials from our satisfied clients across Andhra Pradesh upon request."
    }
  ];

  const combinedStructuredData = [
    generateFAQSchema(projectsFAQs)
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Load projects and categories - ONLY from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { getAllProjects } = await import("@/lib/supabase-service");
        const { isSupabaseConfigured } = await import("@/lib/supabase");

        if (isSupabaseConfigured()) {
          try {
            const supabaseProjects = await getAllProjects();
            console.log(
              `📊 Supabase returned ${supabaseProjects.length} projects for Projects page`,
            );

            const uniqueCategories = Array.from(
              new Set(supabaseProjects.map((p) => p.service)),
            );

            setProjects(supabaseProjects);
            setCategories(uniqueCategories);
          } catch (supabaseError: any) {
            console.warn("Supabase error:", supabaseError.message);
            setProjects([]);
            setCategories([]);
            setError("Failed to load projects. Please check your connection.");
          }
        } else {
          console.log("📊 Supabase not configured");
          setProjects([]);
          setCategories([]);
          setError("Database not configured. Please set up Supabase.");
        }
      } catch (err: any) {
        console.error("Error loading projects:", err);
        setError("Failed to load projects. Please try again later.");
        setProjects([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.service === selectedCategory);

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
    <>
      <SEO
        title="Our Projects Gallery - Wallpapers, Flooring & Blinds | AB Wall Wonders"
        description="Explore our completed wallpaper, flooring, and blinds projects across Andhra Pradesh. See real transformations and get inspired for your home renovation project!"
        keywords="AB Wall Wonders projects, home renovation Andhra Pradesh, wallpaper installation projects, flooring projects, blinds installation, interior design gallery, before after photos"
        url="https://yourdomain.com/projects"
        type="website"
        structuredData={combinedStructuredData}
      />
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
      {/* Hero Section - Reduced top padding to bring content closer to navbar */}
      <section className="min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden pt-8">
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-primary">
              Our Project Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-primary/70 max-w-2xl mx-auto">
              Professional Wallpapers, Blinds & Flooring Services across Andhra
              Pradesh
            </p>

            {/* Testimonials Marquee with Service Icons */}
            <div className="py-6 overflow-hidden">
              <div
                className="flex animate-marquee space-x-8"
                style={
                  {
                    "--duration": "25s",
                    "--gap": "2rem",
                  } as any
                }
              >
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">W</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Appala Naidu - Customized Wallpaper
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">B</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Narendra - Dental Clinic Blinds
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-xs">F</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    U Bangar Raju - Complete Home
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">W</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    A Gopinath - Hospital Wallpaper
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xs">B</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    G Simhachalam - Window Blinds
                  </span>
                </div>
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-primary/10 shrink-0">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-xs">W</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    P Ramu - Buddha Wallpaper
                  </span>
                </div>
              </div>
            </div>

            {/* Trust Building Labels */}
            <div className="flex flex-wrap justify-center gap-3 py-4">
              <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>15+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>1000+ Projects Completed</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-50 text-purple-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Premium Quality Materials</span>
              </div>
              <div className="flex items-center space-x-1 bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full text-xs font-medium">
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>100% Customer Satisfaction</span>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 py-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <MapPin className="mr-2 h-4 w-4" />
                Andhra Pradesh
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                <Building className="mr-2 h-4 w-4" />
                100+ Happy Clients
              </Badge>
            </div>

            {/* CTA Buttons - Highlighted */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
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
                {projects.filter((p) => p.service === category).length})
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
                title="No Projects Yet"
                description="Add your first project through the admin panel to get started!"
                showAddButton={true}
              />
            </div>
          )}

          {/* Projects Grid */}
          {!loading && !error && (
            <div className="animate-in fade-in-50 duration-500">
              {filteredProjects.length === 0 ? (
                <div className="text-center py-12">
                  <EmptyState
                    title="No Projects Found"
                    description={`No ${selectedCategory === "all" ? "" : getCategoryLabel(selectedCategory).toLowerCase()} projects found.`}
                    showAddButton={true}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      className="h-full"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No Results Message */}
          {!loading &&
            !error &&
            filteredProjects.length === 0 &&
            projects.length > 0 && (
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
    </>
  );
}
