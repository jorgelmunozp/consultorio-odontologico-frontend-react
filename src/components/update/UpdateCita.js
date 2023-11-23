import Swal from 'sweetalert2';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateCita = (cita,urlApiCitas) => {
  console.log(cita.cita.paciente.split(" ")[0])
  console.log(cita.cita.paciente.split(" ")[1])
  Swal.fire({
    title: "Editar Cita Médica",
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
          <td><input id="editarId" type="text" value=${ cita.id } class="swal2-input"></input></td>
        <tr>
        </tr>
          <td> Paciente </td>
          <td><input id="editarPaciente" type="text" value=${ cita.cita.paciente.split(" ")[0] + cita.cita.paciente.split(" ")[1] } class="swal2-input"></input></td>
        <tr>
        </tr>        
          <td> Fecha </td>
          <td><input id="editarFecha" type="text" value=${ cita.cita.fecha } class="swal2-input"></input></td>
        <tr>
        </tr>     
          <td> Hora </td>
          <td><input id="editarHora" type="text" value=${ cita.cita.hora } class="swal2-input"></input></td>
        <tr>
        </tr>
          <td> Consultorio </td>
          <FormControl fullWidth margin="dense">
          <InputLabel
            id="registroConsultorio-label"
            className="select"
          >
            Consultorio
          </InputLabel>
          <Select
            labelId="registroConsultorio-label"
            id="registroConsultorio"
            value={consultorio}
            label="registroConsultorio"
            onChange={handleChangeConsultorio}
          >
            {consultorios.map((consultorios) => {
              return (
                <MenuItem
                  value={consultorios.id}
                  className="select-item"
                >
                  {consultorios.consultorio.numero}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
          <td><input id="editarConsultorio" type="text" value=${ cita.cita.consultorio } class="swal2-input"></input></td>
        <tr>
        </tr>
          <td> Médico </td>
          <td><input id="editarMedico" type="text" value=${ cita.cita.medico } class="swal2-input"></input></td>
        <tr>
        </tr>
          <td> Tratamiento </td>
          <td><input id="editarTratamiento" type="text" value=${ cita.cita.tratamiento } class="swal2-input"></input></td>
        </tr>
        </tbody>
      </table>
    </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Guardar"
  }).then((result) => {
    if (result.isConfirmed) {
      console.log(document.getElementById('editarPaciente'))
      console.log(document.getElementById('editarPaciente').value)
      const contenidoCita = `{
          "cita": {
            "paciente": "${document.getElementById('editarPaciente').value}",
            "fecha": "${document.getElementById('editarFecha').value}",
            "hora": "${document.getElementById('editarHora').value}",
            "consultorio": "${document.getElementById('editarConsultorio').value}",
            "medico": "${document.getElementById('editarMedico').value}",
            "tratamiento": "${document.getElementById('editarTratamiento').value}"
          },
          "id": ${document.getElementById('editarId').value}
      }`;
      updateFetch(urlApiCitas,JSON.stringify(contenidoCita),cita.id);
      Swal.fire("Cita Actualizada", "", "success");
    }
  });
};