import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../../helpers/fetchDelete';

export const DeleteCita = async (item,urlApi) => {
  Swal.fire({
    title: "Eliminar Cita?",
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
              <td> Paciente </td>
              <td>${ item.cita.paciente }</td>
            <tr>
            </tr>        
              <td> Fecha </td>
              <td>${ item.cita.fecha }</td>
            <tr>
            </tr>     
              <td> Hora </td>
              <td>${ item.cita.hora }</td>
            <tr>
            </tr>
              <td> Consultorio </td>
              <td>${ item.cita.consultorio }</td>
            <tr>
            </tr>
              <td> Médico </td>
              <td>${ item.cita.doctor }</td>
            <tr>
            </tr>
              <td> Tratamiento </td>
              <td>${ item.cita.tratamiento }</td>
            </tr>
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
            await fetch(urlApi)                      
                .then(response => response.json())
                .then(data => arrayResponse = data);
    
            const row = ReactDOM.createRoot(document.getElementById( 'row'+item.id ));
            row.render();
    
            Swal.fire({ title: "Cita Eliminada", icon: "success" });
          }
          else { Swal.fire("Error en la eliminación", "", "error"); }
        },
        function(error) { Swal.fire("Error en la eliminación", "", "error"); }
      )
    }
  });
};