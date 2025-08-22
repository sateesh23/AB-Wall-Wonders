import { Helmet } from "react-helmet-async";

interface LocalSEOProps {
  service?: string;
  area?: string;
  pageName?: string;
}

export default function LocalSEO({
  service = "interior design",
  area = "Andhra Pradesh",
}: LocalSEOProps) {
  // Generate comprehensive local search terms
  const generateLocalSearchTerms = () => {
    const brandVariations = [
      "AB Wall Wonders",
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders",
    ];

    const serviceVariations = [
      service,
      `${service} installation`,
      `${service} services`,
      `${service} company`,
      `${service} contractor`,
      `${service} specialist`,
      `premium ${service}`,
      `best ${service}`,
      `professional ${service}`,
      `custom ${service}`,
    ];

    const locationTerms = [
      "near me",
      "nearby",
      "in my area",
      "local",
      `in ${area}`,
      `${area} area`,
      "close to me",
      "around me",
    ];

    const urgencyTerms = [
      "now",
      "today",
      "urgent",
      "fast",
      "quick",
      "same day",
      "emergency",
    ];

    const qualityTerms = [
      "best",
      "top rated",
      "premium",
      "professional",
      "expert",
      "quality",
      "trusted",
      "experienced",
      "reliable",
    ];

    return {
      brandVariations,
      serviceVariations,
      locationTerms,
      urgencyTerms,
      qualityTerms,
    };
  };

  const {
    brandVariations,
    serviceVariations,
    locationTerms,
    urgencyTerms,
    qualityTerms,
  } = generateLocalSearchTerms();

  // Generate comprehensive local search combinations
  const generateLocalSearchCombinations = () => {
    const combinations: string[] = [];

    // Brand + Service + Location combinations
    brandVariations.forEach((brand) => {
      serviceVariations.forEach((serviceVar) => {
        locationTerms.forEach((location) => {
          combinations.push(`${brand} ${serviceVar} ${location}`);
          combinations.push(`${serviceVar} by ${brand} ${location}`);
          combinations.push(`${serviceVar} ${location} ${brand}`);
        });
      });
    });

    // Quality + Service + Location combinations
    qualityTerms.forEach((quality) => {
      serviceVariations.forEach((serviceVar) => {
        locationTerms.forEach((location) => {
          combinations.push(`${quality} ${serviceVar} ${location}`);
          combinations.push(`${quality} ${serviceVar} company ${location}`);
        });
      });
    });

    // Urgency + Service + Location combinations
    urgencyTerms.forEach((urgency) => {
      serviceVariations.forEach((serviceVar) => {
        locationTerms.forEach((location) => {
          combinations.push(`${serviceVar} ${urgency} ${location}`);
          combinations.push(`${urgency} ${serviceVar} service ${location}`);
        });
      });
    });

    return combinations.slice(0, 100); // Limit to avoid overwhelming
  };

  const localSearchCombinations = generateLocalSearchCombinations();

  // Generate local business schema with enhanced coverage
  const generateEnhancedLocalBusinessSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://ab-wall-wonders.vercel.app/#localbusiness-enhanced",
      name: "AB Wall Wonders",
      alternateName: brandVariations,
      description: `Leading ${service} specialist in ${area}. AB Wall Wonders (ABwallwonders) provides premium interior design solutions including wallpapers, flooring, and blinds with expert installation across Andhra Pradesh.`,
      image:
        "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      logo: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
      url: "https://ab-wall-wonders.vercel.app",
      telephone: ["+91-8500900827", "+91-8688723648"],
      priceRange: "₹₹-₹₹₹",
      currenciesAccepted: "INR",
      paymentAccepted: "Cash, UPI, Bank Transfer, Card",
      address: {
        "@type": "PostalAddress",
        addressLocality: area,
        addressRegion: "AP",
        postalCode: "516001",
        addressCountry: "IN",
        streetAddress: `${area}, India`,
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
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-8500900827",
          contactType: "customer service",
          availableLanguage: ["English", "Telugu", "Hindi"],
          areaServed: "IN-AP",
          contactOption: "TollFree",
          hoursAvailable: {
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
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-8688723648",
          contactType: "sales",
          availableLanguage: ["English", "Telugu", "Hindi"],
          areaServed: "IN-AP",
          contactOption: "TollFree",
        },
      ],
      areaServed: [
        {
          "@type": "State",
          name: "Andhra Pradesh",
          containedInPlace: {
            "@type": "Country",
            name: "India",
          },
        },
      ],
      serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
          "@type": "GeoCoordinates",
          latitude: 15.9129,
          longitude: 79.74,
        },
        geoRadius: "200000", // 200km radius
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${service} Services`,
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `Premium ${service}`,
              description: `Professional ${service} installation and design services`,
              category: "Interior Design",
              brand: {
                "@type": "Brand",
                name: "AB Wall Wonders",
              },
            },
            availability: "https://schema.org/InStock",
            price: "Contact for Quote",
            priceCurrency: "INR",
            validFrom: "2020-01-01",
            areaServed: "IN-AP",
          },
        ],
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "75",
        bestRating: "5",
        worstRating: "1",
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
          reviewBody: `Excellent ${service} service by AB Wall Wonders. Professional installation and great customer support in ${area}.`,
        },
      ],
      knowsAbout: [
        `${service} Installation`,
        "Interior Design",
        "Home Renovation",
        "Custom Solutions",
        `${area} Interior Services`,
      ],
      slogan: `Transform Your Space with AB Wall Wonders - Leading ${service} Specialist in ${area}`,
      foundingDate: "2020",
      hasCredential: [
        "15+ Years Experience",
        "5-Year Warranty on Wallpapers",
        "2-Year Warranty on Blinds & Flooring",
        "100+ Satisfied Customers",
        "Expert Installation Team",
      ],
    };
  };

  // Generate local search schema
  const generateLocalSearchSchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://ab-wall-wonders.vercel.app/#website-local-search",
      name: "AB Wall Wonders",
      alternateName: brandVariations,
      url: "https://ab-wall-wonders.vercel.app",
      potentialAction: [
        {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://ab-wall-wonders.vercel.app/?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
          result: {
            "@type": "LocalBusiness",
            name: "AB Wall Wonders",
            description: `Local ${service} services in ${area}`,
          },
        },
      ],
      mainEntity: {
        "@type": "LocalBusiness",
        name: "AB Wall Wonders",
        alternateName: brandVariations,
        areaServed: "IN-AP",
      },
    };
  };

  return (
    <Helmet>
      {/* Enhanced Local Search Meta Tags */}
      <meta name="local-business-name" content="AB Wall Wonders" />
      <meta name="local-business-type" content="InteriorDesignCompany" />
      <meta name="service-area" content={area} />
      <meta name="service-radius" content="200km" />

      {/* Near Me Search Optimization */}
      <meta
        name="near-me-keywords"
        content={localSearchCombinations.slice(0, 50).join(", ")}
      />
      <meta
        name="local-search-terms"
        content={`${service} near me, ${service} in ${area}, local ${service} company, ${service} services nearby, professional ${service} installation near me`}
      />

      {/* Geographic Meta Tags */}
      <meta name="geo.region" content="IN-AP" />
      <meta name="geo.placename" content={area} />
      <meta name="geo.position" content="15.9129;79.7400" />
      <meta name="ICBM" content="15.9129, 79.7400" />
      <meta name="distribution" content="local" />

      {/* Local Business Information */}
      <meta name="business.name" content="AB Wall Wonders" />
      <meta name="business.type" content="Interior Design Company" />
      <meta name="business.area" content={area} />
      <meta name="business.category" content={`${service} Services`} />
      <meta
        name="business.subcategory"
        content="Interior Design, Home Renovation"
      />

      {/* Contact Information for Local Search */}
      <meta name="business.phone" content="+91-8500900827" />
      <meta name="business.phone_alt" content="+91-8688723648" />
      <meta name="business.hours" content="Monday-Saturday 9AM-6PM" />
      <meta name="business.address" content={`${area}, India`} />

      {/* Local Citations and NAP */}
      <meta name="citation.name" content="AB Wall Wonders" />
      <meta
        name="citation.address"
        content={`${area}, Andhra Pradesh, India`}
      />
      <meta name="citation.phone" content="+91-8500900827" />

      {/* Local Search Intent Keywords */}
      <meta
        name="search-intent-local"
        content={`find ${service} near me, ${service} company in ${area}, local ${service} installation, ${service} services nearby`}
      />
      <meta
        name="search-intent-commercial"
        content={`${service} quotes, ${service} pricing, ${service} cost in ${area}, professional ${service} installation`}
      />
      <meta
        name="search-intent-transactional"
        content={`hire ${service} company, book ${service} installation, contact ${service} specialist, get ${service} quote`}
      />

      {/* Voice Search Optimization for Local */}
      <meta
        name="voice-search-local"
        content={`AB Wall Wonders near me, where is AB Wall Wonders located, AB Wall Wonders contact number, best ${service} company near me`}
      />

      {/* Enhanced JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateEnhancedLocalBusinessSchema())}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(generateLocalSearchSchema())}
      </script>

      {/* Local Service Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `https://ab-wall-wonders.vercel.app/#local-${service.replace(/\s+/g, "-")}`,
          name: `${service} Services by AB Wall Wonders`,
          alternateName: brandVariations.map(
            (brand) => `${service} by ${brand}`,
          ),
          description: `Professional ${service} installation and design services in ${area} by AB Wall Wonders (ABwallwonders)`,
          provider: {
            "@type": "LocalBusiness",
            name: "AB Wall Wonders",
            alternateName: brandVariations,
          },
          areaServed: {
            "@type": "State",
            name: area,
            containedInPlace: {
              "@type": "Country",
              name: "India",
            },
          },
          serviceType: service,
          category: "Interior Design Services",
          availableChannel: {
            "@type": "ServiceChannel",
            servicePhone: "+91-8500900827",
            serviceUrl: "https://ab-wall-wonders.vercel.app",
          },
        })}
      </script>

      {/* Local Business Review Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Review",
          "@id": "https://ab-wall-wonders.vercel.app/#local-review",
          itemReviewed: {
            "@type": "LocalBusiness",
            name: "AB Wall Wonders",
            alternateName: brandVariations,
            address: {
              "@type": "PostalAddress",
              addressLocality: area,
              addressCountry: "India",
            },
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Local Customer",
          },
          reviewBody: `Excellent ${service} service in ${area}. AB Wall Wonders (ABwallwonders) provides professional installation with great attention to detail. Highly recommend for anyone looking for quality ${service} services near me.`,
        })}
      </script>
    </Helmet>
  );
}

// Helper function to generate local SEO keywords
export const generateLocalSEOKeywords = (
  service: string,
  area: string = "Andhra Pradesh",
) => {
  const brandTerms = [
    "AB Wall Wonders",
    "ABwallwonders",
    "Wall Wonders",
    "AB Wonders",
  ];
  const locationTerms = ["near me", "nearby", area, `in ${area}`, "local"];
  const serviceTerms = [
    service,
    `${service} installation`,
    `${service} services`,
  ];
  const qualityTerms = ["best", "top", "professional", "expert", "quality"];

  const keywords: string[] = [];

  brandTerms.forEach((brand) => {
    locationTerms.forEach((location) => {
      serviceTerms.forEach((serviceVar) => {
        keywords.push(`${brand} ${serviceVar} ${location}`);
        keywords.push(`${serviceVar} by ${brand} ${location}`);
      });
    });
  });

  qualityTerms.forEach((quality) => {
    locationTerms.forEach((location) => {
      serviceTerms.forEach((serviceVar) => {
        keywords.push(`${quality} ${serviceVar} ${location}`);
      });
    });
  });

  return keywords.join(", ");
};

// Helper function for service-specific local titles
export const generateLocalTitle = (
  service: string,
  area: string = "Andhra Pradesh",
) => {
  return `${service} Services Near Me | AB Wall Wonders ${area} | ABwallwonders`;
};

// Helper function for service-specific local descriptions
export const generateLocalDescription = (
  service: string,
  area: string = "Andhra Pradesh",
) => {
  return `Looking for ${service} services near you? AB Wall Wonders (ABwallwonders) provides professional ${service} installation in ${area}. Expert craftsmen, premium materials, warranty coverage. Call +91-8500900827 for free quote!`;
};
