import Swal from 'sweetalert2';
import { eliminarFetch } from '../../helpers/eliminarFetch';

export const EliminarDoctor = (doctor,urlApiDoctores) => {
    Swal.fire({
      title: "Eliminar Doctor?",
      html: `
        <center>
          <table class="swalTable" border='1'>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Datos Doctor</th>
              <tr>
            </thead>
            <tbody>
              <tr>
                <td> Código </td>
                <td><input type="text" value=${ doctor.id } class="swal2-input"></input></td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td><input type="text" value=${ doctor.doctor.nombre } class="swal2-input"></input></td>
              <tr>
              </tr>     
                <td> Apellido </td>
                <td><input type="text" value=${ doctor.doctor.apellido } class="swal2-input"></input></td>
              <tr>
              </tr>
                <td> Especialidad </td>
                <td><input type="text" value=${ doctor.doctor.especialidad } class="swal2-input"></input></td>
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
        eliminarFetch(urlApiDoctores,doctor.id);
        Swal.fire({
          title: "Doctor Eliminado",
          text: "El doctor fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};