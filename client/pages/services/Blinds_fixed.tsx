import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FastImage } from "@/components/ui/fast-image";

import {
  Home,
  Phone,
  MessageCircle,
  CheckCircle,
  Shield,
  Award,
  Clock,
  Eye,
  Smartphone,
  Sun,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const blindTypes = [
  {
    name: "Roller Blinds",
    description: "Sleek and modern roller blinds perfect for any window",
    features: ["Easy operation", "Light control", "Privacy protection", "Multiple fabrics"],
    badge: "Most Popular",
    perfect: "Living rooms, bedrooms, offices",
    image: "/images/services/blinds/types/roller-blinds.jpg",
    applications: ["Residential", "Commercial", "Healthcare"],
  },
  {
    name: "Venetian Blinds",
    description: "Classic horizontal slat blinds for precise light control",
    features: ["Adjustable slats", "Durable aluminum", "Easy cleaning", "Various colors"],
    badge: "Classic Choice",
    perfect: "Kitchens, bathrooms, offices",
    image: "/images/services/blinds/types/venetian-blinds.jpg",
    applications: ["Homes", "Offices", "Schools"],
  },
  {
    name: "Vertical Blinds",
    description: "Ideal for large windows and sliding doors",
    features: ["Wide coverage", "Easy maintenance", "Light filtering", "Motorized options"],
    badge: "Large Windows",
    perfect: "Patio doors, large windows",
    image: "/images/services/blinds/types/vertical-blinds.jpg",
    applications: ["Commercial", "Residential", "Hotels"],
  },
  {
    name: "Smart Blinds",
    description: "Automated blinds with smartphone and voice control",
    features: ["Remote control", "Voice commands", "Scheduled operation", "Energy saving"],
    badge: "Smart Home",
    perfect: "Modern homes, smart buildings",
    image: "/images/services/blinds/types/smart-blinds.jpg",
    applications: ["Smart Homes", "Luxury Hotels", "Modern Offices"],
  },
];

export default function Blinds() {
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
                <Home className="mr-2 h-4 w-4" />
                Custom Blinds & Window Treatments
              </div>
              
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                Premium
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cream-200 to-sage-200">
                  Blinds
                </span>
                Collection
              </h1>
              
              <p className="mt-6 text-xl leading-8 text-sage-100 max-w-2xl mx-auto lg:mx-0">
                Enhance your space with our custom-made blinds. From roller to smart blinds, 
                perfect fit and professional installation guaranteed.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center rounded-lg bg-white text-sage-700 px-8 py-4 text-lg font-semibold shadow-lg hover:bg-sage-50 transition-all duration-300 transform hover:scale-105"
                >
                  View Projects
                  <Eye className="ml-2 h-5 w-5" />
                </Link>
                <a
                  href="tel:+44123456789"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Get Measured
                </a>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">1000+</div>
                  <div className="text-sage-200">Blinds Installed</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">Custom</div>
                  <div className="text-sage-200">Made to Measure</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-cream-200">2 Year</div>
                  <div className="text-sage-200">Warranty</div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative">
              <div className="relative mx-auto max-w-lg">
                <div className="absolute -inset-4 bg-gradient-to-r from-sage-500 to-sage-400 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative">
                  <img
                    src="/images/services/blinds-hero.svg"
                    alt="Premium Blinds Collection"
                    className="w-full h-auto rounded-2xl shadow-2xl"
                    onLoad={() => setImagesLoaded(prev => ({ ...prev, hero: true }))}
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-sage-900/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blind Types Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Our Blinds Collection
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              From traditional to smart, find the perfect blinds for your windows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {blindTypes.map((type, index) => (
              <Card key={index} className="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-b from-white to-sage-50">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <FastImage
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    fallback="/placeholder.svg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {type.badge && (
                    <Badge className="absolute top-4 left-4 bg-sage-600 text-white border-0 shadow-lg">
                      {type.badge}
                    </Badge>
                  )}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-sage-600 mb-4 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="text-sm font-medium text-sage-700">Key Features:</div>
                    <div className="grid grid-cols-1 gap-2">
                      {type.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-sage-600">
                          <CheckCircle className="h-4 w-4 text-sage-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-sage-700 mb-2">Perfect for:</div>
                    <p className="text-sm text-sage-600">{type.perfect}</p>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-sage-700 mb-2">Applications:</div>
                    <div className="flex flex-wrap gap-2">
                      {type.applications.map((app, idx) => (
                        <span key={idx} className="inline-flex items-center rounded-md bg-sage-100 px-2 py-1 text-xs font-medium text-sage-700">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      to="/projects"
                      className="flex-1 inline-flex items-center justify-center rounded-lg bg-sage-600 text-white px-4 py-3 text-sm font-semibold hover:bg-sage-700 transition-colors"
                    >
                      View Projects
                    </Link>
                    <a
                      href="tel:+44123456789"
                      className="inline-flex items-center justify-center rounded-lg border border-sage-300 bg-white text-sage-700 px-4 py-3 text-sm font-semibold hover:bg-sage-50 transition-colors"
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-sage-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-sage-800 mb-4">
              Why Choose Our Blinds?
            </h2>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Quality materials, precise measurements, and expert installation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Custom Made to Measure",
                description: "Precisely fitted to your windows for perfect coverage",
                icon: Shield,
              },
              {
                name: "Professional Installation",
                description: "Expert fitting ensuring smooth operation and longevity",
                icon: Award,
              },
              {
                name: "Smart Home Integration",
                description: "Motorized options with smartphone and voice control",
                icon: Smartphone,
              },
              {
                name: "UV Protection",
                description: "Advanced fabrics that protect furniture from sun damage",
                icon: Sun,
              },
              {
                name: "Energy Efficient",
                description: "Insulating properties help reduce heating and cooling costs",
                icon: Zap,
              },
              {
                name: "Quick Turnaround",
                description: "Fast manufacturing and installation within 7-10 days",
                icon: Clock,
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-sage-600 to-sage-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative bg-white rounded-2xl p-8 border border-sage-100 hover:border-sage-200 transition-all duration-300">
                    <div className="w-12 h-12 bg-sage-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage-600 group-hover:text-white transition-all duration-300">
                      <IconComponent className="h-6 w-6 text-sage-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-sage-800 mb-3 group-hover:text-sage-600 transition-colors">
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

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sage-700 via-sage-600 to-sage-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready for Perfect Blinds?
            </h2>
            <p className="text-xl text-sage-100 mb-12 max-w-3xl mx-auto">
              Book a free home consultation for precise measurements and expert advice. Custom-made blinds with professional installation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="tel:+44123456789"
                className="inline-flex items-center justify-center rounded-lg bg-white text-sage-700 px-8 py-4 text-lg font-semibold shadow-lg hover:bg-sage-50 transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Book Free Consultation
              </a>
              <a
                href="https://wa.me/44123456789"
                className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-8 py-4 text-lg font-semibold hover:bg-white/20 transition-all duration-300"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                WhatsApp Quote
              </a>
            </div>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-cream-200 mb-2">Free</div>
                <div className="text-sage-200">Home Measurement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cream-200 mb-2">7-10</div>
                <div className="text-sage-200">Days Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cream-200 mb-2">2 Year</div>
                <div className="text-sage-200">Full Warranty</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <MobileFloatingCTAs />
    </div>
  );
}
