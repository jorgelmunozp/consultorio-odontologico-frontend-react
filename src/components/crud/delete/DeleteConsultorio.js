import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../../helpers/fetchDelete';
import { Logo } from '../../icons/logo/Logo';
import { myColor } from '../../../global';

export const DeleteConsultorio = ({ item, urlApi, title, buttons, setOpen, setAlert }) => {
  const handleDelete = () => {
    const fetchResponse = fetchDelete(urlApi,item.id);
    fetchResponse.then(
      async function(value) {
        if(200 <= value && value <= 299) {
          let arrayResponse;
          await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
              .then(response => response.json())
              .then(data => arrayResponse = data);
    
          const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
          row.render();

          setAlert('success')
        }
        else { setAlert('error') }
      },
      function(error) { setAlert('error'); console.log("Error en la eliminación: ",error) }
    )
  };
 
    return (
        <>
          <div className={'darkBackground'} onClick={() => setOpen(false)} >
            <div className={'centered'}>
              <div className={'modalBox'}>
                <div className={'modalHeader'}>
                  <center><Logo color={myColor} height={2} width={2} className={'center'} /></center>
                  <h4 className={'heading main-color'}>{title}</h4>
                </div>
                <div className={'modalContent'}>
                  <center>
                    <table class="swalTable" border='1'>
                      <thead>
                        <tr><th>Parámetro</th><th>Datos</th></tr>
                      </thead>
                      <tbody>
                        <tr><td> Código </td><td>{ item.id }</td></tr>
                        <tr><td> Número </td><td>{ item.consultorio.numero }</td></tr>
                        <tr><td> Nombre </td><td>{ item.consultorio.nombre }</td></tr>
                      </tbody>
                    </table>
                  </center>
                </div>
                <div className={'modalActions'}>
                  <div className={'actionsContainer'}>
                      {
                          buttons === 1 ? <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                        : buttons === 2 ? <>
                                            <button className={'aceptBtn'} onClick={() => {handleDelete();setAlert(true);setOpen(false)}}>Eliminar</button>
                                            <button className={'cancelBtn'} onClick={() => setOpen(false)}>Cancel</button>
                                          </>
                        : ""
                      }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )
};