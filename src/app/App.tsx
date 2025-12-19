import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { useState } from 'react';
import { Toaster } from './components/ui/sonner';

// Import views
import OnboardingView from './views/OnboardingView';
import CustomerHome from './views/customer/CustomerHome';
import ServiceBooking from './views/customer/ServiceBooking';
import EmergencyRequest from './views/customer/EmergencyRequest';
import LiveTracking from './views/customer/LiveTracking';

import WorkerDashboard from './views/worker/WorkerDashboard';
import WorkerOnboarding from './views/worker/WorkerOnboarding';

import PumpDashboard from './views/pump/PumpDashboard';

import AdminDashboard from './views/admin/AdminDashboard';

export type UserRole = 'customer' | 'worker' | 'pump' | 'admin' | null;

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Onboarding */}
          {!isAuthenticated && (
            <Route path="/" element={<OnboardingView onRoleSelect={handleRoleSelect} />} />
          )}

          {/* Customer Routes */}
          {userRole === 'customer' && (
            <>
              <Route path="/" element={<CustomerHome />} />
              <Route path="/service/:category" element={<ServiceBooking />} />
              <Route path="/emergency" element={<EmergencyRequest />} />
              <Route path="/tracking/:bookingId" element={<LiveTracking />} />
            </>
          )}

          {/* Worker Routes */}
          {userRole === 'worker' && (
            <>
              <Route path="/" element={<WorkerDashboard />} />
              <Route path="/worker/onboard" element={<WorkerOnboarding />} />
            </>
          )}

          {/* Petrol Pump Routes */}
          {userRole === 'pump' && (
            <>
              <Route path="/" element={<PumpDashboard />} />
            </>
          )}

          {/* Admin Routes */}
          {userRole === 'admin' && (
            <>
              <Route path="/" element={<AdminDashboard />} />
            </>
          )}

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}
