import { client, projectsQuery, featuredProjectsQuery, recentProjectsQuery, SanityProject, urlFor, testSanityConnection } from './sanity'
import type { ProjectData } from './types'
import { AdminStorage } from './admin-storage'

export class SanityService {
  // Connection state
  private static connectionTested = false
  private static isConnected = false
  private static connectionError: string | null = null

  // Test connection once and cache result
  private static async ensureConnection(): Promise<boolean> {
    if (this.connectionTested) {
      return this.isConnected
    }

    const result = await testSanityConnection()
    this.connectionTested = true
    this.isConnected = result.success
    this.connectionError = result.error || null

    if (result.success) {
      console.log('✅ Sanity connection successful!')
    } else {
      console.log('⚠️ No Sanity data available. Projects will be empty until added through admin panel.')
    }

    return this.isConnected
  }

  // Get all projects - Sanity + Admin Storage
  static async getAllProjects(): Promise<ProjectData[]> {
    const isConnected = await this.ensureConnection()

    // Get admin storage projects (always available)
    const adminProjects = AdminStorage.getAllProjects()

    if (!isConnected) {
      console.log(`📄 Using admin storage (${adminProjects.length} projects)`)
      return adminProjects
    }

    try {
      const projects: SanityProject[] = await client.fetch(projectsQuery)
      const sanityProjects = projects.map(this.convertToProjectData)

      // Combine Sanity and admin projects (remove duplicates by title)
      const combined = [...sanityProjects]
      adminProjects.forEach(adminProject => {
        if (!combined.find(p => p.title === adminProject.title)) {
          combined.push(adminProject)
        }
      })

      console.log(`✅ Loaded ${sanityProjects.length} from Sanity + ${adminProjects.length} from admin storage`)
      return combined.sort((a, b) => new Date(b.completedDate || '').getTime() - new Date(a.completedDate || '').getTime())
    } catch (error) {
      console.error('❌ Error fetching projects from Sanity:', error)
      console.log(`📄 Using admin storage (${adminProjects.length} projects)`)
      return adminProjects
    }
  }

  // Get featured projects - Sanity + Admin Storage
  static async getFeaturedProjects(): Promise<ProjectData[]> {
    const allProjects = await this.getAllProjects()
    return allProjects.filter(p => p.isFeatured)
  }

  // Get recent projects - Sanity + Admin Storage
  static async getRecentProjects(limit: number = 6): Promise<ProjectData[]> {
    const allProjects = await this.getAllProjects()
    return allProjects.slice(0, limit)
  }

  // Convert Sanity project to ProjectData format
  private static convertToProjectData(sanityProject: SanityProject): ProjectData {
    return {
      id: sanityProject._id,
      title: sanityProject.title,
      customerName: sanityProject.customerName,
      location: sanityProject.location,
      area: sanityProject.location,
      serviceName: this.getServiceName(sanityProject.service, sanityProject.subcategory),
      category: sanityProject.service,
      description: sanityProject.description,
      thumbnail: sanityProject.image ? urlFor(sanityProject.image) : '/placeholder.svg',
      image: sanityProject.image ? urlFor(sanityProject.image) : '/placeholder.svg',
      images: sanityProject.images ? sanityProject.images.map(img => urlFor(img)) : [],
      isFeatured: sanityProject.isFeatured,
      featured: sanityProject.isFeatured,
      completedDate: sanityProject.completedDate,
      date: sanityProject.completedDate,
      status: sanityProject.status,
      createdAt: sanityProject._createdAt,
      updatedAt: sanityProject._updatedAt,
    }
  }

  // Helper to format service name
  private static getServiceName(service: string, subcategory?: string): string {
    const serviceMap: Record<string, string> = {
      'wallpapers': 'Wallpapers',
      'blinds': 'Window Blinds',
      'flooring': 'Flooring'
    }
    
    const serviceName = serviceMap[service] || service
    return subcategory ? `${serviceName} - ${subcategory}` : serviceName
  }

  // Get project categories
  static async getProjectCategories(): Promise<string[]> {
    const isConnected = await this.ensureConnection()
    
    if (!isConnected) {
      return []
    }

    try {
      const projects: SanityProject[] = await client.fetch(projectsQuery)
      
      if (projects.length === 0) {
        return [] 
      }

      const categories = [...new Set(projects.map(p => p.service))]
      return categories
    } catch (error) {
      console.error('❌ Error fetching project categories from Sanity:', error)
      return []
    }
  }

  // Test connection with detailed info
  static async testConnection(): Promise<{
    connected: boolean
    projectCount?: number
    error?: string
    isDemo?: boolean
  }> {
    const isConnected = await this.ensureConnection()
    const adminStats = AdminStorage.getStats()

    if (!isConnected) {
      return {
        connected: false,
        error: this.connectionError || 'Using local storage',
        isDemo: false,
        projectCount: adminStats.totalProjects
      }
    }

    try {
      const sanityCount = await client.fetch('count(*[_type == "project"])')
      const totalCount = sanityCount + adminStats.totalProjects
      return {
        connected: true,
        projectCount: totalCount,
        isDemo: false
      }
    } catch (error: any) {
      return {
        connected: false,
        error: error.message,
        isDemo: false,
        projectCount: adminStats.totalProjects
      }
    }
  }

