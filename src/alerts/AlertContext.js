import { Suspense, lazy, createContext, useContext, useState, useCallback, useMemo  } from "react";

const Modal = lazy(() => import("./modal/Modal.js"));
const Logo = lazy(() => import("../components/icons/logo/Logo.js"));
const Success = lazy(() => import("../components/icons/alert/Success.js"));
const Warning = lazy(() => import("../components/icons/alert/Warning.js"));
const ErrorIcon = lazy(() => import("../components/icons/alert/Error.js"));

const AlertContext = createContext();

export const AppAlerts = ({ children }) => {
  const [alertConfig, setAlertConfig] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);

  // Iconos memorizados para que no se re-cree en cada render
  const icons = useMemo(() => ({
    default: { Icon: Logo, iconColor: "#5285c5" },
    success: { Icon: Success, iconColor: "#0f0" },
    warning: { Icon: Warning, iconColor: "#f8bb86" },
    error: { Icon: ErrorIcon, iconColor: "#f00" },
  }), []);

  const alert = useCallback( ({ type = "default", title = "", content = "", buttons = "" }) => {
      setAlertConfig({
        Icon: icons[type].Icon,
        iconColor: icons[type].iconColor,
        title,
        content,
        buttons,
      });
      setOpenAlert(true);
  }, [icons] );

  const closeAlert = useCallback(() => setOpenAlert(false), []);

  const valueAlertContext = useMemo(() => ({
    alert,
    closeAlert,
    openAlert,
    setOpenAlert,
  }), [alert, closeAlert, openAlert]);

  return (
    <AlertContext.Provider value={valueAlertContext}>
      {children}

      {/* Modal se renderiza dentro del mismo árbol de React */}
      { alertConfig && ( <Suspense fallback={null}>
                           <Modal Icon={alertConfig.Icon} iconColor={alertConfig.iconColor} open={openAlert} setOpen={setOpenAlert} title={alertConfig.title} content={alertConfig.content} buttons={alertConfig.buttons} fontFamily="century-gothic" />
                         </Suspense>
                       )}
    </AlertContext.Provider>
  );
};

export const useAlertContext = () => useContext(AlertContext);