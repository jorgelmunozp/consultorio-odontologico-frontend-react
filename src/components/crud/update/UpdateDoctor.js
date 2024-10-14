import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdateDoctor = (item,urlApi,Row,tratamientos,generos) => {
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
              <td><p class="swal2-input idText"> ${ item.id } </p></td>
            <tr>
            </tr>        
              <td> Identificacion </td>
              <td><input id="editarIdentificacion" type="number" value=${ item.doctor.identificacion } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ item.doctor.nombre } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td><input id="editarApellido" type="text" value=${ item.doctor.apellido } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Género </td>
              <td>
                  <form>
                    <select id="editarGenero">
                      <option value=${ item.doctor.genero }>${ item.doctor.genero }</option>
                      ${ 
                        generos.map((generos) => {
                          return(
                            `<option value=${generos.genero.nombre}>${generos.genero.nombre}</option>`
                          )
                        })            
                      }
                    </select>
                  </form>
                </td>
            <tr>
            </tr>
              <td> Especialidad </td>
              <td>
                <form>
                  <select id="editarEspecialidad">
                    <option value=${ item.doctor.especialidad }>${ item.doctor.especialidad }</option>
                    ${ 
                      tratamientos.map((tratamientos) => {
                        return(
                          `<option value=${tratamientos.tratamiento.nombre}>${tratamientos.tratamiento.nombre}</option>`
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
      if(document.getElementById('editarIdentificacion').value!== "" &&
      document.getElementById('editarNombre').value!== "" &&
      document.getElementById('editarApellido').value!== "" &&
      document.getElementById('editarGenero').value!== "" &&
      document.getElementById('editarEspecialidad').value!== "" ) {
        const itemUpdated = `{
          "doctor": {
            "identificacion": "${document.getElementById('editarIdentificacion').value}",
            "nombre": "${document.getElementById('editarNombre').value}",
            "apellido": "${document.getElementById('editarApellido').value}",
            "genero": "${document.getElementById('editarGenero').value}",
            "especialidad": "${document.getElementById('editarEspecialidad').value}"
          },
          "id": ${item.id}
        }`;
        const fetchResponse = fetchUpdate(urlApi,JSON.stringify(itemUpdated),item.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) {
              let arrayResponse;
              await fetch(urlApi)                      //API REST para consumo de la tabla Doctores de la base de datos
                  .then(response => response.json())
                  .then(data => arrayResponse = data);

              const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
              row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} tratamientos={tratamientos} generos={generos} />);

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