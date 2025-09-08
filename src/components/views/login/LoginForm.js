import { lazy, memo, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext.js';
import { types } from '../../../types/types.js';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import { jwtDecode as decode } from "jwt-decode";

const Input = memo( lazy(() => import('../../forms/inputs/Input.js')) );
const InputPassword = memo( lazy(() => import('../../forms/inputs/InputPassword.js')) );

const superuser = process.env.REACT_APP_SUPERUSER;
const password = process.env.REACT_APP_SUPERPASSWORD;
const username = process.env.REACT_APP_USERNAME;

export const LoginForm = ({ setAlertMessage, setAlertType }) => {
  const [userInput,setUserInput] = useState("");
  const [passwordInput,setPasswordInput] = useState("");

  const navigate = useNavigate();
  const { user,dispatch } = useContext(AuthContext);

  const { theme } = useThemeContext();        // 👈 Call the global theme

  const handleLogin = () => {
    if( userInput === superuser && passwordInput === password ) {
      setAlertMessage("");
      setAlertType("");
      const action = { type: types.login, payload: { name: username } }
      dispatch(action);
  
      const lastPath = localStorage.getItem('lastPath') || '/';
      navigate(lastPath, { replace: true });
    } else if( userInput === "" && passwordInput === "" ) {
      setAlertMessage("Debes ingresar usuario y contraseña");
      setAlertType("warning");
    } else {
      setUserInput("");
      setPasswordInput("");
      setAlertMessage("Usuario o contraseña no válidos");
      setAlertType("error");
    }
  }
  return (
    <div id='loginForm' className='container mt-1 text-center user-select-none' data-theme={theme}>
        <div className="d-grid gap-2 col mx-auto pb-3 w-100">
          <Input placeholder={'Usuario'} value={userInput} type={'text'} handleChange={(target) => setUserInput( decode(target) )} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
          <InputPassword placeholder={'Contraseña'} value={passwordInput} handleChange={(target) => setPasswordInput( target.target.value )} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
          
          <button className='btn btn-login century-gothic my-1 py-3 rounded shadow-sm' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target={user.logged ? "" : "#loginAlert"} aria-controls="modalBody" onClick={ handleLogin }>Ingresar</button>
          <button type="button" className="btn btn-outline-danger century-gothic py-3 shadow-sm" data-bs-dismiss="modal">Cancelar</button>
        </div>
    </div>
  )
};
export default memo(LoginForm);