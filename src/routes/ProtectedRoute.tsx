import { Navigate, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from '../components/ui/Feedback';
import type { Role } from '../types';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: Role[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) return <PageLoader />;

  if (!isAuthenticated) {
    return <Navigate to="/login/member" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const hasAccess = role ? allowedRoles.includes(role) : false;

    if (!hasAccess) {
      const fallbackPath = role === 'lead'
        ? '/app/lead'
        : role === 'faculty'
          ? '/app/faculty'
          : '/app/member';

      return <Navigate to={fallbackPath} replace />;
    }
  }

  return <>{children}</>;
}
