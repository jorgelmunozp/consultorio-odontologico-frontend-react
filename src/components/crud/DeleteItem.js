import '../../alerts/modal/modal.css';
import { lazy }  from "react";
import { useThemeContext } from "../../theme/ThemeContext.js";
import { useAlertContext } from '../../alerts/AlertContext.js';
import { fetchDelete } from '../../helpers/fetchDelete.js';

const Warning = lazy(() => import('../icons/alert/Warning.js'));

export const DeleteItem = ({ classType, Icon=Warning, item, urlApi, setOpen, handleItems }) => {
  const { theme } = useThemeContext();                            // 👈 Call the global theme
  const { alert } = useAlertContext();

  const keys = Object.keys(item[classType]);                      // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                  // Valores de cada parámetro del objeto
  let valuesData = [];
  
  values.forEach(value => {                                       // Arreglo con los datos de los valores de cada parámetro del objeto
    if(typeof value === 'object') { 
      valuesData.push( Object.values(value)[0] + " " + Object.values(value)[1] );
    } else { valuesData.push( value ) }
  });

  const handleClose = () => { setOpen(false); }                   // Gestiona el cierre del modal

  const handleDelete = () => {
    fetchDelete(urlApi,item._id).then(
      async (responseStatus) => {
        if(200 <= responseStatus && responseStatus <= 299) {             
          handleItems('delete',item._id);                         // El padre actualiza el estado y React re-renderiza sin el elemento eliminado
          
          alert({ type:'success', title:'Eliminación exitosa', buttons:1, theme:theme });
        }
        else { alert({ type:'error', title:'Error en la eliminación', buttons:1, theme:theme }) }
      },
      (error) => { alert({ type:'error', title:'Error en la eliminación', buttons:1, theme:theme }); console.log("Error en la eliminación: ",error) }
    )
  };

  if (process.env.NODE_ENV === 'development') console.log('[Delete Item ❌]');

  return (
      <>
        <div className={'modalContainer justify-items-center'}>
          <div className={'modalBox'} data-theme={theme}>
            <div className={'modalHeader'}>
              <center><Icon color={'#f8bb86'} height={3} width={3} className={'center'} /></center>
              <h6 className={'modalTitle century-gothic main-color pt-2'}>{ "Eliminar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
            </div>
            <div className={'modalContent'}>
              <div className='container-fluid modalTable mt-2 overflow-auto'>
                <div className='row modalTableTitle flex-nowrap'>
                  <div className='col-6'>Parámetro</div>
                  <div className='col-6'>Datos</div>
                </div>
                <div className='row bg-row flex-nowrap'>
                  <div className='col-6 modalTableData text-start'>Código</div>
                  <div className='col-6 modalTableData text-start'>{ item._id }</div>
                </div>
                {
                  valuesData.map((data,index)=>{ return(
                      <div key={ keys[index].toLowerCase() } className='row bg-row flex-nowrap'>
                        <div className='col-6 modalTableData text-start'>{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</div>
                        <div className='col-6 modalTableData text-start'>{ data }</div>
                      </div>
                  )})
                }
              </div>
            </div>
            <div className={'modalFooter'}>
              <div className={'d-flex mt-2 w-100'}>
                  <button className={'aceptBtn w-100'} onClick={() => { handleDelete(); handleClose() }}>Eliminar</button>
                  <button className={'cancelBtn w-100'} onClick={ handleClose }>Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div className={'darkBackground'} onClick={ handleClose }></div>
      </>
    )
};
export default DeleteItem;

//*********************************************************** */
// import '../../alerts/modal/modal.css';
// import { lazy, useMemo, useCallback } from "react";
// import { useThemeContext } from "../../theme/ThemeContext.js";
// import { useAlertContext } from '../../alerts/AlertContext.js';
// import { fetchDelete } from '../../helpers/fetchDelete.js';

// const Warning = lazy(() => import('../icons/alert/Warning.js'));

// export const DeleteItem = ({ classType, Icon = Warning, item, urlApi, setOpen, handleItems }) => {
//   const { theme } = useThemeContext();
//   const { alert } = useAlertContext();

//   // ✅ Memoizamos para evitar cálculos en cada render
//   const { keys, valuesData } = useMemo(() => {
//     const keys = Object.keys(item[classType]);
//     const values = Object.values(item[classType]);
//     const valuesData = values.map(value =>
//       typeof value === "object"
//         ? Object.values(value).join(" ")
//         : value
//     );
//     return { keys, valuesData };
//   }, [item, classType]);

//   // ✅ Eliminación
//   const handleDelete = useCallback(() => {
//     fetchDelete(urlApi, item._id).then(
//       async (responseStatus) => {
//         if (responseStatus >= 200 && responseStatus <= 299) {
//           handleItems("delete", item._id); // 👈 padre actualiza lista y cierra modal
//           alert({ type: "success", title: "Eliminación exitosa", buttons: 1, theme });
//         } else {
//           alert({ type: "error", title: "Error en la eliminación", buttons: 1, theme });
//         }
//       },
//       (error) => {
//         alert({ type: "error", title: "Error en la eliminación", buttons: 1, theme });
//         console.error("Error en la eliminación:", error);
//       }
//     );
//   }, [urlApi, item._id, handleItems, alert, theme]);

//   return (
//     <>
//       <div className="modalContainer justify-items-center">
//         <div className="modalBox" data-theme={theme}>
//           <div className="modalHeader">
//             <center>
//               <Icon color="#f8bb86" height={3} width={3} className="center" />
//             </center>
//             <h6 className="modalTitle main-color pt-2">
//               {`Eliminar ${classType.charAt(0).toUpperCase() + classType.slice(1)}?`}
//             </h6>
//           </div>
//           <div className="modalContent">
//             <div className="container-fluid modalTable mt-2 overflow-auto">
//               <div className="row modalTableTitle flex-nowrap">
//                 <div className="col-6">Parámetro</div>
//                 <div className="col-6">Datos</div>
//               </div>
//               <div className="row bg-row flex-nowrap">
//                 <div className="col-6 modalTableData text-start">Código</div>
//                 <div className="col-6 modalTableData text-start">{item._id}</div>
//               </div>
//               {valuesData.map((data, index) => (
//                 <div key={keys[index]} className="row bg-row flex-nowrap">
//                   <div className="col-6 modalTableData text-start">
//                     {keys[index].charAt(0).toUpperCase() + keys[index].slice(1)}
//                   </div>
//                   <div className="col-6 modalTableData text-start">{data}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="modalFooter">
//             <div className="d-flex mt-2 w-100">
//               <button className="aceptBtn w-100" onClick={handleDelete}>
//                 Eliminar
//               </button>
//               <button className="cancelBtn w-100" onClick={() => setOpen(false)}>
//                 Cancelar
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="darkBackground" onClick={() => setOpen(false)}></div>
//     </>
//   );
// };

// export default DeleteItem;
