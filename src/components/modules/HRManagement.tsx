import React, { useState } from 'react';
import { 
  Users, UserPlus, Calendar, Award, 
  Clock, CheckCircle, AlertCircle, Star,
  Mail, Phone, MapPin, Briefcase,
  TrendingUp, FileText, Settings
} from 'lucide-react';

export function HRManagement() {
  const [activeTab, setActiveTab] = useState('directory');

  const staff = [
    {
      id: '1',
      name: 'Priya Sharma',
      position: 'Program Manager',
      department: 'Program Management',
      email: 'grandsngoindia@ngo.org.org',
      phone: '+91 98765 43210',
      location: 'New Delhi',
      joinDate: '2023-06-15',
      status: 'Active',
      performance: 4.8,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
    },
    {
      id: '2',
      name: 'Rajesh Kumar',
      position: 'Executive Director',
      department: 'Executive',
      email: 'rajesh@ngo.org',
      phone: '+91 98765 43211',
      location: 'Mumbai',
      joinDate: '2022-01-10',
      status: 'Active',
      performance: 4.9,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
    },
    {
      id: '3',
      name: 'Anita Patel',
      position: 'Field Coordinator',
      department: 'Field Operations',
      email: 'anita@ngo.org',
      phone: '+91 98765 43212',
      location: 'Ahmedabad',
      joinDate: '2023-03-20',
      status: 'Active',
      performance: 4.7,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
    },
    {
      id: '4',
      name: 'Amit Singh',
      position: 'Finance Manager',
      department: 'Finance',
      email: 'amit@ngo.org',
      phone: '+91 98765 43213',
      location: 'Bangalore',
      joinDate: '2022-08-05',
      status: 'Active',
      performance: 4.6,
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1'
    }
  ];

  const leaveRequests = [
    {
      id: '1',
      employee: 'Priya Sharma',
      type: 'Annual Leave',
      startDate: '2025-02-15',
      endDate: '2025-02-20',
      days: 5,
      reason: 'Family vacation',
      status: 'Pending',
      appliedDate: '2025-01-10'
    },
    {
      id: '2',
      employee: 'Anita Patel',
      type: 'Sick Leave',
      startDate: '2025-01-18',
      endDate: '2025-01-19',
      days: 2,
      reason: 'Medical treatment',
      status: 'Approved',
      appliedDate: '2025-01-15'
    },
    {
      id: '3',
      employee: 'Amit Singh',
      type: 'Personal Leave',
      startDate: '2025-02-01',
      endDate: '2025-02-01',
      days: 1,
      reason: 'Personal work',
      status: 'Approved',
      appliedDate: '2025-01-12'
    }
  ];

  const performanceReviews = [
    {
      id: '1',
      employee: 'Priya Sharma',
      period: 'Q4 2024',
      score: 4.8,
      status: 'Completed',
      reviewDate: '2024-12-15',
      strengths: ['Leadership', 'Communication', 'Project Management'],
      improvements: ['Technical Skills', 'Time Management']
    },
    {
      id: '2',
      employee: 'Anita Patel',
      period: 'Q4 2024',
      score: 4.7,
      status: 'Completed',
      reviewDate: '2024-12-18',
      strengths: ['Field Work', 'Community Relations', 'Problem Solving'],
      improvements: ['Documentation', 'Reporting']
    },
    {
      id: '3',
      employee: 'Amit Singh',
      period: 'Q4 2024',
      score: 4.6,
      status: 'Pending',
      reviewDate: '2025-01-20',
      strengths: ['Financial Analysis', 'Attention to Detail'],
      improvements: ['Leadership', 'Communication']
    }
  ];

  const stats = [
    {
      label: 'Total Staff',
      value: staff.length.toString(),
      icon: Users,
      color: 'text-blue-600'
    },
    {
      label: 'Active Employees',
      value: staff.filter(s => s.status === 'Active').length.toString(),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Avg. Performance',
      value: (staff.reduce((sum, s) => sum + s.performance, 0) / staff.length).toFixed(1),
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      label: 'Pending Reviews',
      value: performanceReviews.filter(r => r.status === 'Pending').length.toString(),
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderDirectoryTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((employee) => (
          <div key={employee.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={employee.avatar}
                alt={employee.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{employee.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{employee.position}</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(employee.status)}`}>
                  {employee.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Briefcase className="w-4 h-4" />
                {employee.department}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {employee.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {employee.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {employee.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                Joined: {employee.joinDate}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{employee.performance}/5</span>
              </div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderLeaveTab = () => (
    <div className="space-y-4">
      {leaveRequests.map((request) => (
        <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{request.employee}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-600">Leave Type</p>
                  <p className="font-medium">{request.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{request.startDate} - {request.endDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days</p>
                  <p className="font-medium">{request.days} days</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Applied</p>
                  <p className="font-medium">{request.appliedDate}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reason</p>
                <p className="font-medium">{request.reason}</p>
              </div>
            </div>
            {request.status === 'Pending' && (
              <div className="flex items-center gap-2">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Approve
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderPerformanceTab = () => (
    <div className="space-y-4">
      {performanceReviews.map((review) => (
        <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-gray-900">{review.employee}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                  {review.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Review Period</p>
                  <p className="font-medium">{review.period}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Score</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-medium">{review.score}/5</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Review Date</p>
                  <p className="font-medium">{review.reviewDate}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Strengths</p>
                  <div className="flex flex-wrap gap-1">
                    {review.strengths.map((strength, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Areas for Improvement</p>
                  <div className="flex flex-wrap gap-1">
                    {review.improvements.map((improvement, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                        {improvement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                View Details
              </button>
              {review.status === 'Pending' && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                  Complete Review
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">HR Management</h1>
            <p className="text-gray-600">Manage staff, performance, and organizational development</p>
          </div>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2">
            <UserPlus className="w-5 h-5" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <div className="flex">
            {[
              { id: 'directory', label: 'Staff Directory', icon: Users },
              { id: 'leave', label: 'Leave Management', icon: Calendar },
              { id: 'performance', label: 'Performance Reviews', icon: Award }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-orange-500 text-orange-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'directory' && renderDirectoryTab()}
          {activeTab === 'leave' && renderLeaveTab()}
          {activeTab === 'performance' && renderPerformanceTab()}
        </div>
      </div>
    </div>
  );
}