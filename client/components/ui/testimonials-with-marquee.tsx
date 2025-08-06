import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"
import { memo, useMemo } from "react"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export const TestimonialsSection = memo(function TestimonialsSection({
  title,
  description,
  testimonials,
  className
}: TestimonialsSectionProps) {
  // Memoize the repeated testimonials array for better performance
  const repeatedTestimonials = useMemo(() => {
    if (testimonials.length === 0) return []

    // Create 3 sets for smooth infinite scroll
    return [...Array(3)].flatMap((_, setIndex) =>
      testimonials.map((testimonial, i) => ({
        ...testimonial,
        key: `${setIndex}-${i}`
      }))
    )
  }, [testimonials])

  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className={cn(
      "bg-background text-foreground",
      "py-12 sm:py-24 md:py-32 px-0",
      className
    )}>
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-muted-foreground sm:text-xl">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {/* Marquee container with proper CSS variables */}
          <div
            className="group flex overflow-hidden p-2 flex-row"
            style={{
              '--gap': '1rem',
              '--duration': '30s'
            } as React.CSSProperties}
          >
            <div
              className="flex shrink-0 gap-4 animate-marquee flex-row group-hover:[animation-play-state:paused]"
              style={{ gap: 'var(--gap)' }}
            >
              {repeatedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.key}
                  author={testimonial.author}
                  text={testimonial.text}
                  href={testimonial.href}
                />
              ))}
            </div>
          </div>

          {/* Gradient overlays for fade effect */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  )
})
