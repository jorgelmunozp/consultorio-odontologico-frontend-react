import Swal from 'sweetalert2';
import { DeletePaciente } from '../delete/DeletePaciente';
import { ReadPaciente } from '../read/ReadPaciente';

const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
let pacientes;
await fetch(urlApiPacientes)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => pacientes = data);

const EditarPaciente = (paciente) => {
  Swal.fire({
    title: "Paciente",
    imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
    imageWidth: 40,
    imageHeight: 40,
    imageAlt: "🦷",
    html: `
      <center>
        <table class="swalTable" border='1'>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Datos Paciente</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><input type="text" value=${ paciente.id } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Identificación </td>
              <td><input type="text" value=${ paciente.paciente.identificacion } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input type="text" value=${ paciente.paciente.nombre } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td><input type="text" value=${ paciente.paciente.apellido } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Género </td>
              <td><input type="text" value=${ paciente.paciente.genero } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Eps </td>
              <td><input type="text" value=${ paciente.paciente.eps } class="swal2-input"></input></td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });  
}

const ConsultarPacientes = () => {
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
                        <td><button className='App-body-boton-vistas' onClick={ () => EditarPaciente(paciente) }>&#x270D;</button></td>
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
    }
    
    export default ConsultarPacientes;