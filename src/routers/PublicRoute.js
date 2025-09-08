import { lazy, memo, useContext } from 'react';
import { AuthContext } from '../auth/authContext.js'

const DashboardRoutes = memo( lazy(() => import('./DashboardRoutes.js')) );

export const PublicRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    return user.logged ? <DashboardRoutes /> : children
}
export default PublicRoute;