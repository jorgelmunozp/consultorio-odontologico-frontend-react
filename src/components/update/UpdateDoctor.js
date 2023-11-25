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
              <td><p class="swal2-input idText"> ${ doctor.id } </p></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ doctor.doctor.nombre } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td><input id="editarApellido" type="text" value=${ doctor.doctor.apellido } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Especialidad </td>
              <td><input id="editarEspecialidad" type="text" value=${ doctor.doctor.especialidad } class="swal2-input"></input></td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  showCancelButton: true,
  confirmButtonColor: "#5285c5",
  cancelButtonColor: "#d33",
  confirmButtonText: "Guardar",
  cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      const contenidoDoctor = `{
          "doctor": {
            "nombre": "${document.getElementById('editarNombre').value}",
            "apellido": "${document.getElementById('editarApellido').value}",
            "especialidad": "${document.getElementById('editarEspecialidad').value}"
          },
          "id": ${doctor.id}
      }`;
      const fetchResponse = updateFetch(urlApiDoctores,JSON.stringify(contenidoDoctor),doctor.id);
      fetchResponse.then(
        function(value) {
          if(200 <= value && value <= 299) { Swal.fire("Cita Actualizada", "", "success"); } 
          else { Swal.fire("Error en la actualización", "", "error"); }
        },
        function(error) { Swal.fire("Error en la actualización", "", "error"); }
      )
    }
  }); 
};