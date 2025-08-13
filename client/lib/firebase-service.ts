import { 
  collection, 
  getDocs, 
  doc, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';

// Types for Firebase
export interface FirebaseProject {
  id?: string;
  title: string;
  customerName: string;
  location: string;
  service: "wallpapers" | "blinds" | "flooring";
  subcategory?: string;
  description: string;
  imageURL: string; // Main image URL
  imageURLs?: string[]; // Additional image URLs
  isFeatured: boolean;
  completedDate: string;
  status: "completed" | "in-progress" | "planning";
  createdAt: string;
  updatedAt: string;
}

// Collection reference
const PROJECTS_COLLECTION = 'projects';

// Validate image URL
export const validateImageURL = (url: string): boolean => {
  try {
    new URL(url);
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
  } catch {
    return false;
  }
};

// Create a new project with image URLs
export const createProject = async (projectData: Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase not configured. Please set up Firebase environment variables.');
  }
  
  // Validate main image URL
  if (!validateImageURL(projectData.imageURL)) {
    throw new Error('Invalid main image URL. Please provide a valid image URL.');
  }

  // Validate additional image URLs if provided
  if (projectData.imageURLs) {
    for (const url of projectData.imageURLs) {
      if (!validateImageURL(url)) {
        throw new Error(`Invalid image URL: ${url}`);
      }
    }
  }
  
  try {
    const now = new Date().toISOString();
    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
      ...projectData,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

// Get all projects
export const getAllProjects = async (): Promise<FirebaseProject[]> => {
  if (!isFirebaseConfigured() || !db) {
    // Return empty array for demo mode
    return [];
  }
  
  try {
    const querySnapshot = await getDocs(
      query(collection(db, PROJECTS_COLLECTION), orderBy('completedDate', 'desc'))
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProject[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
};

// Get featured projects
export const getFeaturedProjects = async (): Promise<FirebaseProject[]> => {
  if (!isFirebaseConfigured() || !db) {
    return [];
  }
  
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, PROJECTS_COLLECTION), 
        where('isFeatured', '==', true),
        orderBy('completedDate', 'desc')
      )
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProject[];
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    return [];
  }
};

// Get recent projects
export const getRecentProjects = async (limitCount: number = 6): Promise<FirebaseProject[]> => {
  if (!isFirebaseConfigured() || !db) {
    return [];
  }
  
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, PROJECTS_COLLECTION), 
        orderBy('completedDate', 'desc'),
        limit(limitCount)
      )
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProject[];
  } catch (error) {
    console.error('Error fetching recent projects:', error);
    return [];
  }
};

// Get projects by service
export const getProjectsByService = async (service: string): Promise<FirebaseProject[]> => {
  if (!isFirebaseConfigured() || !db) {
    return [];
  }
  
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, PROJECTS_COLLECTION), 
        where('service', '==', service),
        orderBy('completedDate', 'desc')
      )
    );
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseProject[];
  } catch (error) {
    console.error('Error fetching projects by service:', error);
    return [];
  }
};

// Get single project
export const getProject = async (id: string): Promise<FirebaseProject | null> => {
  if (!isFirebaseConfigured() || !db) {
    return null;
  }
  
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as FirebaseProject;
    }
    return null;
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
};

// Update project
export const updateProject = async (id: string, updates: Partial<FirebaseProject>): Promise<void> => {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase not configured. Please set up Firebase environment variables.');
  }
  
  // Validate image URLs if being updated
  if (updates.imageURL && !validateImageURL(updates.imageURL)) {
    throw new Error('Invalid main image URL. Please provide a valid image URL.');
  }

  if (updates.imageURLs) {
    for (const url of updates.imageURLs) {
      if (!validateImageURL(url)) {
        throw new Error(`Invalid image URL: ${url}`);
      }
    }
  }
  
  try {
    const docRef = doc(db, PROJECTS_COLLECTION, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

// Delete project
export const deleteProject = async (id: string): Promise<void> => {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase not configured. Please set up Firebase environment variables.');
  }
  
  try {
    await deleteDoc(doc(db, PROJECTS_COLLECTION, id));
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

// Test Firebase connection
export const testFirebaseConnection = async (): Promise<{
  success: boolean;
  error?: string;
  projectId?: string;
  environment?: string;
}> => {
  if (!isFirebaseConfigured()) {
    return {
      success: false,
      error: 'Firebase not configured',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'not-set',
      environment: import.meta.env.DEV ? 'development' : 'production',
    };
  }

  if (!db) {
    return {
      success: false,
      error: 'Firebase database not initialized',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      environment: import.meta.env.DEV ? 'development' : 'production',
    };
  }
  
  try {
    // Try to fetch a small amount of data to test connection
    const querySnapshot = await getDocs(
      query(collection(db, PROJECTS_COLLECTION), limit(1))
    );
    
    return {
      success: true,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      environment: import.meta.env.DEV ? 'development' : 'production',
    };
  } catch (error: any) {
    console.warn('Firebase connection issue:', error.message);
    
    return {
      success: false,
      error: error.message || 'Connection failed',
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      environment: import.meta.env.DEV ? 'development' : 'production',
    };
  }
};
