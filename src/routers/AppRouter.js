import { lazy, memo, useMemo } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const Navbar = memo( lazy(() => import('../components/menu/Navbar.js')) );
const PublicRoute = memo( lazy(() => import('./PublicRoute.js')) );
const DashboardRoutes = memo( lazy(() => import('./DashboardRoutes.js')) );
const PrivateRoute = memo( lazy(() => import('./PrivateRoute.js')) );
const IndexScreen = memo( lazy(() => import('../components/views/index/IndexScreen.js')) );
const HomeScreen = memo( lazy(() => import('../components/views/home/HomeScreen.js')) );

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND || '';

export const AppRouter = () => {
  // 👇 Memoriza el resultado de las rutas para que no se vuelvan a crear
  const routes = useMemo( () => (
      <Routes>
        <Route path={`${urlBaseFrontend}/`} element={ <PublicRoute><IndexScreen /></PublicRoute> } />
        <Route path={`${urlBaseFrontend}/home`} element={ <PrivateRoute><HomeScreen /></PrivateRoute> } />
        <Route path="/*" element={ <PrivateRoute><DashboardRoutes /></PrivateRoute> } />
      </Routes>
  ), [] ); // 👈 Solo se recalcula cuando cambia el estado
  
  if( process.env.NODE_ENV === 'development' ) { console.log('[App Router]') }

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <Navbar />

      <div className="container-fluid mt-5 px-0 text-center user-select-none">
        { routes }
      </div>
    </Router>
  )
};

export default memo(AppRouter);