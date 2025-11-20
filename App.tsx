import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';
import { Donations } from './pages/Donations';
import { Videos } from './pages/Videos';
import { Lectures } from './pages/Lectures';
import { Announcements } from './pages/Announcements';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { CurrencyProvider } from './context/CurrencyContext';
import { SettingsProvider } from './context/SettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { Loader2 } from 'lucide-react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-50 transition-colors">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
        </main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-400">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <SettingsProvider>
          <CurrencyProvider>
            <NotificationProvider>
              <HashRouter>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/reset-password" element={<ResetPassword />} />

                  {/* Protected Routes */}
                  <Route path="/" element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/donations" element={
                    <ProtectedRoute>
                      <Layout>
                        <Donations />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/videos" element={
                    <ProtectedRoute>
                      <Layout>
                        <Videos />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/lectures" element={
                    <ProtectedRoute>
                      <Layout>
                        <Lectures />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/announcements" element={
                    <ProtectedRoute>
                      <Layout>
                        <Announcements />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </ProtectedRoute>
                  } />
                </Routes>
              </HashRouter>
            </NotificationProvider>
          </CurrencyProvider>
        </SettingsProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
