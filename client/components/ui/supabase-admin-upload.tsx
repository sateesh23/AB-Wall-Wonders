import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, Save, X, AlertCircle, FileImage } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { createProject, updateProject } from "@/lib/supabase-service";
import type { SupabaseProject } from "@/lib/supabase";

interface SupabaseAdminUploadProps {
  onSuccess?: (projectId: number) => void;
  editingProject?: SupabaseProject;
  onCancel?: () => void;
}

interface FormData {
  title: string;
  customerName: string;
  location: string;
  service: "wallpapers" | "flooring" | "blinds";
  subcategory: string;
  description: string;
  isFeatured: boolean;
  completedDate: string;
  status: "completed" | "in-progress" | "planned";
  beforeImage: File | null;
  afterImage: File | null;
}

export const SupabaseAdminUpload: React.FC<SupabaseAdminUploadProps> = ({
  onSuccess,
  editingProject,
  onCancel,
}) => {
  const [formData, setFormData] = useState<FormData>({
    title: editingProject?.title || "",
    customerName: editingProject?.customer_name || "",
    location: editingProject?.location || "",
    service: editingProject?.service || "wallpapers",
    subcategory: editingProject?.subcategory || "",
    description: editingProject?.description || "",
    isFeatured: editingProject?.is_featured || false,
    completedDate:
      editingProject?.completed_date || new Date().toISOString().split("T")[0],
    status: editingProject?.status || "completed",
    beforeImage: null,
    afterImage: null,
  });

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [beforeImagePreview, setBeforeImagePreview] = useState<string | null>(
    editingProject?.image_url || null,
  );
  const [afterImagePreview, setAfterImagePreview] = useState<string | null>(
    editingProject?.image_urls?.[0] || null,
  );

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleFileChange = (
    field: "beforeImage" | "afterImage",
    file: File | null,
  ) => {
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please select a valid image file (PNG, JPG, JPEG, or WebP)");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image file size must be less than 5MB");
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (field === "beforeImage") {
          setBeforeImagePreview(e.target?.result as string);
        } else {
          setAfterImagePreview(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    } else {
      if (field === "beforeImage") {
        setBeforeImagePreview(null);
      } else {
        setAfterImagePreview(null);
      }
    }

    setFormData((prev) => ({ ...prev, [field]: file }));
    if (error) setError(null);
  };

  const uploadImageToSupabase = async (
    file: File,
    fileName: string,
  ): Promise<string> => {
    if (!supabase) {
      throw new Error(
        "Supabase not configured. Please set up Supabase environment variables.",
      );
    }

    try {
      // Upload file to Supabase storage
      const { data, error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Supabase storage error:", error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (err: any) {
      console.error("Image upload error:", err);
      throw new Error(`Failed to upload image: ${err.message}`);
    }
  };

  const validateForm = (): string | null => {
    if (!formData.title.trim()) return "Title is required";
    if (!formData.customerName.trim()) return "Customer name is required";
    if (!formData.location.trim()) return "Location is required";
    if (!formData.subcategory.trim()) return "Subcategory is required";
    if (!formData.completedDate) return "Completed date is required";

    // For new projects, require both images
    if (!editingProject) {
      if (!formData.beforeImage) return "Before image is required";
      if (!formData.afterImage) return "After image is required";
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
    setProgress(5);
    setError(null);

    try {
      let beforeImageUrl = editingProject?.image_url || "";
      let afterImageUrl = editingProject?.image_urls?.[0] || "";

      // Upload before image if provided
      if (formData.beforeImage) {
        setProgress(20);
        const beforeFileName = `before_${Date.now()}_${formData.beforeImage.name}`;
        beforeImageUrl = await uploadImageToSupabase(
          formData.beforeImage,
          beforeFileName,
        );
        setProgress(40);
      }

      // Upload after image if provided
      if (formData.afterImage) {
        setProgress(60);
        const afterFileName = `after_${Date.now()}_${formData.afterImage.name}`;
        afterImageUrl = await uploadImageToSupabase(
          formData.afterImage,
          afterFileName,
        );
        setProgress(80);
      }

      // Prepare project data
      const projectData: Omit<
        SupabaseProject,
        "id" | "created_at" | "updated_at"
      > = {
        title: formData.title,
        customer_name: formData.customerName,
        location: formData.location,
        service: formData.service,
        subcategory: formData.subcategory,
        description: formData.description,
        image_url: beforeImageUrl, // Before image as main image
        image_urls: afterImageUrl ? [afterImageUrl] : [], // After image in array
        is_featured: formData.isFeatured,
        completed_date: formData.completedDate,
        status: formData.status,
      };

      setProgress(90);

      let result: number;
      if (editingProject) {
        await updateProject(editingProject.id!, projectData);
        result = editingProject.id!;
      } else {
        result = await createProject(projectData);
      }

      setProgress(100);

      setTimeout(() => {
        onSuccess?.(result);
        if (!editingProject) {
          // Reset form for new projects
          setFormData({
            title: "",
            customerName: "",
            location: "",
            service: "wallpapers",
            subcategory: "",
            description: "",
            isFeatured: false,
            completedDate: new Date().toISOString().split("T")[0],
            status: "completed",
            beforeImage: null,
            afterImage: null,
          });
          setBeforeImagePreview(null);
          setAfterImagePreview(null);
        }
      }, 500);
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to save project");
      setProgress(0);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          {editingProject ? "Edit Project" : "Add New Project"}
        </CardTitle>
        <CardDescription>
          {editingProject
            ? "Update project details and images"
            : "Add a new project with before/after images"}
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
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Modern Office Wallpaper"
                disabled={uploading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="customerName">Customer Name *</Label>
              <Input
                id="customerName"
                value={formData.customerName}
                onChange={(e) =>
                  handleInputChange("customerName", e.target.value)
                }
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
                onChange={(e) => handleInputChange("location", e.target.value)}
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
                onChange={(e) =>
                  handleInputChange("completedDate", e.target.value)
                }
                disabled={uploading}
              />
            </div>
          </div>

          {/* Service & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="service">Service *</Label>
              <Select
                value={formData.service}
                onValueChange={(value) => handleInputChange("service", value)}
                disabled={uploading}
              >
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
              <Input
                id="subcategory"
                value={formData.subcategory}
                onChange={(e) =>
                  handleInputChange("subcategory", e.target.value)
                }
                placeholder="e.g., 3D Wallpaper, Vinyl Flooring, Motorized Blinds"
                disabled={uploading}
              />
              <p className="text-xs text-muted-foreground">
                Enter the specific type or style of your service
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Project Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange("status", value)}
              disabled={uploading}
            >
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
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Brief description of the project..."
              rows={3}
              disabled={uploading}
            />
          </div>

          {/* Image Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Before Image */}
            <div className="space-y-2">
              <Label htmlFor="beforeImage">Before Image *</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                {beforeImagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={beforeImagePreview}
                      alt="Before preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileChange("beforeImage", null)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="beforeImage" className="cursor-pointer block">
                    <div className="flex flex-col items-center py-4">
                      <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Upload Before Image
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </span>
                    </div>
                    <Input
                      id="beforeImage"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) =>
                        handleFileChange(
                          "beforeImage",
                          e.target.files?.[0] || null,
                        )
                      }
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* After Image */}
            <div className="space-y-2">
              <Label htmlFor="afterImage">After Image *</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                {afterImagePreview ? (
                  <div className="space-y-2">
                    <img
                      src={afterImagePreview}
                      alt="After preview"
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleFileChange("afterImage", null)}
                      disabled={uploading}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                ) : (
                  <label htmlFor="afterImage" className="cursor-pointer block">
                    <div className="flex flex-col items-center py-4">
                      <FileImage className="h-8 w-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">
                        Upload After Image
                      </span>
                      <span className="text-xs text-muted-foreground">
                        PNG, JPG up to 5MB
                      </span>
                    </div>
                    <Input
                      id="afterImage"
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={(e) =>
                        handleFileChange(
                          "afterImage",
                          e.target.files?.[0] || null,
                        )
                      }
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={formData.isFeatured}
              onCheckedChange={(checked) =>
                handleInputChange("isFeatured", checked)
              }
              disabled={uploading}
            />
            <Label htmlFor="featured">Feature this project on homepage</Label>
          </div>

          {/* Progress Bar */}
          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-sm text-center text-muted-foreground">
                {progress < 20
                  ? "Validating..."
                  : progress < 40
                    ? "Uploading before image..."
                    : progress < 60
                      ? "Uploading after image..."
                      : progress < 90
                        ? "Saving project..."
                        : "Almost done..."}
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
              {uploading
                ? "Saving..."
                : editingProject
                  ? "Update Project"
                  : "Save Project"}
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
