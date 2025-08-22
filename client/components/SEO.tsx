import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: "website" | "article" | "product" | "service";
  structuredData?: object | object[];
  noIndex?: boolean;
  canonicalUrl?: string;
  preloadImages?: string[];
}

export default function SEO({
  title = "AB Wall Wonders - Premium Wallpapers, Flooring & Blinds in Andhra Pradesh",
  description = "Transform your space with AB Wall Wonders! Premium wallpapers, luxury flooring, and custom blinds with expert installation across Andhra Pradesh. 15+ years experience, 5-year warranty. Get your free quote today!",
  keywords = "AB Wall Wonders, ABwallwonders, AB wall wonders, abwallwonders, A B Wall Wonders, wallpapers Andhra Pradesh, 3D wallpaper, interior flooring, vinyl flooring, window blinds, custom wallpaper, interior design Andhra Pradesh, home renovation, premium wallpapers, luxury flooring, wall wonders, ab wall, wall wonder, abhay wall wonders, ab wonders",
  image = "/images/og-default.jpg",
  url = "https://ab-wall-wonders.vercel.app",
  type = "website",
  structuredData,
  noIndex = false,
  canonicalUrl,
  preloadImages = [],
}: SEOProps) {
  const fullTitle = title.includes("AB Wall Wonders")
    ? title
    : `${title} | AB Wall Wonders`;
  const currentUrl = canonicalUrl || url;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
      )}

      {/* Open Graph Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="AB Wall Wonders" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geographic & Business Meta Tags */}
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content="Andhra Pradesh" />
      <meta name="geo.position" content="15.9129;79.7400" />
      <meta name="ICBM" content="15.9129, 79.7400" />

      {/* Business Information */}
      <meta name="author" content="AB Wall Wonders" />
      <meta
        name="business:contact_data:street_address"
        content="Andhra Pradesh"
      />
      <meta name="business:contact_data:locality" content="Andhra Pradesh" />
      <meta name="business:contact_data:region" content="Andhra Pradesh" />
      <meta name="business:contact_data:postal_code" content="516001" />
      <meta name="business:contact_data:country_name" content="India" />
      <meta
        name="business:contact_data:phone_number"
        content="+91-8500900827"
      />
      <meta
        name="business:contact_data:website"
        content="https://ab-wall-wonders.vercel.app"
      />

      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />

      {/* Favicons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="16x16" href="/images/icons/favicon-16x16.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/images/icons/favicon-32x32.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/images/icons/icon-192x192.png" />
      <link rel="icon" type="image/png" sizes="512x512" href="/images/icons/icon-512x512.png" />

      {/* Additional SEO Meta Tags */}
      <meta name="format-detection" content="telephone=yes" />
      <meta name="apple-mobile-web-app-title" content="AB Wall Wonders" />
      <meta name="application-name" content="AB Wall Wonders" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="theme-color" content="#16a34a" />
      <meta name="msapplication-TileColor" content="#16a34a" />
      <meta name="msapplication-config" content="/browserconfig.xml" />

      {/* Enhanced SEO Meta Tags */}
      <meta name="language" content="English" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />
      <meta name="revisit-after" content="7 days" />
      <meta name="HandheldFriendly" content="True" />
      <meta name="MobileOptimized" content="320" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

      {/* Brand Name Variations Meta Tags */}
      <meta name="alternate-name" content="ABwallwonders" />
      <meta name="alternate-name" content="AB wall wonders" />
      <meta name="alternate-name" content="abwallwonders" />
      <meta name="alternate-name" content="A B Wall Wonders" />
      <meta name="alternate-name" content="Wall Wonders" />
      <meta name="alternate-name" content="AB Wonders" />

      {/* Local Business Meta Tags */}
      <meta name="geo.placename" content="Andhra Pradesh, India" />
      <meta name="geo.region" content="IN-AP" />
      <meta name="ICBM" content="15.9129, 79.7400" />
      <meta name="geo.position" content="15.9129;79.7400" />
      <meta name="DC.title" content={fullTitle} />
      <meta name="DC.subject" content={keywords} />
      <meta name="DC.description" content={description} />

      {/* Voice Search Optimization */}
      <meta name="speakable" content="true" />
      <meta name="voice-search-keywords" content="AB Wall Wonders near me, wallpaper installation Andhra Pradesh, best interior design company" />

      {/* Preload critical images */}
      {preloadImages.map((imageUrl, index) => (
        <link
          key={index}
          rel="preload"
          as="image"
          href={imageUrl}
          type="image/jpeg"
        />
      ))}

      {/* Structured Data */}
      {structuredData &&
        (Array.isArray(structuredData) ? (
          structuredData.map((schema, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(schema)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        ))}
    </Helmet>
  );
}

