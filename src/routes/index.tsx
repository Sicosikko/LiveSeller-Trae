import { createBrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Admin from '../pages/Admin';
import CustomerService from '../pages/CustomerService';
import MassMessages from '../pages/MassMessages';
import Channels from '../pages/Channels';
import PlatformIntegrations from '../pages/PlatformIntegrations';
import Payments from '../pages/Payments';
import Calendar from '../pages/Calendar';
import Automations from '../pages/Automations';
import Team from '../pages/Team';
import Analytics from '../pages/Analytics';
import WhatsAppCommerce from '../pages/WhatsAppCommerce';
import Downloads from '../pages/Downloads';
import PlatformStatus from '../pages/PlatformStatus';
import Settings from '../pages/Settings';
import Login from '../pages/auth/Login';
import WebViewPage from '../pages/WebViewPage';
import NotFound from '../pages/NotFound';
import AppLayout from '../layouts/AppLayout';

const router = createBrowserRouter([
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      }
    ]
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Dashboard />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/admin',
        element: <Admin />
      },
      {
        path: '/atendimento',
        element: <CustomerService />
      },
      {
        path: '/mensagens-em-massa',
        element: <MassMessages />
      },
      {
        path: '/canais',
        element: <Channels />
      },
      {
        path: '/integracoes',
        element: <PlatformIntegrations />
      },
      {
        path: '/pagamentos',
        element: <Payments />
      },
      {
        path: '/calendario',
        element: <Calendar />
      },
      {
        path: '/automacoes',
        element: <Automations />
      },
      {
        path: '/equipe',
        element: <Team />
      },
      {
        path: '/analytics',
        element: <Analytics />
      },
      {
        path: '/whatsapp-commerce',
        element: <WhatsAppCommerce />
      },
      {
        path: '/downloads',
        element: <Downloads />
      },
      {
        path: '/status-plataforma',
        element: <PlatformStatus />
      },
      {
        path: '/configuracoes',
        element: <Settings />
      },
      {
        path: '/webview',
        element: <WebViewPage />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
]);

export default router;