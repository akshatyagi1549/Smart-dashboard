import React from 'react';
import { 
  Calendar, Clock, CheckCircle, MessageSquare, 
  BookOpen, Users, Target, Star,
  Bell, Award, TrendingUp, FileText
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';

export function EmployeeDashboard() {
  const { tasks } = useDashboard();

  const myTasks = tasks.filter(task => task.assignee === 'Anita Patel');
  const completedTasks = myTasks.filter(task => task.status === 'completed');
  const pendingTasks = myTasks.filter(task => task.status !== 'completed');

  const stats = [
    {
      label: 'Tasks Completed',
      value: completedTasks.length.toString(),
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      label: 'Pending Tasks',
      value: pendingTasks.length.toString(),
      icon: Clock,
      color: 'text-yellow-600'
    },
    {
      label: 'Attendance',
      value: '98%',
      icon: Calendar,
      color: 'text-blue-600'
    },
    {
      label: 'Performance',
      value: '4.8/5',
      icon: Star,
      color: 'text-purple-600'
    }
  ];

  const upcomingTraining = [
    {
      title: 'Community Health Training',
      date: '2025-01-20',
      duration: '4 hours',
      type: 'Mandatory'
    },
    {
      title: 'Digital Literacy Workshop',
      date: '2025-01-25',
      duration: '6 hours',
      type: 'Optional'
    },
    {
      title: 'Leadership Development',
      date: '2025-02-01',
      duration: '8 hours',
      type: 'Optional'
    }
  ];

  const notifications = [
    {
      type: 'task',
      message: 'New task assigned: Village Survey',
      time: '1 hour ago',
      priority: 'high'
    },
    {
      type: 'training',
      message: 'Training reminder: Community Health Training',
      time: '2 hours ago',
      priority: 'medium'
    },
    {
      type: 'message',
      message: 'New message from Priya Sharma',
      time: '4 hours ago',
      priority: 'low'
    }
  ];

  const achievements = [
    {
      title: 'Employee Excellence Award',
      description: 'Outstanding performance in rural outreach',
      date: '2025-01-10',
      icon: Award
    },
    {
      title: 'Community Hero',
      description: 'Positive impact on 200+ families',
      date: '2024-12-15',
      icon: Star
    },
    {
      title: 'Training Completion',
      description: 'Completed Advanced Field Techniques',
      date: '2024-12-01',
      icon: BookOpen
    }
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Employee Dashboard</h1>
        <p className="text-gray-600">Manage your tasks, training, and performance</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* My Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">My Tasks</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {myTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-600' :
                      task.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                      'bg-yellow-100 text-yellow-600'
                    }`}>
                      {task.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                       task.status === 'in-progress' ? <Clock className="w-4 h-4" /> :
                       <Target className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'high' ? 'bg-red-100 text-red-800' :
                          task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {task.priority} priority
                        </span>
                        <span className="text-sm text-gray-500">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming Training */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Training</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {upcomingTraining.map((training, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{training.title}</h3>
                      <p className="text-sm text-gray-600">Duration: {training.duration}</p>
                      <p className="text-sm text-gray-500">Date: {training.date}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      training.type === 'Mandatory' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {training.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                {notifications.map((notification, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Bell className={`w-4 h-4 mt-1 ${
                      notification.priority === 'high' ? 'text-red-600' :
                      notification.priority === 'medium' ? 'text-yellow-600' :
                      'text-blue-600'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <button className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                  Mark Attendance
                </button>
                <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Submit Report
                </button>
                <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors">
                  Request Leave
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  View Schedule
                </button>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
                      <div className="bg-yellow-100 p-2 rounded-lg">
                        <Icon className="w-4 h-4 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">{achievement.title}</h3>
                        <p className="text-xs text-gray-600 mb-1">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}