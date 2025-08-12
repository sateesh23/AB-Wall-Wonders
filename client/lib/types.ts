// Firebase Project types
export interface Project {
  id?: string;
  title: string;
  customerName: string;
  location: string;
  service: "wallpapers" | "blinds" | "flooring";
  subcategory?: string;
  description: string;
  imageURL: string;
  imageURLs?: string[];
  isFeatured: boolean;
  completedDate: string;
  status: "completed" | "in-progress" | "planning";
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message?: string;
}

export interface ApiError {
  error: string;
  details?: string;
  required?: string[];
  validCategories?: string[];
}

// Project creation input type (for forms)
export interface CreateProjectInput {
  title: string;
  customerName: string;
  businessName?: string;
  location: string;
  area: string;
  category: 'wallpapers' | 'blinds' | 'flooring' | 'mixed';
  serviceName: string;
  serviceTypes?: string[];
  thumbnailUrl?: string;
  images?: string[];
  description?: string;
  completedDate?: string;
  status?: string;
  featured?: boolean;
  notes?: string;
}

// Legacy interface for backwards compatibility - supports both formats
export interface ProjectData {
  id: number | string;
  title?: string;

  // Customer info (both formats supported)
  customer_name?: string;
  customerName?: string;
  business_name?: string;
  businessName?: string;

  location: string;
  area: string;
  category: 'wallpapers' | 'blinds' | 'flooring' | 'mixed';

  // Service info (both formats supported)
  service_name?: string;
  serviceName?: string;
  service_types?: string[];
  serviceTypes?: string[];

  // Images (both formats supported)
  thumbnail_url?: string;
  thumbnailUrl?: string;
  thumbnail?: string;
  image?: string;
  images?: string[];

  description?: string;

  // Dates (both formats supported)
  completed_date?: string;
  completedDate?: string;
  date?: string;

  status?: string;
  featured?: boolean;
  isFeatured?: boolean;
  notes?: string;

  created_at?: string;
  createdAt?: string;
  updated_at?: string;
  updatedAt?: string;
}
