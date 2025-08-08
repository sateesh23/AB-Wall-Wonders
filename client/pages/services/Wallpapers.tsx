import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import {
  Palette,
  Phone,
  MessageCircle,
  CheckCircle,
  Shield,
  Award,
  Brush,
  Zap,
  ArrowRight,
  Users,
  Eye,
  Droplets,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const wallpaperTypes = [
  {
    name: "3D Wallpapers",
    description: "Premium 3D textured wallpapers that create stunning visual depth and dimension",
    features: ["3D Visual Effects", "Texture Feel", "Premium Quality", "5-year warranty"],
    badge: "Most Popular",
    perfect: "Living rooms, feature walls, offices",
    image: "/images/services/wallpapers/types/3d-wallpaper.jpg",
    applications: ["Residential", "Commercial", "Hotels"],
  },
  {
    name: "Botanical Wallpapers",
    description: "Natural botanical designs that bring the beauty of nature indoors",
    features: ["Natural Designs", "Eco-Friendly", "Fade Resistant", "5-year warranty"],
    badge: "Eco-Friendly",
    perfect: "Bedrooms, dining rooms, spas",
    image: "/images/services/wallpapers/types/botanical-wallpaper.jpg",
    applications: ["Homes", "Restaurants", "Wellness"],
  },
  {
    name: "Embossing Wallpapers",
    description: "Textured finish with premium feel and sophisticated appearance",
    features: ["Raised Textures", "Luxury Feel", "Durable Finish", "5-year warranty"],
    badge: "Premium Quality",
    perfect: "Living rooms, bedrooms, offices",
    image: "/images/services/wallpapers/types/embossing-wallpaper.jpg",
    applications: ["Residential", "Commercial", "Hotels"],
  },
  {
    name: "Geometric Wallpapers",
    description: "Modern geometric patterns perfect for contemporary and minimalist spaces",
    features: ["Contemporary Design", "Pattern Precision", "Washable Surface", "5-year warranty"],
    badge: "Modern Choice",
    perfect: "Modern homes, offices, studios",
    image: "/images/services/wallpapers/types/geometric-wallpaper.jpg",
    applications: ["Corporate", "Residential", "Studios"],
  },
  {
    name: "Modern Wallpapers",
    description: "Sleek contemporary designs that complement modern interior aesthetics",
    features: ["Minimalist Style", "Clean Lines", "Easy Application", "5-year warranty"],
    badge: "Contemporary",
    perfect: "Modern apartments, offices, studios",
    image: "/images/services/wallpapers/types/modern-wallpaper.jpg",
    applications: ["Residential", "Commercial", "Modern Spaces"],
  },
  {
    name: "Mural Wallpapers",
    description: "Large-scale artistic murals that transform entire walls into stunning focal points",
    features: ["Custom Artwork", "Large Format", "Photo Quality", "5-year warranty"],
    badge: "Artistic",
    perfect: "Feature walls, lobbies, creative spaces",
    image: "/images/services/wallpapers/types/mural-wallpaper.jpg",
    applications: ["Hotels", "Restaurants", "Creative Spaces"],
  },
  {
    name: "Striped Wallpapers",
    description: "Classic striped patterns that add elegance and visual height to any room",
    features: ["Classic Patterns", "Visual Height", "Timeless Appeal", "5-year warranty"],
    badge: "Classic",
    perfect: "Traditional homes, dining rooms, studies",
    image: "/images/services/wallpapers/types/striped-wallpaper.jpg",
    applications: ["Traditional", "Formal Spaces", "Heritage"],
  },
  {
    name: "Traditional Wallpapers",
    description: "Timeless patterns and designs that bring classic elegance to your space",
    features: ["Heritage Designs", "Premium Materials", "Classic Appeal", "5-year warranty"],
    badge: "Heritage",
    perfect: "Traditional homes, formal dining, studies",
    image: "/images/services/wallpapers/types/traditional-wallpaper.jpg",
    applications: ["Heritage Homes", "Formal Spaces", "Classic Interiors"],
  },
];

export default function Wallpapers() {
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  return (
    <div className="min-h-screen bg-gradient-to-b from-sage-50 via-white to-cream-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sage-700/90 to-transparent"></div>

        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center rounded-full bg-sage-600/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-sage-100 border border-sage-500/30 mb-6">
                <Palette className="mr-2 h-4 w-4" />
                🖼️ Wallpapers
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6">
                Walls that Speak Your Style
              </h1>

              <p className="mt-6 text-xl leading-8 text-sage-100 max-w-2xl mx-auto lg:mx-0 mb-8">
                Transform plain walls into bold expressions with our curated wallpaper collections. Enjoy worry-free beauty with a 5-year warranty.
              </p>

              {/* Service Labels */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
                <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  🖌️ Designer Patterns
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  💧 Moisture-Resistant
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  🧼 Washable Surface
                </span>
                <span className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white border border-white/20">
                  🏆 5-Year Warranty Coverage
                </span>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="tel:+44123456789"
                  className="inline-flex items-center justify-center rounded-lg bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Browse Wallpaper Designs
                </a>
                <a
                  href="https://wa.me/44123456789"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Design Advice
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">1000+</div>
                  <div className="text-sage-200">Designs Available</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">15+</div>
                  <div className="text-sage-200">Years Experience</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">5 Year</div>
                  <div className="text-sage-200">Warranty</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-sage-500 to-sage-400 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative">
                  <img
                    src="/images/services/wallpapers-hero.svg"
                    alt="Premium Wallpapers Collection"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    onLoad={() =>
                      setImagesLoaded((prev) => ({ ...prev, hero: true }))
                    }
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-sage-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wallpaper Types Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Our Wallpaper Collection
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Choose from our premium range of wallpaper options, each designed
              for specific aesthetics and environments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wallpaperTypes.map((type, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-sage-200 bg-white shadow-lg"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {type.badge && (
                    <Badge className="absolute top-4 left-4 bg-green-700 text-white border-0 shadow-lg">
                      {type.badge}
                    </Badge>
                  )}
                  <div className="absolute top-4 right-4 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    5-Year Warranty
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 bg-white">
                  <h3 className="text-2xl font-bold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-sage-600 mb-4 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-medium text-sage-700">
                      Key Features:
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {type.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-sage-600"
                        >
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-sage-700 mb-2">
                      Perfect for:
                    </div>
                    <p className="text-sm text-sage-600">{type.perfect}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-sage-700 mb-2">
                      Applications:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {type.applications.map((app, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center rounded-md bg-sage-100 px-2 py-1 text-xs font-medium text-sage-700"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/projects"
                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-green-700 text-white px-4 py-3 text-sm font-semibold hover:bg-green-800 transition-colors"
                    >
                      View Projects
                    </Link>
                    <a
                      href="tel:+44123456789"
                      className="inline-flex items-center justify-center rounded-lg border border-green-700 bg-white text-green-700 px-4 py-3 text-sm font-semibold hover:bg-green-50 transition-colors"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Wallpapers Section */}
      <section className="py-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Why Choose Our Wallpapers?
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Premium materials, expert installation, and unmatched design
              quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Designer Patterns",
                description: "Curated collection of premium designer wallpaper patterns",
                icon: Brush,
              },
              {
                name: "Moisture-Resistant",
                description: "Advanced moisture protection for long-lasting beauty",
                icon: Droplets,
              },
              {
                name: "Peel & Replace Option",
                description: "Easy removal and replacement without wall damage",
                icon: RotateCcw,
              },
              {
                name: "Washable Surface",
                description: "Easy-to-clean surfaces that maintain their appearance",
                icon: Soap,
              },
              {
                name: "5-Year Warranty Coverage",
                description: "Comprehensive warranty protection for peace of mind",
                icon: Trophy,
              },
              {
                name: "Expert Installation",
                description: "Professional installation ensuring perfect alignment",
                icon: Award,
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-green-600 to-green-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-sage-100 hover:border-green-200 transition-all duration-300 shadow-lg">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-700 group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-green-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-sage-800 mb-3 group-hover:text-green-700 transition-colors">
                      {feature.name}
                    </h3>
                    <p className="text-sage-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-sell Services Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Complete Your Space
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Enhance your wallpapers with our premium flooring and custom
              blinds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link
              to="/services/flooring"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="/images/flooringg.png"
                  alt="Premium Flooring"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  2-Year Warranty
                </div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Interior Flooring
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Waterproof vinyl flooring that complements your new wallpapers
                  perfectly
                </p>
                <div className="flex items-center text-white/80 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  500+ Happy Customers
                </div>
              </div>
            </Link>

            <Link
              to="/services/blinds"
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img
                  src="/images/blindss.png"
                  alt="Custom Blinds"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  2-Year Warranty
                </div>
                <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ArrowRight className="h-8 w-8" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Window Blinds
                </h3>
                <p className="text-white/90 text-sm mb-4">
                  Precision-made blinds for the perfect finishing touch
                </p>
                <div className="flex items-center text-white/80 text-sm">
                  <Users className="h-4 w-4 mr-2" />
                  Premium Installation
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-3xl p-12 text-white">
              <div className="text-center">
                <h2 className="text-4xl font-bold mb-6">
                  Lets make you'r home feels Brand new
                </h2>
                <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
                  Get a free consultation and quote for your wallpaper project.
                  Professional installation with 5-year warranty included.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <a
                    href="https://wa.me/44123456789"
                    className="inline-flex items-center justify-center rounded-lg bg-white text-green-700 px-8 py-4 text-lg font-semibold shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Whatsapp Us
                  </a>
                  <a
                    href="tel:+44123456789"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    <Phone className="mr-2 h-5 w-5" />
                    Our services
                  </a>
                </div>

                <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-100 mb-2">
                      Free
                    </div>
                    <div className="text-green-200">Consultation & Quote</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-100 mb-2">
                      Same Day
                    </div>
                    <div className="text-green-200">Site Visit Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-100 mb-2">
                      5 Year
                    </div>
                    <div className="text-green-200">Warranty Included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileFloatingCTAs />
    </div>
  );
}
