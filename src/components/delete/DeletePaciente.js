import Swal from 'sweetalert2';
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
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFetch(urlApiPacientes,paciente.id);
        Swal.fire({
          title: "Paciente Eliminado",
          text: "El paciente fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};