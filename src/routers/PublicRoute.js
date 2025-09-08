// import { lazy, memo, useContext } from 'react';
// import { AuthContext } from '../auth/authContext.js'

// const DashboardRoutes = memo( lazy(() => import('./DashboardRoutes.js')) );

// export const PublicRoute = ({ children }) => {
//     const { user } = useContext(AuthContext);

//     return user.logged ? <DashboardRoutes /> : children
// }
// export default memo(PublicRoute);



import { lazy, memo } from "react";
import { useSelector } from "react-redux";

const DashboardRoutes = memo(lazy(() => import("./DashboardRoutes.js")));

export const PublicRoute = ({ children }) => {
   const user = useSelector((state) => state.auth.user);   // 👈 Obtiene el usuario desde Redux

   return user?.logged ? <DashboardRoutes /> : children;    // 👈 Si el usuario está logueado, navega al Dashboard
};

export default memo(PublicRoute);
