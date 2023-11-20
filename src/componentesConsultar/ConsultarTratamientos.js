import Swal from 'sweetalert2';

const urlApiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
let tratamientos;
await fetch(urlApiTratamientos)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => tratamientos = data);

const VerTratamiento = (tratamiento) => {

}

const EditarTratamiento = (tratamiento) => {
  
}

const EliminarTratamiento = (tratamiento) => {
  
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
                    <th> Tratamiento </th>
                    <th> Consultorio </th>
                    <th> Doctor </th>
                    <th> Fecha </th>
                    <th> Hora </th>
                    <th colSpan='3'> </th>
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
                        <td><button className='App-body-boton-vistas color-rojo' onClick={ () => EliminarTratamiento(tratamiento) }>&#x1F7AE;</button></td>
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