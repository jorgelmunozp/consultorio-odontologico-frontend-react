import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdateConsultorio = (item,urlApi,Row,pacientes,tratamientos,doctores) => {
  Swal.fire({
    title: "Consultorio",
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
              <th>Datos Consultorio</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><p class="swal2-input idText"> ${ item.id } </p></td>
            <tr>
            </tr>
              <td> Número </td>
              <td><input id="editarNumero" type="number" value=${ item.consultorio.numero } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ item.consultorio.nombre } class="swal2-input"></input></td>
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
          "id": ${item.id}
        }`;
        const fetchResponse = fetchUpdate(urlApi,JSON.stringify(contenidoConsultorios),item.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) { 
              let consultorios;
              await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
                  .then(response => response.json())
                  .then(data => consultorios = data);
        
              const row = ReactDOM.createRoot(document.getElementById('contenidoConsultorios'));
              row.render(<Row item={item} urlApi={urlApi} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} />);
          
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