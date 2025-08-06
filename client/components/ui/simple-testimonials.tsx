import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestimonialData {
  name: string
  location: string
  text: string
  rating: number
  avatar?: string
}

interface SimpleTestimonialsProps {
  title: string
  description: string
  testimonials: TestimonialData[]
  className?: string
}

export function SimpleTestimonials({
  title,
  description,
  testimonials,
  className
}: SimpleTestimonialsProps) {
  return (
    <section className={cn("py-20 bg-brand-sage-50", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="bg-white hover:shadow-lg transition-all duration-300 border-0 rounded-xl"
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Rating */}
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-muted-foreground leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-2">
                    <Avatar className="h-10 w-10">
                      <AvatarImage 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        loading="lazy"
                      />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {testimonial.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
