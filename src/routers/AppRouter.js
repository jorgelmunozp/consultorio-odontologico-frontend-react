import { Routes, Route, BrowserRouter } from "react-router-dom";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import IndexScreen from '../components/views/index/IndexScreen';
import { NotFound } from '../components/views/404/NotFound';
// import { LoginScreen } from "../components/login/LoginScreen";

export const AppRouter = () => {
  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  return (
    <BrowserRouter>
      <div className="container user-select-none">
        <Routes>
          <Route path={"/" + urlBaseFrontend + "/index"} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <IndexScreen />
            </PublicRoute>
          } />

<Route path={"/" + urlBaseFrontend + "/*"} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <IndexScreen />
            </PublicRoute>
          } />

<Route path={"/" + urlBaseFrontend + "/"} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <IndexScreen />
            </PublicRoute>
          } />

<Route path={"/" + urlBaseFrontend} element={
            <PublicRoute urlBaseFrontend={urlBaseFrontend}>
              <IndexScreen />
            </PublicRoute>
          } />

          {/* <Route path={urlBaseFrontend + "/login"} element={
              <PublicRoute urlBaseFrontend={urlBaseFrontend}>
                  <LoginScreen />
              </PublicRoute>
          } /> */}

          <Route path="/*" element={
              <PrivateRoute urlBaseFrontend={urlBaseFrontend}>
                  <DashboardRoutes urlBaseFrontend={urlBaseFrontend} />
              </PrivateRoute>
          } />

<Route path='*' element={<NotFound />}/>

        </Routes>
      </div>
    </BrowserRouter>
  )
}
