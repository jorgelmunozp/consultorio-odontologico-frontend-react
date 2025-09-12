import { lazy, memo } from "react";
import { useSelector } from "react-redux";

const DashboardRoutes = memo(lazy(() => import("./DashboardRoutes.js")));

export const PublicRoute = ({ children }) => {
   const user = useSelector((state) => state.auth.user);   // 👈 Obtiene el usuario desde Redux

   return user?.logged ? <DashboardRoutes /> : children;   // 👈 Si el usuario está logueado, navega al Dashboard
};

export default memo(PublicRoute);
