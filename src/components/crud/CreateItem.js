import { lazy, useState, useCallback, useMemo, memo } from "react";
import { useThemeContext } from "../../theme/ThemeContext.js";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { fetchCreate } from "../../helpers/fetchCreate.js";
import { myColor } from '../../global.js';

const Input = lazy(() => import("../forms/inputs/Input.js"));
const Dropdown = lazy(() => import("../forms/dropdown/Dropdown.js"));

export const CreateItem = ({ classType, Icon, objectHook, setOpen }) => {
  const { theme } = useThemeContext();                            // 👈 Call the global theme
  const { alert } = useAlertContext();
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  // const { state, api: urlApi, resetState } = useCrudFactory({ classType });
  const { api:urlApi, state, resetState, handleItems } = objectHook;

  // Capitaliza el nombre del tipo de clase para mostrar en el título
  const capitalizedClassType = useMemo(
    () => classType.charAt(0).toUpperCase() + classType.slice(1),
    [classType]
  );

  // Función para crear el nuevo ítem
  const handleCreate = useCallback(() => {
    const hasEmptyFields = state.some(property => property.value === "");
    if (hasEmptyFields) {
      alert({ type: "warning", title: "Debes ingresar todos los datos", buttons: 1 });
      return;
    }

    const itemPayload = state.reduce((obj, property) => {
      obj[property.key] = property.value;
      return obj;
    }, {});

    const dataItem = JSON.stringify({ [classType]: itemPayload });

    fetchCreate(urlApi, dataItem)
      .then(async (responseStatus) => {
        if (responseStatus >= 200 && responseStatus < 300) {
          handleItems('create', { [classType]: itemPayload });                        // El padre actualiza el estado y React re-renderiza con el elemento actualizado

          resetState();
          alert({ type: "success", title: "Registro exitoso", buttons: 1 });
        } else if (responseStatus >= 400 && responseStatus < 500) {
          alert({ type: "error", title: "Error en el envío de datos", buttons: 1 });
        } else if (responseStatus >= 500) {
          alert({ type: "error", title: "Error en el servidor remoto", buttons: 1 });
        }
      })
      .catch((error) => {
        console.error("Error en la creación:", error);
        alert({ type: "error", title: "Error en el registro", buttons: 1 });
      });
  }, [state, urlApi, classType, alert, resetState, handleItems]);

  // 👇 Close view memorized handler
  const handleClose = useCallback(() => setOpen(false), [setOpen]);   

  // 👇 Dropdowns toggle memorized handler
  const handleToggleDropdown = useCallback((key) => setOpenDropdownKey((prev) => (prev === key ? null : key)), []);

  if (process.env.NODE_ENV === 'development') console.log('[Create Item ➕]');

  return (
    <>
      <div className={'modalContainer justify-items-center'}>
        <div className={'modalBox'} data-theme={theme}>
          <div className={'modalHeader'}>
             <center><Icon color={myColor} height={2.5} width={2.5} strokeWidth={0.6} className={'center'} /></center>
             <h6 className="modalTitle century-gothic main-color pt-2">Registrar {capitalizedClassType}</h6>
          </div>
          <div className={'modalContent'}>
            <div className='container-fluid modalTable mt-2'>
              {state.map((property) => (
                <div key={property.key} className="row bg-row">
                  { property.type === "dropdown" ? ( <Dropdown property={property} isOpen={openDropdownKey === property.key} onToggle={() => handleToggleDropdown(property.key)} /> ) 
                                                 : ( <div className="col px-0"><Input type={property.type} value={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className="input form-control rounded border-muted border-1 text-center shadow-sm" /> </div> )}
                </div>
              ))}
            </div>
          </div>
          <div className={'modalFooter'}>
            <div className={'d-flex mt-2 w-100'}>
              <button className={'aceptBtn w-100'} onClick={() => { handleCreate(); handleClose(); }}>Registrar</button>
              <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancelar</button>
            </div>
          </div>
        </div>
      </div>
      <div className={'darkBackground'} onClick={ handleClose }></div>
    </>
  );
};

export default memo(CreateItem);
