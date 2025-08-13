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
  beforeImageURL: string; // Before image URL
  afterImageURL: string; // After image URL
  additionalImageURLs?: string[]; // Additional image URLs
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
  if (!url || url.trim() === '') return false;

  // Allow placeholder
  if (url === '/placeholder.svg') return true;

  try {
    const urlObj = new URL(url);

    // Allow URLs with image extensions
    if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)) {
      return true;
    }

    // Allow URLs with query parameters (like Unsplash, CDN URLs)
    if (urlObj.search && /\.(jpg|jpeg|png|gif|bmp|webp|svg)/i.test(urlObj.search)) {
      return true;
    }

    // Allow common image hosting domains without extension requirement
    const allowedDomains = [
      'unsplash.com',
      'images.unsplash.com',
      'cdn.builder.io',
      'imgur.com',
      'i.imgur.com',
      'postimages.org',
      'imgbb.com',
      'cloudinary.com',
      'imagekit.io'
    ];

    if (allowedDomains.some(domain => urlObj.hostname.includes(domain))) {
      return true;
    }

    // For relative URLs starting with /
    if (url.startsWith('/')) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

// Create a new project with image URLs
export const createProject = async (projectData: Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase not configured. Please set up Firebase environment variables.');
  }
  
  // Validate before and after image URLs
  if (!validateImageURL(projectData.beforeImageURL)) {
    throw new Error('Invalid before image URL. Please provide a valid image URL.');
  }

  if (!validateImageURL(projectData.afterImageURL)) {
    throw new Error('Invalid after image URL. Please provide a valid image URL.');
  }

  // Validate additional image URLs if provided
  if (projectData.additionalImageURLs) {
    for (const url of projectData.additionalImageURLs) {
      if (!validateImageURL(url)) {
        throw new Error(`Invalid additional image URL: ${url}`);
      }
    }
  }
  
  try {
    const now = new Date().toISOString();
    const dataToSave = {
      ...projectData,
      createdAt: now,
      updatedAt: now,
    };

    console.log('💾 Saving to Firebase:', dataToSave);
    console.log('📁 Collection:', PROJECTS_COLLECTION);

    const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), dataToSave);
    console.log('✅ Document created with ID:', docRef.id);
    return docRef.id;
  } catch (error: any) {
    console.error('❌ Firebase error:', error);
    console.error('❌ Error code:', error.code);
    console.error('❌ Error message:', error.message);

    if (error.code === 'permission-denied') {
      throw new Error('Permission denied. Please check your Firestore security rules.');
    } else if (error.code === 'not-found') {
      throw new Error('Firestore database not found. Please ensure Firestore is enabled.');
    } else {
      throw new Error(`Failed to create project: ${error.message}`);
    }
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
  if (updates.beforeImageURL && !validateImageURL(updates.beforeImageURL)) {
    throw new Error('Invalid before image URL. Please provide a valid image URL.');
  }

  if (updates.afterImageURL && !validateImageURL(updates.afterImageURL)) {
    throw new Error('Invalid after image URL. Please provide a valid image URL.');
  }

  if (updates.additionalImageURLs) {
    for (const url of updates.additionalImageURLs) {
      if (!validateImageURL(url)) {
        throw new Error(`Invalid additional image URL: ${url}`);
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
