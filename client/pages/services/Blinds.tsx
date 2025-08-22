import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import SEO, {
  generateServiceSchema,
  generateFAQSchema,
} from "@/components/SEO";

import {
  Home,
  Phone,
  MessageCircle,
  CheckCircle,
  Sun,
  Zap,
  ArrowRight,
  Users,
  Eye,
  Target,
  Palette,
  Wrench,
  Scissors,
} from "lucide-react";
import { useEffect } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const blindTypes = [
  {
    name: "Bamboo Outdoor Blinds",
    description: "Natural bamboo blinds perfect for outdoor spaces and patios",
    features: [
      "Weather Resistant",
      "Natural Material",
      "UV Protection",
      "2-year warranty",
    ],
    badge: "Outdoor Specialist",
    perfect: "Patios, balconies, outdoor dining",
    image: "/images/services/blinds/types/bamboo-outdoor-blinds.jpg",
    applications: ["Outdoor", "Patios", "Balconies"],
  },
  {
    name: "Cellular Shades",
    description:
      "Energy-efficient cellular shades that provide excellent insulation",
    features: [
      "Energy Efficient",
      "Insulation",
      "Light Filtering",
      "2-year warranty",
    ],
    badge: "Energy Saver",
    perfect: "Bedrooms, offices, energy-conscious homes",
    image: "/images/services/blinds/types/cellular-shades.jpg",
    applications: ["Residential", "Energy Saving", "Comfort"],
  },
  {
    name: "Customized Blinds",
    description:
      "Fully customized blinds tailored to your specific requirements",
    features: ["Custom Design", "Perfect Fit", "Any Size", "2-year warranty"],
    badge: "Most Popular",
    perfect: "Unique windows, special requirements",
    image: "/images/services/blinds/types/customized-blinds.jpg",
    applications: ["Custom Projects", "Special Sizes", "Unique Designs"],
  },
  {
    name: "PVC Exterior Blinds",
    description:
      "Durable PVC blinds designed for exterior use and weather protection",
    features: [
      "Weather Proof",
      "Easy Maintenance",
      "Long Lasting",
      "2-year warranty",
    ],
    badge: "Weather Resistant",
    perfect: "Exterior windows, harsh weather areas",
    image: "/images/services/blinds/types/pvc-exterior-blinds.jpg",
    applications: ["Exterior", "Commercial", "Weather Protection"],
  },
  {
    name: "Roller Blinds",
    description:
      "Sleek and modern roller blinds perfect for any window in your home",
    features: [
      "Easy Operation",
      "Light Control",
      "Privacy Protection",
      "2-year warranty",
    ],
    badge: "Classic Choice",
    perfect: "Living rooms, bedrooms, offices",
    image: "/images/services/blinds/types/roller-blinds.jpg",
    applications: ["Residential", "Commercial", "Healthcare"],
  },
  {
    name: "Roman Blinds",
    description:
      "Elegant Roman blinds that add sophisticated charm to any space",
    features: [
      "Elegant Design",
      "Soft Fabrics",
      "Luxurious Look",
      "2-year warranty",
    ],
    badge: "Luxury",
    perfect: "Formal spaces, living rooms, bedrooms",
    image: "/images/services/blinds/types/roman-blinds.jpg",
    applications: ["Luxury Homes", "Hotels", "Formal Spaces"],
  },
  {
    name: "Wooden Blinds",
    description: "Premium wooden blinds that add natural elegance to any space",
    features: [
      "Natural Wood",
      "Adjustable Slats",
      "Durable Finish",
      "2-year warranty",
    ],
    badge: "Eco-Friendly",
    perfect: "Traditional homes, offices, dining rooms",
    image: "/images/services/blinds/types/wooden-blinds.jpg",
    applications: ["Homes", "Restaurants", "Hotels"],
  },
  {
    name: "Zebra Blinds",
    description:
      "Modern zebra blinds offering versatile light control and privacy options",
    features: [
      "Dual Function",
      "Light Filtering",
      "Easy Adjustment",
      "2-year warranty",
    ],
    badge: "Modern Choice",
    perfect: "Modern homes, offices, study rooms",
    image: "/images/services/blinds/types/zebra-blinds.jpg",
    applications: ["Corporate", "Residential", "Studios"],
  },
];

