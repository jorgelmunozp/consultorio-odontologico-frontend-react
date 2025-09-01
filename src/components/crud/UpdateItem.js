import '../modal/modal.css';
import { lazy, useMemo } from 'react';
import { Alert } from '../alert/Alert.js';
import { Dropdown as DropdownClass } from '../../classes/Dropdown.js';
import { fetchUpdate } from '../../helpers/fetchUpdate.js';
import { myColor } from '../../global.js';

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

// --- Componente hijo para memorizar cada dropdown ---
const DropdownField = ({ property, theme }) => {
  const myDropdown = useMemo( () => new DropdownClass({ classType: property.key }), [property.key] );
  const { array, pagination } = myDropdown.data;

  return (
    <div className='col px-0'>
      <Dropdown classType={property.key} object={myDropdown} array={array} defaultSelect={ property.value } handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} theme={theme} />
    </div>
  );
};

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, objectClass, handleItems, theme }) => { 
  let state = {};
  switch( classType ) {
    case 'cita': state = objectClass.getState({ pac:item[classType].paciente, cons:item[classType].consultorio, doc:item[classType].doctor, trat:item[classType].tratamiento }); break;
    case 'paciente': state = objectClass.getState({ nomb:item[classType].nombre, ape:item[classType].apellido, id:item[classType].identificacion, gen:item[classType].genero, eps_:item[classType].eps }); break;
    case 'doctor': state = objectClass.getState({ nomb:item[classType].nombre, ape:item[classType].apellido, id:item[classType].identificacion, gen:item[classType].genero, esp:item[classType].especialidad }); break;
    case 'consultorio': state = objectClass.getState({ num:item[classType].numero, nomb:item[classType].nombre }); break;
    case 'especialidad': state = objectClass.getState({ nomb:item[classType].nombre }); break;
    case 'tratamiento': state = objectClass.getState({ esp:item[classType].especialidad, cons:item[classType].consultorio, doc:item[classType].doctor }); break;
    default: state = objectClass.getState({}); break;
  }
  
  const handleClose = () => { setOpen(false); }                                 // Gestiona el cierre del modal

  const handleUpdate = () => {
    if( state.every( property => property.value !== '') ) {                     // Check for emtpy fields to avoid any empty item
      state.forEach((property) => { item[classType][property.key] = property.value });   // Actualiza los nuevos valores en el item

      fetchUpdate(urlApi,JSON.stringify(item),item.id).then(                    // Fetch PUT para actualización de datos
        async (responseStatus) => {
            if(200 <= responseStatus && responseStatus <= 299) { 
            await fetch(urlApi)                                                 // API Restful para actualizar datos en la base de datos
                .then(response => response.json())
      
            handleItems('update',item.id, classType);          // El padre actualiza el estado y React re-renderiza con el elemento actualizado
            Alert({ type:'success', title:'Actualización exitosa' }).launch()
          }
          else { Alert({ type:'error', title:'Error en la actualización' }).launch() }
        },
        (error) => { Alert({ type:'error', title:'Error en la actualización' }).launch(); console.log('Error Update: ', error) }
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
                  <Input placeholder={'Código'} defaultValue={item.id} type={'number'} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} />
                </div>
                { state.map((property,index)=>{
                    return(
                      <div key={'row'+index} className='row'>
                        { property.type === 'dropdown' ? <DropdownField property={property} theme={theme} />
                                                       : <div className='col px-0'><Input property={true} defaultValue={property.value} type={property.type} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} /></div>
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className={'modalFooter'}>
              <div className={'d-flex mt-2 w-100'}>
                <button className={'aceptBtn w-100'} onClick={() => { handleUpdate(); handleClose(); }}>Actualizar</button>
                <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div className={'darkBackground'} onClick={ handleClose }></div>
      </>
    )
};