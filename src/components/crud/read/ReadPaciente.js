import Swal from 'sweetalert2';

export const ReadPaciente = (item) => {
  Swal.fire({
    title: "Paciente",
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
              <td> Identificación </td>
              <td>${ item.paciente.identificacion }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ item.paciente.nombre }</td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td>${ item.paciente.apellido }</td>
            <tr>
            </tr>
              <td> Género </td>
              <td>${ item.paciente.genero }</td>
            <tr>
            </tr>
              <td> Eps </td>
              <td>${ item.paciente.eps }</td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};