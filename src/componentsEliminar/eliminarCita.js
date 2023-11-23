import Swal from 'sweetalert2';
import { deleteFetch } from '../helpers/deleteFetch';

export const EliminarCita = (cita,urlApiCitas) => {
    Swal.fire({
      title: "Eliminar Cita?",
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
              <td><input type="text" value=${ cita.id } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Paciente </td>
              <td><input id="editarPaciente" type="text" value=${ cita.cita.paciente } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Fecha </td>
              <td><input id="editarFecha" type="text" value=${ cita.cita.fecha } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Hora </td>
              <td><input id="editarHora" type="text" value=${ cita.cita.hora } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Consultorio </td>
              <td><input id="editarConsultorio" type="text" value=${ cita.cita.consultorio } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Médico </td>
              <td><input id="editarMedico" type="text" value=${ cita.cita.medico } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Tratamiento </td>
              <td><input id="editarTratamiento" type="text" value=${ cita.cita.tratamiento } class="swal2-input"></input></td>
            </tr>
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
        deleteFetch(urlApiCitas,cita.id);
        Swal.fire({
          title: "Cita Eliminada",
          text: "La cita fue eliminada con éxito",
          icon: "success"
        });
      }
    });
};