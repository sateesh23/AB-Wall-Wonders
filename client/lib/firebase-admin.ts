import { 
  createProject, 
  updateProject, 
  deleteProject, 
  getAllProjects,
  getFeaturedProjects,
  getProjectsByService,
  validateImageURL
} from './firebase-service'
import type { FirebaseProject } from './firebase-service'

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
  beforeImageURL?: string // Before image URL
  afterImageURL?: string // After image URL
  additionalImageURLs?: string[] // Additional image URLs
}

export class FirebaseAdminService {
  // Create a new project with image URLs
  static async createProject(data: CreateProjectData): Promise<string> {
    try {
      // Use placeholder if no image URLs provided or trim empty strings
      const beforeImageURL = (data.beforeImageURL?.trim() || '/placeholder.svg')
      const afterImageURL = (data.afterImageURL?.trim() || '/placeholder.svg')

      // Validate before and after image URLs
      if (!validateImageURL(beforeImageURL)) {
        throw new Error('Invalid before image URL. Please provide a valid image URL or leave empty for placeholder.');
      }

      if (!validateImageURL(afterImageURL)) {
        throw new Error('Invalid after image URL. Please provide a valid image URL or leave empty for placeholder.');
      }

      // Validate additional image URLs if provided
      if (data.additionalImageURLs && data.additionalImageURLs.length > 0) {
        for (const url of data.additionalImageURLs) {
          if (!validateImageURL(url)) {
            throw new Error(`Invalid additional image URL: ${url}`);
          }
        }
      }

      const projectData: Partial<Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'>> = {
        title: data.title,
        customerName: data.customerName,
        location: data.location,
        service: data.service,
        description: data.description,
        beforeImageURL,
        afterImageURL,
        isFeatured: data.isFeatured,
        completedDate: data.completedDate,
        status: data.status,
      }

      // Only add optional fields if they have values
      if (data.subcategory && data.subcategory.trim()) {
        projectData.subcategory = data.subcategory;
      }

      if (data.additionalImageURLs && data.additionalImageURLs.length > 0) {
        projectData.additionalImageURLs = data.additionalImageURLs;
      }

      console.log('🚀 Creating project with data:', projectData)
      const projectId = await createProject(projectData)
      console.log('✅ Project created successfully with ID:', projectId)
      return projectId
    } catch (error) {
      console.error('Error creating project:', error)
      throw error
    }
  }

  // Update an existing project
  static async updateProject(id: string, data: Partial<CreateProjectData>): Promise<void> {
    try {
      const updateData: Partial<FirebaseProject> = {}

      // Copy simple fields
      if (data.title !== undefined) updateData.title = data.title
      if (data.customerName !== undefined) updateData.customerName = data.customerName
      if (data.location !== undefined) updateData.location = data.location
      if (data.service !== undefined) updateData.service = data.service
      if (data.subcategory !== undefined) updateData.subcategory = data.subcategory
      if (data.description !== undefined) updateData.description = data.description
      if (data.isFeatured !== undefined) updateData.isFeatured = data.isFeatured
      if (data.completedDate !== undefined) updateData.completedDate = data.completedDate
      if (data.status !== undefined) updateData.status = data.status

      // Handle before/after image URL updates
      if (data.beforeImageURL !== undefined) {
        if (data.beforeImageURL && !validateImageURL(data.beforeImageURL)) {
          throw new Error('Invalid before image URL. Please provide a valid image URL.');
        }
        updateData.beforeImageURL = data.beforeImageURL || '/placeholder.svg'
      }

      if (data.afterImageURL !== undefined) {
        if (data.afterImageURL && !validateImageURL(data.afterImageURL)) {
          throw new Error('Invalid after image URL. Please provide a valid image URL.');
        }
        updateData.afterImageURL = data.afterImageURL || '/placeholder.svg'
      }

      // Handle additional image URLs
      if (data.additionalImageURLs !== undefined) {
        if (data.additionalImageURLs && data.additionalImageURLs.length > 0) {
          for (const url of data.additionalImageURLs) {
            if (!validateImageURL(url)) {
              throw new Error(`Invalid additional image URL: ${url}`);
            }
          }
          updateData.additionalImageURLs = data.additionalImageURLs
        } else {
          updateData.additionalImageURLs = undefined
        }
      }

      await updateProject(id, updateData)
      console.log('Project updated:', id)
    } catch (error) {
      console.error('Error updating project:', error)
      throw error
    }
  }

  // Delete a project
  static async deleteProject(id: string): Promise<void> {
    try {
      await deleteProject(id)
      console.log('Project deleted:', id)
    } catch (error) {
      console.error('Error deleting project:', error)
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
      // Fetch all projects data
      const [allProjects, featuredProjects] = await Promise.all([
        getAllProjects(),
        getFeaturedProjects()
      ])

      // Get projects by service
      const wallpapersProjects = await getProjectsByService('wallpapers')
      const blindsProjects = await getProjectsByService('blinds')
      const flooringProjects = await getProjectsByService('flooring')

      // Calculate recent projects (last 30 days)
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      const recentProjects = allProjects.filter(project => 
        new Date(project.completedDate) > thirtyDaysAgo
      ).length

      return {
        totalProjects: allProjects.length,
        featuredProjects: featuredProjects.length,
        projectsByService: {
          wallpapers: wallpapersProjects.length,
          blinds: blindsProjects.length,
          flooring: flooringProjects.length
        },
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
    // For now, check if Firebase is configured
    return !!(import.meta.env.VITE_FIREBASE_PROJECT_ID && 
             import.meta.env.VITE_FIREBASE_PROJECT_ID !== 'your-project-id')
  }
}
