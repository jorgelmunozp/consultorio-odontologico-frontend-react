// import { Suspense, lazy, useState, useCallback, useRef } from "react";
// import { createRoot } from "react-dom/client";

// const Modal = lazy(() => import("../components/modal/Modal.js"));
// const Logo = lazy(() => import("../components/icons/logo/Logo.js"));
// const Success = lazy(() => import("../components/icons/alert/Success.js"));
// const Warning = lazy(() => import("../components/icons/alert/Warning.js"));
// const ErrorIcon = lazy(() => import("../components/icons/alert/Error.js"));

// export const useAlert = () => {
//   const [alertConfig, setAlertConfig] = useState(null);
//   const rootRef = useRef(null); // <- Guardamos el root para reutilizarlo

//   const alert = useCallback(
//     ({ type="default", title="", content="", buttons="", theme }) => {
//       const icons = {
//         default: { Icon: Logo, iconColor: "#5285c5" },
//         success: { Icon: Success, iconColor: "#0f0" },
//         warning: { Icon: Warning, iconColor: "#f8bb86" },
//         error: { Icon: ErrorIcon, iconColor: "#f00" },
//       };

//       if (!document.getElementById("modal")) {
//         document.getElementById("root").insertAdjacentHTML("afterend", `<div id="modal"></div>`);
//       }

//       setAlertConfig({ title, content, buttons, theme, Icon: icons[type].Icon, iconColor: icons[type].iconColor, });

//       const root = createRoot(document.getElementById("modal"));
//       root.render(
//         <Suspense fallback={null}><Modal Icon={icons[type].Icon} iconColor={icons[type].iconColor} title={title} content={content} buttons={buttons} fontFamily={"century-gothic"} theme={theme} /></Suspense>
//       );
//     },
//     []
//   );

//   return { alert, alertConfig };
// }

// ******************************************************************
import { Suspense, lazy, useState, useCallback, useRef, useEffect } from "react";
import { createRoot } from "react-dom/client";

const Modal = lazy(() => import("../components/modal/Modal.js"));
const Logo = lazy(() => import("../components/icons/logo/Logo.js"));
const Success = lazy(() => import("../components/icons/alert/Success.js"));
const Warning = lazy(() => import("../components/icons/alert/Warning.js"));
const ErrorIcon = lazy(() => import("../components/icons/alert/Error.js"));

export const useAlert = () => {
  const [alertConfig, setAlertConfig] = useState(null);
  const [openAlert, setOpenAlert] = useState(false);
  const rootRef = useRef(null);

  // Renderiza el modal cada vez que cambie openAlert o alertConfig
  useEffect(() => {
    if (!alertConfig) return;

    let modalContainer = document.getElementById("modal");
    if (!modalContainer) {
      document.getElementById("root").insertAdjacentHTML("afterend", `<div id="modal"></div>`);
      modalContainer = document.getElementById("modal");
    }

    if (!rootRef.current) { rootRef.current = createRoot(modalContainer) }

    rootRef.current.render(
      <Suspense fallback={null}>
        <Modal Icon={alertConfig.Icon} iconColor={alertConfig.iconColor} open={openAlert} setOpen={setOpenAlert} title={alertConfig.title} content={alertConfig.content} buttons={alertConfig.buttons} fontFamily={"century-gothic"} theme={alertConfig.theme} />
      </Suspense>
    );
  }, [openAlert, alertConfig]); // 👈 ahora se re-renderiza siempre que cambie algo

  const icons = {
    default: { Icon: Logo, iconColor: "#5285c5" },
    success: { Icon: Success, iconColor: "#0f0" },
    warning: { Icon: Warning, iconColor: "#f8bb86" },
    error: { Icon: ErrorIcon, iconColor: "#f00" },
  };

  const alert = useCallback(({ type = "default", title = "", content = "", buttons = "", theme }) => {
      setAlertConfig({ Icon: icons[type].Icon, iconColor: icons[type].iconColor, title, content, buttons, theme, });
      setOpenAlert(true);         // Se abre modal aquí
    }, []);

  const closeAlert = useCallback(() => setOpenAlert(false), []);

  return { alert, closeAlert, openAlert, setOpenAlert };
};