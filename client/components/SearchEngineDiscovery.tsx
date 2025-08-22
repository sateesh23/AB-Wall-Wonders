import { Helmet } from "react-helmet-async";

interface SearchEngineDiscoveryProps {
  pageName?: string;
  isHomepage?: boolean;
}

export default function SearchEngineDiscovery({
  isHomepage = false,
}: SearchEngineDiscoveryProps) {
  // Generate comprehensive discovery hints for search engines
  const generateDiscoveryHints = () => {
    const brandEntities = [
      "AB Wall Wonders",
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders",
    ];

    const businessCategories = [
      "Interior Design Company",
      "Wallpaper Installation Service",
      "Flooring Contractor",
      "Window Blinds Specialist",
      "Home Renovation Service",
      "Premium Interior Solutions",
      "Custom Wallpaper Installer",
      "Luxury Flooring Provider",
      "Motorized Blinds Installation",
    ];

    const locationEntities = [
      "Andhra Pradesh",
      "AP India",
      "South India",
      "Telugu States",
    ];

    const serviceEntities = [
      "3D Wallpapers",
      "Botanical Wallpapers",
      "Geometric Wallpapers",
      "Vinyl Flooring",
      "Artificial Grass",
      "Motorized Blinds",
      "Roman Blinds",
      "Roller Blinds",
    ];

    return {
      brandEntities,
      businessCategories,
      locationEntities,
      serviceEntities,
    };
  };

  const {
    brandEntities,
    businessCategories,
    locationEntities,
    serviceEntities,
  } = generateDiscoveryHints();

  // Generate entity relationship schema
  const generateEntityRelationships = () => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://ab-wall-wonders.vercel.app/#organization",
          name: "AB Wall Wonders",
          alternateName: brandEntities,
          sameAs: [
            "https://ab-wall-wonders.vercel.app",
            "https://wa.me/8688723648",
          ],
        },
        {
          "@type": "Place",
          "@id": "https://ab-wall-wonders.vercel.app/#place",
          name: "Andhra Pradesh",
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
        {
          "@type": "Service",
          "@id": "https://ab-wall-wonders.vercel.app/#services",
          name: "Interior Design Services",
          provider: {
            "@id": "https://ab-wall-wonders.vercel.app/#organization",
          },
          areaServed: {
            "@id": "https://ab-wall-wonders.vercel.app/#place",
          },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Interior Design Solutions",
            itemListElement: serviceEntities.map((service, index) => ({
              "@type": "Offer",
              "@id": `https://ab-wall-wonders.vercel.app/#service-${index}`,
              itemOffered: {
                "@type": "Service",
                name: service,
                description: `Professional ${service} installation by AB Wall Wonders`,
              },
            })),
          },
        },
      ],
    };
  };

  // Generate comprehensive business identity schema
  const generateBusinessIdentitySchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://ab-wall-wonders.vercel.app/#business-identity",
      name: "AB Wall Wonders",
      alternateName: brandEntities,
      description:
        "Premier interior design company specializing in wallpapers, flooring, and blinds across Andhra Pradesh",
      identifier: [
        {
          "@type": "PropertyValue",
          name: "Brand Name",
          value: "AB Wall Wonders",
        },
        {
          "@type": "PropertyValue",
          name: "Common Name",
          value: "ABwallwonders",
        },
        {
          "@type": "PropertyValue",
          name: "Short Name",
          value: "Wall Wonders",
        },
        {
          "@type": "PropertyValue",
          name: "Business Category",
          value: businessCategories.join(", "),
        },
      ],
      knowsAbout: [
        ...serviceEntities,
        "Interior Design",
        "Home Renovation",
        "Premium Installation Services",
        "Custom Design Solutions",
      ],
      memberOf: {
        "@type": "Organization",
        name: "Interior Design Industry",
        description:
          "Professional interior design and home improvement services",
      },
      owns: serviceEntities.map((service) => ({
        "@type": "Service",
        name: service,
        description: `${service} installation and design services`,
      })),
      foundingDate: "2020",
      slogan: "Transform Your Space with AB Wall Wonders",
      award: [
        "15+ Years Experience",
        "100+ Satisfied Customers",
        "5-Year Warranty Coverage",
        "Expert Installation Team",
      ],
    };
  };

  return (
    <Helmet>
      {/* Advanced Search Engine Discovery Meta Tags */}
      <meta name="entity-recognition" content={brandEntities.join(", ")} />
      <meta
        name="business-categories"
        content={businessCategories.join(", ")}
      />
      <meta name="service-entities" content={serviceEntities.join(", ")} />
      <meta name="location-entities" content={locationEntities.join(", ")} />

      {/* Search Engine Crawling Directives */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1, max-preview:-1"
      />
      <meta
        name="googlebot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta
        name="bingbot"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />

      {/* Content Discovery Hints */}
      <meta name="content-type" content="business-website" />
      <meta name="content-category" content="interior-design-services" />
      <meta name="primary-topic" content="wallpapers-flooring-blinds" />
      <meta
        name="semantic-topics"
        content="interior design, home renovation, wallpaper installation, flooring services, window treatments"
      />

      {/* Brand Authority Signals */}
      <meta name="brand-authority" content="established-2020" />
      <meta name="business-credibility" content="15-years-experience" />
      <meta name="service-coverage" content="andhra-pradesh-wide" />
      <meta
        name="warranty-coverage"
        content="5-year-wallpapers-2-year-blinds"
      />

      {/* Local Business Discovery */}
      <meta name="local-business-type" content="InteriorDesignCompany" />
      <meta name="service-radius" content="Andhra Pradesh, India" />
      <meta name="business-hours" content="Monday-Saturday 9AM-6PM" />
      <meta name="contact-method" content="phone-whatsapp-website" />

      {/* Structured Data for Entity Recognition */}
      <script type="application/ld+json">
        {JSON.stringify(generateEntityRelationships())}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(generateBusinessIdentitySchema())}
      </script>

      {/* Comprehensive BreadcrumbList for Homepage */}
      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://ab-wall-wonders.vercel.app/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://ab-wall-wonders.vercel.app/#services",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Projects",
                item: "https://ab-wall-wonders.vercel.app/projects",
              },
            ],
          })}
        </script>
      )}

      {/* Knowledge Graph Enhancement */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          mainEntity: {
            "@type": "LocalBusiness",
            name: "AB Wall Wonders",
            alternateName: brandEntities,
            description:
              "AB Wall Wonders (ABwallwonders) is the leading interior design company in Andhra Pradesh, specializing in premium wallpapers, luxury flooring, and custom blinds. Known locally as Wall Wonders, we provide expert installation services with 15+ years of experience.",
            subjectOf: {
              "@type": "WebPage",
              url: "https://ab-wall-wonders.vercel.app",
              name: "AB Wall Wonders - Premium Interior Design Services",
            },
          },
        })}
      </script>

      {/* Enhanced Website Schema with Search Functionality */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://ab-wall-wonders.vercel.app/#website-search",
          name: "AB Wall Wonders",
          alternateName: brandEntities,
          url: "https://ab-wall-wonders.vercel.app",
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://ab-wall-wonders.vercel.app/search?q={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
            {
              "@type": "ContactAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: "https://wa.me/8688723648",
              },
            },
          ],
          publisher: {
            "@type": "Organization",
            name: "AB Wall Wonders",
            alternateName: brandEntities,
          },
        })}
      </script>
    </Helmet>
  );
}

// Helper function to generate page-specific discovery meta tags
export const generatePageDiscoveryTags = (
  pageName: string,
  service?: string,
) => {
  const tags = {
    "entity-focus": service
      ? `${service} by AB Wall Wonders`
      : "AB Wall Wonders services",
    "page-purpose": `Information about ${service || "interior design"} services`,
    "content-intent": "commercial-service-information",
    "user-intent": "service-discovery-contact",
  };

  return tags;
};
