import Swal from 'sweetalert2';

export const ReadConsultorio = (consultorio) => {
  Swal.fire({
    title: "Consultorio",
    imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
    imageWidth: 40,
    imageHeight: 40,
    imageAlt: "🦷",
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
              <td>${ consultorio.id }</td>
            <tr>
            </tr>
              <td> Número </td>
              <td>${ consultorio.consultorio.numero }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ consultorio.consultorio.nombre }</td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};