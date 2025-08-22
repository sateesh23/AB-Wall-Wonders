import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, ChevronDown, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigation = [
  {
    name: "Home",
    href: "/",
    dropdown: [
      { name: "Home", href: "/" },
      { name: "Projects", href: "/projects" },
    ],
  },
  {
    name: "Services",
    href: "#",
    dropdown: [
      { name: "Premium Wallpapers", href: "/services/wallpapers" },
      { name: "Window Blinds", href: "/services/blinds" },
      { name: "Luxury Flooring", href: "/services/flooring" },
    ],
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-transparent" role="banner">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* LEFT: Desktop Navigation Menu */}
          <nav
            className="hidden lg:flex items-center space-x-1"
            role="navigation"
            aria-label="Main navigation"
          >
            {navigation.map((item) =>
              item.dropdown ? (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-full",
                        // Special handling for Home dropdown - check if current path is in dropdown items
                        item.name === "Home"
                          ? location.pathname === "/" ||
                            item.dropdown?.some(
                              (subItem) => subItem.href === location.pathname,
                            )
                            ? "text-primary"
                            : "text-foreground hover:text-primary"
                          : location.pathname.startsWith(item.href)
                            ? "text-primary"
                            : "text-foreground hover:text-primary",
                      )}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="start"
                    className="w-56 bg-white/95 backdrop-blur-md border border-primary/20 shadow-xl rounded-xl"
                  >
                    {item.dropdown.map((subItem) => (
                      <DropdownMenuItem key={subItem.name} asChild>
                        <Link
                          to={subItem.href}
                          className={cn(
                            "w-full px-4 py-3 text-sm font-medium transition-colors hover:text-primary hover:bg-primary/5 rounded-lg cursor-pointer",
                            location.pathname === subItem.href
                              ? "text-primary bg-primary/10"
                              : "text-foreground",
                          )}
                        >
                          {subItem.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary hover:bg-primary/10 px-4 py-2 rounded-full",
                    location.pathname === item.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary",
                  )}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          {/* CENTER: Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src="/ABWWW.png"
              alt="AB Wall Wonders Logo"
              className="h-12 w-auto transition-transform group-hover:scale-105"
            />
          </Link>

          {/* RIGHT: CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
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
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-full hover:bg-primary/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close main menu" : "Open main menu"}
            type="button"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-4 pt-4 pb-6 space-y-3 bg-white/95 border-t border-primary/20 shadow-lg rounded-b-lg">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div className="space-y-2">
                      <Link
                        to={item.href}
                        className={cn(
                          "block px-4 py-3 text-base font-semibold rounded-xl transition-colors",
                          // Special handling for Home dropdown in mobile
                          item.name === "Home"
                            ? location.pathname === "/" ||
                              item.dropdown?.some(
                                (subItem) => subItem.href === location.pathname,
                              )
                              ? "text-primary"
                              : "text-foreground hover:text-primary hover:bg-primary/10"
                            : location.pathname.startsWith(item.href)
                              ? "text-primary bg-primary/15 border-primary/20"
                              : "text-foreground hover:text-primary hover:bg-primary/10",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                      <div className="ml-4 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            to={subItem.href}
                            className={cn(
                              "block px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                              location.pathname === subItem.href
                                ? "text-primary bg-primary/15 border-primary/20"
                                : "text-foreground hover:text-primary hover:bg-primary/10",
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "block px-4 py-3 text-base font-semibold rounded-xl transition-colors",
                        location.pathname === item.href
                          ? "text-primary"
                          : "text-foreground hover:text-primary hover:bg-primary/10",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-6 space-y-3 border-t border-primary/20">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border-primary text-primary hover:bg-primary hover:text-white rounded-lg font-semibold"
                  asChild
                >
                  <a href="tel:+918500900827">
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-primary to-brand-sage-600 hover:from-primary/90 hover:to-brand-sage-700 text-white font-semibold rounded-lg"
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
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
