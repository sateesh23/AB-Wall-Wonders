import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://gbtotyrhqbcxbvcyfygg.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey && supabaseAnonKey !== '')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface SupabaseProject {
  id?: number
  title: string
  customer_name: string
  location: string
  service: 'wallpapers' | 'flooring' | 'blinds'
  subcategory: string
  description: string
  image_url: string
  image_urls?: string[]
  is_featured: boolean
  completed_date: string
  status: 'completed' | 'in-progress' | 'planned'
  created_at?: string
  updated_at?: string
}

export default supabase
