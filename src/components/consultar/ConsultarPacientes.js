import { DeletePaciente } from '../delete/DeletePaciente';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';

const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
let pacientes;
await fetch(urlApiPacientes)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => pacientes = data);

export const ConsultarPacientes = () => {
      return(
        <div className="App">
          <div id="contenidoPacientes">  
            <center>
              <hr/>
              <h4> Pacientes Afiliados </h4>
              <hr/>
              <br/><br/>
              <table className="table" border='1'>
                <thead>
                  <tr>
                    <th> Código </th>
                    <th> Identificación </th>
                    <th> Nombre </th>
                    <th> Apellido </th>
                    <th> Género </th>
                    <th> Eps </th>
                    <th colSpan='3'> </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    pacientes.map( paciente => (
                      <tr>
                        <td>{ paciente.id }</td>
                        <td>{ paciente.paciente.identificacion }</td>
                        <td>{ paciente.paciente.nombre }</td>
                        <td>{ paciente.paciente.apellido }</td>
                        <td>{ paciente.paciente.genero }</td>
                        <td>{ paciente.paciente.eps }</td>
                        <td><button className='App-body-boton-vistas' onClick={ () => ReadPaciente(paciente) }>&#128270;</button></td>
                        <td><button className='App-body-boton-vistas' onClick={ () => UpdatePaciente(paciente,urlApiPacientes) }>&#x270D;</button></td>
                        <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeletePaciente(paciente,urlApiPacientes) }>&#x1F7AE;</button></td>
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