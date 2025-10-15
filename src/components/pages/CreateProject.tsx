import React, { useState } from 'react';
import { ArrowLeft, FolderPlus, CheckCircle } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

interface CreateProjectProps {
  onBack: () => void;
}

export function CreateProject({ onBack }: CreateProjectProps) {
  const { addProject } = useDashboard();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    category: 'education',
    location: '',
    beneficiaries: '',
    objectives: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProject = {
      id: Date.now().toString(),
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      endDate: formData.endDate,
      budget: parseFloat(formData.budget),
      spent: 0,
      progress: 0,
      status: 'active' as const,
      category: formData.category,
      location: formData.location,
      beneficiaries: parseInt(formData.beneficiaries),
      objectives: formData.objectives
    };
    
    addProject(newProject);
    alert('Project created successfully!');
    onBack();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <FolderPlus className="w-8 h-8 text-orange-500" />
              Create New Project
            </h1>
            <p className="text-gray-600">Set up a new project for your NGO</p>
          </div>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-orange-900 mb-3">Project Setup Guidelines</h2>
          <ul className="text-orange-800 space-y-2 text-sm">
            <li>• Provide clear and descriptive project name</li>
            <li>• Set realistic timeline and budget estimates</li>
            <li>• Define specific objectives and target beneficiaries</li>
            <li>• Choose appropriate project category</li>
            <li>• All required fields must be completed</li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                placeholder="e.g., Rural Education Initiative"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Brief description of the project goals and activities"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget (₹) *</label>
              <input
                type="number"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                placeholder="Total project budget in rupees"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="education">Education</option>
                <option value="healthcare">Healthcare</option>
                <option value="environment">Environment</option>
                <option value="poverty">Poverty Alleviation</option>
                <option value="women-empowerment">Women Empowerment</option>
                <option value="child-welfare">Child Welfare</option>
                <option value="disaster-relief">Disaster Relief</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                placeholder="Project location (city, district, state)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Beneficiaries *</label>
              <input
                type="number"
                value={formData.beneficiaries}
                onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                placeholder="Number of people expected to benefit"
                min="1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Objectives *</label>
              <textarea
                value={formData.objectives}
                onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="List the main objectives and expected outcomes"
                required
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button type="button" onClick={onBack} className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;