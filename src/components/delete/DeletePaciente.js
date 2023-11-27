import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeletePaciente = (paciente,urlApiPacientes,elementHtml,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) => {
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
        root.render(elementHtml(urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos));
        
        Swal.fire({ title: "Paciente Eliminado", icon: "success" });
      }
    });
};