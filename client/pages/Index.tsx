import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NovaHeroScroll } from "@/components/ui/nova-hero-scroll";
import SEO, {
  generateLocalBusinessSchema,
  generateFAQSchema,
} from "@/components/SEO";

import ABTestimonials3D from "@/components/ui/ab-testimonials-3d";
import { HomepageProjects } from "@/components/ui/homepage-projects";
import { MinimalFeedbackForm } from "@/components/ui/minimal-feedback-form";

import type { SupabaseProject } from "@/lib/supabase";
import {
  Phone,
  CheckCircle,
  MessageCircle,
  Palette,
  Home,
  Layers,
  Eye,
  Building,
  Loader2,
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

export default function Index() {
  const [recentProjects, setRecentProjects] = useState<SupabaseProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  // Generate structured data for homepage
  const localBusinessSchema = generateLocalBusinessSchema();

  // Load recent projects for homepage - ONLY from Supabase
  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        console.log("🔄 Loading recent projects for homepage...");

        const { getRecentProjects } = await import("@/lib/supabase-service");
        const { isSupabaseConfigured } = await import("@/lib/supabase");

        if (isSupabaseConfigured()) {
          try {
            const supabaseProjects = await getRecentProjects(6);
            console.log(
              `📊 Supabase returned ${supabaseProjects.length} projects`,
            );
            setRecentProjects(supabaseProjects);
          } catch (supabaseError: any) {
            console.warn("Supabase error:", supabaseError.message);
            setRecentProjects([]);
          }
        } else {
          console.log("📊 Supabase not configured");
          setRecentProjects([]);
        }
      } catch (error) {
        console.error("Error loading recent projects:", error);
        setRecentProjects([]);
      } finally {
        setProjectsLoading(false);
      }
    };

    loadRecentProjects();
  }, []);

  return (
    <>
      <SEO
        title="AB Wall Wonders - Premium Wallpapers, Flooring & Blinds in Andhra Pradesh"
        description="Transform your space with AB Wall Wonders! Premium wallpapers, luxury flooring, and custom blinds with expert installation across Andhra Pradesh. 15+ years experience, 5-year warranty. Get your free quote today!"
        keywords="wallpapers Andhra Pradesh, 3D wallpaper, interior flooring, vinyl flooring, window blinds, custom wallpaper, interior design Andhra Pradesh, home renovation, premium wallpapers, luxury flooring, AB Wall Wonders"
        url="https://yourdomain.com"
        type="website"
        structuredData={localBusinessSchema}
      />
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
                Trusted by 100+ homeowners and professionals across Andhra
                Pradesh
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
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
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
            {projectsLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-lg">Loading projects...</span>
              </div>
            ) : recentProjects.length > 0 ? (
              <>
                <HomepageProjects
                  projects={recentProjects}
                  loading={projectsLoading}
                />
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
                    We're constantly working on new projects! Check back soon to
                    see our latest transformations and get inspired for your own
                    space.
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
                Get a free consultation and quote today. Our experts are ready
                to bring your vision to life with premium quality and
                exceptional service.
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
    </>
  );
}
