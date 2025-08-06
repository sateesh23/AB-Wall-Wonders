import { Button } from "@/components/ui/button";
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
  Star,
  MapPin,
  Eye,
  Smartphone,
  Sun,
  Zap,
  Palette,
  ArrowRight,
  Plus,
  Minus,
} from "lucide-react";
import { useState, useEffect } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const blindTypes = [
  {
    name: "Roller Blinds",
    description: "Simple and effective window covering with smooth operation",
    features: [
      "Easy to operate",
      "Space-saving design",
      "Various fabric options",
      "Light control",
    ],
    badge: "Most Popular",
    perfect: "All rooms and window types",
    image: "/images/services/blinds/types/roller-blinds.jpg",
  },
  {
    name: "Zebra Blinds",
    description: "Dual fabric layers for versatile light control and privacy",
    features: [
      "Day and night functionality",
      "Adjustable opacity",
      "Modern design",
      "Easy operation",
    ],
    badge: "Most Versatile",
    perfect: "Living rooms and bedrooms",
    image: "/images/services/blinds/types/zebra-blinds.jpg",
  },
  {
    name: "Cellular Shades/Blinds",
    description: "Energy efficient honeycomb design for insulation",
    features: [
      "Energy savings",
      "Noise reduction",
      "UV protection",
      "Temperature control",
    ],
    badge: "Energy Efficient",
    perfect: "All weather conditions",
    image: "/images/services/blinds/types/cellular-shades.jpg",
  },
  {
    name: "Roman Blinds",
    description: "Elegant fabric folds creating sophisticated window treatment",
    features: [
      "Premium fabrics",
      "Classic elegance",
      "Soft fold design",
      "Custom patterns",
    ],
    badge: "Premium Style",
    perfect: "Bedrooms and formal areas",
    image: "/images/services/blinds/types/roman-blinds.jpg",
  },
  {
    name: "Bamboo Outdoor Blinds",
    description: "Natural bamboo material for outdoor spaces and eco-friendly choice",
    features: [
      "Natural bamboo",
      "Weather resistant",
      "Eco-friendly",
      "Outdoor suitable",
    ],
    badge: "Eco-Friendly",
    perfect: "Patios and outdoor areas",
    image: "/images/services/blinds/types/bamboo-outdoor-blinds.jpg",
  },
  {
    name: "Customized Blinds",
    description: "Tailor-made blinds designed to fit your specific requirements",
    features: [
      "Custom sizing",
      "Personalized design",
      "Any window shape",
      "Unique solutions",
    ],
    badge: "Custom Made",
    perfect: "Unique windows and spaces",
    image: "/images/services/blinds/types/customized-blinds.jpg",
  },
  {
    name: "Wooden Blinds",
    description: "Natural wood finish bringing warmth and elegance",
    features: [
      "Real wood materials",
      "Multiple stain options",
      "Classic appeal",
      "Durable construction",
    ],
    badge: "Classic Choice",
    perfect: "Study rooms and traditional decor",
    image: "/images/services/blinds/types/wooden-blinds.jpg",
  },
  {
    name: "PVC Exterior Blinds",
    description: "Weather-resistant outdoor solutions for patios and balconies",
    features: [
      "Weatherproof material",
      "UV resistant",
      "Easy maintenance",
      "Outdoor rated",
    ],
    badge: "Weatherproof",
    perfect: "Balconies and outdoor areas",
    image: "/images/services/blinds/types/pvc-exterior-blinds.jpg",
  },
];

// Service features based on your notes
const serviceFeatures = [
  {
    name: "2 Years Warranty",
    description: "Complete coverage for materials and workmanship",
    icon: Shield,
  },
  {
    name: "With Installation",
    description: "Professional installation service included",
    icon: Award,
  }
];

const applications = [
  {
    name: "Home Applications",
    areas: ["Living Rooms", "Bedrooms", "Kitchen", "Study Room"],
    icon: Home,
    color: "bg-blue-500",
  },
  {
    name: "Office Applications",
    areas: [
      "Conference Rooms",
      "Executive Offices",
      "Reception Areas",
      "Workspaces",
    ],
    icon: Award,
    color: "bg-green-500",
  },
  {
    name: "Outdoor Applications",
    areas: ["Balconies", "Patios", "Terraces", "Garden Areas"],
    icon: Sun,
    color: "bg-orange-500",
  },
];

const smartFeatures = [
  {
    name: "App Control",
    description: "Control from anywhere with smartphone app",
    icon: Smartphone,
  },
  {
    name: "Voice Commands",
    description: "Compatible with Alexa and Google Assistant",
    icon: MessageCircle,
  },
  {
    name: "Automated Scheduling",
    description: "Set timers for automatic operation",
    icon: Clock,
  },
  {
    name: "Energy Monitoring",
    description: "Track energy savings and efficiency",
    icon: Zap,
  },
];

// Note: Before/after project data removed as it contained fake data
// Real project data should be added here when available
const beforeAfterProjects: any[] = [];



export default function Blinds() {
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
                  <Home className="mr-2 h-5 w-5" />
                  Smart Window Blinds
                </Badge>

                {/* Large headline + trust-building subtitle */}
                <div className="space-y-6">
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-foreground leading-tight">
                    Custom Blinds for
                    <span className="text-primary block bg-gradient-to-r from-primary to-brand-sage-600 bg-clip-text text-transparent">
                      Modern Interiors
                    </span>
                  </h1>
                  <p className="text-2xl lg:text-3xl font-semibold text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    Discover tailor-made window solutions with expert installation and a 2-year warranty.
                  </p>
                </div>
              </div>

              {/* Small inline highlights */}
              <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center gap-1 text-primary">
                  <Shield className="h-3 w-3" />
                  <span className="font-medium">2-Year Warranty</span>
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

      {/* Blind Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Choose Your Blind Type
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From smart motorized solutions to elegant traditional blinds, find
              the perfect fit for your space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {blindTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
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

                    {/* CTAs */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="flex-1" asChild>
                        <a href="tel:+918500900827">
                          <Phone className="mr-2 h-3 w-3" />
                          Call
                        </a>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        asChild
                      >
                        <a
                          href="https://wa.me/918688723648"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="mr-2 h-3 w-3" />
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
                    Ready to Upgrade Your Windows?
                  </h2>
                  <p className="text-base opacity-95 leading-relaxed max-w-2xl mx-auto">
                    Get a free consultation and see our blind samples. Our experts
                    will help you choose the perfect window treatment solution.
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
                        href="https://wa.me/918688723648"
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
                      <span>Smart integration</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Quality assured</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span>Custom sizing</span>
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
