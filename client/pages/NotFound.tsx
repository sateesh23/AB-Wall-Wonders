import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Phone, MessageCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: 'url(/herooo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
      }}
    >
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-12 text-center">
            {/* Logo */}
            <div className="mb-8">
              <img
                src="/ABWWW.png"
                alt="AB Wall Wonders Logo"
                className="h-16 w-auto mx-auto"
              />
            </div>

            {/* 404 Message */}
            <div className="mb-8">
              <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Oops! Page Not Found
              </h2>
              <p className="text-lg text-muted-foreground mb-2">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <p className="text-sm text-muted-foreground">
                Attempted to access: <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code>
              </p>
            </div>

            {/* Navigation Options */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link to="/">
                    <Home className="mr-2 h-5 w-5" />
                    Go to Home
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Go Back
                </Button>
              </div>

              {/* Quick Links */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-muted-foreground mb-4">Or explore our services:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/services/wallpapers">Wallpapers</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/services/blinds">Blinds</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/services/flooring">Flooring</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/projects">Projects</Link>
                  </Button>
                </div>
              </div>

              {/* Contact Options */}
              <div className="pt-6 border-t border-gray-200">
                <p className="text-sm text-muted-foreground mb-4">Need help? Contact us:</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-primary text-primary hover:bg-primary hover:text-white"
                    asChild
                  >
                    <a href="tel:+918500900827">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
