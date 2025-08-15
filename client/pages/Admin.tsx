import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Settings,
  BarChart3,
  Users,
  FolderOpen,
  Calendar,
  Star,
  Phone,
  Mail,
  LogOut,
} from "lucide-react";
import { SupabaseAdminService } from "@/lib/supabase-admin";
import { testSupabaseConnection, getAllProjects } from "@/lib/supabase-service";
import { isSupabaseConfigured } from "@/lib/supabase";
import { AdminAuth } from "@/components/ui/admin-auth";
import { SupabaseAdminUpload } from "@/components/ui/supabase-admin-upload";
import { SupabaseDebug } from "@/components/ui/supabase-debug";
import { SuccessMessage } from "@/components/ui/success-message";
import type { SupabaseProject } from "@/lib/supabase";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Supabase configuration check
  const [supabaseStatus, setSupabaseStatus] = useState<
    "loading" | "connected" | "error"
  >("loading");
  const [projects, setProjects] = useState<SupabaseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "projects" | "settings"
  >("overview");
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<SupabaseProject | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = localStorage.getItem("abww_admin_auth") === "true";
    setIsAuthenticated(isAuth);

    if (isAuth) {
      loadProjects();
      checkSupabaseStatus();
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

      if (isSupabaseConfigured()) {
        const supabaseProjects = await getAllProjects();
        console.log(
          `📊 Admin: Supabase returned ${supabaseProjects.length} projects`,
        );
        setProjects(supabaseProjects);
      } else {
        console.log("📊 Supabase not configured in admin");
        setProjects([]);
      }
    } catch (error) {
      console.error("Failed to load projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const checkSupabaseStatus = async () => {
    try {
      const result = await testSupabaseConnection();
      setSupabaseStatus(result.success ? "connected" : "error");
    } catch (error) {
      setSupabaseStatus("error");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleEdit = (project: SupabaseProject) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (projectId: number) => {
    if (
      confirm(
        "Are you sure you want to delete this project? This action cannot be undone.",
      )
    ) {
      try {
        setLoading(true);
        await SupabaseAdminService.deleteProject(projectId);
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
    featuredProjects: projects.filter((p) => p.is_featured).length,
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 sm:py-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <img
                  src="/ABWWW.png"
                  alt="AB Wall Wonders"
                  className="h-10 sm:h-12 w-auto"
                />
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Admin Portal
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Manage your projects and content
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                <div
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    supabaseStatus === "connected"
                      ? "bg-green-100 text-green-800"
                      : supabaseStatus === "error"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  <span className="hidden sm:inline">Supabase: </span>
                  {supabaseStatus === "connected"
                    ? "Connected"
                    : supabaseStatus === "error"
                      ? "Not Configured"
                      : "Checking..."}
                </div>
                <div className="flex space-x-2 w-full sm:w-auto">
                  <Button
                    onClick={() => window.open("/", "_blank")}
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                  >
                    <Eye className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">View Website</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:border-red-300 flex-1 sm:flex-none"
                  >
                    <LogOut className="w-4 h-4 sm:mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Exit</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-2 sm:space-x-8 overflow-x-auto scrollbar-hide">
              {[
                { id: "overview", label: "Overview", icon: BarChart3 },
                { id: "projects", label: "Projects", icon: FolderOpen },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-3 sm:px-1 py-3 sm:py-4 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4 mr-1 sm:mr-2" />
                  <span className="text-xs sm:text-sm">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          Total Projects
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          {stats.totalProjects}
                        </p>
                      </div>
                      <FolderOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          Featured Projects
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          {stats.featuredProjects}
                        </p>
                      </div>
                      <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          Completed
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          {stats.completedProjects}
                        </p>
                      </div>
                      <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-600">
                          Happy Customers
                        </p>
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          100+
                        </p>
                      </div>
                      <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
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
                  <div className="grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                    <div className="text-center p-3 sm:p-4 bg-blue-50 rounded-lg">
                      <p className="text-lg sm:text-2xl font-bold text-blue-600">
                        {stats.wallpaperProjects}
                      </p>
                      <p className="text-xs sm:text-sm text-blue-800">
                        Wallpaper Projects
                      </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-green-50 rounded-lg">
                      <p className="text-lg sm:text-2xl font-bold text-green-600">
                        {stats.blindsProjects}
                      </p>
                      <p className="text-xs sm:text-sm text-green-800">
                        Blinds Projects
                      </p>
                    </div>
                    <div className="text-center p-3 sm:p-4 bg-orange-50 rounded-lg">
                      <p className="text-lg sm:text-2xl font-bold text-orange-600">
                        {stats.flooringProjects}
                      </p>
                      <p className="text-xs sm:text-sm text-orange-800">
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
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <Button
                      onClick={() => setActiveTab("projects")}
                      className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
                    >
                      <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">Add Project</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => window.open("/", "_blank")}
                      className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
                    >
                      <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">View Website</span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() =>
                        window.open("https://supabase.com/dashboard", "_blank")
                      }
                      className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
                    >
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">
                        Supabase Console
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setActiveTab("settings")}
                      className="h-16 sm:h-20 flex flex-col space-y-1 sm:space-y-2"
                    >
                      <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-xs sm:text-sm">Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "projects" && (
            <div className="space-y-6">
              {/* Projects Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Projects Management
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    Manage your portfolio projects
                  </p>
                </div>
                <Button
                  onClick={() => setShowForm(true)}
                  className="w-full sm:w-auto"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
              </div>

              {/* Add/Edit Form */}
              {showForm && (
                <SupabaseAdminUpload
                  editingProject={editingProject || undefined}
                  onSuccess={() => {
                    showSuccessMessage(
                      editingProject
                        ? "Project updated successfully! ✨"
                        : "Project created successfully! 🎉",
                    );
                    resetForm();
                    loadProjects();
                  }}
                  onCancel={resetForm}
                />
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
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-gray-50 space-y-3 sm:space-y-0"
                        >
                          <div className="flex-1 w-full sm:w-auto">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                              <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                                {project.title}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {project.is_featured && (
                                  <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                    <Star className="w-3 h-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge variant="outline" className="text-xs">
                                  {project.service}
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {project.customer_name} • {project.location}
                            </p>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {project.description?.substring(0, 100)}...
                            </p>
                          </div>
                          <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEdit(project)}
                              className="flex-1 sm:flex-none"
                            >
                              <Edit className="w-4 h-4 sm:mr-1" />
                              <span className="hidden sm:inline">Edit</span>
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(project.id!)}
                              className="text-red-600 hover:text-red-700 flex-1 sm:flex-none"
                            >
                              <Trash2 className="w-4 h-4 sm:mr-1" />
                              <span className="hidden sm:inline">Delete</span>
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
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-medium">Supabase Console</h3>
                      <p className="text-sm text-gray-600">
                        Manage your Supabase project and database
                      </p>
                    </div>
                    <Button
                      onClick={() =>
                        window.open("https://supabase.com/dashboard", "_blank")
                      }
                      className="w-full sm:w-auto"
                    >
                      Open Console
                    </Button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex-1">
                      <h3 className="font-medium">Website Preview</h3>
                      <p className="text-sm text-gray-600">
                        View your live website
                      </p>
                    </div>
                    <Button
                      onClick={() => window.open("/", "_blank")}
                      variant="outline"
                      className="w-full sm:w-auto"
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base">
                          Phone
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 break-all">
                          +91 86887 23648
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="font-medium text-sm sm:text-base">
                          Email
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 break-all">
                          abwallwonders@gmail.com
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Supabase Debug Component */}
              <SupabaseDebug />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
