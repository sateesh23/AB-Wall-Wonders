// Re-export from the improved configuration module
export {
  supabase,
  isSupabaseConfigured,
  testSupabaseConnection,
  getSupabaseStatus
} from "./supabase-config";

// Database types
export interface SupabaseProject {
  id?: number;
  title: string;
  customer_name: string;
  location: string;
  service: "wallpapers" | "flooring" | "blinds";
  subcategory: string;
  description: string;
  image_url: string;
  image_urls?: string[];
  is_featured: boolean;
  completed_date: string;
  status: "completed" | "in-progress" | "planned";
  created_at?: string;
  updated_at?: string;
}

export default supabase;
