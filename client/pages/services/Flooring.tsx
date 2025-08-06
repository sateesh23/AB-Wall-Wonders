import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

import {
  Layers,
  Phone,
  MessageCircle,
  CheckCircle,
  Shield,
  Award,
  Clock,
  Star,
  MapPin,
  Eye,
  Droplets,
  Leaf,
  Zap,
  Home,
  Palette,
  ArrowRight,
  Plus,
  Minus,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import MobileFloatingCTAs from "@/components/MobileFloatingCTAs";

const flooringTypes = [
  {
    name: "Vinyl Flooring",
    description: "Waterproof and easy maintenance luxury vinyl with realistic textures",
    features: ["100% waterproof", "Scratch resistant", "Easy to clean", "Anti-slip surface"],
    badge: "Most Popular",
    perfect: "Kitchens, bathrooms, and high-traffic areas",
    image: "/images/services/flooring/types/vinyl-flooring.jpg",
    applications: ["Residential", "Commercial", "Healthcare"],
  },
  {
    name: "Artificial Grass",
    description: "Low maintenance outdoor greenery that stays perfect year-round",
    features: ["UV resistant", "Drainage system", "Soft texture", "No watering needed"],
    badge: "Eco-Friendly",
    perfect: "Balconies, terraces, and outdoor spaces",
    image: "/images/services/flooring/types/artificial-grass.jpg",
    applications: ["Balconies", "Rooftops", "Gardens"],
  },
  {
    name: "Cushion Mats",
    description: "Comfort and safety flooring for high-traffic commercial areas",
    features: ["Shock absorption", "Anti-fatigue", "Chemical resistant", "Non-slip backing"],
    badge: "Safety First",
    perfect: "Commercial kitchens and work areas",
    image: "/images/services/flooring/types/cushion-mats.jpg",
    applications: ["Restaurants", "Factories", "Gyms"],
  },
];

const flooringFeatures = [
  {
    name: "Waterproof Technology",
    description: "Advanced protection against moisture and spills",
    icon: Droplets,
  },
  {
    name: "Eco-Friendly Materials",
    description: "Sustainable and environmentally conscious options",
    icon: Leaf,
  },
  {
    name: "Quick Installation",
    description: "Professional installation with minimal disruption",
    icon: Zap,
  },
  {
    name: "Durable Construction",
    description: "Built to withstand daily wear and heavy traffic",
    icon: Layers,
  },
  {
    name: "Water Resistant",
    description: "Advanced protection against moisture and spills",
    icon: Shield,
  },
  {
    name: "Easy Maintenance",
    description: "Simple cleaning and long-lasting performance",
    icon: CheckCircle,
  },
];

const flooringFAQs = [
  {
    question: "How long does flooring installation take?",
    answer: "Installation time varies by project size and flooring type. Most residential projects take 1-3 days, while commercial installations may take longer. We provide detailed timelines during consultation.",
  },
  {
    question: "What flooring is best for high-moisture areas?",
    answer: "Vinyl flooring is ideal for bathrooms, kitchens, and basements due to its 100% waterproof properties. It provides excellent protection against moisture while maintaining style and comfort.",
  },
  {
    question: "Do you provide warranty on flooring installation?",
    answer: "Yes, we offer comprehensive warranties on both materials and installation. Warranty periods vary by flooring type, with our standard 2-year coverage on all installations.",
  },
  {
    question: "Can you install flooring over existing floors?",
    answer: "In many cases, yes. Our experts assess your existing flooring to determine if it's suitable as a subfloor. This can save time and money while ensuring proper installation.",
  },
  {
    question: "What maintenance is required for different flooring types?",
    answer: "Maintenance varies by material. Vinyl requires simple mopping, artificial grass needs occasional brushing, and cushion mats benefit from regular cleaning. We provide detailed care instructions for each type.",
  },
];

// Real project data should be added here when available
const beforeAfterProjects: any[] = [];

export default function Flooring() {
  const [selectedProject, setSelectedProject] = useState(0);
  const [showBefore, setShowBefore] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  // Preload images
  useEffect(() => {
    flooringTypes.forEach((type) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [type.image]: true }));
        console.log('✅ Preloaded:', type.image);
      };
      img.onerror = () => {
        console.error('❌ Failed to preload:', type.image);
      };
      img.src = type.image;
    });
  }, []);

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
                  <Layers className="mr-2 h-5 w-5" />
                  Premium Flooring Solutions
                </Badge>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
                  Premium Flooring for
                  <span className="block text-primary">Lasting Beauty</span>
                </h1>

                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                  Discover durable flooring solutions with expert installation and a{' '}
                  <span className="text-primary font-semibold">2-year warranty</span>
                </p>
              </div>

              {/* Small inline highlights */}
              <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto text-sm">
                <div className="flex items-center gap-1 text-primary">
                  <Shield className="h-3 w-3" />
                  <span className="font-medium">2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <Users className="h-3 w-3" />
                  <span className="font-medium">Expert Installation</span>
                </div>
                <div className="flex items-center gap-1 text-primary">
                  <CheckCircle className="h-3 w-3" />
                  <span className="font-medium">Free Site Visit</span>
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

      {/* Flooring Types Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Choose Your Flooring Type
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From waterproof vinyl to artificial grass, find the perfect
              flooring solution for your space
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {flooringTypes.map((type, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden border-2 hover:border-primary/30 transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-white font-semibold">
                      {type.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {type.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {type.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="h-3 w-3 text-primary mr-1 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Perfect for:</h4>
                      <p className="text-sm text-muted-foreground">{type.perfect}</p>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      className="flex-1 bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold"
                      asChild
                    >
                      <a href="tel:+918500900827">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Services */}
      <section className="py-20 bg-white">
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
            {/* Flooring Service */}
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/images/flooringg.png"
                    alt="Premium Flooring"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Failed to load flooring image:', e.target.src);
                      e.target.src = '/placeholder.svg';
                    }}
                    onLoad={() => {
                      console.log('Flooring image loaded successfully');
                    }}
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

            {/* Wallpapers Service */}
            <Card className="group hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-2 hover:border-primary/40 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                  <img
                    src="/images/wallpaperr.png"
                    alt="Premium Wallpapers"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      console.error('Failed to load wallpaper image:', e.target.src);
                      e.target.src = '/placeholder.svg';
                    }}
                    onLoad={() => {
                      console.log('Wallpaper image loaded successfully');
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    5-Year Warranty
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
                    Transform your walls with our premium wallpaper collection, expert installation, and comprehensive 5-year warranty coverage.
                  </p>
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
                    onError={(e) => {
                      console.error('Failed to load blinds image:', e.target.src);
                      e.target.src = '/placeholder.svg';
                    }}
                    onLoad={() => {
                      console.log('Blinds image loaded successfully');
                    }}
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
          </div>
        </div>
      </section>

      {/* Mobile Floating CTAs */}
      <MobileFloatingCTAs />
    </div>
  );
}