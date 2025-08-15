import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, Save, X, AlertCircle } from 'lucide-react';
import { SupabaseAdminService } from '@/lib/supabase-admin';
import type { CreateProjectData } from '@/lib/supabase-admin';

interface SupabaseAdminUploadProps {
  onSuccess?: (projectId: number) => void;
  editingProject?: any;
  onCancel?: () => void;
}

export const SupabaseAdminUpload: React.FC<SupabaseAdminUploadProps> = ({
  onSuccess,
  editingProject,
  onCancel
}) => {
  const [formData, setFormData] = useState<CreateProjectData>({
    title: editingProject?.title || '',
    customerName: editingProject?.customer_name || '',
    location: editingProject?.location || '',
    service: editingProject?.service || 'wallpapers',
    subcategory: editingProject?.subcategory || '',
    description: editingProject?.description || '',
    imageURL: editingProject?.image_url || '',
    imageURLs: editingProject?.image_urls || [''],
    isFeatured: editingProject?.is_featured || false,
    completedDate: editingProject?.completed_date || new Date().toISOString().split('T')[0],
    status: editingProject?.status || 'completed',
  });

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof CreateProjectData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleImageURLChange = (index: number, value: string) => {
    const newImageURLs = [...(formData.imageURLs || [])];
    newImageURLs[index] = value;
    setFormData(prev => ({ ...prev, imageURLs: newImageURLs }));
  };

  const addImageURL = () => {
    setFormData(prev => ({
      ...prev,
      imageURLs: [...(prev.imageURLs || []), '']
    }));
  };

  const removeImageURL = (index: number) => {
    const newImageURLs = [...(formData.imageURLs || [])];
    newImageURLs.splice(index, 1);
    setFormData(prev => ({ ...prev, imageURLs: newImageURLs }));
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return 'Title is required';
    if (!formData.customerName.trim()) return 'Customer name is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.subcategory.trim()) return 'Subcategory is required';
    if (!formData.imageURL.trim()) return 'Main image URL is required';
    if (!formData.completedDate) return 'Completed date is required';
    
    // Validate image URL format
    try {
      new URL(formData.imageURL);
    } catch {
      return 'Invalid main image URL format';
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setUploading(true);
    setProgress(10);
    setError(null);

    try {
      setProgress(30);
      
      let result: number;
      if (editingProject) {
        await SupabaseAdminService.updateProject(editingProject.id, formData);
        result = editingProject.id;
      } else {
        result = await SupabaseAdminService.createProject(formData);
        setProgress(90);
      }

      setProgress(100);
      
      setTimeout(() => {
        onSuccess?.(result);
        if (!editingProject) {
          // Reset form for new projects
          setFormData({
            title: '',
            customerName: '',
            location: '',
            service: 'wallpapers',
            subcategory: '',
            description: '',
            imageURL: '',
            imageURLs: [''],
            isFeatured: false,
            completedDate: new Date().toISOString().split('T')[0],
            status: 'completed',
          });
        }
      }, 500);

    } catch (err: any) {
      console.error('Upload error:', err);
      setError(err.message || 'Failed to save project');
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const subcategories = SupabaseAdminService.getSubcategories(formData.service);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </CardTitle>
        <CardDescription>
          {editingProject ? 'Update project details' : 'Add a new project to your portfolio using image URLs'}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Modern Office Wallpaper"
                disabled={uploading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChange('customerName', e.target.value)}
                placeholder="John Doe"
                disabled={uploading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Downtown Office"
                disabled={uploading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="completedDate">Completed Date *</Label>
              <Input
                id="completedDate"
                type="date"
                value={formData.completedDate}
                onChange={(e) => handleInputChange('completedDate', e.target.value)}
                disabled={uploading}
              />
            </div>
          </div>

          {/* Service & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)} disabled={uploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wallpapers">Wallpapers</SelectItem>
                  <SelectItem value="flooring">Flooring</SelectItem>
                  <SelectItem value="blinds">Blinds</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subcategory">Subcategory *</Label>
              <Select 
                value={formData.subcategory} 
                onValueChange={(value) => handleInputChange('subcategory', value)}
                disabled={uploading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>{sub}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Project Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)} disabled={uploading}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="planned">Planned</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Brief description of the project..."
              rows={3}
              disabled={uploading}
            />
          </div>

          {/* Main Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageURL">Main Image URL *</Label>
            <Input
              id="imageURL"
              value={formData.imageURL}
              onChange={(e) => handleInputChange('imageURL', e.target.value)}
              placeholder="https://example.com/image.jpg"
              disabled={uploading}
            />
            <p className="text-sm text-muted-foreground">
              Direct link to your main project image
            </p>
          </div>

          {/* Additional Image URLs */}
          <div className="space-y-2">
            <Label>Additional Images (Optional)</Label>
            {formData.imageURLs?.map((url, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageURLChange(index, e.target.value)}
                  placeholder="https://example.com/additional-image.jpg"
                  disabled={uploading}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeImageURL(index)}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addImageURL}
              disabled={uploading}
            >
              Add Image URL
            </Button>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) => handleInputChange('isFeatured', checked)}
              disabled={uploading}
            />
            <Label htmlFor="featured">Feature this project on homepage</Label>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {progress < 30 ? 'Validating...' : 
                 progress < 90 ? 'Saving project...' : 
                 'Almost done...'}
              </p>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button 
              type="submit" 
              disabled={uploading}
              className="flex items-center gap-2"
            >
              <Save className="h-4 w-4" />
              {uploading ? 'Saving...' : editingProject ? 'Update Project' : 'Save Project'}
            </Button>
            
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                disabled={uploading}
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

export default SupabaseAdminUpload;
