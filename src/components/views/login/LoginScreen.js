import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../auth/authContext';
import { types } from '../../../types/types';
import { InputText } from '../../forms/inputs/InputText';
import { InputPassword } from '../../forms/inputs/InputPassword';

const superuser = process.env.REACT_APP_SUPERUSER;
const password = process.env.REACT_APP_PASSWORD;
const username = process.env.REACT_APP_USERNAME;

export const LoginScreen = ({ setAlertMessage,setAlertType }) => {
  const [ userInput,setUserInput ] = useState("");
  const [ passwordInput,setPasswordInput ] = useState("");

  const navigate = useNavigate();
  const { user,dispatch } = useContext(AuthContext);

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
    <div className='container mt-1 text-center user-select-none'>
        <div className="d-grid gap-2 col mx-auto pb-3 w-100">
          <InputText placeholder={'Usuario'} inputText={userInput} onInputChange={(target) => setUserInput(target.target.value)} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
          <InputPassword placeholder={'Contraseña'} inputText={passwordInput} onInputChange={(target) => setPasswordInput(target.target.value)} className='input form-control rounded border-muted border-1 text-muted text-center my-1 shadow-sm' />
          
          <button className='btn btn-login my-1 py-3 rounded shadow-sm' data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target={user.logged ? "" : "#loginModalFail"} aria-controls="modalBody" onClick={ handleLogin }>Ingresar</button>
          <button type="button" className="btn btn-outline-danger py-3 shadow-sm" data-bs-dismiss="modal">Cancelar</button>
        </div>
    </div>
  )
};