import { lazy, useState }  from "react";
import { useAlert } from "../../hooks/useAlert.js";
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { fetchCreate } from '../../helpers/fetchCreate.js';

import sign from 'jwt-encode';                                              // Para firma con jwt
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

export const CreateItem = ({ classType, Icon, isMenuOpen, theme }) => {
  const { alert } = useAlert();

  // 👇 Guarda la key del dropdown abierto
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  // --- Object Item
  const objectHook = useCrudFactory({ classType:classType });                    // Objeto instanciado con el Hook correspondiente 

  const state = objectHook.state;
  const urlApi = objectHook.api;
  const item = objectHook.dataObject;

  let dataItem = "";

  const handleCreate = () => {
    if( state.every( property => property.value !== '') ) {                   // Check for emtpy fields to avoid any empty item
      state.forEach( property => item[property.key] = property.value );   // Carga los valores ingresados por el usuario en el objeto

      dataItem = JSON.stringify({ [classType]: item }); 
    } 

    if( dataItem.length === 0 ) { alert({ type:'warning', title:'Debes ingresar todos los datos', buttons:1, theme:theme }) }
    else { 
      fetchCreate(urlApi,dataItem).then(
        async (responseStatus) => {
            if( 200 <= responseStatus && responseStatus <= 299 ) {
              state.forEach( property => { property.handleChange( sign('',jwtSecretKey) ) } );    // Reinicia todas las variables     

              alert({ type:'success', title:'Registro exitoso', buttons:1, theme:theme });
            } else if( 400 <= responseStatus && responseStatus <= 499 ) {
              alert({ type:'error', title:'Error en el envío de datos', buttons:1, theme:theme });
            } else if( 500 <= responseStatus && responseStatus <= 599 ) {
              alert({ type:'error', title:'Error en el servidor remoto', buttons:1, theme:theme });
            }
        },
        (error) => { alert({ type:'error', title:'Error en el registro', buttons:1, theme:theme }); console.log("Error en la creación: ",error) }
      ) 
    }
  }

  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth ' + (isMenuOpen ? ' w-responsive' : ' w-100' )}>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar { classType.charAt(0).toUpperCase() + classType.slice(1) }</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth'>
          <>
            {
              state.map((property) => {
                return (
                  <div key={'row'+property.key} id={'row'+property.key} className='row'>
                    <>
                      { property.type === 'dropdown' ? <Dropdown property={property} isOpen={openDropdownKey === property.key} onToggle={() => setOpenDropdownKey(prev => prev === property.key ? null:property.key )} theme={theme} />
                                                     : <div className='col px-0'><Input type={property.type} value={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} theme={theme} /></div>
                      }
                    </>
                  </div>
                )})
            }
          </>
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <button onClick={ ()=>handleCreate() } className={ 'button bg-main-color text-white rounded border-0 py-3 w-50 shadow-sm' }> { 'Registrar' } { <Icon /> } </button>
            </div>
          </div> 
			  </div>
      </div>
    </div>
  );
};