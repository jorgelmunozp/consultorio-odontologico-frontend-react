import Swal from 'sweetalert2';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdatePaciente = (paciente,urlApiPacientes) => {
  Swal.fire({
    title: "Paciente",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });  
};