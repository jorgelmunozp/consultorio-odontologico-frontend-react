import Swal from 'sweetalert2';

export const ReadConsultorio = (item) => {
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
              <th>Datos Consultorio</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td>${ item.id }</td>
            <tr>
            </tr>
              <td> Número </td>
              <td>${ item.consultorio.numero }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ item.consultorio.nombre }</td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};