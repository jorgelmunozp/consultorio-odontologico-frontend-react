import Swal from 'sweetalert2';

export const ReadPaciente = (paciente) => {
  Swal.fire({
    title: "Paciente",
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
              <th>Datos Paciente</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td>${ paciente.id }</td>
            <tr>
            </tr>
              <td> Identificación </td>
              <td>${ paciente.paciente.identificacion }</td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td>${ paciente.paciente.nombre }</td>
            <tr>
            </tr>     
              <td> Apellido </td>
              <td>${ paciente.paciente.apellido }</td>
            <tr>
            </tr>
              <td> Género </td>
              <td>${ paciente.paciente.genero }</td>
            <tr>
            </tr>
              <td> Eps </td>
              <td>${ paciente.paciente.eps }</td>
            <tr>
          </tbody>
        </table>
      </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
};