import '../modal/modal.css';
import { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { Alert } from '../alert/Alert.js';
// import { Item } from './Item.js';
import { Dropdown as DropdownClass } from '../../classes/Dropdown.js';
import { fetchUpdate } from '../../helpers/fetchUpdate.js';
import { myColor } from '../../global.js';

const Item = lazy(() => import('./Item.js'));
const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, objectClass, icons, handleItems }) => { 

  let state = {};
  switch( classType ) {
    case 'cita': state = objectClass.getState({ pac:item[classType].paciente, cons:item[classType].consultorio, doc:item[classType].doctor, trat:item[classType].tratamiento }); break;
    case 'paciente': state = objectClass.getState({ nomb:item[classType].nombre, ape:item[classType].apellido, id:item[classType].identificacion, gen:item[classType].genero, eps_:item[classType].eps }); break;
    case 'doctor': state = objectClass.getState({ nomb:item[classType].nombre, ape:item[classType].apellido, id:item[classType].identificacion, gen:item[classType].genero, esp:item[classType].especialidad }); break;
    case 'consultorio': state = objectClass.getState({ num:item[classType].numero, nomb:item[classType].nombre }); break;
    case 'tratamiento': state = objectClass.getState({ esp:item[classType].especialidad, cons:item[classType].consultorio, doc:item[classType].doctor }); break;
  }
  
  const handleClose = () => { setOpen(false); }                                 // Gestiona el cierre del modal

  const handleUpdate = () => {
    if(state.filter( property => property.value === '').length === 0 ) {        // Check for emtpy fields to avoid any empty item
      state.forEach((property) => { item[classType][property.key] = property.value });   // Actualiza los nuevos valores en el item

      fetchUpdate(urlApi,JSON.stringify(item),item.id).then(                    // Fetch PUT para actualización de datos
        async (value) => {
            if(200 <= value && value <= 299) { 
            await fetch(urlApi)                                                 // API Restful para actualizar datos en la base de datos
                .then(response => response.json())
      
            // const row = createRoot(document.getElementById( 'row'+classType+item.id ));
            // row.render(<Item classType={classType} icons={icons} item={item} urlApi={urlApi} objectClass={objectClass} />);
            handleItems('update',item.id);          // El padre actualiza el estado y React re-renderiza sin el elemento eliminado
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
                  {
                    state.map((property,index)=>{
                      const myDropdown = new DropdownClass({ classType:property.key });
                      const { array, pagination } = myDropdown.getData();

                      return(
                        <div key={index} className='row'>
                          { property.type === 'dropdown' 
                                ? <Dropdown classType={property.key} object={myDropdown} array={array} defaultSelect={ property.value } handleChange={ property.handleChange } placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} />
                                : <Input property={true} defaultValue={property.value} type={property.type} onChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} />
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              <div className={'modalFooter'}>
                <div className={'d-flex mt-2 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={() => { handleUpdate(); handleClose() }}>Actualizar</button>
                  <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancel</button>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={ handleClose }></div>
        </>
      )
};