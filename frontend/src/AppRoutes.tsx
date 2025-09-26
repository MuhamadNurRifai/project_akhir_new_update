import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";

// Auth pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import Unauthorized from "@/pages/Unauthorized";

// Project/Client pages
import ClientList from "@/pages/projects/ClientList";
import ClientForm from "@/pages/projects/ClientForm";
import ProjectList from "@/pages/projects/ProjectList";
import ProjectForm from "@/pages/projects/ProjectForm";
import TaskTable from "@/pages/projects/TaskTable";
import TimelineView from "@/pages/projects/TimelineView";
import TimeTracker from "@/pages/projects/TimeTracker";
import AssignUser from "@/pages/projects/AssignUser";


// Admin user mgmt
import UserList from "@/pages/users/UserList";

// Guards
import RequireAuth from "@/components/requireAuth";
import RequireAdmin from "@/components/requireAdmin";

// Layout wrapper
import Layout from "@/components/Layout";

const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-4 text-center">Loading...</div>;

  return (
    <Routes>
      {/* Public */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
      />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected (any logged-in user) */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout>
              <Dashboard />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Layout>
              <Dashboard />
            </Layout>
          </RequireAuth>
        }
      />

      {/* Admin Pages */}
      <Route
        path="/clients"
        element={
          <RequireAdmin>
            <Layout>
              <ClientList />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/clients/new"
        element={
          <RequireAdmin>
            <Layout>
              <ClientForm />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/projects"
        element={
          <RequireAdmin>
            <Layout>
              <ProjectList />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/projects/new"
        element={
          <RequireAdmin>
            <Layout>
              <ProjectForm />
            </Layout>
          </RequireAdmin>
        }
      />
     
      <Route
        path="/tasks"
        element={
          <RequireAdmin>
            <Layout>
              <TaskTable />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/timeline"
        element={
          <RequireAdmin>
            <Layout>
              <TimelineView />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/time-tracker"
        element={
          <RequireAdmin>
            <Layout>
              <TimeTracker />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/assign-user"
        element={
          <RequireAdmin>
            <Layout>
              <AssignUser />
            </Layout>
          </RequireAdmin>
        }
      />
      <Route
        path="/admin/users"
        element={
          <RequireAdmin>
            <Layout>
              <UserList />
            </Layout>
          </RequireAdmin>
        }
      />

      {/* Fallback */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
};

export default AppRoutes;
