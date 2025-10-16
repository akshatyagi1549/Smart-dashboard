import React from "react"; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useParams
} from "react-router-dom";
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

// ✅ Helper component to pass userId to Dashboard
function DashboardWithParams() {
  const { userId } = useParams<{ userId: string }>();
  const { isOpen, toggleChatbot } = useChatbot();

  return (
    <DashboardProvider>
      <Dashboard userId={userId!} />
      <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />
    </DashboardProvider>
  );
}

// Protected Route wrapper
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

function AppContent() {
  const { user, isLoading } = useAuth();
  const { isOpen, toggleChatbot } = useChatbot();

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

  return (
    <Router>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/join" element={<JoinPage />} />

        {/* Question pages */}
        <Route
          path="/questions/:step"
          element={
            <ProtectedRoute>
              <QuestionPage />
            </ProtectedRoute>
          }
        />

        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/ngos" element={<NGOListPage />} />
        <Route path="/ngos/:id" element={<NGODetailsPage />} />
        <Route path="/volunteers" element={<VolunteerPage />} />
        <Route path="/whatsappchat" element={<WhatsAppChat />} />

        {/* ✅ Dashboard route with unique userId */}
        <Route
          path="/dashboard/:userId"
          element={
            <ProtectedRoute>
              <DashboardWithParams />
            </ProtectedRoute>
          }
        />

        {/* Dashboard-related pages */}
        <Route
          path="/add-donation"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <AddDonation />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/record-expense"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <RecordExpense />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-project"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <UpdateProject />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/donor-details"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <DonorDetails />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-ngo"
          element={
            <ProtectedRoute>
              <DashboardProvider>
                <AddNGO />
              </DashboardProvider>
            </ProtectedRoute>
          }
        />
        <Route
          path="/whatsapp-communication"
          element={
            <ProtectedRoute>
              <WhatsAppCommunication />
            </ProtectedRoute>
          }
        />
        <Route
          path="/join-network"
          element={
            <ProtectedRoute>
              <JoinNetwork />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!user && <Chatbot isOpen={isOpen} onToggle={toggleChatbot} />}
    </Router>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
