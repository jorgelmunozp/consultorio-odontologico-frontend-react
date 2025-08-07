import { lazy } from 'react';
import { Routes, Route } from "react-router-dom";
const HomeScreen = lazy(() => import('../components/views/home/HomeScreen.js'));

export const DashboardRoutes = ({ urlBaseFrontend }) => {
  return (
    <div className="container user-select-none">
      <Routes>
          <Route path={urlBaseFrontend + "/home"} element={<HomeScreen />} />
          <Route path={"/" + urlBaseFrontend} element={<HomeScreen />} />
          <Route path={"/*"} element={<HomeScreen />} />
          <Route path={"/"} element={<HomeScreen />} />
      </Routes>
    </div>
  )
}
export default DashboardRoutes;