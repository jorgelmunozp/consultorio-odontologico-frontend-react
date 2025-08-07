import { lazy, useState } from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { PublicRoute } from "./PublicRoute.js";
import { Navbar } from "../components/menu/Navbar.js";
import { TemplateScreen } from '../components/views/TemplateScreen.js';
import { myColor, myTitle } from "../global.js";

const HomeScreen = lazy(() => import('../components/views/home/HomeScreen.js'));
const PrivateRoute = lazy(() => import('./PrivateRoute.js'));
const DashboardRoutes = lazy(() => import('./DashboardRoutes.js'));

export const AppRouter = ({ Logo, theme, handleTheme }) => {
  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  const [menu, setMenu] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log("isMenuOpen: ",isMenuOpen)

  return (
    <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true, }}>
      <Navbar Logo={Logo} urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} isMenuOpen={isMenuOpen} setMenu={setMenu} setIsMenuOpen={setIsMenuOpen} theme={theme} handleTheme={handleTheme} />

      <div className="container-fluid mt-5 text-center user-select-none">
        <Routes>
          {/* <Route path={urlBaseFrontend + "/index"} element={ <PublicRoute urlBaseFrontend={urlBaseFrontend}><TemplateScreen isMenuOpen={isMenuOpen} menu={menu} setMenu={setMenu} /></PublicRoute> } /> */}

          <Route path={urlBaseFrontend} element={ <PublicRoute urlBaseFrontend={urlBaseFrontend}><TemplateScreen Logo={Logo} isMenuOpen={isMenuOpen} menu={menu} setMenu={setMenu} theme={theme} /></PublicRoute> } />
          <Route path={"/" + urlBaseFrontend} element={ <PublicRoute urlBaseFrontend={urlBaseFrontend}><TemplateScreen Logo={Logo} isMenuOpen={isMenuOpen} menu={menu} setMenu={setMenu} theme={theme} /></PublicRoute> } />
          <Route path={"/*"} element={ <PublicRoute urlBaseFrontend={urlBaseFrontend}><TemplateScreen Logo={Logo} isMenuOpen={isMenuOpen} menu={menu} setMenu={setMenu} theme={theme} /></PublicRoute> } />
          
          {/* <Route path='*' element={ <PublicRoute urlBaseFrontend={urlBaseFrontend}><NotFound urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} /></PublicRoute> }/> */}

          <Route path={urlBaseFrontend + "/home"} element={ <PrivateRoute urlBaseFrontend={urlBaseFrontend}><HomeScreen /></PrivateRoute> } />
          <Route path={urlBaseFrontend} element={ <PrivateRoute urlBaseFrontend={urlBaseFrontend}><HomeScreen /></PrivateRoute> } />
          <Route path="/*" element={ <PrivateRoute urlBaseFrontend={urlBaseFrontend}><DashboardRoutes urlBaseFrontend={urlBaseFrontend} /></PrivateRoute> } />
        </Routes>
      </div>
    </Router>
  )
}
export default AppRouter;