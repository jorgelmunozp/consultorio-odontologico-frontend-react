import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';

const urlApiCitas = process.env.REACT_APP_API_CITAS;
let citas;
await fetch(urlApiCitas)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => citas = data);

export const ConsultarCitas = ({ pacientes,tratamientos,doctores,consultorios }) => {
  return(
      <div className="App">
        <div id="contenidoCitas">  
          <center>
            <hr/>
            <h4> Citas Registradas </h4>
            <hr/>
            <br/><br/>
            <table className="table" border='1'>
              <thead>
                <tr>
                  <th> Código </th>
                  <th> Paciente </th>
                  <th> Fecha </th>
                  <th> Hora </th>
                  <th> Consultorio </th>
                  <th> Médico </th>
                  <th> Tratamiento </th>
                  <th colSpan='3'> </th>
                </tr>
              </thead>
              <tbody>
                {
                  citas.map( cita => (
                    <tr>
                      <td>{ cita.id }</td>
                      <td>{ cita.cita.paciente }</td>
                      <td>{ cita.cita.fecha }</td>
                      <td>{ cita.cita.hora }</td>
                      <td>{ cita.cita.consultorio }</td>
                      <td>{ cita.cita.doctor }</td>
                      <td>{ cita.cita.tratamiento }</td>
                      <td><button className='App-body-boton-vistas' onClick={ () => ReadCita(cita) }>&#128270;</button></td>
                      <td><button className='App-body-boton-vistas' onClick={ () => UpdateCita(cita,urlApiCitas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
                      <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteCita(cita,urlApiCitas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </center>
        </div>
      </div>
    )
  };