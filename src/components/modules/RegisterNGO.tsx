import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Building2, CalendarDays, Plus } from "lucide-react";
import { useDashboard } from '../../contexts/DashboardContext';

export default function RegisteredNGOPage() {
  const { ngoRegistrations } = useDashboard();
  const [activeTab, setActiveTab] = useState("All");
  const [showBarGraph, setShowBarGraph] = useState(false); // State to highlight bar chart

  // Combine mock data with actual NGO registrations
  const mockRegistrations = [
    { id: 1, name: "Priya Foundation", role: "Admin", date: "2025-09-25" },
    { id: 2, name: "John Smith", role: "Volunteer", date: "2025-09-28" },
    { id: 3, name: "Anita Rao", role: "Member", date: "2025-09-29" },
  ];
  
  const registrations = [...ngoRegistrations, ...mockRegistrations];

  const monthlyData = [
    { month: "Jan", count: 8 },
    { month: "Feb", count: 12 },
    { month: "Mar", count: 6 },
    { month: "Apr", count: 15 },
    { month: "May", count: 10 },
    { month: "Jun", count: 18 },
    { month: "Jul", count: 20 },
    { month: "Aug", count: 25 },
    { month: "Sep", count: 30 },
  ];

  const thisMonth = registrations.filter(r => {
    const regDate = new Date(r.date);
    const now = new Date();
    return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
  }).length;

  const totalNGOs = registrations.filter(r => r.role === "NGO").length;
  const totalVolunteers = registrations.filter(r => r.role === "Volunteer").length;
  
  const stats = [
    { label: "Total NGOs", value: totalNGOs, icon: Building2, color: "bg-blue-500", link: "/ngos" },
    { label: "Volunteers", value: totalVolunteers, icon: Users, color: "bg-green-500", link: "/volunteers" },
    { label: "This Month", value: thisMonth, icon: CalendarDays, color: "bg-purple-500" }, // No link
  ];

  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const diff = Math.floor((Date.now() - date.getTime()) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const filteredRegs = activeTab === "All" ? registrations : registrations.filter(r => r.role === activeTab);

  const roleColors: Record<string, string> = {
    Admin: "bg-orange-200 text-orange-800",
    Volunteer: "bg-green-200 text-green-800",
    Member: "bg-purple-200 text-purple-800",
    NGO: "bg-blue-200 text-blue-800",
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Registered NGOs & Members</h1>
            <p className="text-gray-600">Manage NGO registrations and member activities</p>
          </div>
          <button 
            onClick={() => window.location.href = '/add-ngo'}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add NGO
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white shadow rounded-xl p-6 flex items-center gap-4 cursor-pointer hover:shadow-lg transition`}
            onClick={() => {
              if (stat.label === "This Month") {
                setShowBarGraph(true); // Highlight bar chart only
              } else if (stat.link) {
                window.location.href = stat.link; // Redirect for NGOs or Volunteers
              }
            }}
          >
            <div className={`p-3 rounded-full text-white ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {["All", "Admin", "Volunteer", "Member", "NGO"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === tab
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timeline */}
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Registrations</h2>
          <div className="space-y-4">
            {filteredRegs.map(reg => (
              <div key={reg.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">
                    New{" "}
                    <span className={`px-2 py-1 rounded-full text-sm ${roleColors[reg.role]}`}>
                      {reg.role}
                    </span>{" "}
                    <span
                      className="cursor-pointer text-blue-600 hover:underline"
                      onClick={() => {
                        if (reg.role === "NGO") window.location.href = `/ngos/${reg.id}`;
                        else alert(`View details for ${reg.name}`);
                      }}
                    >
                      {reg.name}
                    </span>{" "}
                    registered
                  </p>
                  <p className="text-sm text-gray-500">{timeAgo(reg.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bar Chart */}
        <div
          className={`bg-white shadow rounded-xl p-6 transition ${
            showBarGraph ? "border-2 border-orange-500" : ""
          }`}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Monthly Registrations</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#f97316" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
