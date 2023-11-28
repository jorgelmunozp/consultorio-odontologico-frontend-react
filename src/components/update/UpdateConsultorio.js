import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../helpers/fetchUpdate';

export const UpdateConsultorio = (consultorio,urlApiConsultorios,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) => {
  Swal.fire({
    title: "Consultorio",
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
              <th>Datos Consultorio</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><p class="swal2-input idText"> ${ consultorio.id } </p></td>
            <tr>
            </tr>
              <td> Número </td>
              <td><input id="editarNumero" type="number" value=${ consultorio.consultorio.numero } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ consultorio.consultorio.nombre } class="swal2-input"></input></td>
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
      if(document.getElementById('editarNumero').value!== "" &&
      document.getElementById('editarNombre').value!== "" ) {
        const contenidoConsultorios = `{
          "consultorio": {
            "numero": "${document.getElementById('editarNumero').value}",
            "nombre": "${document.getElementById('editarNombre').value}"
          },
          "id": ${consultorio.id}
        }`;
        const fetchResponse = fetchUpdate(urlApiConsultorios,JSON.stringify(contenidoConsultorios),consultorio.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) { 
              let consultorios;
              await fetch(urlApiConsultorios)                      //API REST para consumo de la tabla Consultorios de la base de datos
                  .then(response => response.json())
                  .then(data => consultorios = data);
        
              const root = ReactDOM.createRoot(document.getElementById('contenidoConsultorios'));
              root.render(elementHtml(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios));
          
              Swal.fire("Consultorio Actualizado", "", "success"); 
            } 
            else { Swal.fire("Error en la actualización", "", "error"); }
          },
          function(error) { Swal.fire("Error en la actualización", "", "error"); }
        )
      }
    }
  });
};