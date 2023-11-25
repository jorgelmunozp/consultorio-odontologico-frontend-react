import Swal from 'sweetalert2';

export const ReadTratamiento= (tratamiento) => {
  Swal.fire({
    title: "Tratamiento",
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
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });  
};