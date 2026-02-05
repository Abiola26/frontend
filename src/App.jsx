import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box, CircularProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from './context/AuthContext';
import { ColorModeProvider } from './context/ColorModeContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Loading Component for Suspense
function PageLoader() {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress />
    </Box>
  );
}

// Lazy Loaded Layout & Pages
const MainLayout = lazy(() => import('./components/layout/MainLayout'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Upload = lazy(() => import('./pages/Upload'));
const Reports = lazy(() => import('./pages/Reports'));
const Analytics = lazy(() => import('./pages/Analytics'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const UserManagement = lazy(() => import('./pages/UserManagement'));
const AuditLogs = lazy(() => import('./pages/AuditLogs'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

export default function App() {
  return (
    <Router>
      <ColorModeProvider>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <AuthProvider>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <MainLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="upload" element={<Upload />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="analytics" element={<Analytics />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="users" element={<UserManagement />} />
                  <Route path="audit-logs" element={<AuditLogs />} />
                </Route>

                {/* Catch-all redirect to dashboard */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </SnackbarProvider>
      </ColorModeProvider>
    </Router>
  );
}
