import { useState }  from "react";
import { Alert } from '../alert/Alert';
import { DropdownClass } from '../../classes/Dropdown';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { Input } from '../forms/inputs/Input';
import { BotonFetch } from "../forms/buttons/BotonFetch";

import sign from 'jwt-encode';                                               // Para firma con jwt
import { jwtDecode } from "jwt-decode";
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const CreateItem = ({ classType, Icon, isMenuOpen }) => {
  const [responseStatus, setResponseStatus] = useState(0);
  
  const classes = { cita: { Classe: Cita },
                    paciente: { Classe: Paciente },
                    doctor: { Classe: Doctor },
                    consultorio: { Classe: Consultorio },
                    tratamiento: { Classe: Tratamiento },
                    especialidad: { Classe: Especialidad }
  }

  // --- Clase Item
  const objectClass = new classes[classType].Classe('');                                       // Objeto instanciado con la Class correspondiente
  const state = objectClass.state;
  const urlApi = objectClass.api;
  let item = "";

  let stateValues = [];                                                     // Arreglo con los datos de cada parámetro del objeto
  state.forEach( property => stateValues.push(property.value) );

  if(stateValues.filter( state => state === '').length === 0 ) {            // Verifica que no hayan campos vacios
    state.forEach(property => objectClass[property.key] = property.value);  // Carga los valores ingresados por el usuario en el objeto
    
    item = `JSON.stringify({                           
      ${classes[classType].Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if( 200 <= responseStatus && responseStatus <= 299 ) {
    state.forEach( property => property.setState('') );                     // Reinicia todas las variables
    Alert({ type:'success', title:'Registro exitoso' }).launch();
    setResponseStatus(0);
  } else if( 400 <= responseStatus && responseStatus <= 499 ) {
    Alert({ type:'error', title:'Error en el registro' }).launch();
    setResponseStatus(0);
  } else if( 500 <= responseStatus && responseStatus <= 599 ) {
    Alert({ type:'error', title:'Error en el registro' }).launch();
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar { classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
        </center>
        <div className={'container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth ' + (isMenuOpen ? ' w-responsive':' px-sm-5 w-100' )}>
          {
            state.map((property) => {
              const myDropdown = new DropdownClass({ classType:property.key });
              const { array, pagination } = myDropdown.getData();

              return(
                <div key={'row'+property.key} className='row'>
                  { property.type === 'dropdown' ? <div className='col'><Dropdown classType={property.key} array={array} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} /></div>
                                                 : <div className='col'><Input value={property.value} type={property.type} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /></div>
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
    </div>
  );
};