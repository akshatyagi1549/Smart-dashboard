import React, { useState, useEffect } from "react";
import {
  FolderOpen,
  Plus,
  Calendar,
  Target,
  TrendingUp,
  CheckCircle,
  Clock,
  BarChart3,
  BookOpen,
} from "lucide-react";
import { useDashboard } from "../../contexts/DashboardContext";
import { CreateProject } from "../CreateProject";

export function ProjectMonitoring() {
  const { projects, tasks, updateTask } = useDashboard();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);

  useEffect(() => {
    const storedAnswers = localStorage.getItem("userAnswers");
    if (storedAnswers) {
      const parsed = JSON.parse(storedAnswers);
      if (parsed.projectMonitoringFeatures) {
        setSelectedFeatures(parsed.projectMonitoringFeatures);
      }
    }
  }, []);

  const handleGenerateReport = () => {
    const reportData = {
      totalProjects: projects.length,
      activeProjects: projects.filter((p) => p.status === "active").length,
      completedProjects: projects.filter((p) => p.status === "completed").length,
      totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
      totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
      avgProgress: Math.round(
        projects.reduce((sum, p) => sum + p.progress, 0) / projects.length
      ),
      generatedAt: new Date().toLocaleString(),
    };

    const htmlContent = `<html><body><h1>Project Monitoring Report</h1><pre>${JSON.stringify(
      reportData,
      null,
      2
    )}</pre></body></html>`;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project-report.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleKnowledgeHub = () => {
    window.history.pushState({ module: "projects" }, "", window.location.href);
    localStorage.setItem("activeModule", "knowledge");
    window.location.reload();
  };

  const stats = [
    {
      label: "Active Projects",
      value: projects.filter((p: any) => p.status === "active").length.toString(),
      icon: FolderOpen,
      color: "text-blue-600",
    },
    {
      label: "Total Budget",
      value: `₹${(
        projects.reduce((sum: number, p: any) => sum + p.budget, 0) / 100000
      ).toFixed(1)}L`,
      icon: Target,
      color: "text-green-600",
    },
    {
      label: "Avg. Progress",
      value: `${Math.round(
        projects.reduce((sum: number, p: any) => sum + p.progress, 0) /
          projects.length
      )}%`,
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "on-hold":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500";
    if (progress >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  const projectTasks = selectedProject
    ? tasks.filter((t: any) => t.project === selectedProject)
    : [];

  if (showCreate) {
    return <CreateProject onBack={() => setShowCreate(false)} />;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Project Monitoring
            </h1>
            <p className="text-gray-600">
              Track project progress and manage resources
            </p>
          </div>

          <div className="flex gap-3">
            {/* Quick Action Add Button */}
            {selectedFeatures.includes("Active Projects") && (
              <button
                onClick={() => setShowCreate(true)}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Projects
              </button>
            )}

            {selectedFeatures.includes("Knowledge Hub") && (
              <button
                onClick={handleKnowledgeHub}
                className="bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                Knowledge Hub
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      {selectedFeatures.includes("Active Projects") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </h3>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects Section */}
        {selectedFeatures.includes("Active Projects") && (
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Active Projects
                </h2>
              </div>
              <div className="p-6 space-y-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`border rounded-lg p-6 cursor-pointer transition-all ${
                      selectedProject === project.name
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setSelectedProject(
                        selectedProject === project.name ? null : project.name
                      )
                    }
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {project.name}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                              project.status
                            )}`}
                          >
                            {project.status}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {project.startDate} - {project.endDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            ₹{(project.budget / 100000).toFixed(1)}L budget
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {project.progress}%
                        </div>
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className={`${getProgressColor(
                              project.progress
                            )} h-2 rounded-full transition-all duration-300`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {selectedProject === project.name && (
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">
                          Project Tasks
                        </h4>
                        <div className="space-y-3">
                          {projectTasks.map((task) => (
                            <div
                              key={task.id}
                              className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  updateTask(task.id, {
                                    status:
                                      task.status === "completed"
                                        ? "pending"
                                        : "completed",
                                  });
                                }}
                                className={`p-1 rounded-full ${
                                  task.status === "completed"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                                }`}
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <div className="flex-1">
                                <h5
                                  className={`font-medium ${
                                    task.status === "completed"
                                      ? "text-gray-500 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {task.title}
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {task.description}
                                </p>
                              </div>
                              <div className="text-right">
                                <span
                                  className={`px-2 py-1 text-xs rounded-full ${
                                    task.priority === "high"
                                      ? "bg-red-100 text-red-800"
                                      : task.priority === "medium"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {task.priority}
                                </span>
                                <div className="text-xs text-gray-500 mt-1">
                                  Due: {task.dueDate}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Health */}
          {selectedFeatures.includes("Project Health") && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">
                  Project Health
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">On Track</p>
                    <p className="text-sm text-gray-600">
                      2 projects ahead of schedule
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-gray-900">Needs Attention</p>
                    <p className="text-sm text-gray-600">
                      1 project behind schedule
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">
                      Resource Allocation
                    </p>
                    <p className="text-sm text-gray-600">
                      Balanced across all projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Impact Metrics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">
                Impact Metrics
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-900">12,450</div>
                <div className="text-sm text-blue-700">Beneficiaries Reached</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900">45</div>
                <div className="text-sm text-green-700">Villages Covered</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-900">92%</div>
                <div className="text-sm text-purple-700">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Quick Actions - Always Visible */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6 space-y-3">
              <button
                onClick={handleGenerateReport}
                className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Generate Report
              </button>
              <button
                onClick={() => alert("Schedule Review clicked")}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Schedule Review
              </button>
              <button
                onClick={() => alert("Update Timeline clicked")}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                Update Timeline
              </button>
              <button
                onClick={() => alert("Export Data clicked")}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
