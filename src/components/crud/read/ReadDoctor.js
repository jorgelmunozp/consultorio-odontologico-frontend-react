import Swal from 'sweetalert2';

export const ReadDoctor = (item) => {
  Swal.fire({
    title: "Doctor",
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
              <th>Datos Doctor</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td>${ item.id }</td>
            <tr>
            </tr>        
              <td> Identificacion </td>
              <td>${ item.doctor.identificacion }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ item.doctor.nombre }</td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td>${ item.doctor.apellido }</td>
            <tr>
            </tr>        
              <td> Género </td>
              <td>${ item.doctor.genero }</td>
            <tr>
            </tr>
              <td> Especialidad </td>
              <td>${ item.doctor.especialidad }</td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};