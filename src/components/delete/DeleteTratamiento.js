import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../helpers/fetchDelete';

export const DeleteTratamiento = (root,tratamiento,urlApiTratamientos,elementRender,citas,pacientes,doctores,consultorios) => {
  Swal.fire({
    title: "Eliminar Tratamiento?",
    html: `
      <center>
        <table class="swalTable" border='1'>
          <thead>
            <tr>
              <th>Parámetro</th>
              <th>Datos Tratamiento</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td>${ tratamiento.id }</td>
            <tr>
            </tr>
              <td> Nombre </td>
              <td>${ tratamiento.tratamiento.nombre }</td>
            <tr>
            </tr>        
              <td> Consultorio </td>
              <td>${ tratamiento.tratamiento.consultorio }</td>
            <tr>
            </tr>        
              <td> Doctor </td>
              <td>${ tratamiento.tratamiento.doctor }</td>
            <tr>
          </tbody>
        </table>
      </center>
    `,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const fetchResponse = fetchDelete(urlApiTratamientos,tratamiento.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) {
            let tratamientos;
            await fetch(urlApiTratamientos)                      //API REST para consumo de la tabla Tratamientos de la base de datos
                .then(response => response.json())
                .then(data => tratamientos = data);
            
            const root = ReactDOM.createRoot(document.getElementById('contenido'));
            root.render(elementRender(root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios));
            
            Swal.fire({ title: "Tratamiento Eliminado", icon: "success" });
          }
          else { Swal.fire("Error en la eliminación", "", "error"); }
        },
        function(error) { Swal.fire("Error en la eliminación", "", "error"); }
      )
    }
  });
};