export default function Blinds() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate FAQ structured data for blinds
  const blindsFAQs = [
    {
      question: "What types of blinds do you offer?",
      answer:
        "We offer bamboo outdoor blinds, cellular shades, Roman shades, vertical blinds, roller shades, and Venetian blinds with both motorized and manual options.",
    },
    {
      question: "Do you provide motorized blinds?",
      answer:
        "Yes, we offer smart motorized blinds with remote control and automation features for modern homes and offices.",
    },
    {
      question: "Are your blinds custom-made?",
      answer:
        "Yes, all our blinds are custom-sized and precision-made to fit your specific windows and requirements perfectly.",
    },
    {
      question: "What warranty do you provide on blinds?",
      answer:
        "We provide a 2-year warranty on all blinds installations, covering both the blinds and installation workmanship.",
    },
  ];

  const blindsServiceSchema = generateServiceSchema(
    "Custom Window Blinds Installation",
    "Professional installation of motorized and manual blinds, custom-sized for perfect fit across Andhra Pradesh with 2-year warranty coverage",
    "https://ab-wall-wonders.vercel.app/images/blindss.png",
  );

  return (
    <>
      <SEO
        title="Custom Window Blinds & Motorized Blinds in Andhra Pradesh | AB Wall Wonders"
        description="Premium custom window blinds with motorized options. Perfect light control and privacy solutions. Expert installation across Andhra Pradesh with 2-year warranty!"
        keywords="window blinds Andhra Pradesh, motorized blinds, custom blinds, Roman shades, vertical blinds, roller shades, Venetian blinds, smart blinds"
        url="https://abwallwonders.com/services/blinds"
        type="service"
        structuredData={blindsServiceSchema}
      />
      <div className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-white text-sage-800">
          <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-32 sm:px-6 lg:px-8 lg:pt-20 lg:pb-40">
            <div className="text-center">
              <div className="inline-flex items-center rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 border border-sage-200 mb-6">
                <Home className="mr-2 h-4 w-4" />
                Window Blinds
              </div>

              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 text-green-700">
                Style Meets Privacy with Custom Window Blinds
              </h1>

              <p className="mt-6 text-xl leading-8 text-sage-600 max-w-3xl mx-auto mb-8">
                Effortlessly control light and enhance aesthetics with our
                premium blinds. Designed for elegance and built to last – backed
                by a 2-year warranty.
              </p>

              {/* Service Labels */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                <span className="inline-flex items-center rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 border border-sage-200">
                  <Target className="mr-2 h-4 w-4" />
                  Made to Measure
                </span>
                <span className="inline-flex items-center rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 border border-sage-200">
                  <Sun className="mr-2 h-4 w-4" />
                  Light & UV Control
                </span>
                <span className="inline-flex items-center rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 border border-sage-200">
                  <Scissors className="mr-2 h-4 w-4" />
                  Easy to Clean
                </span>
                <span className="inline-flex items-center rounded-full bg-sage-100 px-4 py-2 text-sm font-medium text-sage-700 border border-sage-200">
                  <Wrench className="mr-2 h-4 w-4" />
                  Professional Fitting
                </span>
              </div>

              {/* Stats moved above CTA buttons */}
              <div className="grid grid-cols-2 gap-8 max-w-md mx-auto mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">100+</div>
                  <div className="text-sage-600">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">
                    2 Years
                  </div>
                  <div className="text-sage-600">Of Establishment</div>
                </div>
              </div>

              {/* CTA Buttons - responsive layout */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                <a
                  href="https://wa.me/44123456789"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-green-700 text-white px-8 py-4 text-base font-semibold shadow-lg hover:bg-green-800 transition-all duration-300 transform hover:scale-105 min-w-[160px]"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp Us
                </a>
                <Link
                  to="/projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-green-700 bg-white text-green-700 px-8 py-4 text-base font-semibold hover:bg-green-50 transition-all duration-300 min-w-[160px]"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Explore All Services
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blind Types Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-700 mb-4">
                Our Blinds Collection
              </h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                Choose from our premium range of blinds options, each designed
                for specific light control and privacy needs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blindTypes.map((type, index) => (
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

                    {/* Updated card buttons */}
                    <div className="flex gap-3">
                      <a
                        href="https://wa.me/44123456789"
                        className="flex-1 inline-flex items-center justify-center rounded-full bg-green-700 text-white px-4 py-2 text-sm font-semibold hover:bg-green-800 transition-colors"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        WhatsApp Us
                      </a>
                      <Link
                        to="/projects"
                        className="inline-flex items-center justify-center rounded-full border border-green-700 bg-white text-green-700 px-4 py-2 text-sm font-semibold hover:bg-green-50 transition-colors"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        See Projects
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Our Blinds Section */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-green-700 mb-4">
                Why Choose Our Blinds?
              </h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                Quality materials, expert installation, and unmatched customer
                service
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Made to Measure",
                  description:
                    "Precisely fitted to your windows for perfect coverage",
                  icon: Target,
                },
                {
                  name: "50+ Color Options",
                  description:
                    "Wide range of colors and materials to match your decor",
                  icon: Palette,
                },
                {
                  name: "Professional Fitting",
                  description:
                    "Expert installation ensuring smooth operation and longevity",
                  icon: Wrench,
                },
                {
                  name: "UV Protection",
                  description:
                    "Advanced fabrics that protect furniture from sun damage",
                  icon: Sun,
                },
                {
                  name: "Easy to Clean",
                  description:
                    "Simple maintenance for long-lasting performance",
                  icon: CheckCircle,
                },
                {
                  name: "Quick Installation",
                  description:
                    "Professional installation with minimal disruption",
                  icon: Zap,
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
              <h2 className="text-4xl font-bold text-green-700 mb-4">
                Complete Your Space
              </h2>
              <p className="text-xl text-sage-600 max-w-3xl mx-auto">
                Enhance your blinds with our premium wallpapers and flooring
                solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                to="/services/wallpapers"
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src="/images/wallpaperr.png"
                    alt="Premium Wallpapers"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Wallpapers
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Designer wallpapers that complement your window treatments
                    perfectly
                  </p>
                  <div className="flex items-center text-white/80 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Premium Quality
                  </div>
                </div>
              </Link>

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
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowRight className="h-8 w-8" />
                  </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Interior Flooring
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    Waterproof vinyl flooring for the perfect foundation
                  </p>
                  <div className="flex items-center text-white/80 text-sm">
                    <Users className="h-4 w-4 mr-2" />
                    Expert Installation
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-20 relative overflow-hidden bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-3xl transform rotate-1"></div>
              <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-green-800 rounded-3xl p-12 text-white">
                <div className="text-center">
                  <h2 className="text-4xl font-bold mb-6 text-white">
                    Lets make you'r home feels Brand new
                  </h2>
                  <p className="text-xl text-green-100 mb-12 max-w-3xl mx-auto">
                    Get a free consultation and quote for your blinds project.
                    Professional installation with 2-year warranty included.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <a
                      href="https://wa.me/44123456789"
                      className="inline-flex items-center justify-center rounded-full bg-white text-green-700 px-6 py-3 text-base font-semibold shadow-lg hover:bg-green-50 transition-all duration-300 transform hover:scale-105"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Whatsapp Us
                    </a>
                    <a
                      href="tel:+44123456789"
                      className="inline-flex items-center justify-center rounded-full border-2 border-white/30 bg-white/10 backdrop-blur-sm text-white px-6 py-3 text-base font-semibold hover:bg-white/20 transition-all duration-300"
                    >
                      <Phone className="mr-2 h-4 w-4" />
                      Our services
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <MobileFloatingCTAs />
      </div>
    </>
  );
}
