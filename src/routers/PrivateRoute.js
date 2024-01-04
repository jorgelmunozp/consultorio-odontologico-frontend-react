import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../auth/authContext'

export const PrivateRoute = ({ children }) => {
  const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

  const { user } = useContext(AuthContext);
  const { pathname, search } = useLocation();

  localStorage.setItem( 'lastPath', pathname + search );

  return user.logged ? children : <Navigate to={"/" + urlBaseFrontend + "/index"} /> 
}
