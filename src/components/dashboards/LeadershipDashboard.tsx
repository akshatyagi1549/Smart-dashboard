import React from 'react';
import { 
  TrendingUp, Users, Target, DollarSign, 
  AlertTriangle, CheckCircle, Clock, Award,
  BarChart3, PieChart, LineChart
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function LeadershipDashboard() {
  const { donations, projects, expenses } = useDashboard();

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netFunds = totalDonations - totalExpenses;
  const impactScore = 85; // Mock impact score

  const kpis = [
    {
      label: 'Total Impact Score',
      value: `${impactScore}/100`,
      change: '+3 points',
      trend: 'up',
      icon: Award,
      color: 'text-green-600'
    },
    {
      label: 'Net Funds Available',
      value: `₹${(netFunds / 100000).toFixed(1)}L`,
      change: '+15%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-blue-600'
    },
    {
      label: 'Beneficiaries Reached',
      value: '12,450',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      label: 'Project Success Rate',
      value: '92%',
      change: '+2%',
      trend: 'up',
      icon: Target,
      color: 'text-orange-600'
    }
  ];

  const strategicMetrics = [
    { label: 'Operational Efficiency', value: 88, color: 'bg-green-500' },
    { label: 'Financial Transparency', value: 95, color: 'bg-blue-500' },
    { label: 'Community Impact', value: 82, color: 'bg-purple-500' },
    { label: 'Stakeholder Satisfaction', value: 91, color: 'bg-orange-500' }
  ];

  const riskAlerts = [
    {
      type: 'high',
      title: 'Budget Overrun Risk',
      description: 'Healthcare Initiative approaching 85% budget utilization',
      action: 'Review and optimize expenses'
    },
    {
      type: 'medium',
      title: 'Donor Retention',
      description: '3 major donors have not renewed commitments',
      action: 'Schedule donor engagement meetings'
    },
    {
      type: 'low',
      title: 'Compliance Check',
      description: 'Annual compliance review due in 30 days',
      action: 'Prepare documentation'
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Executive Director Dashboard</h1>
        <p className="text-gray-600">Strategic oversight and performance analytics</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${kpi.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm text-green-600 font-medium">{kpi.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
              <p className="text-gray-600">{kpi.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Strategic Metrics */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Strategic Performance Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                {strategicMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700 font-medium">{metric.label}</span>
                      <span className="text-gray-900 font-semibold">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`${metric.color} h-3 rounded-full transition-all duration-500`}
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Analytics */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Impact Analytics</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-blue-50 p-4 rounded-lg mb-3">
                    <BarChart3 className="w-8 h-8 text-blue-600 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">2,340</h3>
                  <p className="text-gray-600">Children Educated</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-50 p-4 rounded-lg mb-3">
                    <PieChart className="w-8 h-8 text-green-600 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">850</h3>
                  <p className="text-gray-600">Families Served</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-50 p-4 rounded-lg mb-3">
                    <LineChart className="w-8 h-8 text-purple-600 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">45</h3>
                  <p className="text-gray-600">Villages Reached</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Risk Management</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {riskAlerts.map((alert, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    alert.type === 'high' ? 'border-red-200 bg-red-50' :
                    alert.type === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                    'border-blue-200 bg-blue-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                        alert.type === 'high' ? 'text-red-600' :
                        alert.type === 'medium' ? 'text-yellow-600' :
                        'text-blue-600'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{alert.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                        <p className="text-sm font-medium text-gray-700">{alert.action}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Executive Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Executive Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Review Budget Allocation
                </button>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Approve New Initiative
                </button>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Generate Board Report
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Schedule Team Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Performance */}
      <div className="mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Project Performance Overview</h2>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Project</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Budget</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Spent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Progress</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">ROI</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 font-medium text-gray-900">{project.name}</td>
                      <td className="py-3 px-4 text-gray-700">₹{(project.budget / 100000).toFixed(1)}L</td>
                      <td className="py-3 px-4 text-gray-700">₹{(project.spent / 100000).toFixed(1)}L</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' :
                          project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-green-600 font-semibold">+24%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}