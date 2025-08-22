import { Helmet } from "react-helmet-async";

interface VoiceSearchSEOProps {
  businessName?: string;
  location?: string;
  services?: string[];
  isHomepage?: boolean;
}

export default function VoiceSearchSEO({
  businessName = "AB Wall Wonders",
  location = "Andhra Pradesh",
  services = ["wallpapers", "flooring", "blinds"],
}: VoiceSearchSEOProps) {
  // Generate natural language content for voice search
  const generateVoiceSearchContent = () => {
    const brandVariations = [
      "AB Wall Wonders",
      "ABwallwonders",
      "AB wall wonders",
      "abwallwonders",
      "A B Wall Wonders",
      "Wall Wonders",
      "AB Wonders",
    ];

    const voiceQueries = [
      `Find ${businessName} near me`,
      `Best wallpaper company in ${location}`,
      `Where is ${businessName} located`,
      `${businessName} phone number`,
      `Interior design services in ${location}`,
      `Wallpaper installation ${location}`,
      `Custom blinds ${location}`,
      `Flooring company near me`,
      `ABwallwonders contact details`,
      `Wall Wonders ${location}`,
      `Premium wallpaper installer`,
      `Motorized blinds installation`,
      `Vinyl flooring contractor`,
      `Home renovation ${location}`,
      `Interior decorator near me`,
    ];

    return { brandVariations, voiceQueries };
  };

  const { voiceQueries } = generateVoiceSearchContent();


  // Generate local business Q&A schema
  const generateLocalQASchema = () => {
    return {
      "@context": "https://schema.org",
      "@type": "QAPage",
      mainEntity: {
        "@type": "Question",
        name: `Who is the best interior design company in ${location}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `AB Wall Wonders (ABwallwonders) is a leading interior design company in ${location}, specializing in premium wallpapers, flooring, and blinds with 15+ years of experience and 5-year warranty coverage.`,
          author: {
            "@type": "Organization",
            name: "AB Wall Wonders",
          },
        },
      },
    };
  };

  return (
    <Helmet>
      {/* Voice Search Optimization Meta Tags */}
      <meta
        name="robots"
        content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
      />
      <meta name="speakable" content="name,description,telephone,address" />

      {/* Natural Language Meta Tags for Voice Search */}
      <meta name="voice-search-queries" content={voiceQueries.join(", ")} />
      <meta
        name="conversational-keywords"
        content="find AB Wall Wonders, best wallpaper company, interior design near me, ABwallwonders location, Wall Wonders contact"
      />

      {/* Local Search Enhancement */}
      <meta name="geo.placename" content={`${location}, India`} />
      <meta name="geo.region" content="IN-AP" />
      <meta name="ICBM" content="15.9129, 79.7400" />
      <meta name="geo.position" content="15.9129;79.7400" />

      {/* Business Hours for Voice Assistants */}
      <meta
        name="business-hours"
        content="Monday-Saturday: 9:00 AM - 6:00 PM"
      />
      <meta name="business-phone" content="+91-8500900827" />
      <meta name="business-phone-secondary" content="+91-86887-23648" />

      <script type="application/ld+json">
        {JSON.stringify(generateLocalQASchema())}
      </script>

      {/* Speakable Content Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SpeakableSpecification",
          xpath: [
            "/html/head/title",
            "/html/head/meta[@name='description']/@content",
            "//h1",
            "//h2",
          ],
        })}
      </script>

      {/* Enhanced Local Business for Voice Search */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://ab-wall-wonders.vercel.app/#voice-search-business",
          name: "AB Wall Wonders",
          alternateName: [
            "ABwallwonders",
            "AB wall wonders",
            "abwallwonders",
            "A B Wall Wonders",
            "Wall Wonders",
            "AB Wonders",
          ],
          description: `${businessName} is the premier interior design company in ${location} for wallpapers, flooring, and blinds`,
          telephone: "+91-8500900827",
          url: "https://ab-wall-wonders.vercel.app",
          address: {
            "@type": "PostalAddress",
            addressLocality: location,
            addressRegion: "AP",
            addressCountry: "IN",
          },
          geo: {
            "@type": "GeoCoordinates",
            latitude: 15.9129,
            longitude: 79.74,
          },
          openingHours: "Mo-Sa 09:00-18:00",
          priceRange: "₹₹-₹₹₹",
          paymentAccepted: ["Cash", "Credit Card", "UPI", "Net Banking"],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Interior Design Services",
            itemListElement: services.map((service) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: `${service} installation by ${businessName}`,
                description: `Professional ${service} installation services in ${location}`,
              },
            })),
          },
        })}
      </script>
    </Helmet>
  );
}

// Export helper function for generating voice search keywords
export const generateVoiceSearchKeywords = (
  businessName: string,
  location: string,
  service?: string,
) => {
  const baseKeywords = [
    `Find ${businessName}`,
    `${businessName} near me`,
    `Best ${service || "interior design"} company`,
    `${service || "Interior design"} in ${location}`,
    `Where is ${businessName}`,
    `${businessName} phone number`,
    `Contact ${businessName}`,
    `${businessName} reviews`,
    `ABwallwonders ${location}`,
    `Wall Wonders services`,
  ];

  return baseKeywords;
};
