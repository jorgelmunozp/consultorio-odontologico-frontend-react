import { lazy, useEffect, useState }  from "react";
import { createRoot } from 'react-dom/client';

import { Alert } from '../alert/Alert.js';
import { Dropdown as DropdownClass } from '../../classes/Dropdown.js';
import { Cita } from '../../classes/Cita.js';
import { Paciente, Doctor } from '../../classes/User.js';
import { Especialidad } from '../../classes/Especialidad.js';
import { Consultorio } from '../../classes/Consultorio.js';
import { Tratamiento } from '../../classes/Tratamiento.js';

import sign from 'jwt-encode';                                              // Para firma con jwt
import { jwtDecode as decode } from "jwt-decode";

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));
const BotonFetch = lazy(() => import('../forms/buttons/BotonFetch.js'));

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const CreateItem = ({ classType, Icon, isMenuOpen, theme }) => {
  const [responseStatus, setResponseStatus] = useState(0);
  
  const classes = { cita: { Classe: Cita },
                    paciente: { Classe: Paciente },
                    doctor: { Classe: Doctor },
                    consultorio: { Classe: Consultorio },
                    tratamiento: { Classe: Tratamiento },
                    especialidad: { Classe: Especialidad }
  }

  // --- Clase Item
  const objectClass = new classes[classType].Classe('');                    // Objeto instanciado con la Class correspondiente
  const state = objectClass.state;
  const urlApi = objectClass.api;
  let item = "";

  if(state.filter( property => property.value === '').length === 0 ) {      // Check for emtpy fields to avoid any empty item
    state.forEach( property => objectClass[property.key] = property.value );// Carga los valores ingresados por el usuario en el objeto
    
    item = `JSON.stringify({                           
      ${classes[classType].Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
  } 

  if( 200 <= responseStatus && responseStatus <= 299 ) {
    console.log("state CreateItem 1: ", state)
//************ SI FUNCIONA PERO NO RENDERIZA: -->
    state.forEach( property => property.setState('') );                    // Reinicia todas las variables  
    // state.forEach( 
    //   property => { property.setState('');
    //   const myDropdown = new DropdownClass({ classType:property.key });
    //   const { array, pagination } = myDropdown.getData();

    //   const row = createRoot(document.getElementById( 'row'+property.key ));
    //   row.render(
    //     <>
    //       { property.type === 'dropdown' ? <div className='col'><Dropdown classType={property.key} object={myDropdown} array={array} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} /></div>
    //                                      : <div className='col'><Input type={property.type} defaultValue={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /></div>
    //       }
    //     </>
    //   )}
    // );                     // Reinicia todas las variables  
    


    console.log("state CreateItem 2: ", state)

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
              const { array, pagination } = myDropdown.data;

              return (
                <div key={'row'+property.key} id={'row'+property.key} className='row'>
                  <>
                  { property.type === 'dropdown' ? <div className='col'><Dropdown classType={property.key} object={myDropdown} array={array} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} data-theme={theme} /></div>
                                                 : <div className='col'><Input type={property.type} defaultValue={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} data-theme={theme} /></div>
                  }
                  </>
                </div>
              )})
          }
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonFetch endIcon={<Icon />} title={'Registrar'} urlApi={urlApi} dataApi={item} setResponseStatus={setResponseStatus} className={'button rounded border-0 py-3 shadow-sm'} ></BotonFetch>
            </div>
          </div>              
			  </div>
      </div>
    </div>
  );
};