import { Project } from '@/lib/types'

export interface ProjectData extends Project {
  thumbnail?: string;
}

export type GalleryProject = ProjectData;

// Static sample data for development
export const projectsData: ProjectData[] = [
  {
    id: "1",
    title: "Modern Office Wallpaper Installation",
    customerName: "Tech Solutions Ltd",
    location: "Downtown Business District",
    service: "wallpapers",
    subcategory: "Commercial",
    description: "Premium textured wallpaper installation for modern office space with geometric patterns.",
    beforeImageURL: "/images/services/wallpapers/gallery/office-geometric.jpg",
    afterImageURL: "/images/services/wallpapers/gallery/living-room-3d.jpg",
    additionalImageURLs: ["/placeholder.svg"],
    isFeatured: true,
    completedDate: "2024-01-15",
    status: "completed",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-15T16:30:00Z"
  },
  {
    id: "2",
    title: "Luxury Home Blinds Installation",
    customerName: "Smith Family",
    location: "Residential Area North",
    service: "blinds",
    subcategory: "Residential",
    description: "Custom motorized blinds installation throughout luxury home with smart home integration.",
    beforeImageURL: "/images/services/blinds/gallery/bedroom-roman.jpg",
    afterImageURL: "/images/services/blinds/gallery/living-room-zebra.jpg",
    additionalImageURLs: ["/placeholder.svg"],
    isFeatured: true,
    completedDate: "2024-01-20",
    status: "completed",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-20T17:00:00Z"
  },
  {
    id: "3",
    title: "Restaurant Flooring Renovation",
    customerName: "Bella's Bistro",
    location: "City Center",
    service: "flooring",
    subcategory: "Commercial",
    description: "Complete flooring renovation with waterproof luxury vinyl planks for high-traffic restaurant.",
    beforeImageURL: "/images/services/flooring/gallery/kitchen-vinyl.jpg",
    afterImageURL: "/images/services/flooring/gallery/office-vinyl.jpg",
    additionalImageURLs: ["/placeholder.svg"],
    isFeatured: true,
    completedDate: "2024-01-25",
    status: "completed",
    createdAt: "2024-01-18T11:00:00Z",
    updatedAt: "2024-01-25T18:00:00Z"
  },
  {
    id: "4",
    title: "Boutique Store Interior Design",
    customerName: "Fashion Forward",
    location: "Shopping Mall",
    service: "wallpapers",
    subcategory: "Retail",
    description: "Artistic wallpaper design for boutique store creating an elegant shopping atmosphere.",
    beforeImageURL: "/images/services/wallpapers/gallery/bedroom-botanical.jpg",
    afterImageURL: "/images/services/wallpapers/gallery/dining-mural.jpg",
    isFeatured: false,
    completedDate: "2024-01-30",
    status: "completed",
    createdAt: "2024-01-25T14:00:00Z",
    updatedAt: "2024-01-30T16:00:00Z"
  },
  {
    id: "5",
    title: "Home Office Window Treatments",
    customerName: "Johnson Residence",
    location: "Suburban Area",
    service: "blinds",
    subcategory: "Residential",
    description: "Energy-efficient cellular shades installation for home office with light control features.",
    beforeImageURL: "/images/services/blinds/gallery/office-roller.jpg",
    afterImageURL: "/images/services/blinds/gallery/study-wooden.jpg",
    isFeatured: false,
    completedDate: "2024-02-05",
    status: "completed",
    createdAt: "2024-02-01T08:00:00Z",
    updatedAt: "2024-02-05T15:30:00Z"
  },
  {
    id: "6",
    title: "Cafe Vinyl Flooring",
    customerName: "Morning Brew Cafe",
    location: "Arts District",
    service: "flooring",
    subcategory: "Commercial",
    description: "Stylish vinyl flooring installation with wood-look finish for cozy cafe atmosphere.",
    beforeImageURL: "/images/services/flooring/gallery/restaurant-mats.jpg",
    afterImageURL: "/images/services/flooring/gallery/gym-mats.jpg",
    isFeatured: false,
    completedDate: "2024-02-10",
    status: "completed",
    createdAt: "2024-02-05T12:00:00Z",
    updatedAt: "2024-02-10T17:45:00Z"
  }
];

export const featuredProjects: ProjectData[] = projectsData.filter(project => project.isFeatured);
