import '../../modal/modal.css';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';
import { myColor } from '../../../global';

export const UpdateCita = ({ Icon, item, urlApi, title, buttons, setOpen, setAlert, Row, paciente, fecha, hora, consultorio, doctor, tratamiento, handleChangePaciente, handleChangeFecha, handleChangeHora, handleChangeConsultorio, handleChangeDoctor }) => {
  const handleUpdate = () => {
    if(paciente !== "" && fecha !== "" && hora !== "" && consultorio !== "" && doctor !== "" && tratamiento !== "") {
      item.cita.paciente = paciente;
      item.cita.fecha = fecha
      item.cita.hora = hora
      item.cita.consultorio = consultorio
      item.cita.doctor = doctor
      item.cita.tratamiento = tratamiento

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
                      <tr><td> Paciente </td><td><input type="text" value={ paciente } onChange={handleChangePaciente} className="modalInput"></input></td></tr>
                      <tr><td> Fecha </td><td><input type="date" value={ fecha } onChange={handleChangeFecha} className="modalInput"></input></td></tr>
                      <tr><td> Hora </td><td><input type="hour" value={ hora } onChange={handleChangeHora} className="modalInput"></input></td></tr>
                      <tr><td> Consultorio </td><td><input type="number" value={ consultorio } onChange={handleChangeConsultorio} className="modalInput"></input></td></tr>
                      <tr><td> Médico </td><td><input type="text" value={ doctor } onChange={handleChangeDoctor} className="modalInput"></input></td></tr>
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