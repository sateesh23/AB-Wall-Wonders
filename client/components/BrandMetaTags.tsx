import { Helmet } from "react-helmet-async";

interface BrandMetaTagsProps {
  pageName?: string;
  service?: string;
  brandFocus?: "wallpapers" | "flooring" | "blinds" | "general";
}

export default function BrandMetaTags({
  pageName: _pageName = "Homepage",
  service = "interior design",
  brandFocus = "general",
}: BrandMetaTagsProps) {
  // Generate brand-specific meta content
  const generateBrandContent = () => {
    const brandVariations = {
      primary: "AB Wall Wonders",
      variations: [
        "ABwallwonders",
        "AB wall wonders",
        "abwallwonders",
        "A B Wall Wonders",
        "Wall Wonders",
        "AB Wonders",
      ],
    };

    const serviceSpecificBrands = {
      wallpapers: [
        "AB Wall Wonders wallpapers",
        "ABwallwonders wallpaper specialist",
        "Wall Wonders wallpaper installation",
        "AB Wonders 3D wallpapers",
      ],
      flooring: [
        "AB Wall Wonders flooring",
        "ABwallwonders vinyl flooring",
        "Wall Wonders luxury flooring",
        "AB Wonders flooring solutions",
      ],
      blinds: [
        "AB Wall Wonders blinds",
        "ABwallwonders window treatments",
        "Wall Wonders blinds installation",
        "AB Wonders motorized blinds",
      ],
      general: [
        "AB Wall Wonders interior design",
        "ABwallwonders home renovation",
        "Wall Wonders premium services",
        "AB Wonders complete solutions",
      ],
    };

    return {
      brandVariations,
      serviceSpecificBrands: serviceSpecificBrands[brandFocus],
    };
  };

  const { brandVariations, serviceSpecificBrands } = generateBrandContent();

  // Generate misspelling and phonetic variations
  const generateMisspellingVariations = () => {
    return [
      "ab wal wonders",
      "abwal wonders",
      "ab wall wonder",
      "ab wall wander",
      "ab wal wonder",
      "abhay wall wonders",
      "ab wonders",
      "wall wonder company",
      "ab interior design",
      "abhay wallpaper",
      "ab flooring company",
      "ab blinds company",
    ];
  };

  // Generate location-based brand searches
  const generateLocationBrandSearches = () => {
    return [
      "AB Wall Wonders Andhra Pradesh",
      "ABwallwonders AP",
      "Wall Wonders near me",
      "AB Wall Wonders location",
      "ABwallwonders contact",
      "AB Wall Wonders address",
      "Wall Wonders phone number",
      "AB Wonders Andhra Pradesh contact",
    ];
  };

  const misspellings = generateMisspellingVariations();
  const locationBrands = generateLocationBrandSearches();

  return (
    <Helmet>
      {/* Primary Brand Recognition Meta Tags */}
      <meta name="brand-name" content="AB Wall Wonders" />
      <meta
        name="brand-aliases"
        content={brandVariations.variations.join(", ")}
      />
      <meta name="brand-misspellings" content={misspellings.join(", ")} />

      {/* Service-Specific Brand Meta Tags */}
      <meta
        name="service-brand-names"
        content={serviceSpecificBrands?.join(", ")}
      />
      <meta
        name="location-brand-searches"
        content={locationBrands.join(", ")}
      />

      {/* Enhanced Brand Keywords */}
      <meta
        name="brand-keywords"
        content={`
        AB Wall Wonders, ABwallwonders, abwallwonders, Wall Wonders, AB Wonders,
        ${service} by AB Wall Wonders, ABwallwonders ${service}, 
        Wall Wonders ${service}, premium ${service} company,
        best ${service} Andhra Pradesh, ${service} installation expert,
        AB Wall Wonders reviews, ABwallwonders testimonials,
        Wall Wonders portfolio, AB Wonders gallery
      `
          .replace(/\s+/g, " ")
          .trim()}
      />

      {/* Phonetic and Alternative Spelling Meta Tags */}
      <meta
        name="phonetic-variations"
        content="A B Wall Wonders, ay bee wall wonders, ab wal wonders"
      />
      <meta name="alternative-spellings" content={misspellings.join(", ")} />

      {/* Brand Entity Recognition */}
      <meta name="entity-type" content="LocalBusiness" />
      <meta name="entity-name" content="AB Wall Wonders" />
      <meta
        name="entity-aliases"
        content={brandVariations.variations.join("|")}
      />

      {/* Social Media Brand Recognition */}
      <meta
        property="business:contact_data:company_name"
        content="AB Wall Wonders"
      />
      <meta
        property="business:contact_data:alternate_name"
        content="ABwallwonders"
      />
      <meta
        property="business:contact_data:brand_name"
        content="Wall Wonders"
      />

      {/* Search Engine Brand Signals */}
      <meta
        name="search-brand-terms"
        content={`
        "AB Wall Wonders", "ABwallwonders", "abwallwonders", "Wall Wonders",
        "AB Wall Wonders Andhra Pradesh", "ABwallwonders interior design",
        "Wall Wonders ${service}", "AB Wonders premium services"
      `
          .replace(/\s+/g, " ")
          .trim()}
      />

      {/* Brand Authority Meta Tags */}
      <meta name="brand-established" content="2020" />
      <meta name="brand-experience" content="15+ years" />
      <meta name="brand-coverage" content="Andhra Pradesh, India" />
      <meta
        name="brand-specialization"
        content="Premium Wallpapers, Luxury Flooring, Custom Blinds"
      />

      {/* Enhanced JSON-LD for Brand Recognition */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Brand",
          "@id": "https://ab-wall-wonders.vercel.app/#brand-recognition",
          name: "AB Wall Wonders",
          alternateName: brandVariations.variations,
          description: `Leading ${service} specialists in Andhra Pradesh`,
          logo: {
            "@type": "ImageObject",
            url: "https://ab-wall-wonders.vercel.app/images/ab-wall-wonders-logo.jpg",
          },
          sameAs: [
            "https://ab-wall-wonders.vercel.app",
            "https://wa.me/8688723648",
            "https://wa.me/8500900827",
          ],
          keywords: [
            ...brandVariations.variations,
            ...misspellings,
            ...locationBrands,
            ...(serviceSpecificBrands || []),
          ],
          associatedWith: {
            "@type": "LocalBusiness",
            name: "AB Wall Wonders",
            alternateName: brandVariations.variations,
          },
        })}
      </script>

      {/* Organization Recognition Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://ab-wall-wonders.vercel.app/#brand-organization",
          legalName: "AB Wall Wonders",
          name: "AB Wall Wonders",
          alternateName: brandVariations.variations,
          description: `Premier interior design company specializing in ${service} across Andhra Pradesh`,
          foundingDate: "2020",
          knowsAbout: [
            "Wallpaper Installation",
            "Flooring Solutions",
            "Window Blinds",
            "Interior Design",
            "Home Renovation",
          ],
          hasCredential: [
            "15+ Years Experience",
            "5-Year Warranty",
            "100+ Satisfied Customers",
            "Expert Installation Team",
          ],
          serviceArea: {
            "@type": "State",
            name: "Andhra Pradesh",
            containedInPlace: {
              "@type": "Country",
              name: "India",
            },
          },
        })}
      </script>

      {/* Search Action Schema for Brand Queries */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate:
              "https://ab-wall-wonders.vercel.app/?search={brand_query}",
          },
          "query-input": "required name=brand_query",
          object: {
            "@type": "Thing",
            name: brandVariations.variations,
            description: "Brand name variations for AB Wall Wonders",
          },
        })}
      </script>
    </Helmet>
  );
}

// Helper function to generate brand-specific page titles
export const generateBrandTitle = (
  service: string,
  location: string = "Andhra Pradesh",
) => {
  const brandVariations = [
    `AB Wall Wonders - ${service}`,
    `${service} by ABwallwonders`,
    `Wall Wonders ${service} Services`,
    `Premium ${service} | AB Wall Wonders ${location}`,
  ];

  return brandVariations[0]; // Return primary variation
};

// Helper function to generate brand-focused descriptions
export const generateBrandDescription = (
  service: string,
  location: string = "Andhra Pradesh",
) => {
  return `Get premium ${service} services from AB Wall Wonders (ABwallwonders) in ${location}. Known as Wall Wonders for exceptional quality, we provide expert installation with 15+ years experience and warranty coverage. Contact AB Wonders today!`;
};
