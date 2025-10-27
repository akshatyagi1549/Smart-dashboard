import React from "react";
import {
  Home,
  Users,
  DollarSign,
  FolderOpen,
  Network,
  FileText,
  Settings,
  LogOut,
  Bell,
  ChevronRight,
  IndianRupee,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ActiveModule } from "./Dashboard";

interface SidebarProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
  selectedModules: string[];
}

export function Sidebar({
  activeModule,
  setActiveModule,
  selectedModules = [],
}: SidebarProps) {
  const { user, logout, updateUser } = useAuth();

  const handleProfileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imageUrl = event.target?.result as string;
          updateUser({ profileImage: imageUrl });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // Base menu items visible to all users
  const baseItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "RegisterNGO", label: "Register NGO", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Add HR Management for executive users only
  if (user?.role === "executive") {
    baseItems.push({ id: "hr", label: "HR Management", icon: Users });
  }

  // Optional modules based on answers or selections
  const optionalModules = [
    { id: "donors", label: "Donor Management", icon: Users },
    { id: "finances", label: "Financial Tracking", icon: IndianRupee },
    { id: "projects", label: "Project Monitoring", icon: FolderOpen },
    { id: "collaboration", label: "NGO Collaboration Hub", icon: Network },
    { id: "reports", label: "Reports & Analytics", icon: FileText },
  ];

  // Filter optional modules based on user's selection
  const visibleOptionalModules = optionalModules.filter((mod) =>
    selectedModules
      .map((s) => s.toLowerCase().trim())
      .includes(mod.label.toLowerCase())
  );

  const menuItems = [...baseItems, ...visibleOptionalModules];

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <img
          src="/ngo india logo.png"
          alt="NGO INDIA Logo"
          className="w-60 h-30 rounded-lg"
        />
      </div>

      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={handleProfileUpload}
            className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-orange-600 transition-colors cursor-pointer overflow-hidden"
            title="Click to upload profile picture"
          >
            {user?.profileImage ? (
              <img
                src={user.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : user?.name ? (
              user.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
            ) : (
              "NI"
            )}
          </button>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">
              {user?.name || "User"}
            </h3>
            <p className="text-sm text-gray-500">
              {user?.position || user?.role || "Position"}
            </p>
          </div>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id as ActiveModule)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  isActive
                    ? "bg-orange-50 text-orange-600 border border-orange-200"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => {
            if (user?.homePage) {
              logout();
              window.location.href = `/${user.homePage}`;
            } else {
              logout();
              window.location.href = "/";
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
