import {
  createProject,
  updateProject,
  deleteProject,
  validateImageURL,
} from './supabase-service'
import type { SupabaseProject } from './supabase'

export interface CreateProjectData {
  title: string
  customerName: string
  location: string
  service: 'wallpapers' | 'flooring' | 'blinds'
  subcategory: string
  description: string
  imageURL: string
  imageURLs?: string[]
  isFeatured: boolean
  completedDate: string
  status: 'completed' | 'in-progress' | 'planned'
}

export class SupabaseAdminService {
  // Create a new project with image URLs
  static async createProject(projectData: CreateProjectData): Promise<number> {
    console.log('🚀 Creating project with Supabase:', projectData)

    // Validate main image URL
    if (!validateImageURL(projectData.imageURL)) {
      throw new Error('Invalid main image URL')
    }

    // Validate additional image URLs if provided
    if (projectData.imageURLs && projectData.imageURLs.length > 0) {
      for (const url of projectData.imageURLs) {
        if (url && !validateImageURL(url)) {
          throw new Error(`Invalid image URL: ${url}`)
        }
      }
    }

    // Convert form data to Supabase format
    const supabaseData: Omit<SupabaseProject, 'id' | 'created_at' | 'updated_at'> = {
      title: projectData.title,
      customer_name: projectData.customerName,
      location: projectData.location,
      service: projectData.service,
      subcategory: projectData.subcategory,
      description: projectData.description,
      image_url: projectData.imageURL,
      image_urls: projectData.imageURLs?.filter(url => url && url.trim() !== '') || [],
      is_featured: projectData.isFeatured,
      completed_date: projectData.completedDate,
      status: projectData.status,
    }

    try {
      const projectId = await createProject(supabaseData)
      console.log('✅ Project created successfully with ID:', projectId)
      return projectId
    } catch (error: any) {
      console.error('❌ Error creating project:', error)
      throw new Error(error.message || 'Failed to create project')
    }
  }

  // Update an existing project
  static async updateProject(id: number, projectData: CreateProjectData): Promise<void> {
    console.log('🔄 Updating project with Supabase:', { id, projectData })

    // Validate main image URL
    if (!validateImageURL(projectData.imageURL)) {
      throw new Error('Invalid main image URL')
    }

    // Validate additional image URLs if provided
    if (projectData.imageURLs && projectData.imageURLs.length > 0) {
      for (const url of projectData.imageURLs) {
        if (url && !validateImageURL(url)) {
          throw new Error(`Invalid image URL: ${url}`)
        }
      }
    }

    // Convert form data to Supabase format
    const updateData: Partial<SupabaseProject> = {
      title: projectData.title,
      customer_name: projectData.customerName,
      location: projectData.location,
      service: projectData.service,
      subcategory: projectData.subcategory,
      description: projectData.description,
      image_url: projectData.imageURL,
      image_urls: projectData.imageURLs?.filter(url => url && url.trim() !== '') || [],
      is_featured: projectData.isFeatured,
      completed_date: projectData.completedDate,
      status: projectData.status,
    }

    try {
      await updateProject(id, updateData)
      console.log('✅ Project updated successfully')
    } catch (error: any) {
      console.error('❌ Error updating project:', error)
      throw new Error(error.message || 'Failed to update project')
    }
  }

  // Delete a project
  static async deleteProject(id: number): Promise<void> {
    console.log('🗑️ Deleting project with ID:', id)

    try {
      await deleteProject(id)
      console.log('✅ Project deleted successfully')
    } catch (error: any) {
      console.error('❌ Error deleting project:', error)
      throw new Error(error.message || 'Failed to delete project')
    }
  }

  // Check if user has admin privileges
  static async isAdmin(): Promise<boolean> {
    // For now, return true since we're not implementing authentication
    // In a real app, you'd check user authentication and roles
    return true
  }

  // Get project form validation rules
  static getValidationRules() {
    return {
      title: { required: true, minLength: 3, maxLength: 100 },
      customerName: { required: true, minLength: 2, maxLength: 50 },
      location: { required: true, minLength: 2, maxLength: 50 },
      service: { required: true, enum: ['wallpapers', 'flooring', 'blinds'] },
      subcategory: { required: true, minLength: 2, maxLength: 50 },
      description: { required: false, maxLength: 500 },
      imageURL: { required: true, validation: validateImageURL },
      imageURLs: { required: false, arrayOf: { validation: validateImageURL } },
      completedDate: { required: true, type: 'date' },
      status: { required: true, enum: ['completed', 'in-progress', 'planned'] },
    }
  }

  // Get service-specific subcategories
  static getSubcategories(service: string): string[] {
    const subcategories = {
      wallpapers: [
        '3D Wallpaper',
        'Textured Wallpaper',
        'Vinyl Wallpaper',
        'Fabric Wallpaper',
        'Photo Wallpaper',
        'Metallic Wallpaper',
      ],
      flooring: [
        'Laminate Flooring',
        'Vinyl Flooring',
        'Wooden Flooring',
        'Tile Flooring',
        'Carpet Flooring',
        'Epoxy Flooring',
      ],
      blinds: [
        'Venetian Blinds',
        'Vertical Blinds',
        'Roller Blinds',
        'Roman Blinds',
        'Motorized Blinds',
        'Blackout Blinds',
      ],
    }

    return subcategories[service as keyof typeof subcategories] || []
  }
}

export default SupabaseAdminService
