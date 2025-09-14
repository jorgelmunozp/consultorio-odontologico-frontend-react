import '../../alerts/modal/modal.css';
import { lazy, memo, useState,useCallback, useMemo }  from "react";
import { useThemeContext } from "../../theme/ThemeContext.js";
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { useAlertContext } from '../../alerts/AlertContext.js';
import { fetchUpdate } from '../../helpers/fetchUpdate.js';
import { myColor } from '../../global.js';

const Input = lazy(() => import('../forms/inputs/Input.js'));
const Dropdown = lazy(() => import('../forms/dropdown/Dropdown.js'));

export const UpdateItem = ({ classType, Icon, item, urlApi, setOpen, handleItems }) => { 
  const { theme } = useThemeContext();                            // 👈 Call the global theme
  const { alert } = useAlertContext();
  
  // 👇 Estado para controlar cuál dropdown está abierto mediante la key
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  // 👇 Memoriza initialValues para evitar recalcular en cada render
  const initialValues = useMemo(() => {
    switch (classType) {
      case "cita": return { paciente:item[classType].paciente, consultorio:item[classType].consultorio, doctor:item[classType].doctor, tratamiento:item[classType].tratamiento, };
      case "paciente": return { nombre:item[classType].nombre, apellido:item[classType].apellido, identificacion:item[classType].identificacion, genero:item[classType].genero, eps:item[classType].eps, };
      case "doctor": return { nombre:item[classType].nombre, apellido:item[classType].apellido, identificacion:item[classType].identificacion, genero:item[classType].genero, especialidad:item[classType].especialidad, };
      case "consultorio": return { numero:item[classType].numero, nombre:item[classType].nombre };
      case "especialidad": return { nombre:item[classType].nombre };
      case "tratamiento": return { especialidad:item[classType].especialidad, consultorio:item[classType].consultorio, doctor:item[classType].doctor, };
      default: return {};
    }}, [classType, item]);

  const state = useCrudFactory({ classType:classType, initialValues:initialValues }).state;

  // 👇 Memoriza handleClose para evitar recreación en cada render
  const handleClose = useCallback(() => setOpen(false), [setOpen]);                            // Gestiona el cierre del modal

  // 👇 Memoriza el toggle de los dropdowns
  const handleToggleDropdown = useCallback((key) => setOpenDropdownKey((prev) => (prev === key ? null : key)), []);

  // 👇 Maneja la actualización del item y llama la API
  const handleUpdate = useCallback(() => {
    if( state.every( property => property.value !== '') ) {                     // Check for emtpy fields to avoid any empty item
      state.forEach((property) => { item[classType][property.key] = property.value });   // Actualiza los nuevos valores en el item

      const dataItem = JSON.stringify({ [classType]: item[classType] }); 

      fetchUpdate(urlApi,dataItem,item._id).then(                               // Fetch PUT para actualización de datos
        async (responseStatus) => {
            if(200 <= responseStatus && responseStatus <= 299) { 
              handleItems('update',item._id);                        // El padre actualiza el estado y React re-renderiza con el elemento actualizado
              
              alert({ type:'success', title:'Actualización exitosa', buttons:1 });
            }
          else { alert({ type:'error', title:'Error en la actualización', buttons:1 }) }
        },
        (error) => { alert({ type:'error', title:'Error en la actualización', buttons:1 }); console.log('Error Update: ', error) }
      )
    }
  }, [state, classType, item, urlApi, handleItems, alert]);

  // 👇 Memoriza el contenido para evitar re-render innecesario
  const formRows = useMemo(() =>
      state.map((property,index) => (
        <div key={"row"+index} className="row bg-row flex-nowrap">
          { property.type === "dropdown" ? ( <Dropdown property={property} isOpen={openDropdownKey === property.key} onToggle={() => handleToggleDropdown(property.key)} /> ) 
                                         : ( <div className="col px-0"><Input property={true} value={property.value} type={property.type} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className="input form-control rounded border-muted border-1 text-muted text-center shadow-sm" /></div> )
          }
        </div>
      )),
    [state, openDropdownKey, handleToggleDropdown]
  );

  return (
      <>
        <div className={'modalContainer justify-items-center'}>
          <div className={'modalBox'} data-theme={theme}>
            <div className={'modalHeader'}>
              <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
              <h6 className={'modalTitle century-gothic main-color pt-2'}>{ "Actualizar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
            </div>
            <div className={'modalContent'}>
              <div className='container-fluid modalTable mt-2'>
                <div className='row bg-row flex-nowrap'>
                  <Input placeholder={'Código'} value={item._id} type={'text'} className={'input form-control rounded border-muted border-1 text-muted text-center shadow-sm pe-none'} />
                </div>
                { formRows }
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

export default memo(UpdateItem);


// // 👇 Exporta componente memoizado con comparación personalizada
// export default memo(UpdateItem, (prevProps, nextProps) => {
//   return (
//     prevProps.classType === nextProps.classType &&
//     prevProps.urlApi === nextProps.urlApi &&
//     prevProps.Icon === nextProps.Icon &&
//     prevProps.setOpen === nextProps.setOpen &&
//     prevProps.handleItems === nextProps.handleItems &&
//     JSON.stringify(prevProps.item) === JSON.stringify(nextProps.item) // 👈 comparación profunda de item
//   );
// });