// Helper function to generate LocalBusiness structured data
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://ab-wall-wonders.vercel.app/#localbusiness",
    name: "AB Wall Wonders",
    alternateName: [
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders",
      "AB Wall Wonders Andhra Pradesh",
      "Premium Wallpapers & Flooring by AB Wall Wonders"
    ],
    description:
      "AB Wall Wonders (ABwallwonders) - Leading provider of premium wallpapers, luxury flooring, and custom blinds installation across Andhra Pradesh. Expert craftsmanship with 15+ years experience and 5-year warranty. Known as Wall Wonders for exceptional interior design solutions.",
    image: {
      "@type": "ImageObject",
      url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      width: 800,
      height: 600,
    },
    logo: {
      "@type": "ImageObject",
      url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      width: 300,
      height: 300,
    },
    url: "https://ab-wall-wonders.vercel.app",
    telephone: "+91-8500900827",
    priceRange: "₹₹-₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Andhra Pradesh",
      addressRegion: "AP",
      postalCode: "516001",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.9129,
      longitude: 79.74,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8500900827",
      contactType: "customer service",
      availableLanguage: ["English", "Telugu", "Hindi"],
      areaServed: "IN-AP",
    },
    areaServed: {
      "@type": "State",
      name: "Andhra Pradesh",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Interior Design Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Premium Wallpapers Installation",
            description:
              "3D wallpapers, botanical, geometric, and custom wallpaper installation with 5-year warranty",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Luxury Flooring Installation",
            description:
              "Vinyl flooring, artificial grass, and safety mats with expert installation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Window Blinds",
            description:
              "Motorized and manual blinds, custom sizing with precision installation",
          },
        },
      ],
    },
    review: [
      {
        "@type": "Review",
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        author: {
          "@type": "Person",
          name: "Satisfied Customer",
        },
        reviewBody:
          "Excellent service and quality wallpapers. Professional installation and great customer support.",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1",
    },
  };
};

// Helper function to generate Service structured data
export const generateServiceSchema = (
  serviceName: string,
  serviceDescription: string,
  serviceImage?: string,
) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: serviceDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "AB Wall Wonders",
      telephone: "+91-8500900827",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Andhra Pradesh",
        addressRegion: "AP",
        addressCountry: "IN",
      },
    },
    areaServed: {
      "@type": "State",
      name: "Andhra Pradesh",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: serviceName,
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            description: serviceDescription,
          },
          availability: "https://schema.org/InStock",
          price: "Contact for Quote",
          priceCurrency: "INR",
        },
      ],
    },
    ...(serviceImage && {
      image: {
        "@type": "ImageObject",
        url: serviceImage,
        width: 800,
        height: 600,
      },
    }),
  };
};

// Helper function to generate FAQ structured data
export const generateFAQSchema = (
  faqs: { question: string; answer: string }[],
) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

// Enhanced Organization Schema with brand variations
export const generateOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://ab-wall-wonders.vercel.app/#organization",
    name: "AB Wall Wonders",
    alternateName: [
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders"
    ],
    url: "https://ab-wall-wonders.vercel.app",
    logo: {
      "@type": "ImageObject",
      url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      width: 300,
      height: 300
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-8500900827",
      contactType: "customer service",
      availableLanguage: ["English", "Telugu", "Hindi"]
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Andhra Pradesh",
      addressRegion: "AP",
      addressCountry: "IN"
    },
    description: "AB Wall Wonders (ABwallwonders) - Premier interior design company specializing in wallpapers, flooring, and blinds across Andhra Pradesh.",
    foundingDate: "2020",
    keywords: "AB Wall Wonders, ABwallwonders, wallpapers, flooring, interior design",
    knowsAbout: ["Interior Design", "Wallpaper Installation", "Flooring Solutions", "Window Treatments"]
  };
};

// Brand Search Schema for enhanced brand recognition
export const generateBrandSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Brand",
    "@id": "https://ab-wall-wonders.vercel.app/#brand",
    name: "AB Wall Wonders",
    alternateName: [
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders"
    ],
    url: "https://ab-wall-wonders.vercel.app",
    logo: {
      "@type": "ImageObject",
      url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg"
    },
    description: "Premium interior design brand known for wallpapers, flooring, and blinds in Andhra Pradesh",
    slogan: "Transform Your Space with AB Wall Wonders"
  };
};

// Enhanced WebSite Schema with brand search optimization
export const generateWebsiteSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ab-wall-wonders.vercel.app/#website",
    name: "AB Wall Wonders",
    alternateName: [
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders"
    ],
    url: "https://ab-wall-wonders.vercel.app",
    description: "Official website of AB Wall Wonders - Premium wallpapers, flooring & blinds in Andhra Pradesh",
    publisher: {
      "@type": "Organization",
      name: "AB Wall Wonders"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://ab-wall-wonders.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    mainEntity: {
      "@type": "Organization",
      name: "AB Wall Wonders",
      alternateName: ["ABwallwonders", "abwallwonders", "Wall Wonders"]
    }
  };
};

// Helper function to generate comprehensive brand FAQ
export const generateBrandFAQSchema = () => {
  const brandFAQs = [
    {
      question: "What is AB Wall Wonders?",
      answer: "AB Wall Wonders (also known as ABwallwonders or Wall Wonders) is a premium interior design company in Andhra Pradesh specializing in wallpapers, flooring, and window blinds with 15+ years of experience."
    },
    {
      question: "How do I contact AB Wall Wonders?",
      answer: "You can contact AB Wall Wonders at +91-8500900827 or +91-86887-23648. We serve across Andhra Pradesh and provide free consultations."
    },
    {
      question: "What services does ABwallwonders provide?",
      answer: "ABwallwonders provides premium wallpaper installation (3D, botanical, geometric), luxury vinyl flooring, artificial grass, and custom window blinds with motorized options."
    },
    {
      question: "Where is AB Wall Wonders located?",
      answer: "AB Wall Wonders is based in Andhra Pradesh, India, and provides services across the entire state with expert installation teams."
    },
    {
      question: "Does Wall Wonders provide warranty?",
      answer: "Yes, AB Wall Wonders provides 5-year warranty on wallpapers and 2-year warranty on blinds and flooring installations."
    }
  ];

  return generateFAQSchema(brandFAQs);
};

// Comprehensive schema collection for brand optimization
export const generateComprehensiveSchemas = () => {
  return [
    generateLocalBusinessSchema(),
    generateOrganizationSchema(),
    generateBrandSchema(),
    generateWebsiteSchema(),
    generateBrandFAQSchema()
  ];
};
