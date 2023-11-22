import Swal from 'sweetalert2';
import { editarFetch } from '../helpers/editarFetch';
import { eliminarFetch } from '../helpers/eliminarFetch';

const urlApiCitas = process.env.REACT_APP_API_CITAS;
let citas;
await fetch(urlApiCitas)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => citas = data);

const VerCita = (cita) => {
  Swal.fire({
    title: "Cita Médica",
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
            <td>${ cita.id }</td>
          <tr>
          </tr>
            <td> Paciente </td>
            <td>${ cita.cita.paciente }</td>
          <tr>
          </tr>        
            <td> Fecha </td>
            <td>${ cita.cita.fecha }</td>
          <tr>
          </tr>     
            <td> Hora </td>
            <td>${ cita.cita.hora }</td>
          <tr>
          </tr>
            <td> Consultorio </td>
            <td>${ cita.cita.consultorio }</td>
          <tr>
          </tr>
            <td> Médico </td>
            <td>${ cita.cita.medico }</td>
          <tr>
          </tr>
            <td> Tratamiento </td>
            <td>${ cita.cita.tratamiento }</td>
          </tr>
        </tbody>
      </table>
    </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });
}

const EditarCita = (cita) => {
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
          <td><input id="editarPaciente" type="text" value=${ cita.cita.paciente } class="swal2-input"></input></td>
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
      editarFetch(urlApiCitas,JSON.stringify(contenidoCita),cita.id);
      Swal.fire("Cita Actualizada", "", "success");
    }
  });
}
const EliminarCita = (cita) => {
  Swal.fire({
    title: "Eliminar Cita?",
    text: "You won't be able to revert this!",
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
            <td><input type="text" value=${ cita.id } class="swal2-input"></input></td>
          <tr>
          </tr>
            <td> Paciente </td>
            <td><input id="editarPaciente" type="text" value=${ cita.cita.paciente } class="swal2-input"></input></td>
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
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarFetch(urlApiCitas,cita.id);
      Swal.fire({
        title: "Cita Eliminada",
        text: "La cita fué eliminada con éxito",
        icon: "success"
      });
    }
  });
}

const ConsultarCitas = () => {

  return(
      <div className="App">
        <div id="contenidoCitas">  
          <center>
            <hr/>
            <h4> Citas Registradas </h4>
            <hr/>
            <br/><br/>
            <table className="table" border='1'>
              <thead>
                <tr>
                  <th> Código </th>
                  <th> Paciente </th>
                  <th> Fecha </th>
                  <th> Hora </th>
                  <th> Consultorio </th>
                  <th> Médico </th>
                  <th> Tratamiento </th>
                  <th colSpan='3'> </th>
                </tr>
              </thead>
              <tbody>
                {
                  citas.map( cita => (
                    <tr>
                      <td>{ cita.id }</td>
                      <td>{ cita.cita.paciente }</td>
                      <td>{ cita.cita.fecha }</td>
                      <td>{ cita.cita.hora }</td>
                      <td>{ cita.cita.consultorio }</td>
                      <td>{ cita.cita.medico }</td>
                      <td>{ cita.cita.tratamiento }</td>
                      <td><button className='App-body-boton-vistas' onClick={ () => VerCita(cita) }>&#128270;</button></td>
                      <td><button className='App-body-boton-vistas' onClick={ () => EditarCita(cita) }>&#x270D;</button></td>
                      <td><button className='App-body-boton-vistas color-rojo' onClick={ () => EliminarCita(cita) }>&#x1F7AE;</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </center>
        </div>
      </div>
    )
  }

  export default ConsultarCitas;