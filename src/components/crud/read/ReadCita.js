import Swal from 'sweetalert2';

export const ReadCita = (cita) => {
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};