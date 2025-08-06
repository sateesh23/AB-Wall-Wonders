import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Phone, MessageCircle, Star } from "lucide-react"

interface CTABarProps {
  title: string
  subtitle?: string
  description: string
  primaryCTA: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  secondaryCTA: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  showRating?: boolean
  rating?: number
  ratingText?: string
  className?: string
  variant?: "default" | "gradient" | "minimal"
}

export function CTABar({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  showRating = true,
  rating = 4.9,
  ratingText = "100+ Happy Clients",
  className,
  variant = "gradient"
}: CTABarProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "default":
        return "bg-primary text-primary-foreground"
      case "gradient":
        return "bg-gradient-to-r from-primary via-primary/90 to-brand-sage-600 text-white"
      case "minimal":
        return "bg-brand-sage-50 text-foreground border-t border-brand-sage-200"
      default:
        return "bg-gradient-to-r from-primary via-primary/90 to-brand-sage-600 text-white"
    }
  }

  return (
    <section className={cn(
      "relative py-16 lg:py-20 overflow-hidden",
      getVariantClasses(),
      className
    )}>
      {variant === "gradient" && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      )}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            {subtitle && (
              <p className={cn(
                "text-sm font-semibold uppercase tracking-wider mb-2",
                variant === "minimal" ? "text-primary" : "text-white/80"
              )}>
                {subtitle}
              </p>
            )}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4">
              {title}
            </h2>
            <p className={cn(
              "text-lg lg:text-xl max-w-2xl mx-auto",
              variant === "minimal" ? "text-muted-foreground" : "text-white/90"
            )}>
              {description}
            </p>
          </div>

          {/* Rating */}
          {showRating && (
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-5 w-5",
                      i < Math.floor(rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-white/30"
                    )}
                  />
                ))}
              </div>
              <span className={cn(
                "text-sm font-medium",
                variant === "minimal" ? "text-muted-foreground" : "text-white/90"
              )}>
                {rating} • {ratingText}
              </span>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "rounded-full font-semibold px-8 py-6 text-lg",
                variant === "minimal"
                  ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              <a href={primaryCTA.href}>
                {primaryCTA.icon}
                {primaryCTA.text}
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "rounded-full font-semibold px-8 py-6 text-lg border-2",
                variant === "minimal"
                  ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  : "border-white text-white hover:bg-white hover:text-primary"
              )}
            >
              <a href={secondaryCTA.href} target="_blank" rel="noopener noreferrer">
                {secondaryCTA.icon}
                {secondaryCTA.text}
              </a>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-8 pt-8 border-t border-white/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  variant === "minimal" ? "text-primary" : "text-white"
                )}>
                  100+
                </div>
                <div className={cn(
                  "text-sm",
                  variant === "minimal" ? "text-muted-foreground" : "text-white/70"
                )}>
                  Happy Clients
                </div>
              </div>
              <div className="text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  variant === "minimal" ? "text-primary" : "text-white"
                )}>
                  5 Year
                </div>
                <div className={cn(
                  "text-sm",
                  variant === "minimal" ? "text-muted-foreground" : "text-white/70"
                )}>
                  Warranty
                </div>
              </div>
              <div className="text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  variant === "minimal" ? "text-primary" : "text-white"
                )}>
                  24/7
                </div>
                <div className={cn(
                  "text-sm",
                  variant === "minimal" ? "text-muted-foreground" : "text-white/70"
                )}>
                  Support
                </div>
              </div>
              <div className="text-center">
                <div className={cn(
                  "text-2xl font-bold",
                  variant === "minimal" ? "text-primary" : "text-white"
                )}>
                  4 Cities
                </div>
                <div className={cn(
                  "text-sm",
                  variant === "minimal" ? "text-muted-foreground" : "text-white/70"
                )}>
                  Served
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
