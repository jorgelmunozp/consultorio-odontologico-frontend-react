import { Routes, Route } from "react-router-dom";
// import { HomeScreen } from "../components/views/home/HomeScreen";
import IndexScreen from '../components/views/index/IndexScreen';

export const DashboardRoutes = ({ urlBaseFrontend }) => {
  return (
    <div className="container user-select-none">
      <Routes>
          <Route path={urlBaseFrontend + "/home"} element={<IndexScreen />} />
          <Route path={"/" + urlBaseFrontend} element={<IndexScreen />} />
      </Routes>
    </div>
  )
}
