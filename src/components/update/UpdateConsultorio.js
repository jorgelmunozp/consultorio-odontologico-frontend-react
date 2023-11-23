import Swal from 'sweetalert2';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateConsultorio = (consultorio) => {
  Swal.fire({
    title: "Consultorio",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  }); 
};