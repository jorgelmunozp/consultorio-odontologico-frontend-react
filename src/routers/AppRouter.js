import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { TemplateScreen } from '../components/views/TemplateScreen';
import { Navbar } from "../components/menu/Navbar";
// import { LoginScreen } from "../components/login/LoginScreen";
import { HomeScreen } from "../components/views/home/HomeScreen";
import { NotFound } from '../components/views/404/NotFound';
import { myColor, myTitle } from "../global";

export const AppRouter = () => {
  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  return (
    <BrowserRouter>
      <Navbar urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} />

      <div className="container mt-5 text-center user-select-none">
        <Routes>
          <Route path={urlBaseFrontend + "/index"} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <TemplateScreen />
            </PublicRoute>
          } />

          <Route path={"/" + urlBaseFrontend} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <TemplateScreen />
            </PublicRoute>
          } />

          <Route path={"/*"} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <TemplateScreen />
            </PublicRoute>
          } />

          <Route path='*' element={
            // <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <NotFound urlBaseFrontend={urlBaseFrontend} myColor={myColor} myTitle={myTitle} />
            // </PublicRoute>
          }/>

          <Route path={urlBaseFrontend + "/home"} element={
              <PrivateRoute urlBaseFrontend={urlBaseFrontend}>
                  <HomeScreen />
              </PrivateRoute>
          } />

          <Route path={urlBaseFrontend} element={
              <PrivateRoute urlBaseFrontend={urlBaseFrontend}>
                  <HomeScreen />
              </PrivateRoute>
          } />

          <Route path="/*" element={
              <PrivateRoute urlBaseFrontend={urlBaseFrontend}>
                  <DashboardRoutes urlBaseFrontend={urlBaseFrontend} />
              </PrivateRoute>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  )
}
