import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../../helpers/fetchDelete';

export const DeletePaciente = ({ Icon,item, urlApi, title, buttons, setOpen, setAlert }) => {
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
                <h4 className={'modalTitle main-color'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                      <tr><td> Código </td><td>{ item.id }</td></tr>
                      <tr><td> Identificación </td><td>{ item.paciente.identificacion }</td></tr>
                      <tr><td> Nombre </td><td>{ item.paciente.nombre }</td></tr>
                      <tr><td> Apellido </td><td>{ item.paciente.apellido }</td></tr>
                      <tr><td> Género </td><td>{ item.paciente.genero }</td></tr>
                      <tr><td> Eps </td><td>{ item.paciente.eps }</td></tr>
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
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
          <div className={'darkBackground'} onClick={() => setOpen(false)}></div>
        </>
      )
};