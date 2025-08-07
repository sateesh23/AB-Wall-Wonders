import type { ProjectData } from './types'

// Admin storage key
const ADMIN_PROJECTS_KEY = 'abww_admin_projects'

// Image storage utilities
class ImageStorage {
  private static readonly IMAGE_PREFIX = 'abww_img_'

  // Store image as base64 in localStorage with size optimization
  static async storeImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        reject(new Error('Image too large. Please use images under 5MB.'))
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const base64 = e.target?.result as string
          const imageId = `${this.IMAGE_PREFIX}${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
          
          // Store in localStorage
          localStorage.setItem(imageId, base64)
          
          // Return the image ID that can be used as a URL
          resolve(imageId)
        } catch (error) {
          reject(new Error('Failed to process image'))
        }
      }
      reader.onerror = () => reject(new Error('Failed to read image file'))
      reader.readAsDataURL(file)
    })
  }

  // Get image URL from stored ID
  static getImageUrl(imageId: string): string {
    if (!imageId) return '/placeholder.svg'
    if (imageId.startsWith('http')) return imageId // External URL
    if (!imageId.startsWith(this.IMAGE_PREFIX)) return '/placeholder.svg'
    
    try {
      const base64 = localStorage.getItem(imageId)
      return base64 || '/placeholder.svg'
    } catch (error) {
      return '/placeholder.svg'
    }
  }

  // Clean up old images (keep only referenced ones)
  static cleanup(referencedImages: string[]) {
    try {
      const keys = Object.keys(localStorage)
      const imageKeys = keys.filter(key => key.startsWith(this.IMAGE_PREFIX))
      
      imageKeys.forEach(key => {
        if (!referencedImages.includes(key)) {
          localStorage.removeItem(key)
        }
      })
    } catch (error) {
      console.warn('Image cleanup failed:', error)
    }
  }
}

export class AdminStorage {
  // Initialize admin storage
  static init(): void {
    if (!localStorage.getItem(ADMIN_PROJECTS_KEY)) {
      localStorage.setItem(ADMIN_PROJECTS_KEY, JSON.stringify([]))
    }
  }

  // Get all projects
  static getAllProjects(): ProjectData[] {
    this.init()
    try {
      const projects = localStorage.getItem(ADMIN_PROJECTS_KEY)
      const projectList = projects ? JSON.parse(projects) : []
      
      // Convert stored image IDs to URLs
      return projectList.map((project: ProjectData) => ({
        ...project,
        thumbnail: ImageStorage.getImageUrl(project.thumbnail || ''),
        image: ImageStorage.getImageUrl(project.image || ''),
        images: project.images?.map(img => ImageStorage.getImageUrl(img || '')) || []
      }))
    } catch (error) {
      console.error('Error loading admin projects:', error)
      return []
    }
  }

  // Get featured projects
  static getFeaturedProjects(): ProjectData[] {
    return this.getAllProjects().filter(p => p.isFeatured)
  }

  // Get recent projects
  static getRecentProjects(limit: number = 6): ProjectData[] {
    return this.getAllProjects()
      .sort((a, b) => new Date(b.completedDate || '').getTime() - new Date(a.completedDate || '').getTime())
      .slice(0, limit)
  }

  // Create new project
  static async createProject(projectData: {
    title: string
    customerName: string
    location: string
    service: string
    subcategory?: string
    description: string
    isFeatured: boolean
    completedDate: string
    status: string
    imageFile?: File
  }): Promise<ProjectData> {
    const projects = this.getRawProjects()
    
    // Handle image upload
    let imageId = ''
    if (projectData.imageFile) {
      try {
        imageId = await ImageStorage.storeImage(projectData.imageFile)
      } catch (error) {
        console.warn('Image storage failed:', error)
        // Continue without image
      }
    }

    const newProject: ProjectData = {
      id: `admin-${Date.now()}`,
      title: projectData.title,
      customerName: projectData.customerName,
      location: projectData.location,
      area: projectData.location,
      serviceName: projectData.subcategory 
        ? `${this.getServiceDisplayName(projectData.service)} - ${projectData.subcategory}`
        : this.getServiceDisplayName(projectData.service),
      category: projectData.service as any,
      description: projectData.description,
      thumbnail: imageId, // Store image ID, convert to URL when retrieving
      image: imageId,
      images: imageId ? [imageId] : [],
      isFeatured: projectData.isFeatured,
      featured: projectData.isFeatured,
      completedDate: projectData.completedDate,
      date: projectData.completedDate,
      status: projectData.status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    projects.unshift(newProject) // Add to beginning
    this.saveProjects(projects)
    
    return newProject
  }

  // Update project
  static async updateProject(id: string, projectData: Partial<{
    title: string
    customerName: string
    location: string
    service: string
    subcategory?: string
    description: string
    isFeatured: boolean
    completedDate: string
    status: string
    imageFile?: File
  }>): Promise<ProjectData | null> {
    const projects = this.getRawProjects()
    const index = projects.findIndex(p => p.id === id)
    
    if (index === -1) return null

    const existingProject = projects[index]
    
    // Handle image upload
    let imageId = existingProject.thumbnail // Keep existing image
    if (projectData.imageFile) {
      try {
        imageId = await ImageStorage.storeImage(projectData.imageFile)
      } catch (error) {
        console.warn('Image update failed:', error)
        // Keep existing image
      }
    }

    const updatedProject: ProjectData = {
      ...existingProject,
      ...(projectData.title && { title: projectData.title }),
      ...(projectData.customerName && { customerName: projectData.customerName }),
      ...(projectData.location && { location: projectData.location, area: projectData.location }),
      ...(projectData.service && { 
        category: projectData.service as any,
        serviceName: projectData.subcategory 
          ? `${this.getServiceDisplayName(projectData.service)} - ${projectData.subcategory}`
          : this.getServiceDisplayName(projectData.service)
      }),
      ...(projectData.description && { description: projectData.description }),
      ...(projectData.isFeatured !== undefined && { 
        isFeatured: projectData.isFeatured, 
        featured: projectData.isFeatured 
      }),
      ...(projectData.completedDate && { 
        completedDate: projectData.completedDate, 
        date: projectData.completedDate 
      }),
      ...(projectData.status && { status: projectData.status }),
      thumbnail: imageId,
      image: imageId,
      images: imageId ? [imageId] : existingProject.images,
      updatedAt: new Date().toISOString(),
    }

    projects[index] = updatedProject
    this.saveProjects(projects)
    
    return updatedProject
  }

  // Delete project
  static deleteProject(id: string): boolean {
    const projects = this.getRawProjects()
    const filteredProjects = projects.filter(p => p.id !== id)
    
    if (filteredProjects.length === projects.length) {
      return false // Project not found
    }

    this.saveProjects(filteredProjects)
    
    // Cleanup unused images
    const referencedImages = filteredProjects.flatMap(p => [p.thumbnail, p.image, ...(p.images || [])])
      .filter(Boolean) as string[]
    ImageStorage.cleanup(referencedImages)
    
    return true
  }

  // Get project categories
  static getProjectCategories(): string[] {
    const projects = this.getAllProjects()
    const categories = [...new Set(projects.map(p => p.category))]
    return categories.length > 0 ? categories : ['wallpapers', 'blinds', 'flooring']
  }

  // Get statistics
  static getStats() {
    const projects = this.getAllProjects()
    return {
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.isFeatured).length,
      wallpaperProjects: projects.filter(p => p.category === 'wallpapers').length,
      blindsProjects: projects.filter(p => p.category === 'blinds').length,
      flooringProjects: projects.filter(p => p.category === 'flooring').length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
    }
  }

  // Private helpers
  private static getRawProjects(): ProjectData[] {
    this.init()
    try {
      const projects = localStorage.getItem(ADMIN_PROJECTS_KEY)
      return projects ? JSON.parse(projects) : []
    } catch (error) {
      console.error('Error loading raw projects:', error)
      return []
    }
  }

  private static saveProjects(projects: ProjectData[]): void {
    try {
      localStorage.setItem(ADMIN_PROJECTS_KEY, JSON.stringify(projects))
    } catch (error) {
      console.error('Error saving projects:', error)
      throw new Error('Failed to save project data')
    }
  }

  private static getServiceDisplayName(service: string): string {
    const serviceMap: Record<string, string> = {
      'wallpapers': 'Wallpapers',
      'blinds': 'Window Blinds',
      'flooring': 'Flooring'
    }
    return serviceMap[service] || service
  }

  // Clear all data (for testing/reset)
  static clear(): void {
    localStorage.removeItem(ADMIN_PROJECTS_KEY)
    // Clear all images
    const keys = Object.keys(localStorage)
    keys.filter(key => key.startsWith('image_'))
         .forEach(key => localStorage.removeItem(key))
  }
}
