import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../../helpers/fetchDelete';

export const DeletePaciente = (item,urlApi) => {
  Swal.fire({
    title: "Eliminar Paciente?",
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
              <td>${ item.id }</td>
            <tr>
            </tr>
              <td> Identificación </td>
              <td>${ item.paciente.identificacion }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ item.paciente.nombre }</td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td>${ item.paciente.apellido }</td>
            <tr>
            </tr>
              <td> Género </td>
              <td>${ item.paciente.genero }</td>
            <tr>
            </tr>
              <td> Eps </td>
              <td>${ item.paciente.eps }</td>
            <tr>
          </tbody>
        </table>
      </center>
    `,
    icon: "warning",
    customClass: "century-gothic",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const fetchResponse = fetchDelete(urlApi,item.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) {
            let arrayResponse;
            await fetch(urlApi)                      //API REST para consumo de la tabla Pacientes de la base de datos
                .then(response => response.json())
                .then(data => arrayResponse = data);

            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render();
            
            Swal.fire({ title: "Paciente Eliminado", icon: "success" });
          }
          else { Swal.fire("Error en la eliminación", "", "error"); }
        },
        function(error) { Swal.fire("Error en la eliminación", "", "error"); }
      )
    }
  });
};