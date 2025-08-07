import { SanityProject } from '@/lib/sanity'

export interface ProjectData extends SanityProject {
  thumbnail?: string;
}

export type GalleryProject = ProjectData;

// Initial empty data array - will be populated from Sanity
export const projectsData: ProjectData[] = [];

export const featuredProjects: ProjectData[] = [];
