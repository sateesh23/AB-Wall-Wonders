import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, X } from "lucide-react";

export default function MobileFloatingCTAs() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating CTAs after scrolling 200px
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      {/* Floating CTA Container */}
      <div className="flex flex-col items-end space-y-3">
        {/* Expanded CTAs */}
        {isExpanded && (
          <div className="flex flex-col space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            {/* Call Now Button */}
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href="tel:+918500900827" className="flex items-center">
                <Phone className="mr-2 h-5 w-5" />
                📞 Call Now
              </a>
            </Button>

            {/* WhatsApp Button */}
            <Button
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a
                href="https://wa.me/8688723648"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                💬 WhatsApp
              </a>
            </Button>
          </div>
        )}

        {/* Toggle Button */}
        <Button
          size="lg"
          onClick={() => setIsExpanded(!isExpanded)}
          className={`w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isExpanded
              ? "bg-red-500 hover:bg-red-600"
              : "bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700"
          }`}
        >
          {isExpanded ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Phone className="h-6 w-6 text-white" />
          )}
        </Button>
      </div>
    </div>
  );
}
