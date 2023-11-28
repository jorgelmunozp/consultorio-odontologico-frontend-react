import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { fetchUpdate } from '../../helpers/fetchUpdate';

export const UpdateCita = (cita,urlApiCitas,elementRender,citas,pacientes,tratamientos,doctores,consultorios) => {
  Swal.fire({
    title: "Editar Cita Médica",
    imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
    imageWidth: 30,
    imageHeight: 30,
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
            <td><p class="swal2-input idText"> ${ cita.id } </p></td>
          <tr>
          </tr>
            <td> Paciente </td>
            <td>
              <form>
                <select id="editarPaciente">
                  <option value=${ cita.cita.paciente }>${ cita.cita.paciente }</option>
                  ${ 
                    pacientes.map( (pacientes) => {
                      return(
                        `<option value=${pacientes.paciente.nombre + "\&nbsp;" + pacientes.paciente.apellido}>${pacientes.paciente.nombre + "\&nbsp;" + pacientes.paciente.apellido}</option>`
                      )
                    })            
                  }
                </select>
              </form>
            </td>
          <tr>
          </tr>        
            <td> Fecha </td>
            <td><input id="editarFecha" type="date" value=${ cita.cita.fecha } class="swal2-input dateSelector"></input></td>
          <tr>
          </tr>     
            <td> Hora </td>
            <td><input id="editarHora" type="time" value=${ cita.cita.hora } class="swal2-input timeSelector"></input></td>
          <tr>
          </tr>
            <td> Consultorio </td>
            <td>
              <form>
                <select id="editarConsultorio">
                  <option value=${ cita.cita.consultorio }>${ cita.cita.consultorio }</option>
                  ${ 
                    consultorios.map( (consultorios) => {
                      return(
                        `<option value=${consultorios.consultorio.numero}>${consultorios.consultorio.numero + " - " + consultorios.consultorio.nombre}</option>`
                      )
                    })            
                  }
                </select>
              </form>
            </td>
          <tr>
          </tr>
            <td> Médico </td>
            <td>
              <form>
                <select id="editarDoctor">
                  <option value=${ cita.cita.doctor }>${ cita.cita.doctor }</option>
                  ${ 
                    doctores.map( (doctores) => {
                      return(
                        `<option value=${doctores.doctor.nombre + "\&nbsp;" + doctores.doctor.apellido}>${doctores.doctor.nombre + "\&nbsp;" + doctores.doctor.apellido}</option>`
                      )
                    })            
                  }
                </select>
              </form>
            </td>
          <tr>
          </tr>
            <td> Tratamiento </td>
            <td>
              <form>
                <select id="editarTratamiento">
                  <option value=${ cita.cita.tratamiento }>${ cita.cita.tratamiento }</option>
                  ${ 
                    tratamientos.map( (tratamientos) => {
                      return(
                        `<option value=${tratamientos.tratamiento.nombre}>${tratamientos.tratamiento.nombre}</option>`
                      )
                    })            
                  }
                </select>
              </form>
            </td>
          </tr>
          </tbody>
        </table>
      </center>
  `,
  showCancelButton: true,
  confirmButtonColor: "#5285c5",
  cancelButtonColor: "#d33",
  confirmButtonText: "Guardar",
  cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      if(document.getElementById('editarPaciente').value!== "" &&
      document.getElementById('editarFecha').value!== "" &&
      document.getElementById('editarHora').value!== "" &&
      document.getElementById('editarConsultorio').value!== "" &&
      document.getElementById('editarDoctor').value!== "" &&
      document.getElementById('editarTratamiento').value!== "" ) {
        const contenidoCita = `{
          "cita": {
            "paciente": "${document.getElementById('editarPaciente').value}",
            "fecha": "${document.getElementById('editarFecha').value}",
            "hora": "${document.getElementById('editarHora').value}",
            "consultorio": "${document.getElementById('editarConsultorio').value}",
            "doctor": "${document.getElementById('editarDoctor').value}",
            "tratamiento": "${document.getElementById('editarTratamiento').value}"
          },
          "id": ${cita.id}
        }`;
        const fetchResponse = fetchUpdate(urlApiCitas,JSON.stringify(contenidoCita),cita.id);
        fetchResponse.then(
          async function(value) {
            if(200 <= value && value <= 299) {
              let citas;
              await fetch(urlApiCitas)                      //API REST para consumo de la tabla Citas de la base de datos
                  .then(response => response.json())
                  .then(data => citas = data);

              const root = ReactDOM.createRoot(document.getElementById('contenidoCitas'));
              root.render(elementRender(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios));

              Swal.fire("Cita Actualizada", "", "success"); 
            } 
            else { Swal.fire("Error en la actualización", "", "error"); }
          },
          function(error) { Swal.fire("Error en la actualización", "", "error"); }
        )
      }
    }
  });
};
