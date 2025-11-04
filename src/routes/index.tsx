import { Suspense, lazy } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import RequiredAuth from './RequiredAuth';
const HomePage = lazy(() => import('@/pages'));
const DashboardLayout = lazy(  () => import('@/components/layout/dashboard-layout'));
const SignInPage = lazy(() => import('@/pages/auth/signin'));
const DashboardPage = lazy(() => import('@/pages/home'));
const ClientPage = lazy(() => import('@/pages/clients/index'));
const PreferncesPage = lazy(() => import('@/pages/home/preferences/index'));
const NotFound = lazy(() => import('@/pages/not-found'));
const UsersPage = lazy(() => import('@/pages/users'));
const UserGroupsPage = lazy(() => import('@/pages/user-groups'));
const UserDevicePage = lazy(() => import('@/pages/user-devices'));
const CheckpointReportsPage = lazy(() => import('@/pages/reports/checkpoint-reports'));
const DailyActivitiesReportPage = lazy(() => import('@/pages/reports/daily-activity-reports'));

// ----------------------------------------------------------------------

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/dashboard',
      element: (
        <RequiredAuth />
      ),
      children: [

        {
          path: '/dashboard',
          element: (

            <DashboardLayout>
              <Suspense>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            {
              element: <DashboardPage />,
              index: true,
              state:{title:"Dashboard"}
            },
            {
              path: 'users',
              element: <UsersPage />,
              state:{title:"Users"}
            },
            {
              path: 'user-groups',
              element: <UserGroupsPage />,
              state:{title:"User Groups"}
            },
            {
              path: 'clients',
              element: <ClientPage />,
              state:{title:"Clients"}
            },
            {
              path: 'preferences',
              element: <PreferncesPage />
            },
            {
              path: 'user-devices',
              element: <UserDevicePage />
            },
            {
              path: 'checkpoint-reports',
              element: <CheckpointReportsPage />
            },
            {
              path: 'daily-activities-reports',
              element: <DailyActivitiesReportPage />
            },
          ]
        }
      ]
    },
  ];

  const publicRoutes = [
    {
      path: '/',
      element: <HomePage />,
      index: true,
      state: { from: location }
    },
    {
      path: '/login',
      element: <SignInPage />,
      index: true,
      state: { from: location }
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}
