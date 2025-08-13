import React, { useState } from 'react';
import { Button } from './button';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Input } from './input';
import { Textarea } from './textarea';
import { Label } from './label';
import { Save, X, AlertCircle, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { FirebaseAdminService } from '@/lib/firebase-admin';
import type { CreateProjectData } from '@/lib/firebase-admin';

interface URLAdminUploadProps {
  onSuccess?: (projectId: string) => void;
  onCancel?: () => void;
  editingProject?: any;
}

export const URLAdminUpload: React.FC<URLAdminUploadProps> = ({
  onSuccess,
  onCancel,
  editingProject
}) => {
  const [loading, setLoading] = useState(false);
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
    beforeImageURL: editingProject?.beforeImageURL || '',
    afterImageURL: editingProject?.afterImageURL || '',
    additionalImageURLs: editingProject?.additionalImageURLs || [],
  });

  const [additionalImageURL, setAdditionalImageURL] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const addAdditionalImage = () => {
    if (additionalImageURL.trim()) {
      setFormData(prev => ({
        ...prev,
        imageURLs: [...(prev.imageURLs || []), additionalImageURL.trim()]
      }));
      setAdditionalImageURL('');
    }
  };

  const removeAdditionalImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      imageURLs: prev.imageURLs?.filter((_, i) => i !== index) || []
    }));
  };

  const testImageURL = (url: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let result: string;
      if (editingProject) {
        await FirebaseAdminService.updateProject(editingProject.id, formData);
        result = editingProject.id;
      } else {
        result = await FirebaseAdminService.createProject(formData);
      }
      
      // Success callback
      if (onSuccess) {
        onSuccess(result);
      }

    } catch (error: any) {
      console.error('Error saving project:', error);
      setError(error.message || 'Failed to save project');
    } finally {
      setLoading(false);
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

          {/* Main Image URL */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="imageURL">Main Project Image URL *</Label>
              <div className="flex space-x-2">
                <Input
                  id="imageURL"
                  name="imageURL"
                  value={formData.imageURL}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                  required
                  disabled={loading}
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => testImageURL(formData.imageURL)}
                  disabled={!formData.imageURL || loading}
                  size="sm"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enter a direct link to an image (jpg, png, gif, webp, etc.)
              </p>
            </div>

            {/* Additional Image URLs */}
            <div>
              <Label>Additional Images (Optional)</Label>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <Input
                    value={additionalImageURL}
                    onChange={(e) => setAdditionalImageURL(e.target.value)}
                    placeholder="https://example.com/additional-image.jpg"
                    disabled={loading}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addAdditionalImage}
                    disabled={!additionalImageURL.trim() || loading}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                
                {formData.imageURLs && formData.imageURLs.length > 0 && (
                  <div className="space-y-2">
                    <Label>Added Images:</Label>
                    {formData.imageURLs.map((url, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                        <span className="flex-1 text-sm truncate">{url}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => testImageURL(url)}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAdditionalImage(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
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

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Save className="w-4 h-4 mr-2 animate-pulse" />
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
