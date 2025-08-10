import { lazy, useState, useMemo }  from "react";
import { Alert } from '../alert/Alert.js';
import { Dropdown as DropdownClass } from '../../classes/Dropdown.js';
import { fetchCreate } from '../../helpers/fetchCreate.js';
import { Classes } from '../../classes/Classes.js';                         // Importing Classes module to access all class definitions

import sign from 'jwt-encode';                                              // Para firma con jwt
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

// --- Componente hijo para memorizar cada dropdown ---
const DropdownField = ({ property, theme }) => {
  const myDropdown = useMemo( () => new DropdownClass({ classType: property.key }), [property.key] );
  const { array, pagination } = myDropdown.data;

  return (
    <div className='col px-0'>
      <Dropdown classType={property.key} object={myDropdown} array={array} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} data-theme={theme} />
    </div>
  );
};

export const CreateItem = ({ classType, Icon, isMenuOpen, theme }) => {
  // --- Clase Item
  const objectClass = new Classes[classType].Classe('');                    // Objeto instanciado con la Class correspondiente
  const state = objectClass.state;
  const urlApi = objectClass.api;
  let item = "";

  const handleCreate = (item) => {
    if( state.every( property => property.value !== '') ) {                   // Check for emtpy fields to avoid any empty item
      state.forEach( property => objectClass[property.key] = property.value );// Carga los valores ingresados por el usuario en el objeto
      
      item = `JSON.stringify({                           
        ${Classes[classType].Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
      })`; 
    } 
    if( item.length === 0 ) { Alert({ type:'warning', title:'Debes ingresar todos los datos' }).launch() }
    else { 
      fetchCreate(urlApi,item).then(
        async (responseStatus) => {
            if( 200 <= responseStatus && responseStatus <= 299 ) {
              state.forEach( property => { property.handleChange( sign('',jwtSecretKey) ) } );    // Reinicia todas las variables     

              Alert({ type:'success', title:'Registro exitoso' }).launch();
            } else if( 400 <= responseStatus && responseStatus <= 499 ) {
              Alert({ type:'error', title:'Error en el registro' }).launch();
            } else if( 500 <= responseStatus && responseStatus <= 599 ) {
              Alert({ type:'error', title:'Error en el registro' }).launch();
            }
        },
        (error) => { Alert({ type:'error', title:'Error en la creación' }).launch(); console.log("Error en la creación: ",error) }
      ) 
    }
  }

  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar { classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
        </center>
        <div className={'container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth ' + (isMenuOpen ? ' w-responsive':' px-sm-5 w-100' )}>
          <>
            {
              state.map((property) => {
                return (
                  <div key={'row'+property.key} id={'row'+property.key} className='row'>
                    <>
                      { property.type === 'dropdown' ? <DropdownField property={property} theme={theme} />
                                                    : <div className='col px-0'><Input type={property.type} defaultValue={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} data-theme={theme} /></div>
                      }
                    </>
                  </div>
                )})
            }
          </>
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <button onClick={ ()=>handleCreate(item) } className={ 'button rounded border-0 py-3 shadow-sm' }> { 'Registrar' } { <Icon /> } </button>
            </div>
          </div>              
			  </div>
      </div>
    </div>
  );
};