// import { lazy, useEffect, useReducer, useMemo } from 'react';
// import { AuthContext } from './auth/authContext.js';
// import { authReducer } from './auth/authReducer.js';

// const AppRouter = lazy(() => import('./routers/AppRouter.js'));

// // 👇 Init seguro (previene errores si el JSON está corrupto)
// const init = () => {
//   try { return JSON.parse(localStorage.getItem("user")) || { logged: false } } 
//   catch { return { logged: false } }
// };

// export const App = () => {
//   const [user, dispatch] = useReducer( authReducer, {}, init );

//   useEffect(() => {
//     if(!user) return;
//     localStorage.setItem('user', JSON.stringify(user));
//   }, [user] );

//   const authContextValue = useMemo(() => ({ user, dispatch }), [user]);

//   if( process.env.NODE_ENV === 'development' ) { console.log('[App]') }

//   return (
//     <AuthContext.Provider value={authContextValue}>
//       <AppRouter />
//     </AuthContext.Provider>
//   )
// }

// export default App;


import { lazy, memo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index.js";

const AppRouter = memo(lazy(() => import("./routers/AppRouter.js")));

export const App = () => {
  if (process.env.NODE_ENV === "development") console.log("[App] 👇");

  return (
    <Provider store={store}>
      {/* 👇 PersistGate espera a que cargue el estado desde localStorage */}
      <PersistGate loading={<div>Cargando sesión...</div>} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default memo(App);
