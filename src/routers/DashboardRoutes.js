import { Routes, Route } from "react-router-dom";
import { HomeScreen } from "../components/views/home/HomeScreen";

export const DashboardRoutes = ({ urlBaseFrontend }) => {
  return (
    <div className="container user-select-none">
      <Routes>
          <Route path={urlBaseFrontend + "/home"} element={<HomeScreen />} />
          <Route path={"/" + urlBaseFrontend} element={<HomeScreen />} />
      </Routes>
    </div>
  )
}
