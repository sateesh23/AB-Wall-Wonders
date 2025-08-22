import { Helmet } from "react-helmet-async";

interface EnhancedBrandSEOProps {
  service?: string;
  pageName?: string;
  isHomepage?: boolean;
}

export default function EnhancedBrandSEO({
  service = "interior design",
}: EnhancedBrandSEOProps) {
  // Comprehensive brand variations for better recognition
  const brandVariations = {
    primary: "AB Wall Wonders",
    common: [
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders",
    ],
    withSpacing: [
      "A B Wall Wonders",
      "A.B. Wall Wonders",
      "A-B Wall Wonders",
      "AB-Wall-Wonders",
      "AB_Wall_Wonders",
    ],
    misspellings: [
      "ab wal wonders",
      "abwal wonders",
      "ab wall wonder",
      "ab wall wander",
      "ab wal wonder",
      "abhay wall wonders",
      "ab wonders",
      "wall wonder company",
      "ab interior design",
      "ab wallpapers",
      "ab flooring",
      "ab blinds",
    ],
    casual: [
      "wall wonders company",
      "AB wall company",
      "wall wonders interior",
      "AB home design",
      "wall wonders design",
    ],
    withLocation: [
      "AB Wall Wonders Andhra Pradesh",
      "ABwallwonders AP",
      "Wall Wonders Andhra Pradesh",
      "AB Wall Wonders India",
      "ABwallwonders India",
    ],
  };

  // Generate all brand variations as a flat array
  const allBrandVariations = [
    brandVariations.primary,
    ...brandVariations.common,
    ...brandVariations.withSpacing,
    ...brandVariations.misspellings,
    ...brandVariations.casual,
    ...brandVariations.withLocation,
  ];

  // Service-specific brand combinations
  const generateServiceBrandCombinations = () => {
    const serviceTerms = [
      service,
      `${service} company`,
      `${service} services`,
      `${service} specialist`,
      `${service} expert`,
      `${service} installation`,
      `professional ${service}`,
      `best ${service}`,
      `premium ${service}`,
      `custom ${service}`,
    ];

    const combinations: string[] = [];

    allBrandVariations.forEach((brand) => {
      serviceTerms.forEach((serviceVar) => {
        combinations.push(`${brand} ${serviceVar}`);
        combinations.push(`${serviceVar} by ${brand}`);
        combinations.push(`${serviceVar} - ${brand}`);
      });
    });

    return combinations;
  };

  const serviceBrandCombinations = generateServiceBrandCombinations();

  // Generate search variations for different search patterns
  const generateSearchVariations = () => {
    return {
      exactMatch: allBrandVariations,
      serviceMatch: serviceBrandCombinations,
      locationMatch: brandVariations.withLocation,
      phoneticMatch: [
        "ay bee wall wonders",
        "a b wall wonders",
        "ab wal wonders",
        "wall wonders",
      ],
      intentMatch: [
        "AB Wall Wonders contact",
        "ABwallwonders phone number",
        "Wall Wonders website",
        "AB Wall Wonders location",
        "ABwallwonders reviews",
        "Wall Wonders portfolio",
        "AB Wall Wonders projects",
        "ABwallwonders gallery",
      ],
    };
  };

  const searchVariations = generateSearchVariations();

  // Generate comprehensive brand schema
  const generateComprehensiveBrandSchema = () => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Brand",
          "@id": "https://ab-wall-wonders.vercel.app/#brand-comprehensive",
          name: brandVariations.primary,
          alternateName: allBrandVariations,
          description: `Premium ${service} brand serving Andhra Pradesh with 15+ years of expertise`,
          logo: {
            "@type": "ImageObject",
            url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
            width: 300,
            height: 300,
          },
          url: "https://ab-wall-wonders.vercel.app",
          sameAs: ["https://wa.me/8688723648", "https://wa.me/8500900827"],
          slogan: "Transform Your Space with AB Wall Wonders",
          foundingDate: "2020",
          keywords: allBrandVariations.join(", "),
          knowsAbout: [
            "Interior Design",
            "Wallpaper Installation",
            "Flooring Solutions",
            "Window Blinds",
            "Home Renovation",
          ],
        },
        {
          "@type": "Organization",
          "@id":
            "https://ab-wall-wonders.vercel.app/#organization-comprehensive",
          name: brandVariations.primary,
          alternateName: allBrandVariations,
          legalName: "AB Wall Wonders",
          brand: {
            "@id": "https://ab-wall-wonders.vercel.app/#brand-comprehensive",
          },
          description: `Leading ${service} company in Andhra Pradesh known by various names including ABwallwonders, Wall Wonders, and AB Wonders`,
          foundingDate: "2020",
          numberOfEmployees: "10-50",
          memberOf: {
            "@type": "Organization",
            name: "Interior Design Industry India",
          },
          hasCredential: [
            "15+ Years Experience",
            "Licensed Interior Design Company",
            "Warranty Coverage Provider",
            "Professional Installation Team",
          ],
        },
        {
          "@type": "WebSite",
          "@id": "https://ab-wall-wonders.vercel.app/#website-comprehensive",
          name: brandVariations.primary,
          alternateName: allBrandVariations,
          url: "https://ab-wall-wonders.vercel.app",
          publisher: {
            "@id":
              "https://ab-wall-wonders.vercel.app/#organization-comprehensive",
          },
          potentialAction: [
            {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate:
                  "https://ab-wall-wonders.vercel.app/?search={search_term_string}",
              },
              "query-input": "required name=search_term_string",
            },
          ],
          mainEntity: {
            "@type": "LocalBusiness",
            name: brandVariations.primary,
            alternateName: allBrandVariations,
          },
        },
      ],
    };
  };

  // Generate search result optimization schema
  const generateSearchResultSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "SearchResultsPage",
      "@id": "https://ab-wall-wonders.vercel.app/#search-results",
      name: `${brandVariations.primary} - Search Results`,
      description: `Find AB Wall Wonders (ABwallwonders) services. Also known as Wall Wonders and AB Wonders.`,
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: allBrandVariations.length,
        itemListElement: allBrandVariations.map((variation, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Thing",
            name: variation,
            description: `Search term variation for ${brandVariations.primary}`,
            url: "https://ab-wall-wonders.vercel.app",
          },
        })),
      },
    };
  };

  // Generate knowledge graph schema
  const generateKnowledgeGraphSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "Thing",
      "@id": "https://ab-wall-wonders.vercel.app/#knowledge-graph",
      name: brandVariations.primary,
      alternateName: allBrandVariations,
      description: `${brandVariations.primary} (also known as ${brandVariations.common.join(", ")}) is a premier ${service} company in Andhra Pradesh`,
      image:
        "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      url: "https://ab-wall-wonders.vercel.app",
      identifier: [
        {
          "@type": "PropertyValue",
          name: "Primary Brand Name",
          value: brandVariations.primary,
        },
        {
          "@type": "PropertyValue",
          name: "Common Variations",
          value: brandVariations.common.join(", "),
        },
        {
          "@type": "PropertyValue",
          name: "Business Type",
          value: "Interior Design Company",
        },
        {
          "@type": "PropertyValue",
          name: "Service Area",
          value: "Andhra Pradesh, India",
        },
      ],
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://ab-wall-wonders.vercel.app",
      },
      subjectOf: {
        "@type": "WebPage",
        url: "https://ab-wall-wonders.vercel.app",
        name: `${brandVariations.primary} - Official Website`,
      },
    };
  };

  return (
    <Helmet>
      {/* Primary Brand Recognition Meta Tags */}
      <meta name="brand-primary" content={brandVariations.primary} />
      <meta name="brand-common" content={brandVariations.common.join(", ")} />
      <meta
        name="brand-misspellings"
        content={brandVariations.misspellings.join(", ")}
      />
      <meta
        name="brand-variations-all"
        content={allBrandVariations.join(", ")}
      />

      {/* Search Engine Brand Signals */}
      <meta
        name="entity-brand-names"
        content={allBrandVariations.join(" | ")}
      />
      <meta name="brand-aliases" content={brandVariations.common.join(" | ")} />
      <meta
        name="brand-keywords-comprehensive"
        content={serviceBrandCombinations.slice(0, 50).join(", ")}
      />

      {/* Brand Recognition for Different Search Types */}
      <meta
        name="exact-brand-matches"
        content={searchVariations.exactMatch.join(", ")}
      />
      <meta
        name="service-brand-matches"
        content={searchVariations.serviceMatch.slice(0, 30).join(", ")}
      />
      <meta
        name="location-brand-matches"
        content={searchVariations.locationMatch.join(", ")}
      />
      <meta
        name="phonetic-brand-matches"
        content={searchVariations.phoneticMatch.join(", ")}
      />
      <meta
        name="intent-brand-matches"
        content={searchVariations.intentMatch.join(", ")}
      />

      {/* Brand Authority and Recognition */}
      <meta
        name="brand-authority-signals"
        content="established-2020, 15-years-experience, andhra-pradesh-leader"
      />
      <meta
        name="brand-recognition-terms"
        content={`${brandVariations.primary}, ${brandVariations.common[0]}, ${brandVariations.common[1]}`}
      />

      {/* Social and Business Entity Recognition */}
      <meta property="business:brand" content={brandVariations.primary} />
      <meta
        property="business:brand:alternate"
        content={brandVariations.common.join(", ")}
      />
      <meta name="business:entity:type" content="LocalBusiness" />
      <meta name="business:entity:category" content={`${service} Company`} />

      {/* Schema.org Rich Snippets for Brand Recognition */}
      <script type="application/ld+json">
        {JSON.stringify(generateComprehensiveBrandSchema())}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(generateSearchResultSchema())}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(generateKnowledgeGraphSchema())}
      </script>

      {/* Enhanced Brand FAQ Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": "https://ab-wall-wonders.vercel.app/#brand-faq",
          mainEntity: [
            {
              "@type": "Question",
              name: "What is AB Wall Wonders?",
              acceptedAnswer: {
                "@type": "Answer",
                text: `AB Wall Wonders (also known as ABwallwonders, Wall Wonders, or AB Wonders) is a premier ${service} company in Andhra Pradesh with 15+ years of experience in interior design solutions.`,
              },
            },
            {
              "@type": "Question",
              name: "Is ABwallwonders the same as AB Wall Wonders?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes, ABwallwonders is the same company as AB Wall Wonders. We're also known as Wall Wonders and AB Wonders - all refer to the same trusted interior design company in Andhra Pradesh.",
              },
            },
            {
              "@type": "Question",
              name: "How do I contact AB Wall Wonders?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "You can contact AB Wall Wonders (ABwallwonders) at +91-8500900827 or +91-8688723648. We provide free consultations across Andhra Pradesh.",
              },
            },
            {
              "@type": "Question",
              name: "Where is Wall Wonders located?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Wall Wonders (AB Wall Wonders) is based in Andhra Pradesh, India. We provide services throughout the state with our expert installation teams.",
              },
            },
          ],
        })}
      </script>

      {/* Business Name Variations Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://ab-wall-wonders.vercel.app/#business-name-variations",
          name: brandVariations.primary,
          alternateName: allBrandVariations,
          description: `Known by many names including ${brandVariations.common.join(", ")}, we are Andhra Pradesh's trusted ${service} specialists`,
          hasMap: "https://maps.google.com/?q=AB+Wall+Wonders+Andhra+Pradesh",
          telephone: "+91-8500900827",
          url: "https://ab-wall-wonders.vercel.app",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Andhra Pradesh",
            addressCountry: "India",
          },
          searchAction: {
            "@type": "SearchAction",
            target: "https://ab-wall-wonders.vercel.app/?q={search_term}",
            "query-input": "required name=search_term",
          },
        })}
      </script>
    </Helmet>
  );
}

// Helper function to generate brand-optimized page titles
export const generateBrandOptimizedTitle = (
  service: string,
  pageName: string,
  includeVariations: boolean = true,
) => {
  const base = `${service} | AB Wall Wonders`;
  const pagePrefix = pageName !== "Homepage" ? `${pageName} - ` : "";
  if (includeVariations) {
    return `${pagePrefix}${base} | ABwallwonders | Wall Wonders Andhra Pradesh`;
  }
  return `${pagePrefix}${base}`;
};

// Helper function to generate brand-optimized descriptions
export const generateBrandOptimizedDescription = (
  service: string,
  location: string = "Andhra Pradesh",
) => {
  return `Get premium ${service} from AB Wall Wonders (ABwallwonders) in ${location}. Also known as Wall Wonders & AB Wonders. Expert installation, 15+ years experience, warranty coverage. Call +91-8500900827 for free consultation!`;
};

// Helper function to get all brand variations
export const getAllBrandVariations = () => {
  return [
    "AB Wall Wonders",
    "ABwallwonders",
    "AB wall wonders",
    "abwallwonders",
    "A B Wall Wonders",
    "Wall Wonders",
    "AB Wonders",
    "A.B. Wall Wonders",
    "A-B Wall Wonders",
    "ab wal wonders",
    "abwal wonders",
    "wall wonder company",
    "AB Wall Wonders Andhra Pradesh",
    "ABwallwonders AP",
  ];
};
