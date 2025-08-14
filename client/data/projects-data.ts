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
    beforeImageURL: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
    beforeImageURL: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
    beforeImageURL: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
    beforeImageURL: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
    beforeImageURL: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1586105251261-72a756497a11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
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
    beforeImageURL: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    afterImageURL: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    isFeatured: false,
    completedDate: "2024-02-10",
    status: "completed",
    createdAt: "2024-02-05T12:00:00Z",
    updatedAt: "2024-02-10T17:45:00Z"
  }
];

export const featuredProjects: ProjectData[] = projectsData.filter(project => project.isFeatured);
