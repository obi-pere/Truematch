import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ApplyPage } from '../pages/Apply/ApplyPage';
import { ApplicationDetailsPage } from '../pages/Application/ApplicationDetailsPage';
import { ChatPage } from '../pages/Chat/ChatPage';
import { LoginPage } from '../pages/Auth/LoginPage';
import { DashboardApplicationsPage } from '../pages/Dashboard/DashboardApplicationsPage';
import { DashboardHome } from '../pages/Dashboard/DashboardHome';
import { DashboardLayout } from '../pages/Dashboard/DashboardLayout';
import { DashboardProfilePage } from '../pages/Dashboard/DashboardProfilePage';
import { HomePage } from '../pages/Home/HomePage';

const ProtectedRoute = () => {
  const { isAuthenticated, isBootstrapping } = useAuth();

  if (isBootstrapping) {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-600">Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/apply" element={<ApplyPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="applications" element={<DashboardApplicationsPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
        </Route>
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/applications/:applicationId" element={<ApplicationDetailsPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
