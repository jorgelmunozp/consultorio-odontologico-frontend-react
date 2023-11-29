import Swal from 'sweetalert2';

export const ReadDoctor = (doctor) => {
  Swal.fire({
    title: "Doctor",
    imageUrl: "./logo192.png",
    imageWidth: 30,
    imageHeight: 30,
    imageAlt: "🦷",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};