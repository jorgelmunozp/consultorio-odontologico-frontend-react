// import { lazy, useState, useCallback, useMemo } from "react";
// import { useAlertContext } from "../../alerts/AlertContext.js";
// import { useCrudFactory } from "../../hooks/useCrudFactory.js";
// import { fetchCreate } from "../../helpers/fetchCreate.js";

// const Input = lazy(() => import("../forms/inputs/Input.js"));
// const Dropdown = lazy(() => import("../forms/dropdown/Dropdown.js"));

// export const CreateItem = ({ classType, Icon, isMenuOpen }) => {
//   const { alert } = useAlertContext();
//   const [openDropdownKey, setOpenDropdownKey] = useState(null);

//   const objectHook = useCrudFactory({ classType });
//   const { state, api:urlApi, resetState } = objectHook;

//   const capitalizedClassType = useMemo( () => classType.charAt(0).toUpperCase() + classType.slice(1), [classType] );

//   const handleCreate = useCallback(() => {
//     // Construye el objeto a enviar
//     const hasEmptyFields = state.some((property) => property.value === "");
//     if (hasEmptyFields) { alert({ type: "warning", title: "Debes ingresar todos los datos", buttons: 1 }); return; }

//     const itemPayload = state.reduce((item, property) => { item[property.key] = property.value; return item; }, {});

//     const dataItem = JSON.stringify({ [classType]: itemPayload });

//     fetchCreate(urlApi, dataItem).then(
//       async (responseStatus) => {
//         if (responseStatus >= 200 && responseStatus <= 299) {
//           resetState();
//           alert({ type: "success", title: "Registro exitoso", buttons: 1 });
//         } 
//         else if (responseStatus >= 400 && responseStatus <= 499) { alert({ type: "error", title: "Error en el envío de datos", buttons: 1 }); } 
//         else if (responseStatus >= 500) { alert({ type: "error", title: "Error en el servidor remoto", buttons: 1 }); }
//       },
//       (error) => { alert({ type: "error", title: "Error en el registro", buttons: 1 }); console.error("Error en la creación:", error); }
//     );
//   }, [state, urlApi, classType, alert, resetState]);

//   return (
//     <div className="App">
//       <div className={`container-fluid mt-4 mt-sm-5 me-0 ps-4 ps-sm-5 pe-3 pe-sm-2 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`} >
//         <center><h5 className="century-gothic main-color fs-sm-2">Registrar {capitalizedClassType}</h5></center>

//         <div className="container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth">
//           {state.map((property) => (
//             <div key={property.key} className="row">
//               {property.type === "dropdown" ? ( <Dropdown property={property} isOpen={openDropdownKey === property.key} onToggle={() => setOpenDropdownKey((prev) => prev === property.key ? null : property.key) } /> ) 
//                                             : ( <div className="col px-0"><Input type={property.type} value={property.value} handleChange={property.handleChange} placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)} className="input form-control rounded border-muted border-1 text-muted text-center shadow-sm" /></div> )
//               }
//             </div>
//           ))}

//           <div className="row mt-4 mt-sm-5">
//             <div className="col">
//               <button onClick={handleCreate}className="button bg-main-color text-white rounded border-0 py-3 w-50 shadow-sm">Registrar <Icon /></button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateItem;





import { lazy, useState, useCallback, useMemo } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useCrudFactory } from "../../hooks/useCrudFactory.js";
import { fetchCreate } from "../../helpers/fetchCreate.js";

const Input = lazy(() => import("../forms/inputs/Input.js"));
const Dropdown = lazy(() => import("../forms/dropdown/Dropdown.js"));

export const CreateItem = ({ classType, Icon, isMenuOpen }) => {
  const { alert } = useAlertContext();
  const [openDropdownKey, setOpenDropdownKey] = useState(null);

  const { state, api: urlApi, resetState } = useCrudFactory({ classType });

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
  }, [state, urlApi, classType, alert, resetState]);

  return (
    <div className="App">
      <div className={`container-fluid mt-4 mt-sm-5 me-0 ps-4 ps-sm-5 pe-3 pe-sm-2 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`}>
        <center>
          <h5 className="century-gothic main-color fs-sm-2">Registrar {capitalizedClassType}</h5>
        </center>

        <div className="container-fluid mt-2 mt-sm-5 pe-0 pe-md-5 px-0 me-0 smooth">
          {state.map((property) => (
            <div key={property.key} className="row mb-3">
              {property.type === "dropdown" ? (
                <Dropdown
                  property={property}
                  array={property.options} // Asegúrate de que cada propiedad tenga un array de opciones
                  handleChange={property.handleChange}
                  isOpen={openDropdownKey === property.key}
                  onToggle={() =>
                    setOpenDropdownKey((prev) => (prev === property.key ? null : property.key))
                  }
                />
              ) : (
                <div className="col px-0">
                  <Input
                    type={property.type}
                    value={property.value}
                    handleChange={property.handleChange}
                    placeholder={property.key.charAt(0).toUpperCase() + property.key.slice(1)}
                    className="input form-control rounded border-muted border-1 text-muted text-center shadow-sm"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="row mt-4 mt-sm-5">
            <div className="col d-flex justify-content-center">
              <button
                onClick={handleCreate}
                className="button bg-main-color text-white rounded border-0 py-3 w-50 shadow-sm d-flex align-items-center justify-content-center"
              >
                Registrar <Icon className="ms-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
