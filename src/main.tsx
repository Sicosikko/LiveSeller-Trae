
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { registerServiceWorker } from './utils/serviceWorkerRegistration';
import { AppProvider } from './contexts/AppContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './providers/AuthProvider';
import { Toaster } from 'sonner';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <AuthProvider>
          <LanguageProvider>
            <BrowserRouter>
              <App />
              <Toaster position="top-right" richColors />
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </AppProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

// Registrar o service worker para suporte offline e melhor performance
registerServiceWorker();
