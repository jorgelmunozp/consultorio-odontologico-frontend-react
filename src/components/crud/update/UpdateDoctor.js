import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdateDoctor = (doctor,urlApiDoctores,elementRender,citas,pacientes,tratamientos,doctores,consultorios) => {
  Swal.fire({
    title: "Doctor",
    imageUrl: "./logo192.png",
    imageWidth: 30,
    imageHeight: 30,
    imageAlt: "🦷",
    customClass: "century-gothic",
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
              <td>
                <form>
                  <select id="editarEspecialidad">
                    <option value=${ doctor.doctor.especialidad }>${ doctor.doctor.especialidad }</option>
                    ${ 
                      tratamientos.map( (tratamiento) => {
                        return(
                          `<option value=${ tratamiento.tratamiento.nombre }>${ tratamiento.tratamiento.nombre }</option>`
                        )
                      })            
                    }
                  </select>
                </form>
              </td>
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
      if(document.getElementById('editarNombre').value!== "" &&
      document.getElementById('editarApellido').value!== "" &&
      document.getElementById('editarEspecialidad').value!== "" ) {
        const contenidoDoctor = `{
          "doctor": {
            "nombre": "${document.getElementById('editarNombre').value}",
            "apellido": "${document.getElementById('editarApellido').value}",
            "especialidad": "${document.getElementById('editarEspecialidad').value}"
          },
          "id": ${doctor.id}
        }`;
        const fetchResponse = fetchUpdate(urlApiDoctores,JSON.stringify(contenidoDoctor),doctor.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) {
              let doctores;
              await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Doctores de la base de datos
                  .then(response => response.json())
                  .then(data => doctores = data);

              const root = ReactDOM.createRoot(document.getElementById('contenidoDoctores'));
              root.render(elementRender(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios));

              Swal.fire("Doctor Actualizado", "", "success"); 
            } 
            else { Swal.fire("Error en la actualización", "", "error"); }
          },
          function(error) { Swal.fire("Error en la actualización", "", "error"); }
        )
      }
    }
  }); 
};