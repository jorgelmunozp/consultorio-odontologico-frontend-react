import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { DeleteTratamiento } from '../delete/DeleteTratamiento';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateTratamiento = (tratamiento,urlApiTratamientos,doctores,consultorios) => {
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
            <td><p class="swal2-input idText"> ${ tratamiento.id } </p></td>
          <tr>
          </tr>
            <td> Nombre </td>
            <td><input id="editarNombre" type="text" value=${ tratamiento.tratamiento.nombre } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Consultorio </td>
            <td>
              <form>
                <select id="editarConsultorio">
                  <option value=${ tratamiento.tratamiento.consultorio }>${ tratamiento.tratamiento.consultorio }</option>
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
            <td> Doctor </td>
            <td>
              <form>
                <select id="editarDoctor">
                  <option value=${ tratamiento.tratamiento.doctor }>${ tratamiento.tratamiento.doctor }</option>
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
      const contenidoTratamiento = `{
          "tratamiento": {
            "nombre": "${document.getElementById('editarNombre').value}",
            "consultorio": "${document.getElementById('editarConsultorio').value}",
            "doctor": "${document.getElementById('editarDoctor').value}"
          },
          "id": ${tratamiento.id}
      }`;
      const fetchResponse = updateFetch(urlApiTratamientos,JSON.stringify(contenidoTratamiento),tratamiento.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) {
            let tratamientos;
            await fetch(urlApiTratamientos)                      //API REST para consumo de la tabla Tratamientos de la base de datos
                .then(response => response.json())
                .then(data => tratamientos = data);
                
            const root = ReactDOM.createRoot(
              document.getElementById('contenidoTratamientos')
            );
            const element =    
              <center>
                <hr/>
                <h4> Tratamientos Autorizados </h4>
                <hr/>
                <br/><br/>
                <table className="table" border='1'>
                  <thead>
                    <tr>
                      <th> Código </th>
                      <th> Nombre </th>
                      <th> Consultorio </th>
                      <th> Doctor </th>
                      <th colSpan='3'> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      tratamientos.map( tratamiento => (
                        <tr>
                          <td>{ tratamiento.id }</td>
                          <td>{ tratamiento.tratamiento.nombre }</td>
                          <td>{ tratamiento.tratamiento.consultorio }</td>
                          <td>{ tratamiento.tratamiento.doctor }</td>
                          <td><button className='App-body-boton-vistas' onClick={ () => ReadTratamiento(tratamiento) }>&#128270;</button></td>
                          <td><button className='App-body-boton-vistas' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,doctores,consultorios) }>&#x270D;</button></td>
                          <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteTratamiento(tratamiento,urlApiTratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </center>
            root.render(element);       

            Swal.fire("Tratamiento Actualizado", "", "success"); 
          }
          else { Swal.fire("Error en la actualización", "", "error"); }
        },
        function(error) { Swal.fire("Error en la actualización", "", "error"); }
      )
    }
  });    
};