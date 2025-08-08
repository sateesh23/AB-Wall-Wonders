import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Environment detection
const isProduction = import.meta.env.PROD
const isDevelopment = import.meta.env.DEV

// Create Sanity client with enhanced configuration
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // Use CDN for better performance and public access
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  token: import.meta.env.VITE_SANITY_TOKEN,
  // Remove perspective restriction to allow access to all content
  stega: false, // Disable Visual Editing features for better performance
})

// Create a public client without token for read-only operations
export const publicClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  useCdn: true, // Use CDN for better performance
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
  // No token - public read access only
  stega: false,
})

// Helper function for generating Image URLs with error handling
const builder = imageUrlBuilder(client)

export const urlFor = (source: any) => {
  if (!source) return '/placeholder.svg'
  try {
    return builder.image(source).url()
  } catch (error) {
    console.warn('Error generating image URL:', error)
    return '/placeholder.svg'
  }
}

// Enhanced GROQ queries with error handling
export const projectsQuery = `*[_type == "project"] | order(completedDate desc) {
  _id,
  title,
  customerName,
  location,
  service,
  subcategory,
  description,
  image,
  images,
  isFeatured,
  completedDate,
  status,
  _createdAt,
  _updatedAt
}`

export const featuredProjectsQuery = `*[_type == "project" && isFeatured == true] | order(completedDate desc) {
  _id,
  title,
  customerName,
  location,
  service,
  subcategory,
  description,
  image,
  images,
  isFeatured,
  completedDate,
  status,
  _createdAt,
  _updatedAt
}`

export const recentProjectsQuery = (limit: number = 6) => `*[_type == "project"] | order(completedDate desc)[0...${limit}] {
  _id,
  title,
  customerName,
  location,
  service,
  subcategory,
  description,
  image,
  images,
  isFeatured,
  completedDate,
  status,
  _createdAt,
  _updatedAt
}`

// Types for TypeScript
export interface SanityProject {
  _id: string
  title: string
  customerName: string
  location: string
  service: 'wallpapers' | 'blinds' | 'flooring'
  subcategory?: string
  description: string
  image: any // Sanity image object
  images?: any[] // Array of Sanity image objects
  isFeatured: boolean
  completedDate: string
  status: 'completed' | 'in-progress' | 'planning'
  _createdAt: string
  _updatedAt: string
}

// Enhanced connection testing with graceful error handling
export const testSanityConnection = async (): Promise<{
  success: boolean
  error?: string
  projectId?: string
  dataset?: string
  environment?: string
  hasToken?: boolean
}> => {
  const config = client.config()

  // Basic configuration check first
  if (!config.projectId || config.projectId === 'your-project-id') {
    return {
      success: false,
      error: 'Sanity project not configured',
      projectId: config.projectId,
      dataset: config.dataset,
      environment: isDevelopment ? 'development' : 'production',
      hasToken: !!config.token
    }
  }

  // Check for token
  if (!config.token) {
    return {
      success: false,
      error: 'Sanity token missing - read-only mode',
      projectId: config.projectId,
      dataset: config.dataset,
      environment: isDevelopment ? 'development' : 'production',
      hasToken: false
    }
  }

  try {
    // Use a timeout to prevent hanging
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    // Test basic connection with timeout
    await Promise.race([
      client.fetch('count(*)'),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Connection timeout')), 5000)
      )
    ])

    clearTimeout(timeoutId)

    return {
      success: true,
      projectId: config.projectId,
      dataset: config.dataset,
      environment: isDevelopment ? 'development' : 'production',
      hasToken: !!config.token
    }
  } catch (error: any) {
    // Don't log network errors as they're expected in some environments
    const isNetworkError = error.message?.includes('Request error') ||
                          error.message?.includes('fetch') ||
                          error.message?.includes('Network') ||
                          error.name === 'AbortError'

    if (!isNetworkError) {
      console.warn('Sanity connection issue:', error.message)
    }

    return {
      success: false,
      error: isNetworkError ? 'Network unavailable' : (error.message || 'Connection failed'),
      projectId: config.projectId,
      dataset: config.dataset,
      environment: isDevelopment ? 'development' : 'production',
      hasToken: !!config.token
    }
  }
}
