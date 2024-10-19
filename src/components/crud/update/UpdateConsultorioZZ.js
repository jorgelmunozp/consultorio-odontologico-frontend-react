import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../../helpers/fetchUpdate';

export const UpdateConsultorio = (item,urlApi,Row,Consultorio,numero,nombre,setNumero,handleChangeNumero) => { 
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
              <th>Datos</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><p class="swal2-input idText"> ${ item.id } </p></td>
            </tr>
            <tr>
              <td> Número </td>
              <td><input id="editarNumero" type="number" value=${ item.consultorio.numero } class="swal2-input"></input></td>
            </tr>
            <tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ item.consultorio.nombre } class="swal2-input"></input></td>
            </tr>
          </tbody>
        </table>
      </center>
  `,
  showCancelButton: true,
  confirmButtonColor: "#5285c5",
  cancelButtonColor: "#d33",
  confirmButtonText: "Guardar",
  cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      if(document.getElementById('editarNumero').value!== "" &&
      document.getElementById('editarNombre').value!== "" ) {
        item.consultorio.numero = document.getElementById('editarNumero').value;
        item.consultorio.nombre = document.getElementById('editarNombre').value;

        const fetchResponse = fetchUpdate(urlApi,JSON.stringify(item),item.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) { 
              let arrayResponse;
              await fetch(urlApi)                      //API REST para consumo de la tabla Consultorios de la base de datos
                  .then(response => response.json())
                  .then(data => arrayResponse = data);
        
              const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
              row.render(<Row item={arrayResponse[item.id-1]} urlApi={urlApi} />);
          
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