import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteDoctor = (doctor,urlApiDoctores) => {
    Swal.fire({
      title: "Eliminar Doctor?",
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
                <td>${ doctor.id }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ doctor.doctor.nombre }</td>
              <tr>
              </tr>     
                <td> Apellido </td>
                <td>${ doctor.doctor.apellido }</td>
              <tr>
              </tr>
                <td> Especialidad </td>
                <td>${ doctor.doctor.especialidad }</td>
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
        deleteFetch(urlApiDoctores,doctor.id);

        let doctores;
        await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Doctores de la base de datos
            .then(response => response.json())
            .then(data => doctores = data);

        const root = ReactDOM.createRoot(
          document.getElementById('contenidoDoctores')
        );

        Swal.fire({ title: "Doctor Eliminado", icon: "success" });
      }
    });
};