import { Project } from "@/lib/types";

export interface ProjectData extends Project {
  thumbnail?: string;
}

export type GalleryProject = ProjectData;

// Empty arrays - all data comes from Supabase
export const projectsData: ProjectData[] = [];
export const featuredProjects: ProjectData[] = [];
