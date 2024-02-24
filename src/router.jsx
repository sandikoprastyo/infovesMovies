import App from './App.jsx';
import Layout from './components/Layout.jsx';
import {
  Error,
  Dashboard,
  DashboardAdd,
  DashboardEdit,
} from './pages/index.js';

export const routers = [
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
    errorElement: <Error />,
  },
  {
    path: '/dashboard',
    element: (
      <Layout isDashboard={true}>
        <Dashboard />
      </Layout>
    ),
  },
  {
    path: '/dashboard/add',
    element: (
      <Layout isDashboard={true}>
        <DashboardAdd />
      </Layout>
    ),
  },
  {
    path: '/dashboard/:id',
    element: (
      <Layout isDashboard={true}>
        <DashboardEdit />
      </Layout>
    ),
  },
];
