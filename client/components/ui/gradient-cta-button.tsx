import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle, Eye, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface GradientCTAButtonProps {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: "arrow" | "phone" | "message" | "eye" | "calendar";
  children: React.ReactNode;
  href?: string;
  to?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const iconMap = {
  arrow: ArrowRight,
  phone: Phone,
  message: MessageCircle,
  eye: Eye,
  calendar: Calendar,
};

export function GradientCTAButton({
  variant = "primary",
  size = "md",
  icon,
  children,
  href,
  to,
  onClick,
  className,
  disabled = false,
}: GradientCTAButtonProps) {
  const IconComponent = icon ? iconMap[icon] : null;

  const baseClasses = cn(
    "relative overflow-hidden font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95",
    "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
    {
      // Primary variant - Green gradient
      "bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white shadow-lg hover:shadow-xl": variant === "primary",
      "hover:from-primary/90 hover:via-primary/80 hover:to-primary/70": variant === "primary",
      
      // Secondary variant - Subtle gradient
      "bg-gradient-to-r from-secondary via-secondary/90 to-secondary/80 text-secondary-foreground": variant === "secondary",
      "hover:from-secondary/90 hover:via-secondary/80 hover:to-secondary/70": variant === "secondary",
      
      // Outline variant - Border with gradient on hover
      "border-2 border-primary text-primary bg-transparent hover:bg-gradient-to-r hover:from-primary hover:to-primary/80 hover:text-white": variant === "outline",
      
      // Sizes
      "px-4 py-2 text-sm": size === "sm",
      "px-6 py-3 text-base": size === "md",
      "px-8 py-4 text-lg": size === "lg",
      
      // Disabled state
      "opacity-50 cursor-not-allowed hover:scale-100": disabled,
    },
    className
  );

  const iconClasses = cn(
    "transition-transform duration-300",
    {
      "h-4 w-4": size === "sm",
      "h-5 w-5": size === "md",
      "h-6 w-6": size === "lg",
    }
  );

  const content = (
    <>
      {/* Shimmer effect overlay */}
      <div className="absolute inset-0 -top-[1px] -bottom-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      
      {/* Button content */}
      <span className="relative flex items-center justify-center gap-2">
        {children}
        {IconComponent && (
          <IconComponent 
            className={cn(
              iconClasses,
              "group-hover:translate-x-1 transition-transform duration-300"
            )} 
          />
        )}
      </span>
    </>
  );

  const buttonProps = {
    className: cn(baseClasses, "group"),
    disabled,
    onClick,
  };

  if (to) {
    return (
      <Button asChild {...buttonProps}>
        <Link to={to}>
          {content}
        </Link>
      </Button>
    );
  }

  if (href) {
    return (
      <Button asChild {...buttonProps}>
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      </Button>
    );
  }

  return (
    <Button {...buttonProps}>
      {content}
    </Button>
  );
}

// Preset CTA buttons for common use cases
export function CallCTAButton({ className, ...props }: Omit<GradientCTAButtonProps, 'icon' | 'href'>) {
  return (
    <GradientCTAButton
      icon="phone"
      href="tel:+919876543210"
      className={className}
      {...props}
    >
      Call Now
    </GradientCTAButton>
  );
}

export function QuoteCTAButton({ className, ...props }: Omit<GradientCTAButtonProps, 'icon' | 'to'>) {
  return (
    <GradientCTAButton
      icon="message"
      to="/contact"
      className={className}
      {...props}
    >
      Get Free Quote
    </GradientCTAButton>
  );
}

export function ViewProjectsCTAButton({ className, ...props }: Omit<GradientCTAButtonProps, 'icon' | 'to'>) {
  return (
    <GradientCTAButton
      icon="eye"
      to="/projects"
      variant="outline"
      className={className}
      {...props}
    >
      View Projects
    </GradientCTAButton>
  );
}

export function BookConsultationCTAButton({ className, ...props }: Omit<GradientCTAButtonProps, 'icon' | 'to'>) {
  return (
    <GradientCTAButton
      icon="calendar"
      to="/contact"
      className={className}
      {...props}
    >
      Book Consultation
    </GradientCTAButton>
  );
}
