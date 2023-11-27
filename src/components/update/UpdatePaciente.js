import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdatePaciente = (paciente,urlApiPacientes,elementHtml,citas,pacientes,tratamientos,doctores,consultorios,epss) => {
  Swal.fire({
    title: "Paciente",
    imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
    imageWidth: 30,
    imageHeight: 30,
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
              <td><p class="swal2-input idText"> ${ paciente.id } </p></td>
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
              <td>
                <form>
                  <select id="editarEps">
                    <option value=${ paciente.paciente.eps }>${ paciente.paciente.eps }</option>
                    ${ 
                      epss.map( (epss) => {
                        return(
                          `<option value=${epss.eps.nombre}>${epss.eps.nombre}</option>`
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
      const contenidoPaciente = `{
          "paciente": {
            "identificacion": "${document.getElementById('editarIdentificacion').value}",
            "nombre": "${document.getElementById('editarNombre').value}",
            "apellido": "${document.getElementById('editarApellido').value}",
            "genero": "${document.getElementById('editarGenero').value}",
            "eps": "${document.getElementById('editarEps').value}"
          },
          "id": ${paciente.id}
      }`;
      const fetchResponse = updateFetch(urlApiPacientes,JSON.stringify(contenidoPaciente),paciente.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) {
            let pacientes;
            await fetch(urlApiPacientes)                      //API REST para consumo de la tabla Pacientes de la base de datos
                .then(response => response.json())
                .then(data => pacientes = data);            
            
            const root = ReactDOM.createRoot(
              document.getElementById('contenidoPacientes')
            );
            root.render(elementHtml(urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios));


            Swal.fire("Paciente Actualizado", "", "success"); 
          } 
          else { Swal.fire("Error en la actualización", "", "error"); }
        },
        function(error) { Swal.fire("Error en la actualización", "", "error"); }
      )
    }
  });
};