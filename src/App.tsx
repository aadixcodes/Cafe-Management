import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LoginForm } from '@/components/auth/LoginForm';
import DashboardPage from '@/pages/DashboardPage';
import PurchasesPage from '@/pages/PurchasesPage';
import SalesPage from '@/pages/SalesPage';
import SettingsPage from "./pages/SettingsPage";
import NotFoundPage from "./pages/NotFoundPage";
import { PageLayout } from '@/components/layout/PageLayout';
import { TransactionProvider } from '@/contexts/TransactionContext';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <TransactionProvider>
          {/* <PageLayout> */}
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/purchases"
                element={
                  <ProtectedRoute>
                    <PurchasesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/sales"
                element={
                  <ProtectedRoute>
                    <SalesPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          {/* </PageLayout> */}
        </TransactionProvider>
      </AuthProvider>
    </Router>
  );
}
