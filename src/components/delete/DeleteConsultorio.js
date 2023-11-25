import Swal from 'sweetalert2';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteConsultorio = (consultorio,urlApiConsultorios) => {
    Swal.fire({
      title: "Eliminar Consultorio?",
      html: `
        <center>
          <table class="swalTable" border='1'>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Datos Consultorio</th>
              <tr>
            </thead>
            <tbody>
              <tr>
                <td> Código </td>
                <td>${ consultorio.id }</td>
              <tr>
              </tr>
                <td> Número </td>
                <td>${ consultorio.consultorio.numero }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ consultorio.consultorio.nombre }</td>
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
        deleteFetch(urlApiConsultorios,consultorio.id);
        Swal.fire({ title: "Consultorio Eliminado", icon: "success" });
      }
    });
};