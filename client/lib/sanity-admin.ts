import { client } from './sanity'
import type { ProjectData } from './types'

export interface CreateProjectData {
  title: string
  customerName: string
  location: string
  service: 'wallpapers' | 'blinds' | 'flooring'
  subcategory?: string
  description: string
  isFeatured: boolean
  completedDate: string
  status: 'completed' | 'in-progress' | 'planning'
  imageFile?: File
}

export class SanityAdminService {
  // Create a new project
  static async createProject(data: CreateProjectData): Promise<any> {
    try {
      // In a real implementation, you would:
      // 1. Upload the image to Sanity
      // 2. Create the project document with the image reference

      const doc = {
        _type: 'project',
        title: data.title,
        customerName: data.customerName,
        location: data.location,
        service: data.service,
        subcategory: data.subcategory,
        description: data.description,
        isFeatured: data.isFeatured,
        completedDate: data.completedDate,
        status: data.status,
        // image: imageAsset (would be added after image upload)
      }

      const result = await client.create(doc)
      console.log('Project created:', result)
      return result
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }

  // Update an existing project
  static async updateProject(id: string, data: Partial<CreateProjectData>): Promise<any> {
    try {
      const result = await client
        .patch(id)
        .set(data)
        .commit()
      
      console.log('Project updated:', result)
      return result
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  // Delete a project
  static async deleteProject(id: string): Promise<void> {
    try {
      await client.delete(id)
      console.log('Project deleted:', id)
    } catch (error) {
      console.error('Error deleting project:', error)
      throw error
    }
  }

  // Upload image to Sanity
  static async uploadImage(file: File): Promise<any> {
    try {
      const asset = await client.assets.upload('image', file, {
        filename: file.name,
      })
      console.log('Image uploaded:', asset)
      return asset
    } catch (error) {
      console.error('Error uploading image:', error)
      throw error
    }
  }

  // Get project analytics
  static async getAnalytics(): Promise<{
    totalProjects: number
    featuredProjects: number
    projectsByService: Record<string, number>
    recentProjects: number
  }> {
    try {
      const queries = [
        client.fetch('count(*[_type == "project"])'),
        client.fetch('count(*[_type == "project" && isFeatured == true])'),
        client.fetch(`{
          "wallpapers": count(*[_type == "project" && service == "wallpapers"]),
          "blinds": count(*[_type == "project" && service == "blinds"]),
          "flooring": count(*[_type == "project" && service == "flooring"])
        }`),
        client.fetch('count(*[_type == "project" && completedDate > now() - 86400*30])'),
      ]

      const [totalProjects, featuredProjects, projectsByService, recentProjects] = await Promise.all(queries)

      return {
        totalProjects,
        featuredProjects,
        projectsByService,
        recentProjects,
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return {
        totalProjects: 0,
        featuredProjects: 0,
        projectsByService: { wallpapers: 0, blinds: 0, flooring: 0 },
        recentProjects: 0,
      }
    }
  }

  // Check if we can perform admin operations
  static canPerformAdminOperations(): boolean {
    // In a real app, you'd check authentication and permissions
    return !!(client.config().projectId && client.config().projectId !== 'your-project-id')
  }
}
