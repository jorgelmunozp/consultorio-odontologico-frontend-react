import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdateTratamiento = (item,urlApi,Row,doctores,consultorios) => {
  Swal.fire({
    title: "Tratamiento",
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
            <th>Datos</th>
          <tr>
        </thead>
        <tbody>
          <tr>
            <td> Código </td>
            <td><p class="swal2-input idText"> ${ item.id } </p></td>
          <tr>
          </tr>
            <td> Nombre </td>
            <td><input id="editarNombre" type="text" value=${ item.tratamiento.nombre } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Consultorio </td>
            <td>
              <form>
                <select id="editarConsultorio">
                  <option value=${ item.tratamiento.consultorio.numero + " - " + item.tratamiento.consultorio.nombre }>${ item.tratamiento.consultorio.numero + " - " + item.tratamiento.consultorio.nombre }</option>
                  ${ 
                    consultorios.map((consultorios) => {
                      return(
                        `<option value=${consultorios.consultorio}>${consultorios.consultorio.numero + " - " + consultorios.consultorio.nombre}</option>`
                      )
                    })            
                  }
                </select>
              </form>
            </td>
          <tr>
          </tr>        
            <td> Doctor </td>
            <td>
              <form>
                <select id="editarDoctor">
                  <option value=${ item.tratamiento.doctor }>${ item.tratamiento.doctor.nombre + " " + item.tratamiento.doctor.apellido }</option>
                  ${ 
                    doctores.map((doctores) => {
                      return(
                        `<option value=${doctores.doctor}>${doctores.doctor.nombre + " " + doctores.doctor.apellido}</option>`
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
      document.getElementById('editarConsultorio').value!== "" &&
      document.getElementById('editarDoctor').value!== "" ) {
        const itemUpdated = `{
          "tratamiento": {
            "nombre": "${document.getElementById('editarNombre').value}",
            "consultorio": "${document.getElementById('editarConsultorio').value}",
            "doctor": "${document.getElementById('editarDoctor').value}"
          },
          "id": ${item.id}
        }`;
        console.log("itemUpdated: ", itemUpdated)

        console.log("editarDoctor.value: ", document.getElementById('editarDoctor').value)
        console.log("editarConsultorio.value: ", document.getElementById('editarConsultorio').value)
        console.log("item: ", item)
        console.log("item.tratamiento.doctor: ", item.tratamiento.doctor)
        console.log("item.tratamiento.consultorio: ", item.tratamiento.consultorio)

        const fetchResponse = fetchUpdate(urlApi,JSON.stringify(itemUpdated),item.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) {
              let arrayResponse;
              await fetch(urlApi)                      //API REST para consumo de la tabla Tratamientos de la base de datos
                  .then(response => response.json())
                  .then(data => arrayResponse = data);
                  
              const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
              row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} doctores={doctores} consultorios={consultorios} />);

              Swal.fire("Tratamiento Actualizado", "", "success"); 
            }
            else { Swal.fire("Error en la actualización", "", "error"); }
          },
          function(error) { Swal.fire("Error en la actualización", "", "error"); }
        )
      }
    }
  });    
};