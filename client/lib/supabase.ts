import { createClient } from "@supabase/supabase-js";

// Configuration validation
export const validateSupabaseConfig = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

  // Only log in development
  if (import.meta.env.DEV) {
    console.log("🔧 Validating Supabase config:", {
      url: url || "NOT SET",
      keySet: key ? "SET" : "NOT SET",
      keyLength: key?.length || 0
    });
  }

  const errors: string[] = [];

  if (!url) {
    errors.push("VITE_SUPABASE_URL is required");
  } else if (!url.startsWith("https://") || !url.includes(".supabase.co")) {
    errors.push("VITE_SUPABASE_URL must be a valid Supabase URL");
  }

  if (!key) {
    errors.push("VITE_SUPABASE_ANON_KEY is required");
  } else if (key.length < 100) {
    errors.push("VITE_SUPABASE_ANON_KEY appears to be invalid (too short)");
  }

  return {
    isValid: errors.length === 0,
    errors,
    config: { url, key }
  };
};

// Get configuration status
export const getSupabaseStatus = () => {
  const validation = validateSupabaseConfig();
  
  if (!validation.isValid) {
    return {
      status: "not-configured" as const,
      message: "Supabase not configured",
      errors: validation.errors
    };
  }
  
  return {
    status: "configured" as const,
    message: "Supabase configured",
    config: validation.config
  };
};

// Create Supabase client with validation
export const createSupabaseClient = () => {
  const validation = validateSupabaseConfig();
  
  if (!validation.isValid) {
    console.warn("⚠️ Supabase configuration errors:", validation.errors);
    return null;
  }
  
  try {
    const client = createClient(validation.config.url, validation.config.key);
    console.log("✅ Supabase client created successfully");
    return client;
  } catch (error) {
    console.error("❌ Failed to create Supabase client:", error);
    return null;
  }
};

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => getSupabaseStatus().status === "configured";

// Create Supabase client instance
export const supabase = createSupabaseClient();

// Test connection with detailed feedback
export const testSupabaseConnection = async () => {
  console.log("🔍 testSupabaseConnection: Starting...");

  const status = getSupabaseStatus();
  console.log("📊 testSupabaseConnection: Status check result:", status);

  if (status.status === "not-configured") {
    console.log("❌ testSupabaseConnection: Not configured");
    return {
      success: false,
      error: "Configuration missing",
      details: status.errors,
      url: import.meta.env.VITE_SUPABASE_URL || "not-set",
      environment: import.meta.env.DEV ? "development" : "production"
    };
  }
  
  const client = createSupabaseClient();
  if (!client) {
    return {
      success: false,
      error: "Failed to create client",
      url: status.config.url,
      environment: import.meta.env.DEV ? "development" : "production"
    };
  }
  
  try {
    console.log("🔍 Testing Supabase connection...");
    
    // Test basic connection
    const { error: connectionError } = await client
      .from("projects")
      .select("count")
      .limit(1);
    
    if (connectionError) {
      console.error("❌ Connection test failed:", connectionError);
      return {
        success: false,
        error: connectionError.message,
        code: connectionError.code,
        hint: connectionError.hint,
        url: status.config.url,
        environment: import.meta.env.DEV ? "development" : "production"
      };
    }
    
    console.log("✅ Supabase connection successful");
    return {
      success: true,
      message: "Connected successfully",
      url: status.config.url,
      environment: import.meta.env.DEV ? "development" : "production"
    };
    
  } catch (error: any) {
    console.error("❌ Connection test error:", error);
    return {
      success: false,
      error: error.message || "Unknown connection error",
      url: status.config.url,
      environment: import.meta.env.DEV ? "development" : "production"
    };
  }
};

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
