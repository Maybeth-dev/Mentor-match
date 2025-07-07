 import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "../api/axiosInstance";

type User = {
  fullName: string;
  role: "mentee" | "mentor" | "admin";
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean; // 👈 new

};

 const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
  loading: true, // 👈 this is what TypeScript was crying about
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [loading, setLoading] = useState(true); // 👈 NEW

 useEffect(() => {
    const fetchUser = async () => {
        try {
        const res = await axios.get("/auth/me");
        setUser(res.data);
        } catch (err) {
        console.log("Not logged in.");
        } finally {
        setLoading(false); 
        }
    };

    fetchUser();
    }, []);

  const [user, setUser] = useState<User | null>(null);
  
  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/auth/me");
        setUser(res.data); // expects { fullName, role }
      } catch (err) {
        console.log("No session found.");
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading, // 👈 include this!
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
