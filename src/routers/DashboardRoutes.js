import { lazy, memo } from 'react';
import { Routes, Route } from "react-router-dom";

const HomeScreen = memo( lazy(() => import('../components/views/home/HomeScreen.js')) );

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const DashboardRoutes = () => {
  return (
    <div className="container user-select-none">
      <Routes>
          <Route path={urlBaseFrontend + "/home" || "/" + urlBaseFrontend || "/*" || "/"} element={<HomeScreen />} />
      </Routes>
    </div>
  )
}
export default memo(DashboardRoutes);