  // Check if properly configured
  static isConfigured(): boolean {
    return !!(client.config().projectId && client.config().projectId !== 'your-project-id')
  }

  // Create a new project (try Sanity, fallback to admin storage)
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
  }): Promise<any> {
    const isConnected = await this.ensureConnection()

    // Try Sanity first if connected
    if (isConnected && this.isConfigured()) {
      try {
        let imageAsset = null

        // Upload image if provided
        if (projectData.imageFile) {
          console.log('📤 Uploading image to Sanity...')
          imageAsset = await client.assets.upload('image', projectData.imageFile, {
            filename: projectData.imageFile.name,
          })
          console.log('✅ Image uploaded successfully to Sanity')
        }

        const doc = {
          _type: 'project',
          title: projectData.title,
          customerName: projectData.customerName,
          location: projectData.location,
          service: projectData.service,
          subcategory: projectData.subcategory,
          description: projectData.description,
          isFeatured: projectData.isFeatured,
          completedDate: projectData.completedDate,
          status: projectData.status,
          ...(imageAsset && {
            image: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAsset._id,
              },
            },
          }),
        }

        console.log('📝 Creating project in Sanity...')
        const result = await client.create(doc)
        console.log('✅ Project created successfully in Sanity:', result._id)

        // Reset connection cache to force refresh
        this.connectionTested = false

        return result
      } catch (error) {
        console.warn('❌ Sanity creation failed, using admin storage fallback:', error.message)
        // Fall through to admin storage
      }
    }

    // Use admin storage (either because Sanity failed or not connected)
    try {
      console.log('📝 Creating project in admin storage...')
      const result = await AdminStorage.createProject(projectData)
      console.log('✅ Project created successfully in admin storage')
      return { _id: result.id, ...result }
    } catch (error) {
      console.error('❌ Error creating project in admin storage:', error)
      throw new Error(`Failed to create project: ${error.message}`)
    }
  }

  // Update a project (try Sanity, fallback to admin storage)
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
  }>): Promise<any> {
    const isConnected = await this.ensureConnection()

    // Try Sanity first if connected
    if (isConnected && this.isConfigured()) {
      try {
        let updateData: any = { ...projectData }
        delete updateData.imageFile

        // Upload new image if provided
        if (projectData.imageFile) {
          console.log('📤 Uploading new image to Sanity...')
          const imageAsset = await client.assets.upload('image', projectData.imageFile, {
            filename: projectData.imageFile.name,
          })

          updateData.image = {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: imageAsset._id,
            },
          }
          console.log('✅ New image uploaded successfully to Sanity')
        }

        console.log('📝 Updating project in Sanity...')
        const result = await client
          .patch(id)
          .set(updateData)
          .commit()

        console.log('✅ Project updated successfully in Sanity')

        // Reset connection cache to force refresh
        this.connectionTested = false

        return result
      } catch (error) {
        console.warn('❌ Sanity update failed, using admin storage fallback:', error.message)
        // Fall through to admin storage
      }
    }

    // Use admin storage
    try {
      console.log('📝 Updating project in admin storage...')
      const result = await AdminStorage.updateProject(id, projectData)
      if (!result) {
        throw new Error('Project not found')
      }
      console.log('✅ Project updated successfully in admin storage')
      return { _id: result.id, ...result }
    } catch (error) {
      console.error('❌ Error updating project in admin storage:', error)
      throw new Error(`Failed to update project: ${error.message}`)
    }
  }

  // Delete a project (try Sanity, fallback to admin storage)
  static async deleteProject(id: string): Promise<void> {
    const isConnected = await this.ensureConnection()

    // Try Sanity first if connected
    if (isConnected && this.isConfigured()) {
      try {
        console.log('🗑️ Deleting project from Sanity...')
        await client.delete(id)
        console.log('✅ Project deleted successfully from Sanity')

        // Reset connection cache to force refresh
        this.connectionTested = false
        return
      } catch (error) {
        console.warn('❌ Sanity deletion failed, using admin storage fallback:', error.message)
        // Fall through to admin storage
      }
    }

    // Use admin storage
    try {
      console.log('🗑️ Deleting project from admin storage...')
      const success = AdminStorage.deleteProject(id)
      if (!success) {
        throw new Error('Project not found')
      }
      console.log('✅ Project deleted successfully from admin storage')
    } catch (error) {
      console.error('❌ Error deleting project from admin storage:', error)
      throw new Error(`Failed to delete project: ${error.message}`)
    }
  }

  // Force refresh connection (useful after CRUD operations)
  static forceRefresh(): void {
    this.connectionTested = false
  }
}
