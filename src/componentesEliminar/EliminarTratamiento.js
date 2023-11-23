import Swal from 'sweetalert2';
import { eliminarFetch } from '../helpers/eliminarFetch';

export const EliminarTratamiento = (tratamiento,urlApiTratamientos) => {
    Swal.fire({
      title: "Eliminar Tratamiento?",
      html: `
        <center>
          <table class="swalTable" border='1'>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Datos Tratamiento</th>
              <tr>
            </thead>
            <tbody>
              <tr>
                <td> Código </td>
                <td>${ tratamiento.id }</td>
              <tr>
              </tr>
                <td> Nombre </td>
                <td>${ tratamiento.tratamiento.tipo }</td>
              <tr>
              </tr>        
                <td> Consultorio </td>
                <td>${ tratamiento.tratamiento.consultorio }</td>
              <tr>
              </tr>        
                <td> Doctor </td>
                <td>${ tratamiento.tratamiento.doctor }</td>
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
        eliminarFetch(urlApiTratamientos,tratamiento.id);
        Swal.fire({
          title: "Tratamiento Eliminado",
          text: "El tratamiento fue eliminado con éxito",
          icon: "success"
        });
      }
    });
};