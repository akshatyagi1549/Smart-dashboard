import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { StaffDashboard } from "./dashboards/StaffDashboard";
import { LeadershipDashboard } from "./dashboards/LeadershipDashboard";
import { EmployeeDashboard } from "./dashboards/EmployeeDashboard";
import { DonorManagement } from "./modules/DonorManagement";
import { FinancialTracking } from "./modules/FinancialTracking";
import { ProjectMonitoring } from "./modules/ProjectMonitoring";
import { CollaborationHub } from "./modules/CollaborationHub";
import { HRManagement } from "./modules/HRManagement";
import { Settings } from "./modules/Settings";
import { Reports } from "./modules/Reports";
import { useAuth } from "../contexts/AuthContext";
import RegisterNGO from "./modules/RegisterNGO";
import { KnowledgeHub } from "./KnowledgeHub";


export type ActiveModule =
  | "dashboard"
  | "donors"
  | "finances"
  | "projects"
  | "collaboration"
  | "hr"
  | "reports"
  | "settings"
  | "register"
  | "RegisterNGO"
  | "knowledge";

export function Dashboard() {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState<ActiveModule>("dashboard");
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [userFeatures, setUserFeatures] = useState({
    donorManagementFeatures: [] as string[],
    financialTrackingFeatures: [] as string[],
    projectMonitoringFeatures: [] as string[],
  });

  useEffect(() => {
    // Restore last active module
    const savedModule = localStorage.getItem("activeModule");
    if (savedModule) {
      setActiveModule(savedModule as ActiveModule);
      localStorage.removeItem("activeModule");
    }

    // Fetch user's answers from localStorage
    const storedAnswers = localStorage.getItem("userAnswers");
    if (storedAnswers) {
      const parsed = JSON.parse(storedAnswers);

      // Set selected modules
      if (parsed.modules) {
        const modules = Array.isArray(parsed.modules)
          ? parsed.modules
          : [parsed.modules];
        setSelectedModules(modules.map((m: string) => m.trim()));
      }

      // Set features for specific modules
      setUserFeatures({
        donorManagementFeatures: parsed.donorManagementFeatures || [],
        financialTrackingFeatures: parsed.financialTrackingFeatures || [],
        projectMonitoringFeatures: parsed.projectMonitoringFeatures || [],
      });
    }
  }, []);

  const renderContent = () => {
    switch (activeModule) {
      case "dashboard":
        switch (user?.role) {
          case "staff":
            return <StaffDashboard />;
          case "leadership":
            return <LeadershipDashboard />;
          case "employee":
            return <EmployeeDashboard />;
          default:
            return <StaffDashboard />;
        }
      case "donors":
        return <DonorManagement features={userFeatures.donorManagementFeatures} />;
      case "finances":
        return <FinancialTracking features={userFeatures.financialTrackingFeatures} />;
      case "projects":
        return <ProjectMonitoring features={userFeatures.projectMonitoringFeatures} />;
      case "collaboration":
        return <CollaborationHub />;
      case "hr":
        return <HRManagement />;
      case "reports":
        return <Reports />;
      case "settings":
        return <Settings />;
      case "register":
      case "RegisterNGO":
        return <RegisterNGO />;
      case "knowledge":
        return <KnowledgeHub />;
      default:
        return (
          <div className="p-8 text-center text-gray-500">
            Module under development
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        selectedModules={selectedModules}
      />
      <main className="flex-1 overflow-y-auto">{renderContent()}</main>
    </div>
  );
}
