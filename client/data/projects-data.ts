import { Project, ProjectData as BaseProjectData } from "@/lib/types";

export interface ProjectData extends Project {
  thumbnail?: string;
}

export interface GalleryProject extends BaseProjectData {
  thumbnail?: string;
  aspectRatio?: "square" | "landscape" | "portrait" | "wide";
}

// Empty arrays - all data comes from Supabase
export const projectsData: ProjectData[] = [];
export const featuredProjects: ProjectData[] = [];
