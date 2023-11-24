import Swal from 'sweetalert2';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteDoctor = (doctor,urlApiDoctores) => {
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
                <td>${ doctor.id }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ doctor.doctor.nombre }</td>
              <tr>
              </tr>     
                <td> Apellido </td>
                <td>${ doctor.doctor.apellido }</td>
              <tr>
              </tr>
                <td> Especialidad </td>
                <td>${ doctor.doctor.especialidad }</td>
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
        deleteFetch(urlApiDoctores,doctor.id);
        Swal.fire({
          title: "Doctor Eliminado",
          text: "El doctor fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};