import React, { useState } from 'react';
import { ArrowLeft, FolderOpen, CheckCircle } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function UpdateProject() {
  const { projects, updateProject } = useDashboard();
  const [formData, setFormData] = useState({
    projectId: '',
    status: 'active',
    progress: '',
    milestone: '',
    budget: '',
    spent: '',
    notes: '',
    nextSteps: ''
  });

  const selectedProject = projects.find(p => p.id === formData.projectId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProject(formData.projectId, {
      status: formData.status as 'active' | 'completed' | 'on-hold',
      progress: parseInt(formData.progress),
      budget: parseFloat(formData.budget) || selectedProject?.budget,
      spent: parseFloat(formData.spent) || selectedProject?.spent
    });
    alert('Project updated successfully!');
    setTimeout(() => {
      localStorage.setItem('activeModule', 'projects');
      window.location.href = '/';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => window.location.href = '/'} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FolderOpen className="w-8 h-8 text-orange-500" />
              Update Project
            </h1>
            <p className="text-gray-600">Update project status, progress, and details</p>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-orange-900 mb-3">Update Guidelines</h2>
          <ul className="text-orange-800 space-y-2 text-sm">
            <li>• Select the project you want to update from the dropdown</li>
            <li>• Update progress percentage based on completed milestones</li>
            <li>• Change status to reflect current project state</li>
            <li>• Add notes about recent developments or challenges</li>
            <li>• Regular updates help in better project monitoring</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Project *</label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Choose a project to update</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>

            {selectedProject && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Current Project Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                      selectedProject.status === 'active' ? 'bg-green-100 text-green-800' :
                      selectedProject.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedProject.status}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Progress:</span>
                    <span className="ml-2 font-medium">{selectedProject.progress}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Budget:</span>
                    <span className="ml-2 font-medium">₹{(selectedProject.budget / 100000).toFixed(1)}L</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Spent:</span>
                    <span className="ml-2 font-medium">₹{(selectedProject.spent / 100000).toFixed(1)}L</span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Progress Percentage (%) *</label>
              <input
                type="number"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                min="0"
                max="100"
                placeholder={selectedProject ? selectedProject.progress.toString() : "0"}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Latest Milestone Achieved</label>
              <input
                type="text"
                value={formData.milestone}
                onChange={(e) => setFormData({ ...formData, milestone: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Phase 1 completed, 50 beneficiaries reached"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Updated Budget (₹)</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  placeholder={selectedProject ? selectedProject.budget.toString() : "0"}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount Spent (₹)</label>
                <input
                  type="number"
                  value={formData.spent}
                  onChange={(e) => setFormData({ ...formData, spent: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  placeholder={selectedProject ? selectedProject.spent.toString() : "0"}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Update Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Describe recent progress, challenges, or achievements"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps</label>
              <textarea
                value={formData.nextSteps}
                onChange={(e) => setFormData({ ...formData, nextSteps: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                rows={2}
                placeholder="Planned activities for the next phase"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={() => window.location.href = '/'} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProject;