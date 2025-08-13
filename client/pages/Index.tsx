import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NovaHeroScroll } from "@/components/ui/nova-hero-scroll";

import ABTestimonials3D from "@/components/ui/ab-testimonials-3d";
import { HomepageProjects } from "@/components/ui/homepage-projects";
import { MinimalFeedbackForm } from "@/components/ui/minimal-feedback-form";

import type { ProjectData } from "@/lib/types";
import { projectsData } from "@/data/projects-data";
import {
  Star,
  ArrowRight,
  Phone,
  CheckCircle,
  Users,
  Award,
  Clock,
  MessageCircle,
  Palette,
  Home,
  Layers,
  MapPin,
  Eye,
  Building,
  Loader2,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";

const services = [
  {
    icon: Palette,
    title: "Premium Wallpapers",
    description: "Stunning 3D, Botanical & Geometric styles",
    benefit: "Transform any space with designer collections",
    image: "/images/wallpaperr.png",
    features: [
      "Designer Collections",
      "Custom Patterns",
      "Expert Installation",
    ],
    href: "/services/wallpapers",
  },
  {
    icon: Home,
    title: "Window Blinds",
    description: "Smart motorized & manual options available",
    benefit: "Perfect light control and privacy solutions",
    image: "/images/blindss.png",
    features: ["Motorized Options", "Custom Sizing", "Energy Efficient"],
    href: "/services/blinds",
  },
  {
    icon: Layers,
    title: "Luxury Flooring",
    description: "Waterproof, durable & beautiful finishes",
    benefit: "Premium flooring that withstands daily use",
    image: "/images/flooringg.png",
    features: [
      "Hardwood & Laminate",
      "Waterproof Options",
      "Professional Install",
    ],
    href: "/services/flooring",
  },
];

// Static portfolio items removed - now using dynamic data from Neon database

const stats = [
  { icon: Users, value: "100+", label: "Happy Customers" },
  { icon: Award, value: "2+", label: "Years Experience" },
  { icon: CheckCircle, value: "20+", label: "Projects Completed" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
];

export default function Index() {
  const [recentProjects, setRecentProjects] = useState<ProjectData[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Load recent projects for homepage
  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        console.log("🔄 Loading recent projects for homepage...");

        // Try to load from Firebase first
        const { getRecentProjects } = await import('@/lib/firebase-service');
        const { isFirebaseConfigured } = await import('@/lib/firebase');

        if (isFirebaseConfigured()) {
          const firebaseProjects = await getRecentProjects(6);
          console.log(`📊 Firebase returned ${firebaseProjects.length} projects`);
          // Always use Firebase data when configured, even if empty
          setRecentProjects(firebaseProjects);
          return;
        }

        // Fallback to static data
        const { projectsData } = await import('@/data/projects-data');
        const recentStatic = projectsData.slice(0, 6);
        console.log(`📊 Using ${recentStatic.length} static projects for homepage`);
        setRecentProjects(recentStatic);
      } catch (error) {
        console.error("Error loading recent projects:", error);
        // Fallback to static data on error
        try {
          const { projectsData } = await import('@/data/projects-data');
          setRecentProjects(projectsData.slice(0, 6));
        } catch (staticError) {
          console.error("Failed to load static data:", staticError);
          setRecentProjects([]);
        }
      } finally {
        setProjectsLoading(false);
      }
    };

    loadRecentProjects();
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "wallpapers":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "blinds":
        return "bg-green-100 text-green-800 border-green-200";
      case "flooring":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "mixed":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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

  const isRecentProject = (project: ProjectData) => {
    if (!project.date) return false;
    const projectDate = new Date(project.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return projectDate >= thirtyDaysAgo;
  };

  return (
    <div
      className="min-h-screen pb-16 md:pb-0"
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
      {/* Hero Section with Scroll Animation */}
      <NovaHeroScroll />

      {/* Hero CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              size="lg"
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <a
                href="https://wa.me/8688723648"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Me
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold text-lg px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300"
              asChild
            >
              <Link to="/projects">
                <Eye className="mr-2 h-5 w-5" />
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Trusted by 100+ homeowners and professionals across Andhra Pradesh
            </p>
          </div>
          <ABTestimonials3D />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-4">
              Our Premium Services
            </h2>
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto">
              From wallpapers to flooring, we bring your vision to life with
              expert craftsmanship and attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border hover:border-primary/30 hover:-translate-y-1 relative overflow-hidden"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="h-10 w-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <service.icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  {/* Warranty Badge */}
                  <div className="absolute bottom-4 left-4">
                    {service.title === "Premium Wallpapers" && (
                      <Badge className="bg-emerald-500 text-white border-0 px-3 py-1">
                        5-Year Warranty
                      </Badge>
                    )}
                    {(service.title === "Window Blinds" ||
                      service.title === "Luxury Flooring") && (
                      <Badge className="bg-blue-500 text-white border-0 px-3 py-1">
                        2-Year Warranty
                      </Badge>
                    )}
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Service Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-2">
                        {service.description}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {service.benefit}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span className="text-sm text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="space-y-3 pt-2">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-all duration-300"
                        asChild
                      >
                        <Link to={service.href}>
                          <Eye className="mr-2 h-5 w-5" />
                          Explore Service
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-primary/30 text-primary hover:bg-primary/10 font-medium py-3 rounded-xl transition-all duration-300"
                        asChild
                      >
                        <a
                          href="https://wa.me/918688723648"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          WhatsApp Now
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Recent Completed Work
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-4">
              Our Latest Projects
            </h2>
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto">
              See our most recent work - each project showcases our commitment
              to quality, innovation, and customer satisfaction
            </p>
          </div>



          {projectsLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading projects...</span>
            </div>
          ) : recentProjects.length > 0 ? (
            <>
              <HomepageProjects projects={recentProjects} loading={projectsLoading} />

              {/* Enhanced CTA Section */}
              <div className="mt-12 text-center">
                {/* Call to Action Message */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    Loved What You See?
                  </h3>
                  <p className="text-lg text-primary/70">
                    Explore our complete portfolio or get in touch to start your
                    project
                  </p>
                </div>

                {/* Buttons Grid */}
                {/* Simplified 2-Button CTA */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                  {/* View All Projects Button */}
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-semibold text-lg px-8 py-4 shadow-md hover:shadow-lg transition-all duration-300"
                    asChild
                  >
                    <Link to="/projects">
                      <Eye className="mr-2 h-5 w-5" />
                      View All Projects
                    </Link>
                  </Button>

                  {/* WhatsApp Button */}
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-semibold text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <a
                      href="https://wa.me/918688723648"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>

                {/* Additional Info */}
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>
                    ����� Quick Response • 💬 Free Consultation • 🏆 5-Year
                    Warranty
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">
                  Add Your First Project!
                </h3>
                <p className="text-xl text-primary/70 mb-6">
                  We're constantly working on new projects! Check back soon to see our latest transformations and get inspired for your own space.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary text-white rounded-full font-semibold"
                  asChild
                >
                  <a
                    href="https://wa.me/918688723648"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    See Our Work
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full font-semibold"
                >
                  <a href="tel:+918500900827">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Us
                  </a>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-primary mb-4">
              Ready to Transform Your Space?
            </h2>
            <p className="text-lg md:text-xl text-primary/70 max-w-2xl mx-auto">
              Get a free consultation and quote today. Our experts are ready to
              bring your vision to life with premium quality and exceptional
              service.
            </p>
          </div>
          <MinimalFeedbackForm />
        </div>
      </section>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl md:hidden">
        <div className="flex">
          <a
            href="tel:+918500900827"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Call</span>
          </a>
          <a
            href="https://wa.me/918688723648"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span>WhatsApp</span>
          </a>
          <Link
            to="/projects"
            className="flex-1 flex items-center justify-center gap-2 py-4 px-4 bg-brand-sage-600 text-white font-semibold hover:bg-brand-sage-700 transition-colors"
          >
            <Eye className="h-5 w-5" />
            <span>Projects</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
