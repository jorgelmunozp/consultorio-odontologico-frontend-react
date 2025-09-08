import { lazy, memo, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

const Navbar = memo( lazy(() => import('../components/menu/Navbar.js')) );
const TemplateScreen = memo( lazy(() => import('../components/views/TemplateScreen.js')) );
const PublicRoute = memo( lazy(() => import('./PublicRoute.js')) );
const DashboardRoutes = memo( lazy(() => import('./DashboardRoutes.js')) );
const PrivateRoute = memo( lazy(() => import('./PrivateRoute.js')) );
const HomeScreen = memo( lazy(() => import('../components/views/home/HomeScreen.js')) );

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const AppRouter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  if( process.env.NODE_ENV === 'development' ) { console.log('[App Router]') }

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <Navbar setIsMenuOpen={setIsMenuOpen} />

      <div className="container-fluid mt-5 px-0 text-center user-select-none">
        <Routes>
          <Route path={urlBaseFrontend || "/" + urlBaseFrontend || "/*"} element={ <PublicRoute><TemplateScreen isMenuOpen={isMenuOpen} /></PublicRoute> } />
          <Route path={urlBaseFrontend || urlBaseFrontend + "/home"} element={ <PrivateRoute><HomeScreen /></PrivateRoute> } />
          <Route path="/*" element={ <PrivateRoute><DashboardRoutes /></PrivateRoute> } />
        </Routes>
      </div>
    </Router>
  )
};

export default memo(AppRouter);