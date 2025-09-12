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
