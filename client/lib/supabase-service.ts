import {
  supabase,
  type SupabaseProject,
  isSupabaseConfigured,
} from "./supabase";

// Get all projects
export const getAllProjects = async (): Promise<SupabaseProject[]> => {
  if (!isSupabaseConfigured() || !supabase) {
    console.warn("Supabase not configured, returning empty array");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getAllProjects:", error);
    return [];
  }
};

// Get featured projects
export const getFeaturedProjects = async (): Promise<SupabaseProject[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching featured projects:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getFeaturedProjects:", error);
    return [];
  }
};

// Get recent projects
export const getRecentProjects = async (
  limitCount: number = 6,
): Promise<SupabaseProject[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limitCount);

    if (error) {
      console.error("Error fetching recent projects:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getRecentProjects:", error);
    return [];
  }
};

// Get projects by service
export const getProjectsByService = async (
  service: string,
): Promise<SupabaseProject[]> => {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("service", service)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects by service:", error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Error in getProjectsByService:", error);
    return [];
  }
};

// Get project by ID
export const getProjectById = async (
  id: number,
): Promise<SupabaseProject | null> => {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching project by ID:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in getProjectById:", error);
    return null;
  }
};

// Create new project
export const createProject = async (
  projectData: Omit<SupabaseProject, "id" | "created_at" | "updated_at">,
): Promise<number> => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase not configured. Please set up Supabase environment variables.",
    );
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert(projectData)
      .select("id")
      .single();

    if (error) {
      console.error("Error creating project:", error);
      throw new Error(`Failed to create project: ${error.message}`);
    }

    return data.id;
  } catch (error: any) {
    console.error("Error in createProject:", error);
    throw new Error(error.message || "Failed to create project");
  }
};

// Update project
export const updateProject = async (
  id: number,
  updates: Partial<SupabaseProject>,
): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase not configured. Please set up Supabase environment variables.",
    );
  }

  try {
    const { error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id);

    if (error) {
      console.error("Error updating project:", error);
      throw new Error(`Failed to update project: ${error.message}`);
    }
  } catch (error: any) {
    console.error("Error in updateProject:", error);
    throw new Error(error.message || "Failed to update project");
  }
};

// Delete project
export const deleteProject = async (id: number): Promise<void> => {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase not configured. Please set up Supabase environment variables.",
    );
  }

  try {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      console.error("Error deleting project:", error);
      throw new Error(`Failed to delete project: ${error.message}`);
    }
  } catch (error: any) {
    console.error("Error in deleteProject:", error);
    throw new Error(error.message || "Failed to delete project");
  }
};

// Test Supabase connection
export const testSupabaseConnection = async () => {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase not configured",
      url: "not-set",
      environment: import.meta.env.DEV ? "development" : "production",
    };
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("count")
      .limit(1);

    if (error) {
      return {
        success: false,
        error: error.message,
        url: import.meta.env.VITE_SUPABASE_URL,
        environment: import.meta.env.DEV ? "development" : "production",
      };
    }

    return {
      success: true,
      url: import.meta.env.VITE_SUPABASE_URL,
      environment: import.meta.env.DEV ? "development" : "production",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "Connection failed",
      url: import.meta.env.VITE_SUPABASE_URL,
      environment: import.meta.env.DEV ? "development" : "production",
    };
  }
};

// Image URL validation helper
export const validateImageURL = (url: string): boolean => {
  if (!url) return false;

  try {
    new URL(url);

    // Check for file extensions
    if (/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i.test(url)) {
      return true;
    }

    // Check for known image hosting domains
    const imageHosts = [
      "unsplash.com",
      "images.unsplash.com",
      "gstatic.com", // Google Images
      "googleusercontent.com", // Google Images
      "imgur.com",
      "cloudinary.com",
      "amazonaws.com", // AWS S3
      "supabase.co", // Supabase storage
      "images.", // Generic images subdomain
      "cdn.", // Generic CDN
      "static.", // Generic static content
    ];

    // Check if URL contains any known image hosting domain
    if (imageHosts.some((host) => url.includes(host))) {
      return true;
    }

    // Check for local images
    if (url.startsWith("/images/") || url.startsWith("./images/")) {
      return true;
    }

    // If URL has 'image' in path or query params, likely an image
    if (url.includes("image") || url.includes("img") || url.includes("photo")) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};
