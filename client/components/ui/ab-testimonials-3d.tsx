import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/3d-testimonials";
import { simpleTestimonials } from "@/data/testimonials";
import { MapPin } from "lucide-react";

// Extract service type from customer name or description
const getServiceType = (name: string, text: string) => {
  if (name.includes("Dental") || name.includes("Hospital"))
    return "Commercial Blinds";
  if (text.includes("wallpaper")) return "Wallpapers";
  if (text.includes("blinds")) return "Window Blinds";
  if (text.includes("flooring")) return "Flooring";
  return "Interior Design";
};

// Convert real testimonials data to the format expected by the 3D component
const testimonials = simpleTestimonials.map((testimonial) => ({
  name: testimonial.name.replace(/\s*\([^)]*\)/g, ""), // Remove business type from name for cleaner display
  location: testimonial.location,
  service: getServiceType(testimonial.name, testimonial.text),
  body: testimonial.text,
}));

function TestimonialCard({
  name,
  location,
  service,
  body,
}: (typeof testimonials)[number]) {
  // Get first letter of name for avatar fallback
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <Card className="w-64 mx-2">
      <CardContent className="p-4">
        {/* Customer Name with Avatar */}
        <div className="flex items-center gap-2.5 mb-3">
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary text-white font-semibold">
              {firstLetter}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col flex-1">
            <figcaption className="text-sm font-semibold text-foreground">
              {name}
            </figcaption>
            {/* Location with Icon */}
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              <span>{location}</span>
            </div>
          </div>
        </div>

        {/* Service Type */}
        <div className="mb-3">
          <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {service}
          </span>
        </div>

        {/* Description */}
        <blockquote className="text-sm text-secondary-foreground leading-relaxed">
          {body}
        </blockquote>
      </CardContent>
    </Card>
  );
}

export default function ABTestimonials3D() {
  return (
    <div className="relative flex h-96 w-full max-w-[800px] mx-auto flex-row items-center justify-center overflow-hidden gap-1.5 [perspective:300px] bg-white rounded-xl border border-primary/20 shadow-lg">
      <div
        className="flex flex-row items-center gap-4"
        style={{
          transform:
            "translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)",
        }}
      >
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {testimonials.map((review, index) => (
            <TestimonialCard key={`${review.name}-${index}`} {...review} />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:40s]"
        >
          {testimonials.map((review, index) => (
            <TestimonialCard
              key={`${review.name}-reverse-${index}`}
              {...review}
            />
          ))}
        </Marquee>
        {/* Vertical Marquee (downwards) */}
        <Marquee vertical pauseOnHover repeat={3} className="[--duration:40s]">
          {testimonials.map((review, index) => (
            <TestimonialCard
              key={`${review.name}-third-${index}`}
              {...review}
            />
          ))}
        </Marquee>
        {/* Vertical Marquee (upwards) */}
        <Marquee
          vertical
          pauseOnHover
          reverse
          repeat={3}
          className="[--duration:40s]"
        >
          {testimonials.map((review, index) => (
            <TestimonialCard
              key={`${review.name}-fourth-${index}`}
              {...review}
            />
          ))}
        </Marquee>

        {/* Gradient overlays for smooth edges */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
      </div>
    </div>
  );
}
