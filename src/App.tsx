 import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashboardRedirect from "./Pages/DashboardRedirect";
import RoleGuard from "./routes/RoleGuard";
import PrivateRoute from "./routes/PrivateRoute";
import MenteeProfile from  "./Pages/MenteeProfile";
import MentorProfile from "./Pages/MentorProfile";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import MentorSearch from "./Components/MentorSearch";
import MyRequests from "./Components/MyRequests";
import MySessions from "./Components/MySessions";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />

      <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardRedirect />
        </PrivateRoute>
      } />

      <Route path="/mentee" element={
        <RoleGuard allowedRoles={["mentee"]}>
          <MenteeProfile />
        </RoleGuard>
      } />
      <Route path="/mentor" element={
        <RoleGuard allowedRoles={["mentor"]}>
          <MentorProfile />
        </RoleGuard>
      } />
      <Route path="/admin" element={
        <RoleGuard allowedRoles={["admin"]}>
          <AdminDashboard />
        </RoleGuard>
      } />

      {/* Dashboard Tabs */}
      <Route path="/dashboard/mentors" element={
        <RoleGuard allowedRoles={["mentee"]}>
          <MentorSearch />
        </RoleGuard>
      } />
      <Route path="/dashboard/requests" element={
        <PrivateRoute>
          <MyRequests />
        </PrivateRoute>
      } />
      <Route path="/dashboard/sessions" element={
        <PrivateRoute>
          <MySessions />
        </PrivateRoute>
      } />
    </Routes>
  );
}

export default App;
