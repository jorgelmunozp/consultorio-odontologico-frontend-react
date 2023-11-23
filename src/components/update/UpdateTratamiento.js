import Swal from 'sweetalert2';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateTratamiento = (tratamiento,urlApiTratamientos) => {
  Swal.fire({
    title: "Tratamiento",
    imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
    imageWidth: 40,
    imageHeight: 40,
    imageAlt: "🦷",
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
            <td><input type="text" value=${ tratamiento.id } class="swal2-input"></input></td>
          <tr>
          </tr>
            <td> Nombre </td>
            <td><input type="text" value=${ tratamiento.tratamiento.tipo } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Consultorio </td>
            <td><input type="text" value=${ tratamiento.tratamiento.consultorio } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Doctor </td>
            <td><input type="text" value=${ tratamiento.tratamiento.doctor } class="swal2-input"></input></td>
          <tr>
        </tbody>
      </table>
    </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });    
};