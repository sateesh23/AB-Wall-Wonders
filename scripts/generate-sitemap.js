import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define your website's base URL
const BASE_URL = "https://yourdomain.com";

// Define all your website's URLs with their metadata
const urls = [
  {
    url: "/",
    changefreq: "weekly",
    priority: 1.0,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/services/wallpapers",
    changefreq: "monthly",
    priority: 0.9,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/services/flooring",
    changefreq: "monthly",
    priority: 0.9,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/services/blinds",
    changefreq: "monthly",
    priority: 0.9,
    lastmod: new Date().toISOString(),
  },
  {
    url: "/projects",
    changefreq: "weekly",
    priority: 0.8,
    lastmod: new Date().toISOString(),
  },
];

async function generateSitemap() {
  try {
    // Create a sitemap stream
    const sitemap = new SitemapStream({ hostname: BASE_URL });

    // Add each URL to the sitemap
    urls.forEach((url) => {
      sitemap.write(url);
    });

    // End the stream
    sitemap.end();

    // Convert stream to string and write to file
    const sitemapXML = await streamToPromise(sitemap);

    // Write to public folder
    const publicDir = join(__dirname, "..", "public");
    const sitemapPath = join(publicDir, "sitemap.xml");

    // Write the sitemap
    require("fs").writeFileSync(sitemapPath, sitemapXML.toString());

    console.log("✅ Sitemap generated successfully at public/sitemap.xml");
    console.log(`📍 Contains ${urls.length} URLs`);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();
