import '../modal/modal.css';
import { lazy } from 'react';
import { Alert } from '../alert/Alert.js';
import { useDropdown } from '../../hooks/useDropdown.js';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { fetchUpdate } from '../../helpers/fetchUpdate.js';
import { myColor } from '../../global.js';

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

// --- Componente hijo para memorizar cada dropdown ---
const DropdownField = ({ property, theme }) => {
  const { value, setValue, array, pagination } = useDropdown({ classType:property.key, defaultValue:property.value });

  return (
    <div className='col px-0'>
      <Dropdown classType={property.key} value={value} setValue={setValue} array={array} defaultSelect={ property.value } handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} pagination={pagination} className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} theme={theme} />
    </div>
  );
};

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, handleItems, theme }) => { 
  let initialValues = {};
  switch( classType ) {
    case 'cita': initialValues = { paciente:item[classType].paciente, consultorio:item[classType].consultorio, doctor:item[classType].doctor, tratamiento:item[classType].tratamiento }; break;
    case 'paciente': initialValues = { nombre:item[classType].nombre, apellido:item[classType].apellido, identificacion:item[classType].identificacion, genero:item[classType].genero, eps_:item[classType].eps }; break;
    case 'doctor': initialValues = { nombre:item[classType].nombre, apellido:item[classType].apellido, identificacion:item[classType].identificacion, genero:item[classType].genero, especialidad:item[classType].especialidad }; break;
    case 'consultorio': initialValues = { numero:item[classType].numero, nombre:item[classType].nombre }; break;
    case 'especialidad': initialValues = { nombre:item[classType].nombre }; break;
    case 'tratamiento': initialValues = { especialidad:item[classType].especialidad, consultorio:item[classType].consultorio, doc:item[classType].doctor }; break;
    default: initialValues = {}; break;
  }

  const state = useCrudFactory({ classType:classType, initialValues:initialValues }).state;

  const handleClose = () => { setOpen(false); }                                 // Gestiona el cierre del modal

  const handleUpdate = () => {
    if( state.every( property => property.value !== '') ) {                     // Check for emtpy fields to avoid any empty item
      state.forEach((property) => { item[classType][property.key] = property.value });   // Actualiza los nuevos valores en el item

      fetchUpdate(urlApi,JSON.stringify(item),item._id).then(                    // Fetch PUT para actualización de datos
        async (responseStatus) => {
            if(200 <= responseStatus && responseStatus <= 299) { 
            await fetch(urlApi)                                                 // API Restful para actualizar datos en la base de datos
                .then(response => response.json())
      
            handleItems('update',item._id, classType);          // El padre actualiza el estado y React re-renderiza con el elemento actualizado
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
          <div id={'modalBox'} className={'modalBox'} data-theme={theme}>
            <div className={'modalHeader'}>
              <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
              <h6 className={'modalTitle main-color pt-2'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
            </div>
            <div className={'modalContent'}>
              <div className='container-fluid modalTable mt-2'>
                <div className='row'>
                  <Input placeholder={'Código'} defaultValue={item._id} type={'text'} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} theme={theme} />
                </div>
                { state.map((property,index)=>{
                    return(
                      <div key={'row'+index} className='row'>
                        { property.type === 'dropdown' ? <DropdownField property={property} theme={theme} />
                                                       : <div className='col px-0'><Input property={true} defaultValue={property.value} type={property.type} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm'} theme={theme} /></div>
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