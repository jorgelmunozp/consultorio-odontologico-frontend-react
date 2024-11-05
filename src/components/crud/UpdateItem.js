import { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Alert } from '../alert/Alert';
import { DropdownClass } from '../../classes/Dropdown';
import { fetchUpdate } from '../../helpers/fetchUpdate';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { Input } from '../forms/inputs/Input';
import { myColor } from '../../global';
import '../modal/modal.css';

import sign from 'jwt-encode';                                                  // Para firma con jwt
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, Row, icons, state }) => { 
  let stateValues = [];                                                         // Arreglo con los datos de cada parámetro del objeto
   useEffect(()=>{                                                              // Carga los valores del item seleccionado en el estado para su actualización
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
            row.render(<Row classType={classType} icons={icons} item={item} urlApi={urlApi} state={state} />);

            Alert({ type:'success', title:'Actualización exitosa' }).launch()

          }
          else { Alert({ type:'error', title:'Error en la actualización' }).launch() }
        },
        function(error) { Alert({ type:'error', title:'Error en la actualización' }).launch(); console.log('Error Update: ', error) }
      )
    }
  };

  return (
        <>
          <div className={'modalContainer justify-items-center'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
                <h6 className={'modalTitle main-color pt-2'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2'>
                  <div className='row'>
                    <Input placeholder={'Código'} value={item.id} type={'number'} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} />
                  </div>
                  {
                    state.map((property,index)=>{
                      const myDropdown = new DropdownClass({ classType:property.key });
                      const { array, pagination } = myDropdown.getData();

                      return(
                        <div key={index} className='row'>
                          { property.type === 'dropdown' 
                                ? <Dropdown classType={property.key} array={array} defaultSelect={ property.value } handleChange={ property.handleChange } placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} />
                                : <Input property={true} value={property.value} type={property.type} onChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-flex mt-2 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={() => { handleUpdate(); setOpen(false) }}>Actualizar</button>
                  <button className={'cancelBtn w-100'} onClick={() => setOpen(false)}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};