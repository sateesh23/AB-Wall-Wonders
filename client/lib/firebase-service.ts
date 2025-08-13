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
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage, isFirebaseConfigured } from './firebase';

// Types for Firebase
export interface FirebaseProject {
  id?: string;
  title: string;
  customerName: string;
  location: string;
  service: "wallpapers" | "blinds" | "flooring";
  subcategory?: string;
  description: string;
  imageURL: string;
  imageURLs?: string[];
  isFeatured: boolean;
  completedDate: string;
  status: "completed" | "in-progress" | "planning";
  createdAt: string;
  updatedAt: string;
}

// Collection reference
const PROJECTS_COLLECTION = 'projects';

// Upload image to Firebase Storage
export const uploadImage = async (file: File, path: string = 'images'): Promise<string> => {
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const storageRef = ref(storage, `${path}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

// Upload multiple images
export const uploadMultipleImages = async (files: File[], path: string = 'images'): Promise<string[]> => {
  try {
    const uploadPromises = files.map(file => uploadImage(file, path));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw new Error('Failed to upload images');
  }
};

// Delete image from Firebase Storage
export const deleteImage = async (imageURL: string): Promise<void> => {
  try {
    const imageRef = ref(storage, imageURL);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image');
  }
};

// Create a new project
export const createProject = async (projectData: Omit<FirebaseProject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
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
  try {
    // Get project data to delete associated images
    const project = await getProject(id);
    if (project?.imageURL) {
      await deleteImage(project.imageURL);
    }
    if (project?.imageURLs?.length) {
      await Promise.all(project.imageURLs.map(url => deleteImage(url)));
    }
    
    // Delete the document
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
