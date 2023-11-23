import Swal from 'sweetalert2';
import { EliminarTratamiento } from '../componentesEliminar/EliminarTratamiento';

const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
let tratamientos;
await fetch(urlApiTratamientos)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => tratamientos = data);

const VerTratamiento = (tratamiento) => {
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
              <td>${ tratamiento.tratamiento.tipo }</td>
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
}

const EditarTratamiento = (tratamiento) => {
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
            <td><input type="text" value=${ tratamiento.id } class="swal2-input"></input></td>
          <tr>
          </tr>
            <td> Nombre </td>
            <td><input type="text" value=${ tratamiento.tratamiento.tipo } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Consultorio </td>
            <td><input type="text" value=${ tratamiento.tratamiento.consultorio } class="swal2-input"></input></td>
          <tr>
          </tr>        
            <td> Doctor </td>
            <td><input type="text" value=${ tratamiento.tratamiento.doctor } class="swal2-input"></input></td>
          <tr>
        </tbody>
      </table>
    </center>
  `,
  confirmButtonColor: "#5285c5",
  confirmButtonText: "Aceptar"
  });    
}

const ConsultarTratamientos = ({urlApiTratamientos}) => {
      return(
        <div className="App">
          <div id="contenidoTratamientos">  
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
                        <td>{ tratamiento.tratamiento.tipo }</td>
                        <td>{ tratamiento.tratamiento.consultorio }</td>
                        <td>{ tratamiento.tratamiento.doctor }</td>
                        <td><button className='App-body-boton-vistas' onClick={ () => VerTratamiento(tratamiento) }>&#128270;</button></td>
                        <td><button className='App-body-boton-vistas' onClick={ () => EditarTratamiento(tratamiento) }>&#x270D;</button></td>
                        <td><button className='App-body-boton-vistas color-rojo' onClick={ () => EliminarTratamiento(tratamiento,urlApiTratamientos) }>&#x1F7AE;</button></td>
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
    
    export default ConsultarTratamientos;