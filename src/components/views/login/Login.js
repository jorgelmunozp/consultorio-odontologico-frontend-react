import { lazy, memo, useState } from 'react';
import { useThemeContext } from "../../../theme/ThemeContext.js";

const Logo = memo( lazy(() => import('../../icons/logo/Logo.js')) );
const LoginForm = memo( lazy(() => import('./LoginForm.js')) );
const LoginAlert = memo( lazy(() => import('./LoginAlert.js')) );

export const Login = ({ Icon, user }) => {
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");

    const { theme } = useThemeContext();        // 👈 Call the global theme

    if( process.env.NODE_ENV === 'development' ) { console.log('[Login 👤]') }
    return (
    <>
        <div id='login' className="modal fade" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div className="loginBackdrop" data-bs-dismiss="modal"></div>
            <div id='loginModal' className="modal-dialog modal-dialog-centered">
                <div id='loginContent' className="modal-content" data-theme={theme}>
                    <div className="modal-header d-grid mx-auto border-0 mt-4 pb-1 justify-items-center">
                        <Icon strokeWidth={1} height={1.5} width={1.5} data-bs-dismiss="modal" className="main-color fs-5" />
                        <h1 className="main-color fs-5 pb-4" id="loginModalLabel">Ingresar</h1>
                    </div>
                    <div className="modal-body mx-auto w-100 pt-1">
                        <LoginForm setAlertMessage={setAlertMessage} setAlertType={setAlertType} />
                    </div>
                </div>
            </div>

            {/* <div className="darkBackground" onClick={handleClose}></div> */}
        </div>
        <LoginAlert Logo={Logo} user={user} alertMessage={alertMessage} alertType={alertType} />
    </>
  )
}
export default memo(Login);