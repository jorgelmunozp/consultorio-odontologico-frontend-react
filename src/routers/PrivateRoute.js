import { memo, useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext.js';

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  localStorage.setItem( 'lastPath', pathname + search );

  return user.logged ? children : <Navigate to={"/" + urlBaseFrontend} /> 
}
export default memo(PrivateRoute);