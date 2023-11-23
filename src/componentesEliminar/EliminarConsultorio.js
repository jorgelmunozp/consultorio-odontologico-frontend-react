import Swal from 'sweetalert2';
import { eliminarFetch } from '../helpers/eliminarFetch';

export const EliminarConsultorio = (consultorio,urlApiConsultorios) => {
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
                <td><input type="text" value=${ consultorio.id } class="swal2-input"></input></td>
              <tr>
              </tr>
                <td> Número </td>
                <td><input type="text" value=${ consultorio.consultorio.numero } class="swal2-input"></input></td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td><input type="text" value=${ consultorio.consultorio.nombre } class="swal2-input"></input></td>
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
        eliminarFetch(urlApiConsultorios,consultorio.id);
        Swal.fire({
          title: "Consultorio Eliminado",
          text: "El consultorio fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};