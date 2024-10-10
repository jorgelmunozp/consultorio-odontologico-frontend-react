import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdatePaciente = (item,urlApi,Row,epss,generos) => {
  Swal.fire({
    title: "Paciente",
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
              <th>Datos Paciente</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><p class="swal2-input idText"> ${ item.id } </p></td>
            <tr>
            </tr>
              <td> Identificación </td>
              <td><input id="editarIdentificacion" type="number" value=${ item.paciente.identificacion } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ item.paciente.nombre } class="swal2-input"></input></td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td><input id="editarApellido" type="text" value=${ item.paciente.apellido } class="swal2-input"></input></td>
            <tr>
            </tr>
              <td> Género </td>
              <td>
                <form>
                  <select id="editarGenero">
                    <option value=${ item.paciente.genero }>${ item.paciente.genero }</option>
                    ${ 
                      generos.map((item) => {
                        return(
                          `<option value=${item.genero.nombre}>${item.genero.nombre}</option>`
                        )
                      })            
                    }
                  </select>
                </form>
              </td>
            <tr>
            </tr>
              <td> Eps </td>
              <td>
                <form>
                  <select id="editarEps">
                    <option value=${ item.paciente.eps }>${ item.paciente.eps }</option>
                    ${ 
                      epss.map((item) => {
                        return(
                          `<option value=${item.eps.nombre}>${item.eps.nombre}</option>`
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
      document.getElementById('editarEps').value!== "" ) {
        const itemUpdated = `{
            "paciente": {
              "identificacion": "${document.getElementById('editarIdentificacion').value}",
              "nombre": "${document.getElementById('editarNombre').value}",
              "apellido": "${document.getElementById('editarApellido').value}",
              "genero": "${document.getElementById('editarGenero').value}",
              "eps": "${document.getElementById('editarEps').value}"
            },
            "id": ${item.id}
        }`;
        const fetchResponse = fetchUpdate(urlApi,JSON.stringify(itemUpdated),item.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) {
              let arrayResponse;
              await fetch(urlApi)                      //API REST para consumo de la tabla Pacientes de la base de datos
                  .then(response => response.json())
                  .then(data => arrayResponse = data);            
              
              const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
              row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} epss={epss} generos={generos} />);

              Swal.fire("Paciente Actualizado", "", "success"); 
            } 
            else { Swal.fire("Error en la actualización", "", "error"); }
          },
          function(error) { Swal.fire("Error en la actualización", "", "error"); }
        )
      }
    }
  });
};