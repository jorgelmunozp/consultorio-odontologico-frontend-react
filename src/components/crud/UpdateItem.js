import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { DropdownClass } from '../../classes/Dropdown';
import { fetchUpdate } from '../../helpers/fetchUpdate';
import { CalendarEdit } from '../icons/calendar/CalendarEdit';
import { UserEdit } from '../icons/user/UserEdit';
import { HomeEdit } from '../icons/home/HomeEdit';
import { FilterEdit } from '../icons/filter/FilterEdit';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { Input } from '../forms/inputs/Input';
import { myColor } from '../../global';
import '../modal/modal.css';

import sign from 'jwt-encode';                                                  // Para firma con jwt
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const UpdateItem = ({ classType, item, urlApi, setOpen, setAlert, Row, state }) => { 
  let Icon = '';                                                  // Selección de icono correspondiente
  switch (classType) { case 'cita' : Icon = CalendarEdit; break;
                       case 'paciente': Icon = UserEdit; break;
                       case 'doctor': Icon = UserEdit; break;
                       case 'consultorio': Icon = HomeEdit; break;
                       case 'tratamiento': Icon = FilterEdit; break;
                       case 'especialidad': Icon = FilterEdit; break;
  }
  
  // --- Dropdown
  const myDropdown = new DropdownClass();
  const statesDropdown = myDropdown.state;
  
  let stateValues = [];                                                         // Arreglo con los datos de cada parámetro del objeto
 
  useEffect(()=>{                                                               // Carga los valores del item seleccionado en el estado para su actualización
      state.forEach((property,index) => { property.setState( Object.values(item[classType])[index] ) });
  },[])

  const handleUpdate = () => {
    state.forEach(property => stateValues.push(property.value));                // Push en el arreglo con los valores de los datos de cada parámetro del objeto

    if(stateValues.filter(state => state === '').length === 0) {                // Verifica que no hayan campos vacios
      Object.keys(item[classType]).forEach((property,index) => { item[classType][property] = stateValues[index] });   // Actualiza los nuevos valores en el item
      
      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);   // Fetch PUT para actualización de datos
      fetchResponse.then(
        async function(value) {
            if(200 <= value && value <= 299) { 
            await fetch(urlApi)                                                 // API Restful para actualizar datos en la base de datos
                .then(response => response.json())
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row classType={classType} item={item} urlApi={urlApi} state={state} />);

            setAlert('successUpdate')
          }
          else { setAlert('errorUpdate') }
        },
        function(error) { setAlert('Error Update: ', error) }
      )
    }
  };

  return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
                <h6 className={'modalTitle main-color pt-2'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2'>
                  <div className='row modalTableTitle'>
                    <div className='col'>Datos</div>
                  </div>
                  <div className='row'>
                    <div className='col text-start'>
                      <Input property={ {key:'código', value:item.id, type:'number'} }  className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} /></div>
                  </div>
                  {
                    state.map((property,index)=>{ 
                      return(
                        <div key={index} className='row'>
                          <div className='col text-start'>
                            { property.type === 'dropdown' 
                                  ? <Dropdown property={ property } defaultSelect={ property.value } states={ statesDropdown } className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} />
                                  : <Input property={ property } className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                            }
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-flex mt-2 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={() => { handleUpdate(); setAlert(true); setOpen(false) }}>Actualizar</button>
                  <button className={'cancelBtn w-100'} onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};