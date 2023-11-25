import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeletePaciente = (paciente,urlApiPacientes) => {
    Swal.fire({
      title: "Eliminar Paciente?",
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
                <td>${ paciente.id }</td>
              <tr>
              </tr>
                <td> Identificación </td>
                <td>${ paciente.paciente.identificacion }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ paciente.paciente.nombre }</td>
              <tr>
              </tr>     
                <td> Apellido </td>
                <td>${ paciente.paciente.apellido }</td>
              <tr>
              </tr>
                <td> Género </td>
                <td>${ paciente.paciente.genero }</td>
              <tr>
              </tr>
                <td> Eps </td>
                <td>${ paciente.paciente.eps }</td>
              <tr>
            </tbody>
          </table>
        </center>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteFetch(urlApiPacientes,paciente.id);
        
        let pacientes;
        await fetch(urlApiPacientes)                      //API REST para consumo de la tabla Pacientes de la base de datos
            .then(response => response.json())
            .then(data => pacientes = data);

        const root = ReactDOM.createRoot(
          document.getElementById('contenidoPacientes')
        );
        const element =    
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
          </center>;
        root.render(element);
        
        Swal.fire({ title: "Paciente Eliminado", icon: "success" });
      }
    });
};