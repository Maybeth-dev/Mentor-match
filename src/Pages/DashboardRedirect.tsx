import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const DashboardRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "mentee") navigate("/mentee");
    else if (user?.role === "mentor") navigate("/mentor");
    else if (user?.role === "admin") navigate("/admin");
    else navigate("/login");
  }, [user]);

  return <p className="text-center mt-20">Redirecting...</p>;
};

export default DashboardRedirect;
