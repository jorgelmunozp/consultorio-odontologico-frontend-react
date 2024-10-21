import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';
import { myColor } from '../../../global';

export const UpdateDoctor = ({ Icon, item, urlApi, title, buttons, setOpen, setAlert, Row, numero, nombre, handleChangeNumero, handleChangeNombre }) => {
  const handleUpdate = () => {
    if(numero !== "" && nombre !== "" ) {
      item.doctor.numero = numero;
      item.doctor.nombre = nombre

      const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
            let arrayResponse;
            await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
                .then(response => response.json())
                .then(data => arrayResponse = data);
      
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} />);

            setAlert('successUpdate')
          }
          else { setAlert('errorUpdate') }
        },
        function(error) { setAlert('errorUpdate') }
      )
    }
  };
 
    return (
        <>
          <div className={'modalContainer'}>
            <div className={'modalBox'}>
              <div className={'modalHeader'}>
                <center><Icon color={myColor} height={5} width={5} strokeWidth={0.6} className={'center'} /></center>
                <h4 className={'modalTitle main-color pt-3'}>{title}</h4>
              </div>
              <div className={'modalContent'}>
                <center>
                  <table className="modalTable" border='1'>
                    <thead>
                      <tr><th>Parámetro</th><th>Datos</th></tr>
                    </thead>
                    <tbody>
                    <tr><td> Código </td><td>{ item.id }</td></tr>
                      <tr><td> Identificación </td><td>{ item.doctor.identificacion }</td></tr>
                      <tr><td> Nombre </td><td>{ item.doctor.nombre }</td></tr>
                      <tr><td> Apellido </td><td>{ item.doctor.apellido }</td></tr>
                      <tr><td> Género </td><td>{ item.doctor.genero }</td></tr>
                      <tr><td> Especialidad </td><td>{ item.doctor.especialidad }</td></tr>
                    </tbody>
                  </table>
                </center>
              </div>
              <div className={'modalFooter'}>
                <div className={'modalButtons'}>
                    {
                        buttons === 1 ? <button className={'aceptBtn'} onClick={() => setOpen(false)}>Aceptar</button>
                      : buttons === 2 ? <>
                                          <button className={'aceptBtn'} onClick={() => {handleUpdate();setAlert(true);setOpen(false)}}>Actualizar</button>
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