import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Upload, Save, X, AlertCircle } from 'lucide-react';
import { FirebaseAdminService } from '@/lib/firebase-admin';
import type { CreateProjectData } from '@/lib/firebase-admin';

interface FirebaseAdminUploadProps {
  onSuccess?: (projectId: string) => void;
  onCancel?: () => void;
  editingProject?: any;
}

export const FirebaseAdminUpload: React.FC<FirebaseAdminUploadProps> = ({
  onSuccess,
  onCancel,
  editingProject
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateProjectData>({
    title: editingProject?.title || '',
    customerName: editingProject?.customerName || '',
    location: editingProject?.location || '',
    service: editingProject?.service || 'wallpapers',
    subcategory: editingProject?.subcategory || '',
    description: editingProject?.description || '',
    isFeatured: editingProject?.isFeatured || false,
    completedDate: editingProject?.completedDate || new Date().toISOString().split('T')[0],
    status: editingProject?.status || 'completed',
  });

  const [mainImage, setMainImage] = useState<File | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handleAdditionalImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress for UI feedback
      setProgress(20);

      const projectData: CreateProjectData = {
        ...formData,
        imageFile: mainImage || undefined,
        imageFiles: additionalImages.length > 0 ? additionalImages : undefined,
      };

      setProgress(50);

      let result: string;
      if (editingProject) {
        await FirebaseAdminService.updateProject(editingProject.id, projectData);
        result = editingProject.id;
        setProgress(90);
      } else {
        result = await FirebaseAdminService.createProject(projectData);
        setProgress(90);
      }

      setProgress(100);
      
      // Success callback
      if (onSuccess) {
        onSuccess(result);
      }

    } catch (error: any) {
      console.error('Error saving project:', error);
      setError(error.message || 'Failed to save project');
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </CardTitle>
          {onCancel && (
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Modern Office Wallpaper Installation"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                placeholder="e.g., John Smith"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g., Downtown Business District"
                required
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="service">Service Category *</Label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                required
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary disabled:opacity-50"
              >
                <option value="wallpapers">Wallpapers</option>
                <option value="blinds">Blinds</option>
                <option value="flooring">Flooring</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="subcategory">Subcategory</Label>
              <Input
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleInputChange}
                placeholder="e.g., 3D Wallpaper, Roman Blinds"
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="completedDate">Completion Date *</Label>
              <Input
                id="completedDate"
                name="completedDate"
                type="date"
                value={formData.completedDate}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the project details, materials used, challenges overcome..."
              rows={4}
              required
              disabled={loading}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="mainImage">Main Project Image *</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="mainImage"
                  accept="image/*"
                  onChange={handleMainImageChange}
                  disabled={loading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90 disabled:opacity-50"
                />
              </div>
              {mainImage && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected: {mainImage.name}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="additionalImages">Additional Images (Optional)</Label>
              <div className="mt-2">
                <input
                  type="file"
                  id="additionalImages"
                  accept="image/*"
                  multiple
                  onChange={handleAdditionalImagesChange}
                  disabled={loading}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-secondary-foreground hover:file:bg-secondary/90 disabled:opacity-50"
                />
              </div>
              {additionalImages.length > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected {additionalImages.length} additional image(s)
                </p>
              )}
            </div>
          </div>

          {/* Project Settings */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                disabled={loading}
                className="rounded border-gray-300 text-primary focus:ring-primary disabled:opacity-50"
              />
              <Label htmlFor="isFeatured">
                Featured Project (show on homepage)
              </Label>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                disabled={loading}
                className="ml-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
              >
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planning">Planning</option>
              </select>
            </div>
          </div>

          {/* Progress Bar */}
          {loading && progress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Upload className="w-4 h-4 mr-2 animate-spin" />
                  {editingProject ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {editingProject ? 'Update Project' : 'Create Project'}
                </>
              )}
            </Button>
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
