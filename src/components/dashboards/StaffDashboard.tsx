import React, { useState,useEffect } from 'react';
import { 
  IndianRupee, FolderOpen, TrendingDown, 
  CheckCircle, ArrowUpRight, ArrowDownRight, X
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDashboard } from '../../contexts/DashboardContext';

export function StaffDashboard() {
  const { donations, projects, expenses, tasks } = useDashboard();
  const [ngoName, setNgoName] = useState(''); // state for dynamic heading

  // Load user's first question answer from localStorage
  useEffect(() => {
    const storedAnswers = localStorage.getItem('userAnswers');
    if (storedAnswers) {
      const parsed = JSON.parse(storedAnswers);
      setNgoName(parsed.ngoName || ''); // use ngoName key
    }
  }, []);


  // --- Metrics ---
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const activeProjects = projects.filter(p => p.status === 'active').length;
  const completedTasks = tasks.filter(t => t.status === 'completed').length;

  const stats = [
    {
      label: 'Total Donations',
      value: `₹${(totalDonations / 100000).toFixed(1)}L`,
      change: '+15.2%',
      trend: 'up',
      icon: IndianRupee,
      color: 'text-green-600'
    },
    {
      label: 'Total Expenses',
      value: `₹${(totalExpenses / 100000).toFixed(1)}L`,
      change: '-3.2%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-red-600'
    },
    {
      label: 'Active Projects',
      value: activeProjects.toString(),
      change: '+2 this quarter',
      trend: 'up',
      icon: FolderOpen,
      color: 'text-blue-600'
    },
    {
      label: 'Completed Tasks',
      value: completedTasks.toString(),
      change: '+15 this week',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

  // --- Charts Data ---
  const monthlyDonations = [
    { month: 'Jan', amount: 1200000 },
    { month: 'Feb', amount: 1500000 },
    { month: 'Mar', amount: 1800000 },
    { month: 'Apr', amount: 2000000 },
    { month: 'May', amount: 2200000 },
    { month: 'Jun', amount: 2500000 },
  ];

  const donationCategories = [
    { name: 'Individual', value: 40 },
    { name: 'Corporate', value: 35 },
    { name: 'Grants', value: 25 }
  ];
  const categoryColors = ['#f97316', '#3b82f6', '#10b981'];

  // --- Recent Activities ---
  const recentActivities = [
    { message: 'Received ₹5,00,000 from Tata Foundation', time: '2h ago', status: 'success' },
    { message: 'New volunteer John Smith registered', time: '1d ago', status: 'pending' },
    { message: 'Donor meeting scheduled with Acme Corp.', time: '3d ago', status: 'completed' }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to {ngoName} NGO Dashboard  </h1>
        <p className="text-gray-600">Here are your latest insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div 
              key={i} 
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                if (stat.label === 'Total Donations') {
                  localStorage.setItem('activeModule', 'donors');
                  window.location.href = '/';
                } else if (stat.label === 'Total Expenses') {
                  localStorage.setItem('activeModule', 'finances');
                  window.location.href = '/';
                } else if (stat.label === 'Active Projects') {
                  localStorage.setItem('activeModule', 'projects');
                  window.location.href = '/';
                } else if (stat.label === 'Completed Tasks') {
                  localStorage.setItem('activeModule', 'projects');
                  window.location.href = '/';
                }
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Insights: Donations + Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Donations</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyDonations}>
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
              />
              <YAxis  
                dataKey="amount" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
              />
              <Tooltip 
                formatter={(value: number) => [`₹${(value/100000).toFixed(1)}L`, 'Donations']}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="amount" 
                fill="#f97316" 
                radius={[6, 6, 0, 0]}
                stroke="none"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart with legends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Donation Categories</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donationCategories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {donationCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={categoryColors[index % categoryColors.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value, name) => [`${value}%`, name]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Custom Legends */}
          <div className="flex justify-center gap-6 mt-4">
            {donationCategories.map((cat, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[i] }}></span>
                <span className="text-sm text-gray-700">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6 space-y-4">
            {recentActivities.map((activity, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-medium">{activity.message}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6 space-y-3">
            <button 
              onClick={() => window.location.href = '/add-donation'}
              className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition"
            >
              Add Donation
            </button>
            <button 
              onClick={() => window.location.href = '/record-expense'}
              className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Record Expense
            </button>
            <button 
              onClick={() => window.location.href = '/update-project'}
              className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Update Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}