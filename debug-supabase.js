// Debug script to test Supabase connection
import {
  testSupabaseConnection,
  isSupabaseConfigured,
} from "./client/lib/supabase.js";

console.log("🔍 Testing Supabase configuration...");

console.log("Environment variables:");
console.log("VITE_SUPABASE_URL:", process.env.VITE_SUPABASE_URL || "NOT SET");
console.log(
  "VITE_SUPABASE_ANON_KEY:",
  process.env.VITE_SUPABASE_ANON_KEY ? "SET" : "NOT SET",
);

console.log("Is configured:", isSupabaseConfigured());

try {
  const result = await testSupabaseConnection();
  console.log("Connection test result:", result);
} catch (error) {
  console.error("Connection test error:", error);
}
