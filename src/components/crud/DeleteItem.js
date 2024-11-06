import { createRoot } from 'react-dom/client';
import { Alert } from '../alert/Alert';
import { fetchDelete } from '../../helpers/fetchDelete';
import { Warning } from '../icons/warning/Warning';
import '../modal/modal.css';

export const DeleteItem = ({ classType, Icon=Warning, item, urlApi, setOpen }) => {
  const keys = Object.keys(item[classType]);                      // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                  // Valores de cada parámetro del objeto
  let valuesData = [];
  
  values.forEach(value => {                                       // Arreglo con los datos de los valores de cada parámetro del objeto
    if(typeof value === 'object') { 
      valuesData.push( Object.values(value)[0] + " " + Object.values(value)[1] );
    } else { valuesData.push( value ) }
  });

  const handleClose = () => {                                     // Gestiona el cierre del modal
    setOpen(false);
    document.getElementById('modal').remove();
    document.getElementById('body').classList.remove('noScroll');
  }

  const handleDelete = () => {
    const fetchResponse = fetchDelete(urlApi,item.id);
    fetchResponse.then(
      async function(value) {
        if(200 <= value && value <= 299) {
          await fetch(urlApi)                                     // API Restful para eliminar dato de la base de datos
              .then(response => response.json())
    
          const row = createRoot(document.getElementById( 'row'+item.id ));
          row.render();

          Alert({ type:'success', title:'Eliminación exitosa' }).launch()
        }
        else { Alert({ type:'error', title:'Error en la eliminación' }).launch() }
      },
      function(error) { Alert({ type:'error', title:'Error en la eliminación' }).launch(); console.log("Error en la eliminación: ",error) }
    )
  };
 
    return (
        <>
          <div className={'modalContainer justify-items-center'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={'#f8bb86'} height={3} width={3} className={'center'} /></center>
                <h6 className={'modalTitle main-color pt-2'}>{ "Eliminar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h6>
              </div>
              <div className={'modalContent'}>
                <div className='container-fluid modalTable mt-2 overflow-auto'>
                  <div className='row modalTableTitle flex-nowrap'>
                    <div className='col-6'>Parámetro</div>
                    <div className='col-6'>Datos</div>
                  </div>
                  <div className='row flex-nowrap'>
                    <div className='col-6 modalTableData text-start'>Código</div>
                    <div className='col-6 modalTableData text-start'>{ item.id }</div>
                  </div>
                  {
                    valuesData.map((data,index)=>{ return(
                        <div key={ keys[index].toLowerCase() } className='row flex-nowrap'>
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