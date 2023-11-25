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
              <td><p id="editarId" class="swal2-input idText"> ${ paciente.id } </p></td>
            <tr>
            </tr>
              <td> Identificación </td>
              <td><input id="editarIdentificacion" type="text" value=${ paciente.paciente.identificacion } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ paciente.paciente.nombre } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td><input id="editarApellido" type="text" value=${ paciente.paciente.apellido } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Género </td>
              <td><input id="editarGenero" type="text" value=${ paciente.paciente.genero } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Eps </td>
              <td><input id="editarEps" type="text" value=${ paciente.paciente.eps } class="swal2-input"></input></td>
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
      const contenidoPaciente = `{
          "paciente": {
            "identificacion": "${document.getElementById('editarIdentificacion').value}",
            "nombre": "${document.getElementById('editarNombre').value}",
            "apellido": "${document.getElementById('editarApellido').value}",
            "genero": "${document.getElementById('editarGenero').value}",
            "eps": "${document.getElementById('editarEps').value}",
          },
          "id": ${paciente.id}
      }`;
      updateFetch(urlApiPacientes,JSON.stringify(contenidoPaciente),paciente.id);
      Swal.fire("Paciente Actualizado", "", "success");
    }
  });
};