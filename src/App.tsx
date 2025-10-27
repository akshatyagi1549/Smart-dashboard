import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { DashboardProvider } from "./contexts/DashboardContext";
import { useChatbot } from "./hooks/useChatbot";
import { Chatbot } from "./components/Chatbot";

import { LandingPage } from "./components/LandingPage";
import { Dashboard } from "./components/Dashboard";
import { DonatePage } from "./components/pages/DonatePage";
import { EnquiryPage } from "./components/pages/EnquiryPage";
import { JoinPage } from "./components/pages/JoinPage";
import { NGOListPage } from "./components/pages/NGOListpage";
import { NGODetailsPage } from "./components/pages/NGODetailspage";
import { VolunteerPage } from "./components/pages/Volunteer";
import { WhatsAppChat } from "./components/pages/WhatsAppChat";
import { AddDonation } from "./components/pages/AddDonation";
import { RecordExpense } from "./components/pages/RecordExpense";
import { UpdateProject } from "./components/pages/UpdateProject";
import { DonorDetails } from "./components/pages/DonorDetails";
import { AddNGO } from "./components/pages/AddNGO";
import { WhatsAppCommunication } from "./components/pages/WhatsAppCommunication";
import { JoinNetwork } from "./components/pages/JoinNetwork";
import QuestionPage from "./components/pages/QuestionPage";

// -------------------- Protected Route Wrapper --------------------
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to="/" />;
  return children;
}

// -------------------- Dashboard Wrapper --------------------
// Uses current user dashboardPath instead of useParams
function DashboardWrapper() {
  const { user } = useAuth();
  const { isOpen, toggleChatbot } = useChatbot();

  if (!user) return null;

  return (
    <DashboardProvider>
      <Dashboard userId={user.id} />
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </DashboardProvider>
  );
}

// -------------------- App Content --------------------
function AppContent() {
  const { user } = useAuth();
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/ngos" element={<NGOListPage />} />
        <Route path="/ngos/:id" element={<NGODetailsPage />} />
        <Route path="/volunteers" element={<VolunteerPage />} />
        <Route path="/whatsappchat" element={<WhatsAppChat />} />
        <Route path="/questions/:step" element={
          <ProtectedRoute>
            <QuestionPage />
          </ProtectedRoute>
        } />

        {/* Dashboard - using current logged-in user's dashboardPath */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashboardWrapper />
            </ProtectedRoute>
          }
        />

        {/* Dashboard-related pages */}
        <Route path="/add-donation" element={
          <ProtectedRoute>
            <DashboardProvider>
              <AddDonation />
            </DashboardProvider>
          </ProtectedRoute>
        } />
        <Route path="/record-expense" element={
          <ProtectedRoute>
            <DashboardProvider>
              <RecordExpense />
            </DashboardProvider>
          </ProtectedRoute>
        } />
        <Route path="/update-project" element={
          <ProtectedRoute>
            <DashboardProvider>
              <UpdateProject />
            </DashboardProvider>
          </ProtectedRoute>
        } />
        <Route path="/donor-details" element={
          <ProtectedRoute>
            <DashboardProvider>
              <DonorDetails />
            </DashboardProvider>
          </ProtectedRoute>
        } />
        <Route path="/add-ngo" element={
          <ProtectedRoute>
            <DashboardProvider>
              <AddNGO />
            </DashboardProvider>
          </ProtectedRoute>
        } />
        <Route path="/whatsapp-communication" element={
          <ProtectedRoute>
            <WhatsAppCommunication />
          </ProtectedRoute>
        } />
        <Route path="/join-network" element={
          <ProtectedRoute>
            <JoinNetwork />
          </ProtectedRoute>
        } />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Chatbot outside Routes */}
      {!user && <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />}
    </Router>
  );
}

// -------------------- Main App --------------------
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
