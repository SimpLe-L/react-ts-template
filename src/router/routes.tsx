import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

import ErrorBoundary from '@/components/error-boundary';
import LazyComponent from '@/components/lazy-component';

import { RouterMap } from '@/types'

import { protectedLoader } from './loader';

const routes = [
  {
    path: RouterMap.LOGIN,
    element: <LazyComponent lazyChildren={lazy(() => import('@/pages/login'))} />,
  },
  {
    path: '/',
    element: <LazyComponent lazyChildren={lazy(() => import('@/layout'))} />,
    loader: protectedLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to={RouterMap.HOME} replace={true} />,
      },
      {
        path: RouterMap.HOME,
        element: <LazyComponent lazyChildren={lazy(() => import('@/pages/home'))} />,
      }
    ],
  },
  {
    path: '*',
    element: <div>404页面</div>,
  },
];

export default routes;
