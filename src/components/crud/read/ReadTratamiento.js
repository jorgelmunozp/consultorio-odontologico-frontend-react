import Swal from 'sweetalert2';

export const ReadTratamiento= (item) => {
  Swal.fire({
    title: "Tratamiento",
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
            </tr>
            <tr>
              <td> Nombre </td>
              <td>${ item.tratamiento.nombre }</td>
            </tr>
            <tr>        
              <td> Consultorio </td>
              <td>${ item.tratamiento.consultorio.numero }</td>
            </tr>
            <tr>        
              <td> </td>
              <td>${ item.tratamiento.consultorio.nombre }</td>
            </tr>
            <tr>        
              <td> Doctor </td>
              <td>${ item.tratamiento.doctor.nombre +" "+ item.tratamiento.doctor.apellido }</td>
            </tr>
            <tr>        
              <td> </td>
              <td>${ item.tratamiento.doctor.especialidad }</td>
            </tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });  
};