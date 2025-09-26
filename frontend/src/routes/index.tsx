import { Navigate } from 'react-router-dom';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import UserList from '@/pages/users/UserList';
import UserForm from '@/pages/users/UserForm';
import Unauthorized from '@/pages/Unauthorized';
import RequireAdmin from '@/components/requireAdmin';
import AddUser from '@/pages/admin/AddUser';
import EditUser from '@/pages/admin/EditUser';
import AssignUser from '@/pages/projects/AssignUser';

import ClientList from '@/pages/projects/ClientList';
import ProjectForm from '@/pages/projects/ProjectForm';
import ProjectList from '@/pages/projects/ProjectList';
import TaskTable from '@/pages/projects/TaskTable';
import TimelineView from '@/pages/projects/TimelineView';
import RequireAuth from '@/components/requireAuth';


const routes = [
  {
    path: '/',
    element: <Navigate to="/dashboard" />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  },
  {
    path: '/admin/users',
    element: (
      <RequireAdmin>
        <UserList />
      </RequireAdmin>
    ),
  },
  {
    path: '/users',
    element: (
      <RequireAdmin>
        <UserList />
      </RequireAdmin>
    ),
  },
  {
    path: '/users/create',
    element: (
      <RequireAdmin>
        <UserForm />
      </RequireAdmin>
    ),
  },
  {
    path: '/users/:id/edit',
    element: (
      <RequireAdmin>
        <UserForm />
      </RequireAdmin>
    ),
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },
  {
    path: '/admin/add-user',
    element: (
      <RequireAdmin>
        <AddUser />
      </RequireAdmin>
    ),
  },
  {
    path: '/admin/users/:id/edit',
    element: (
      <RequireAdmin>
        <EditUser />
      </RequireAdmin>
    ),
  },
  {
    path: '/projects/:projectId/assign',
    element: (
      <RequireAdmin>
        <AssignUser />
      </RequireAdmin>
    ),
  },

  // ✅ Client routes
  {
    path: '/clients',
    element: (
      <RequireAdmin>
        <ClientList />
      </RequireAdmin>
    ),
  },
  

  {
    path: '/projects',
    element: (
      <RequireAdmin>
        <ProjectList />
      </RequireAdmin>
    ),
  },
  {
    path: '/projects/new',
    element: (
      <RequireAdmin>
        <ProjectForm />
      </RequireAdmin>
    ),
  },
  {
    path: '/tasks',
    element: (
      <RequireAdmin>
        <TaskTable />
      </RequireAdmin>
    ),
  },
  {
    path: '/timeline',
    element: (
      <RequireAdmin>
        <TimelineView />
      </RequireAdmin>
    ),
  },
];

export default routes;
