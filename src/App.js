import { lazy, memo, useEffect, useReducer, useMemo } from 'react';
import { AuthContext } from './auth/authContext.js';
import { authReducer } from './auth/authReducer.js';

const AppRouter = memo( lazy(() => import('./routers/AppRouter.js')) );

const init = () => { return JSON.parse(localStorage.getItem('user') ) || { logged: false}; }

export const App = () => {
  const [user, dispatch] = useReducer( authReducer, {}, init );

  useEffect(() => {
    if(!user) return;
    localStorage.setItem('user', JSON.stringify(user));
  }, [user] );

  const authContextValue = useMemo(() => ({ user, dispatch }), [user, dispatch]);

  if( process.env.NODE_ENV === 'development' ) { console.log('[App]') }

  return (
    <AuthContext.Provider value={authContextValue}>
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default memo(App);