import Swal from 'sweetalert2';
import { eliminarFetch } from '../helpers/eliminarFetch';

export const EliminarPaciente = (paciente,urlApiPacientes) => {
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarFetch(urlApiPacientes,paciente.id);
        Swal.fire({
          title: "Paciente Eliminado",
          text: "El paciente fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};