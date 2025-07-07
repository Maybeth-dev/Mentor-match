 import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

type Props = {
  allowedRoles: Array<"mentee" | "mentor" | "admin">;
  children: ReactElement;
};

const RoleGuard = ({ allowedRoles, children }: Props): ReactElement => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!user || !allowedRoles.includes(user.role)) return <Navigate to="/dashboard" replace />;

  return children;
};

export default RoleGuard;
