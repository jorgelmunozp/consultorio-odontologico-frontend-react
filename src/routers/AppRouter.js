import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
// import { Navbar } from "../components/menu/Navbar";
import IndexScreen from '../components/views/index/IndexScreen';
// import { LoginScreen } from "../components/login/LoginScreen";

export const AppRouter = () => {
  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  return (
    <BrowserRouter>
      {/* <Navbar urlBaseFrontend={urlBaseFrontend} /> */}

      <div className="container user-select-none">
        <Routes>
          <Route path={"/index"} element={
            <PublicRoute>
              <IndexScreen />
            </PublicRoute>
          } />

          {/* <Route path={urlBaseFrontend + "/login"} element={
              <PublicRoute>
                  <LoginScreen />
              </PublicRoute>
          } /> */}

          <Route path="/*" element={
              <PrivateRoute>
                  <DashboardRoutes />
              </PrivateRoute>
          } />

        </Routes>
      </div>
    </BrowserRouter>
  )
}
