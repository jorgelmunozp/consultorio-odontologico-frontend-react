// import { memo, useContext } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import { AuthContext } from '../auth/authContext.js';

// const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

// export const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);
//   const { pathname, search } = useLocation();

//   localStorage.setItem( 'lastPath', pathname + search );

//   return user.logged ? children : <Navigate to={"/" + urlBaseFrontend} /> 
// }
// export default memo(PrivateRoute);




import { memo } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const urlBaseFrontend = process.env.REACT_APP_URL_BASE_FRONTEND;

export const PrivateRoute = ({ children }) => {
  const user = useSelector(state => state.auth.user);  // 👈 Leer del store de Redux
  const { pathname, search } = useLocation();

  // 👇 Guardamos el último path en localStorage (opcional)
  localStorage.setItem('lastPath', pathname + search);

  return user?.logged ? children : <Navigate to={`/${urlBaseFrontend}`} />;
};

export default memo(PrivateRoute);
