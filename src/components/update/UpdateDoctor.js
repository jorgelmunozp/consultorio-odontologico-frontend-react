import Swal from 'sweetalert2';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateDoctor = (doctor,urlApiDoctores) => {
  Swal.fire({
    title: "Doctor",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  }); 
};