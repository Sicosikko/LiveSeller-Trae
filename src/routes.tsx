import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateMessages from './pages/PrivateMessages';
import PlatformIntegrations from './pages/PlatformIntegrations';
import ChannelIntegration from './pages/ChannelIntegration';
import PlatformStatusPage from './pages/PlatformStatusPage';
import WhatsAppCommerce from './pages/WhatsAppCommerce';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ChatBots from './pages/ChatBots';
import AdvancedAnalytics from './pages/AdvancedAnalytics';
import Calendar from './pages/Calendar';
import Login from './pages/auth/Login'; // Certifique-se de que este import existe

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Rota padrão redireciona para a página de login */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Rota de autenticação */}
      <Route path="/login" element={<Login />} />
      
      {/* Rotas protegidas */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      <Route path="/messages" element={<ProtectedRoute><PrivateMessages /></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute><PlatformIntegrations /></ProtectedRoute>} />
      <Route path="/channels" element={<ProtectedRoute><ChannelIntegration /></ProtectedRoute>} />
      <Route path="/status" element={<ProtectedRoute><PlatformStatusPage /></ProtectedRoute>} />
      <Route path="/whatsapp-commerce" element={<ProtectedRoute><WhatsAppCommerce /></ProtectedRoute>} />
      <Route path="/chatbots" element={<ProtectedRoute><ChatBots /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AdvancedAnalytics /></ProtectedRoute>} />
      <Route path="/calendar" element={<ProtectedRoute><Calendar /></ProtectedRoute>} />
      
      {/* Rota para URLs desconhecidas */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;