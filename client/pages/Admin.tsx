import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  Settings,
  BarChart3,
  Users,
  FolderOpen,
  Calendar,
  Star,
  MapPin,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";
import { FirebaseAdminService } from "@/lib/firebase-admin";
import { testFirebaseConnection } from "@/lib/firebase-service";
import { AdminAuth } from "@/components/ui/admin-auth";
import { ImageUpload } from "@/components/ui/image-upload";
import { SuccessMessage } from "@/components/ui/success-message";
import type { ProjectData } from "@/lib/types";

interface ProjectForm {
  title: string;
  customerName: string;
  location: string;
  service: "wallpapers" | "blinds" | "flooring" | "";
  subcategory: string;
  description: string;
  isFeatured: boolean;
  completedDate: string;
  status: "completed" | "in-progress" | "planning";
  imageFile: File | undefined;
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Firebase configuration check
  const [firebaseStatus, setFirebaseStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "settings"
  >("overview");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectData | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ProjectForm>({
    title: "",
    customerName: "",
    location: "",
    service: "",
    subcategory: "",
    description: "",
    isFeatured: false,
    completedDate: "",
    status: "completed",
    imageFile: undefined,
  });

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem("abww_admin_auth") === "true";
    setIsAuthenticated(isAuth);

    if (isAuth) {
      loadProjects();
      checkFirebaseStatus();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("abww_admin_auth");
    setIsAuthenticated(false);
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setShowSuccess(true);
  };

  const loadProjects = async () => {
    try {
      setLoading(true);
      // For now, use static data since Firebase isn't configured yet
      const { projectsData } = await import('@/data/projects-data');
      setProjects(projectsData);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkFirebaseStatus = async () => {
    try {
      const result = await testFirebaseConnection();
      setFirebaseStatus(result.success ? 'connected' : 'error');
    } catch (error) {
      setFirebaseStatus('error');
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const projectData = {
        title: formData.title,
        customerName: formData.customerName,
        location: formData.location,
        service: formData.service,
        subcategory: formData.subcategory,
        description: formData.description,
        isFeatured: formData.isFeatured,
        completedDate: formData.completedDate,
        status: formData.status,
        imageFile: formData.imageFile,
      };

      if (editingProject) {
        // Update existing project
        await FirebaseAdminService.updateProject(
          String(editingProject.id),
          projectData,
        );
        showSuccessMessage("Project updated successfully! ✨");
      } else {
        // Create new project
        await FirebaseAdminService.createProject(projectData);
        showSuccessMessage("Project created successfully! 🎉");
      }

      // Reload projects
      await loadProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert(
        `Failed to save project: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      customerName: "",
      location: "",
      service: "",
      subcategory: "",
      description: "",
      isFeatured: false,
      completedDate: "",
      status: "completed",
      imageFile: undefined,
    });
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: ProjectData) => {
    setEditingProject(project);
    setFormData({
      title: project.title || "",
      customerName: project.customerName || "",
      location: project.location || "",
      service: project.service || "",
      subcategory: project.subcategory || "",
      description: project.description || "",
      isFeatured: project.isFeatured || false,
      completedDate: project.completedDate || "",
      status: project.status || "completed",
      imageFile: undefined,
    });
    setShowForm(true);
  };

  const handleDelete = async (projectId: string) => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      try {
        setLoading(true);
        await FirebaseAdminService.deleteProject(projectId);
        showSuccessMessage("Project deleted successfully! 🗑️");
        // Reload projects
        await loadProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert(
          `Failed to delete project: ${error instanceof Error ? error.message : "Unknown error"}`,
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const stats = {
    totalProjects: projects.length,
    featuredProjects: projects.filter((p) => p.isFeatured).length,
    wallpaperProjects: projects.filter((p) => p.service === "wallpapers")
      .length,
    blindsProjects: projects.filter((p) => p.service === "blinds").length,
    flooringProjects: projects.filter((p) => p.service === "flooring").length,
    completedProjects: projects.filter((p) => p.status === "completed").length,
  };

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <SuccessMessage
        message={successMessage}
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-4">
                <img
                  src="/ABWWW.png"
                  alt="AB Wall Wonders"
                  className="h-12 w-auto"
                />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Portal
                  </h1>
                  <p className="text-sm text-gray-500">
                    Manage your projects and content
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  firebaseStatus === 'connected' ? 'bg-green-100 text-green-800' :
                  firebaseStatus === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  Firebase: {firebaseStatus === 'connected' ? 'Connected' :
                           firebaseStatus === 'error' ? 'Not Configured' : 'Checking...'}
                </div>
                <Button
                  onClick={() => window.open("/", "_blank")}
                  variant="outline"
                  size="sm"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Website
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:border-red-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: FolderOpen },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          Total Projects
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.totalProjects}
                        </p>
                      </div>
                      <FolderOpen className="h-8 w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          Featured Projects
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.featuredProjects}
                        </p>
                      </div>
                      <Star className="h-8 w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          Completed
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {stats.completedProjects}
                        </p>
                      </div>
                      <Calendar className="h-8 w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">
                          Happy Customers
                        </p>
                        <p className="text-2xl font-bold text-gray-900">100+</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Service Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Service Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">
                        {stats.wallpaperProjects}
                      </p>
                      <p className="text-sm text-blue-800">
                        Wallpaper Projects
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <p className="text-2xl font-bold text-green-600">
                        {stats.blindsProjects}
                      </p>
                      <p className="text-sm text-green-800">Blinds Projects</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">
                        {stats.flooringProjects}
                      </p>
                      <p className="text-sm text-orange-800">
                        Flooring Projects
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button
                      onClick={() => setActiveTab("projects")}
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Plus className="w-6 h-6" />
                      <span>Add Project</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open("/", "_blank")}
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Eye className="w-6 h-6" />
                      <span>View Website</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => alert('Firebase Console: Configure your Firebase project in the environment variables')}
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Settings className="w-6 h-6" />
                      <span>Firebase Console</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("settings")}
                      className="h-20 flex flex-col space-y-2"
                    >
                      <Settings className="w-6 h-6" />
                      <span>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Projects Header */}
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Projects Management
                  </h2>
                  <p className="text-gray-600">
                    Manage your portfolio projects
                  </p>
                </div>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </div>

              {/* Add/Edit Form */}
              {showForm && (
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>
                        {editingProject ? "Edit Project" : "Add New Project"}
                      </CardTitle>
                      <Button variant="ghost" size="sm" onClick={resetForm}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Project Name *</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            placeholder="e.g., Modern Bedroom Wallpaper"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="customerName">Customer Name *</Label>
                          <Input
                            id="customerName"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="e.g., Rajesh Kumar"
                            required
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
                            placeholder="e.g., Vijayawada, Benz Circle"
                            required
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          >
                            <option value="">Select service</option>
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
                          />
                        </div>
                        <div>
                          <Label htmlFor="completedDate">
                            Completion Date *
                          </Label>
                          <Input
                            id="completedDate"
                            name="completedDate"
                            type="date"
                            value={formData.completedDate}
                            onChange={handleInputChange}
                            required
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
                        />
                      </div>

                      <div>
                        <Label>Project Image *</Label>
                        <ImageUpload
                          onImageChange={(file) =>
                            setFormData((prev) => ({
                              ...prev,
                              imageFile: file,
                            }))
                          }
                          currentImage={editingProject?.imageURL}
                        />
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="isFeatured"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleInputChange}
                            className="rounded border-gray-300 text-primary focus:ring-primary"
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
                            className="ml-2 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                          >
                            <option value="completed">Completed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="planning">Planning</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <Button type="submit">
                          <Save className="w-4 h-4 mr-2" />
                          {editingProject ? "Update Project" : "Create Project"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={resetForm}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}

              {/* Projects List */}
              <Card>
                <CardHeader>
                  <CardTitle>All Projects ({projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Loading projects...</p>
                    </div>
                  ) : projects.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        No projects found. Add your first project!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <h3 className="font-medium text-gray-900">
                                {project.title}
                              </h3>
                              {project.isFeatured && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  <Star className="w-3 h-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                              <Badge variant="outline">
                                {project.service}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {project.customerName} • {project.location}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {project.description?.substring(0, 100)}...
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(project)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(String(project.id))}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>CMS Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Firebase Console</h3>
                      <p className="text-sm text-gray-600">
                        Manage your Firebase project and database
                      </p>
                    </div>
                    <Button
                      onClick={() => window.open('https://console.firebase.google.com/', '_blank')}
                    >
                      Open Console
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Website Preview</h3>
                      <p className="text-sm text-gray-600">
                        View your live website
                      </p>
                    </div>
                    <Button
                      onClick={() => window.open("/", "_blank")}
                      variant="outline"
                    >
                      View Website
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-gray-600">+91 86887 23648</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">
                          abwallwonders@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
