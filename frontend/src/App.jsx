import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Tasks from "./pages/Tasks.jsx";
import { message } from "antd";
import CalendarView from "./pages/CalendarView.jsx";
import Profile from "./pages/Profile.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Kanban from "./pages/Kanban.jsx";
import { Suspense } from "react";
import Spinner from "./components/Spinner.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import NotAuthorized from "./Admin/NotAuthorized.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminDashboard from "./Admin/AdminDashboard.jsx";
import AdminLogs from "./Admin/AdminLogs.jsx";
import AdminTasks from "./Admin/AdminTasks.jsx";
import Users from "./Admin/Users.jsx";
import AdminLayout from "./Admin/AdminLayout.jsx";
import Adminprofile from "./Admin/Adminprofile.jsx";
import Notifications from "./pages/Notifications.jsx";

message.config({
  top: 10,
  duration: 2,
  maxCount: 3,
});

function PrivateRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/calendar"
          element={
            <PrivateRoute>
              <CalendarView />
            </PrivateRoute>
          }
        />

        <Route
          path="/kanban"
          element={
            <PrivateRoute>
              <Kanban />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="tasks" element={<AdminTasks />} />
          <Route path="logs" element={<AdminLogs />} />
          <Route path="profile" element={<Adminprofile />} />
        </Route>

        {/* ❗ ONLY ONE CATCH-ALL ROUTE */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
