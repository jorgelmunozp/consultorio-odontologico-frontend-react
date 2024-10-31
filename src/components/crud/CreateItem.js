import { useState }  from "react";
import { Alert } from '../../classes/Alert';
import { DropdownClass } from '../../classes/Dropdown';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { Modal } from '../modal/Modal';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { Input } from '../forms/inputs/Input';
import { BotonFetch } from "../../forms/buttons/BotonFetch";

import sign from 'jwt-encode';                                               // Para firma con jwt
import { jwtDecode } from "jwt-decode";
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const CreateItem = ({ classType, Icon, isMenuOpen }) => {
  const [responseStatus, setResponseStatus] = useState(0);
  
  let Classe = '';
  switch (classType) { case 'cita' : Classe = Cita; break;
                       case 'paciente': Classe = Paciente; break;
                       case 'doctor': Classe = Doctor; break;
                       case 'consultorio': Classe = Consultorio; break;
                       case 'tratamiento': Classe = Tratamiento; break;
                       case 'especialidad': Classe = Especialidad; break;
  }

  // --- Clase Item
  const objectClass = new Classe('');                                       // Objeto instanciado con la Class correspondiente
  const state = objectClass.state;
  const urlApi = objectClass.api;
  let item = "";

  // --- Dropdown
  const myDropdown = new DropdownClass();
  const statesDropdown = myDropdown.state;

  // --- Alert
  const MyAlert = new Alert('');                                            // Objeto instanciado con la clase Alert para las alertas
  const { alert, setAlert } = MyAlert.state;
  // const { alerta, setAlertX } = MyAlert.stateAlert;
  // const ModalAlerta = MyAlert.fire('');
    // console.log("alerta: ", alerta)

  // const [alert, setAlert] = useState(false);
 // --- Alert

  let stateValues = [];                                                     // Arreglo con los datos de cada parámetro del objeto
  state.forEach( property => stateValues.push(property.value) );

  if(stateValues.filter( state => state === '').length === 0 ) {            // Verifica que no hayan campos vacios
    state.forEach(property => objectClass[property.key] = property.value);  // Carga los valores ingresados por el usuario en el objeto
    
    item = `JSON.stringify({                           
      ${Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if( 200 <= responseStatus && responseStatus <= 299 ) {
    setAlert('successCreate');
    state.forEach( property => property.setState('') );                     // Reinicia todas las variables
    setResponseStatus(0);
  } else if( 400 <= responseStatus && responseStatus <= 499 ) {
    setAlert('errorCreate');
    setResponseStatus(0);
  } else if( 500 <= responseStatus && responseStatus <= 599 ) {
    setAlert('errorCreate');
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar { Classe.name.charAt(0).toUpperCase() + Classe.name.slice(1) }</h5>
        </center>
        <div className={'container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 ' + (isMenuOpen ? ' ps-5':'' )}>
          {
            state.map(property => {
              return(
                <div key={'row'+property.key} className='row'>
                  {   property.type === 'dropdown' ? <div className='col'><Dropdown property={ property } states={ statesDropdown } className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} /></div>
                                                   : <div className='col'><Input property={ property } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /></div>
                  }
                </div>
              )})
          }
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonFetch endIcon={<Icon />} title={'Registrar'} urlApi={urlApi}  contenidoApi={item} setResponseStatus={setResponseStatus} className={'button rounded border-0 py-3 shadow-sm'} ></BotonFetch>
            </div>
          </div>              
			  </div>
      </div>
      <Modal open={alert} setOpen={setAlert} />
      {/* <Modal type={'successCreate'} open={alert} setOpen={setAlert} title={'Registro exitoso'} /> */}
      {/* <Modal type={'errorCreate'} open={alert} setOpen={setAlert} title={'Datos No Registrados'} /> */}
    </div>
  );
};