
import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import LoadingPage from "@/components/feedback/LoadingPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import NotFound from "@/pages/NotFound";
import RouteManager from "@/components/routing/RouteManager";
import OfflineAlert from "@/components/feedback/OfflineAlert";
import WebViewPage from "@/pages/WebViewPage";

// Lazy loaded components
const Index = lazy(() => import("@/pages/Index"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const Login = lazy(() => import("@/pages/Login"));
const MassMessages = lazy(() => import("@/pages/MassMessages"));
const Team = lazy(() => import("@/pages/Team"));
const Settings = lazy(() => import("@/pages/Settings"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));
const AIAssistant = lazy(() => import("@/pages/AIAssistant"));
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const ChannelIntegration = lazy(() => import("@/pages/ChannelIntegration"));
const DownloadsPage = lazy(() => import("@/pages/DownloadsPage"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const Calendar = lazy(() => import("@/pages/Calendar"));
const Automations = lazy(() => import("@/pages/Automations"));
const PlatformStatusPage = lazy(() => import("@/pages/PlatformStatusPage"));
const AdvancedAnalytics = lazy(() => import("@/pages/AdvancedAnalytics"));
const Register = lazy(() => import("@/pages/auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/auth/ResetPassword"));
const VerificationSent = lazy(() => import("@/pages/auth/VerificationSent"));
const TwoFactorSetup = lazy(() => import("@/pages/auth/TwoFactorSetup"));
const AuthCallback = lazy(() => import("@/pages/auth/AuthCallback"));
const WhatsAppCommerce = lazy(() => import("@/pages/WhatsAppCommerce"));
const Payments = lazy(() => import("@/pages/Payments"));
const Profile = lazy(() => import("@/pages/Profile"));
const PlatformIntegrations = lazy(() => import("@/pages/PlatformIntegrations"));
const Atendimento = lazy(() => import("@/pages/Atendimento"));
const PricingPage = lazy(() => import("@/pages/PricingPage"));
const AffiliatePage = lazy(() => import("@/pages/AffiliatePage"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const PrivateMessages = lazy(() => import("@/pages/PrivateMessages"));
const TeamProductivity = lazy(() => import("@/pages/TeamProductivity"));

// Componente de carregamento
const PageLoader = () => (
  <LoadingPage title="Carregando..." message="Por favor, aguarde enquanto carregamos a página" />
);

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <RouteManager />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/app" element={<Index />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/auth/verification-sent" element={<VerificationSent />} />
          <Route path="/auth/two-factor-setup" element={<TwoFactorSetup />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/atendimento" element={
            <ProtectedRoute>
              <Atendimento />
            </ProtectedRoute>
          } />
          <Route path="/mass-messages" element={
            <ProtectedRoute>
              <MassMessages />
            </ProtectedRoute>
          } />
          <Route path="/team" element={
            <ProtectedRoute>
              <Team />
            </ProtectedRoute>
          } />
          <Route path="/team-productivity" element={
            <ProtectedRoute>
              <TeamProductivity />
            </ProtectedRoute>
          } />
          <Route path="/private-messages" element={
            <ProtectedRoute>
              <PrivateMessages />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/payments" element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          } />
          <Route path="/affiliates" element={
            <ProtectedRoute>
              <AffiliatePage />
            </ProtectedRoute>
          } />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/ai-assistant" element={
            <ProtectedRoute>
              <AIAssistant />
            </ProtectedRoute>
          } />
          <Route path="/channels" element={
            <ProtectedRoute>
              <ChannelIntegration />
            </ProtectedRoute>
          } />
          <Route path="/platform-integrations" element={
            <ProtectedRoute>
              <PlatformIntegrations />
            </ProtectedRoute>
          } />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/calendar" element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          } />
          <Route path="/automations" element={
            <ProtectedRoute>
              <Automations />
            </ProtectedRoute>
          } />
          <Route path="/platform-status" element={<PlatformStatusPage />} />
          <Route path="/analytics" element={
            <ProtectedRoute>
              <AdvancedAnalytics />
            </ProtectedRoute>
          } />
          <Route path="/whatsapp-commerce" element={
            <ProtectedRoute>
              <WhatsAppCommerce />
            </ProtectedRoute>
          } />
          <Route path="/webview" element={<WebViewPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster />
      <OfflineAlert />
    </>
  );
}

export default App;
