import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface CTACardProps {
  title: string
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
  trustBadges?: Array<{
    text: string
    icon?: React.ReactNode
  }>
  className?: string
}

export function CTACard({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  trustBadges = [
    { text: "Free consultation" },
    { text: "Sample viewing" },
    { text: "5-Year warranty" },
    { text: "Expert installation" }
  ],
  className
}: CTACardProps) {
  return (
    <section className={cn("py-8 md:py-16 bg-gradient-to-b from-gray-50 to-white", className)}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Responsive width: full on mobile, 90% on tablet, 70% on desktop */}
        <div className="max-w-5xl mx-auto w-full lg:w-4/5 xl:w-3/4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-primary via-brand-sage-600 to-brand-sage-700 border-2 border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300">
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>

            <CardContent className="relative p-6 md:p-8 lg:p-10 text-center">
              <div className="space-y-4 md:space-y-6 text-primary-foreground">
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                  {title}
                </h2>
                <p className="text-sm md:text-base lg:text-lg opacity-95 leading-relaxed max-w-2xl mx-auto">
                  {description}
                </p>

                {/* CTA Buttons - Stack on mobile, side by side on tablet+ */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-2 md:pt-4 max-w-md mx-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-gray-50 font-bold px-6 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base"
                    asChild
                  >
                    <a href={primaryCTA.href}>
                      {primaryCTA.icon}
                      <span className="ml-1">{primaryCTA.text}</span>
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary font-bold px-6 py-3 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm md:text-base"
                    asChild
                  >
                    <a
                      href={secondaryCTA.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {secondaryCTA.icon}
                      <span className="ml-1">{secondaryCTA.text}</span>
                    </a>
                  </Button>
                </div>

                {/* Trust badges - Responsive grid */}
                <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-6 pt-4 md:pt-6 text-xs md:text-sm opacity-90">
                  {trustBadges.map((badge, index) => (
                    <div key={index} className="flex items-center justify-center md:justify-start gap-1 md:gap-2">
                      {badge.icon || <CheckCircle className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />}
                      <span className="text-center md:text-left">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
