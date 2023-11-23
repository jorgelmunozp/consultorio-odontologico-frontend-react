import Swal from 'sweetalert2';
import { DeleteTratamiento } from '../delete/DeleteTratamiento';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { UpdateTratamiento } from '../update/UpdateTratamiento';

const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
let tratamientos;
await fetch(urlApiTratamientos)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => tratamientos = data);

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
                        <td><button className='App-body-boton-vistas' onClick={ () => ReadTratamiento(tratamiento) }>&#128270;</button></td>
                        <td><button className='App-body-boton-vistas' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos) }>&#x270D;</button></td>
                        <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteTratamiento(tratamiento,urlApiTratamientos) }>&#x1F7AE;</button></td>
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