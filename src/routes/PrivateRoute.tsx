 import { ReactElement } from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactElement;
};

const PrivateRoute = ({ children }: Props): ReactElement => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;


// This component checks if the user is authenticated.
// If authenticated, it renders the children components (protected routes).

