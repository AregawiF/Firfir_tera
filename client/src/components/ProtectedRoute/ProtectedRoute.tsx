import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element; requiredRole: string }) => {
  const { isAuthenticated, hasAccess } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/onboarding" />;
  }

  if (!hasAccess(requiredRole)) {
    return <Navigate to="/onboarding" />; // Redirect to an unauthorized page if role mismatch
  }

  return children;
};

export default ProtectedRoute;
