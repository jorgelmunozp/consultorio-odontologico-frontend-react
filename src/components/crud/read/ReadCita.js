import Swal from 'sweetalert2';
import { Logo } from '../../icons/logo/Logo'

export const ReadCita = (item) => {
  Swal.fire({
    title: "Cita Médica",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};