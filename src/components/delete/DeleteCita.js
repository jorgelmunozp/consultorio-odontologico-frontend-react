import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchDelete } from '../../helpers/fetchDelete';

  export const DeleteCita = async (cita,urlApiCitas,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) => {
    Swal.fire({
      title: "Eliminar Cita?",
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
                <td>${ cita.id }</td>
              <tr>
              </tr>
                <td> Paciente </td>
                <td>${ cita.cita.paciente }</td>
              <tr>
              </tr>        
                <td> Fecha </td>
                <td>${ cita.cita.fecha }</td>
              <tr>
              </tr>     
                <td> Hora </td>
                <td>${ cita.cita.hora }</td>
              <tr>
              </tr>
                <td> Consultorio </td>
                <td>${ cita.cita.consultorio }</td>
              <tr>
              </tr>
                <td> Médico </td>
                <td>${ cita.cita.doctor }</td>
              <tr>
              </tr>
                <td> Tratamiento </td>
                <td>${ cita.cita.tratamiento }</td>
              </tr>
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
        fetchDelete(urlApiCitas,cita.id);
        
        let citas;
        await fetch(urlApiCitas)                      //API REST para consumo de la tabla Citas de la base de datos
            .then(response => response.json())
            .then(data => citas = data);

        const root = ReactDOM.createRoot(document.getElementById('contenidoCitas'));
        root.render(elementHtml(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios));

        Swal.fire({ title: "Cita Eliminada", icon: "success" });
      }
    });



};