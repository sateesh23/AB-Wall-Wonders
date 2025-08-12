import { 
  createProject, 
  updateProject, 
  deleteProject, 
  uploadImage,
  getAllProjects,
  getFeaturedProjects,
  getProjectsByService
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
  imageFile?: File
  imageFiles?: File[]
}

export class FirebaseAdminService {
  // Create a new project
  static async createProject(data: CreateProjectData): Promise<string> {
    try {
      let imageURL = '/placeholder.svg'
      let imageURLs: string[] = []

      // Upload main image if provided
      if (data.imageFile) {
        imageURL = await uploadImage(data.imageFile, 'projects')
      }

      // Upload additional images if provided
      if (data.imageFiles && data.imageFiles.length > 0) {
        const uploadPromises = data.imageFiles.map(file => uploadImage(file, 'projects'))
        imageURLs = await Promise.all(uploadPromises)
      }

      const projectData: Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'> = {
        title: data.title,
        customerName: data.customerName,
        location: data.location,
        service: data.service,
        subcategory: data.subcategory,
        description: data.description,
        imageURL,
        imageURLs: imageURLs.length > 0 ? imageURLs : undefined,
        isFeatured: data.isFeatured,
        completedDate: data.completedDate,
        status: data.status,
      }

      const projectId = await createProject(projectData)
      console.log('Project created:', projectId)
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

      // Handle image upload if new image provided
      if (data.imageFile) {
        updateData.imageURL = await uploadImage(data.imageFile, 'projects')
      }

      // Handle additional images if provided
      if (data.imageFiles && data.imageFiles.length > 0) {
        const uploadPromises = data.imageFiles.map(file => uploadImage(file, 'projects'))
        updateData.imageURLs = await Promise.all(uploadPromises)
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

  // Upload image to Firebase Storage
  static async uploadImage(file: File): Promise<string> {
    try {
      const downloadURL = await uploadImage(file, 'uploads')
      console.log('Image uploaded:', downloadURL)
      return downloadURL
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
