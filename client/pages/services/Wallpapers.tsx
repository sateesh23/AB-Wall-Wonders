import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { FastImage } from "@/components/ui/fast-image";

import {
  Palette,
  Phone,
  MessageCircle,
  CheckCircle,
  Shield,
  Award,
  Clock,
  Star,
  MapPin,
  Eye,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const wallpaperTypes = [
  {
    name: "Embossing Wallpapers",
    description: "Textured finish with premium feel and sophisticated appearance",
    features: ["Raised textures", "Luxury appearance", "Durable finish"],
    badge: "Premium Quality",
    perfect: "Master bedrooms and formal areas",
    image: "/images/services/wallpapers/types/embossing-wallpaper.jpg",
  },
  {
    name: "3D Wallpapers",
    description: "Creates stunning depth and visual interest with textured patterns",
    features: ["Modern geometric designs", "Depth illusion effects", "Premium materials"],
    badge: "Most Popular",
    perfect: "Living rooms and feature walls",
    image: "/images/services/wallpapers/types/3d-wallpaper.jpg",
  },
  {
    name: "Mural Wallpapers",
    description: "Custom artwork creating stunning statement walls",
    features: ["Completely customizable", "Artist-designed", "Unique to your space"],
    badge: "Custom Design",
    perfect: "Feature walls and dining areas",
    image: "/images/services/wallpapers/types/mural-wallpaper.jpg",
  },
  {
    name: "Geometric Wallpapers",
    description: "Clean lines and contemporary patterns for modern spaces",
    features: ["Minimalist designs", "Versatile patterns", "Easy to match"],
    badge: "Modern Style",
    perfect: "Offices and modern homes",
    image: "/images/services/wallpapers/types/geometric-wallpaper.jpg",
  },
  {
    name: "Traditional Wallpapers",
    description: "Classic patterns with timeless appeal for elegant interiors",
    features: ["Heritage designs", "Timeless appeal", "Classic color schemes"],
    badge: "Classic Choice",
    perfect: "Formal dining and traditional homes",
    image: "/images/services/wallpapers/types/traditional-wallpaper.jpg",
  },
  {
    name: "Botanical Wallpapers",
    description: "Nature-inspired designs bringing tranquility and freshness indoors",
    features: ["Eco-friendly materials", "Calming color palettes", "Various plant motifs"],
    badge: "Nature Inspired",
    perfect: "Bedrooms and study rooms",
    image: "/images/services/wallpapers/types/botanical-wallpaper.jpg",
  },
  {
    name: "Striped Wallpapers",
    description: "Classic stripes for elegant and versatile interior design",
    features: ["Vertical & horizontal options", "Space enhancing", "Timeless design"],
    badge: "Versatile Design",
    perfect: "Any room and decor style",
    image: "/images/services/wallpapers/types/striped-wallpaper.jpg",
  },
  {
    name: "Modern Wallpapers",
    description: "Contemporary designs for today's stylish interiors",
    features: ["Latest trends", "Bold patterns", "Contemporary colors"],
    badge: "Trending Now",
    perfect: "Modern homes and offices",
    image: "/images/services/wallpapers/types/modern-wallpaper.jpg",
  },
];

const paperTypes = [
  {
    name: "PVC Sheet",
    features: ["Waterproof", "Easy to clean", "Durable", "Long-lasting"],
  },
  {
    name: "Non-Woven Sheet",
    features: ["Breathable", "Eco-friendly", "Easy removal", "Premium quality"],
  },
];

const addOns = [
  {
    name: "Installation",
    description: "Expert team ensures perfect application",
    icon: Award,
  },
  {
    name: "5 Years Warranty",
    description: "Complete coverage for materials and workmanship",
    icon: Shield,
  },
  {
    name: "Custom Sizing",
    description: "Perfectly measured for your exact space",
    icon: CheckCircle,
  },
  {
    name: "Free Consultation",
    description: "Design advice and color matching service",
    icon: Clock,
  },
];

// Note: Before/after project data removed as it contained fake data
// Real project data should be added here when available
const beforeAfterProjects: any[] = [];



export default function Wallpapers() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: 'url(/herooo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        width: '100%',
        height: '100%'
      }}
    >
      {/* Hero Section - Full Screen */}
      <section className="relative min-h-screen flex items-center bg-transparent overflow-hidden">

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Content - Centered */}
            <div className="space-y-12">
              <div className="space-y-8">
                <Badge className="bg-primary text-white px-6 py-3 text-base font-bold rounded-full shadow-lg mx-auto">
                  <Palette className="mr-2 h-5 w-5" />
                  Premium Wallpapers
                </Badge>

                {/* Large headline + trust-building subtitle */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-tight">
                    Custom Wallpapers for
                    <span className="text-primary block bg-gradient-to-r from-primary to-brand-sage-600 bg-clip-text text-transparent">
                      Modern Interiors
                    </span>
                  </h1>
                  <p className="text-2xl lg:text-3xl font-semibold text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    Discover designer wallpaper solutions with expert installation and a 5-year warranty.
                  </p>
                </div>
              </div>

              {/* Small inline highlights */}
              <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center gap-1 text-primary">
                  <Shield className="h-3 w-3" />
                  <span className="font-medium">5-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Award className="h-3 w-3" />
                  <span className="font-medium">Expert Installation</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <CheckCircle className="h-3 w-3" />
                  <span className="font-medium">Free Service</span>
                </div>
              </div>

              {/* Prominent CTA buttons - Always side-by-side */}
              <div className="flex flex-row gap-4 justify-center pt-8 max-w-lg mx-auto">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-bold px-6 py-6 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 text-lg"
                  asChild
                >
                  <a href="tel:+918500900827">
                    <Phone className="mr-2 h-6 w-6" />
                    <span className="hidden sm:inline">Call Now</span>
                    <span className="sm:hidden">Call</span>
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 border-3 border-primary text-primary hover:bg-primary hover:text-white font-bold px-6 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-lg bg-white/90 backdrop-blur-sm"
                  asChild
                >
                  <a
                    href="https://wa.me/8688723648"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-6 w-6" />
                    <span className="hidden sm:inline">WhatsApp Us</span>
                    <span className="sm:hidden">WhatsApp</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wallpaper Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
              Choose Your Wallpaper Type
            </h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              From modern 3D designs to classic patterns, find the perfect
              wallpaper for your space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {wallpaperTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden border-2 hover:border-primary/30 transform hover:-translate-y-1"
              >
                <CardContent className="p-0">
                  {/* Image - More compact */}
                  <div className="aspect-[5/3] relative overflow-hidden bg-gray-100">
                    <FastImage
                      src={type.image}
                      alt={type.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-primary/90 text-white text-xs">
                        {type.badge}
                      </Badge>
                    </div>
                  </div>

                  {/* Trust Badges - Compact */}
                  <div className="px-3 py-2 bg-brand-sage-50 border-b border-brand-sage-100">
                    <div className="flex flex-wrap gap-1 justify-center">
                      <Badge className="bg-primary text-white px-2 py-1 text-xs font-medium rounded-full">
                        <Shield className="mr-1 h-3 w-3" />
                        5-Year
                      </Badge>
                      <Badge className="bg-brand-sage-200 text-brand-sage-800 px-2 py-1 text-xs font-medium rounded-full">
                        <Award className="mr-1 h-3 w-3" />
                        Expert
                      </Badge>
                      <Badge className="bg-brand-sage-200 text-brand-sage-800 px-2 py-1 text-xs font-medium rounded-full">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Free
                      </Badge>
                    </div>
                  </div>

                  {/* Content - More compact */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {type.name}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-2">
                        {type.description}
                      </p>
                      <p className="text-xs text-primary font-medium">
                        Perfect for: {type.perfect}
                      </p>
                    </div>

                    {/* Features - Compact */}
                    <div className="space-y-1">
                      {type.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-primary flex-shrink-0" />
                          <span className="text-xs text-muted-foreground">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Enhanced Dual CTAs */}
                    <div className="flex gap-3 pt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        asChild
                      >
                        <a href="tel:+918500900827">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                        asChild
                      >
                        <a
                          href="https://wa.me/8688723648"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          WhatsApp
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

      {/* Easy Installation Process Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              🎯 Our Hassle-Free Installation Process
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From consultation to completion, we make wallpaper installation simple and stress-free
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Step 1 */}
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Free On-Site Visit</h3>
                  <p className="text-sm text-muted-foreground">
                    We assess your wall size, condition, and discuss your design preferences
                  </p>
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-brand-sage-100 text-brand-sage-800 px-3 py-1">
                    <Eye className="mr-1 h-3 w-3" />
                    Free Assessment
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Design Finalization</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose patterns, get physical samples, and finalize your perfect design
                  </p>
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-brand-sage-100 text-brand-sage-800 px-3 py-1">
                    <Palette className="mr-1 h-3 w-3" />
                    Sample Provided
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 3 */}
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Expert Installation</h3>
                  <p className="text-sm text-muted-foreground">
                    Clean, dust-free, quick fitting by our experienced professionals
                  </p>
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-brand-sage-100 text-brand-sage-800 px-3 py-1">
                    <Award className="mr-1 h-3 w-3" />
                    Professional Team
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Step 4 */}
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/30">
              <CardContent className="space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  4
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-foreground">Post-Service Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Free support, maintenance tips, and warranty coverage included
                  </p>
                </div>
                <div className="flex justify-center">
                  <Badge className="bg-brand-sage-100 text-brand-sage-800 px-3 py-1">
                    <Shield className="mr-1 h-3 w-3" />
                    5-Year Warranty
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Trust Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-brand-sage-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose AB Wall Wonders?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Trusted by 100+ customers across Andhra Pradesh for premium wallpaper solutions
            </p>
          </div>

          {/* 4-point trust grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {/* 5-Year Warranty */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-brand-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">5-Year Warranty</h3>
              <p className="text-muted-foreground leading-relaxed">
                Complete protection on all installations with comprehensive warranty coverage
              </p>
            </div>

            {/* 20+ Projects Done */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-brand-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">📊 50+ Projects Done</h3>
              <p className="text-muted-foreground leading-relaxed">
                Successfully completed projects across residential and commercial spaces
              </p>
            </div>

            {/* Experienced Installers */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-brand-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">👨‍🔧 Experienced Installers</h3>
              <p className="text-muted-foreground leading-relaxed">
                2+ years of expertise with trained professionals for perfect installation
              </p>
            </div>

            {/* Free Consultation */}
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-brand-sage-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Phone className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Free Consultation</h3>
              <p className="text-muted-foreground leading-relaxed">
                No-cost design consultation and measurement service at your location
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our wallpaper services
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How long does wallpaper installation take?",
                answer: "Most rooms can be completed in 1-2 days depending on size and complexity. We work efficiently while maintaining high quality standards, and our team ensures minimal disruption to your daily routine."
              },
              {
                question: "What's included in the 5-year warranty?",
                answer: "Our warranty covers peeling, bubbling, fading, and installation defects. We provide free repairs or replacement if any issues arise due to material or installation problems within 5 years."
              },
              {
                question: "Can I see samples before making a decision?",
                answer: "Absolutely! We provide physical samples for all wallpaper types and can bring them to your location during our free consultation. This helps you see exactly how they'll look in your lighting conditions."
              },
              {
                question: "Do you handle wall preparation?",
                answer: "Yes, we handle complete wall preparation including cleaning, smoothing, priming, and any necessary repairs. Our team ensures your walls are perfectly prepared for a flawless wallpaper application."
              },
              {
                question: "What areas do you serve?",
                answer: "We serve all major cities across Andhra Pradesh including Visakhapatnam, Vijayawada, Guntur, Tirupati, and surrounding areas. Contact us to confirm service availability in your location."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-primary/10 overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                >
                  <h3 className="text-xl font-bold text-foreground">
                    {faq.question}
                  </h3>
                  <div className="ml-4 flex-shrink-0">
                    {expandedFAQ === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Services */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-brand-sage-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <Badge className="bg-primary text-white px-6 py-3 text-base font-bold rounded-full shadow-lg mx-auto mb-6">
              <ArrowRight className="mr-2 h-5 w-5" />
              Explore More Services
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Complete Your Interior Transformation
            </h2>
            <p className="text-xl text-muted-foreground">
              Discover our complete range of premium interior solutions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Wallpapers Service */}
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/images/wallpaperr.png"
                    alt="Premium Wallpapers"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    Premium Quality
                  </div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    Premium Wallpapers
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Transform your walls with our premium wallpaper collection, expert installation, and comprehensive design consultation.
                  </p>

                  {/* Dual CTA Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <Link to="/services/wallpapers">
                        <Eye className="mr-2 h-4 w-4" />
                        Explore Service
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <a href="tel:+918500900827">
                        <Phone className="mr-2 h-4 w-4" />
                        Make a Call
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Blinds Service */}
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/images/blindss.png"
                    alt="Custom Blinds"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    2-Year Warranty
                  </div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    Custom Blinds
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Smart window solutions with expert installation, home automation integration, and comprehensive 2-year warranty coverage.
                  </p>

                  {/* Dual CTA Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <Link to="/services/blinds">
                        <Eye className="mr-2 h-4 w-4" />
                        Explore Service
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <a href="tel:+918500900827">
                        <Phone className="mr-2 h-4 w-4" />
                        Make a Call
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flooring Service */}
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/images/flooringg.png"
                    alt="Premium Flooring"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    2-Year Warranty
                  </div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    Premium Flooring
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Durable flooring solutions with expert installation, premium materials, and extended 2-year warranty protection.
                  </p>

                  {/* Dual CTA Buttons */}
                  <div className="flex gap-4">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <Link to="/services/flooring">
                        <Eye className="mr-2 h-4 w-4" />
                        Explore Service
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <a href="tel:+918500900827">
                        <Phone className="mr-2 h-4 w-4" />
                        Make a Call
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-brand-sage-600 to-brand-sage-700 border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 mx-4">
              {/* Gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

              <CardContent className="relative p-8 md:p-10 text-center">
                <div className="space-y-6 text-primary-foreground">
                  <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                    Ready to Transform Your Walls?
                  </h2>
                  <p className="text-base opacity-95 leading-relaxed max-w-2xl mx-auto">
                    Get a free consultation and see samples of our premium wallpapers.
                    Our experts will help you choose the perfect design for your space.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Button
                      size="lg"
                      className="bg-white text-primary hover:bg-gray-50 font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                      asChild
                    >
                      <a href="tel:+918500900827">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
                      asChild
                    >
                      <a
                        href="https://wa.me/8688723648"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Us
                      </a>
                    </Button>
                  </div>

                  {/* Trust badges */}
                  <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm opacity-90">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Free consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Sample viewing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>5-Year warranty</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Expert installation</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>



      {/* Mobile Floating CTAs */}
      <MobileFloatingCTAs />
    </div>
  );
}
