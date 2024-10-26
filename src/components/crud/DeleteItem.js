import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../helpers/fetchDelete';
import '../modal/modal.css';

export const DeleteItem = ({ classType, Icon, item, urlApi, setOpen, setAlert }) => {
  const keys = Object.keys(item[classType]);                    // Nombre de los parámetros del objeto
  const values = Object.values(item[classType]);                // Valores de cada parámetro del objeto
  let valuesData = [];
  
  values.forEach(value => {                                       // Arreglo con los datos de los valores de cada parámetro del objeto
    if(typeof value === 'object') { 
      valuesData.push( Object.values(value)[0] + " " + Object.values(value)[1] );
    } else { valuesData.push( value ) }
  }); 

  const handleDelete = () => {
    const fetchResponse = fetchDelete(urlApi,item.id);
    fetchResponse.then(
      async function(value) {
        if(200 <= value && value <= 299) {
          await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
              .then(response => response.json())
    
          const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
          row.render();

          setAlert('successDelete')
        }
        else { setAlert('errorDelete') }
      },
      function(error) { setAlert('errorDelete'); console.log("Error en la eliminación: ",error) }
    )
  };
 
    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={'#f8bb86'} height={5.5} width={5.5} className={'center'} /></center>
                <h4 className={'modalTitle main-color'}>{ "Eliminar " + classType.charAt(0).toUpperCase() + classType.slice(1) + "?" }</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                      <tr><td> Código </td><td>{ item.id }</td></tr>
                      {
                        valuesData.map((data,index)=>{ return(
                            <tr key={ keys[index].toLowerCase() }>
                              <td>{ keys[index].charAt(0).toUpperCase() + keys[index].slice(1) }</td>
                              <td>{ data }</td>
                            </tr>
                        )})
                      }
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                  <>
                    <button className={'aceptBtn'} onClick={() => {handleDelete();setAlert(true);setOpen(false)}}>Eliminar</button>
                    <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                  </>
                </div>
              </div>
            </div>
          </div>
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};