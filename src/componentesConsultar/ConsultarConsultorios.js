import Swal from 'sweetalert2';

const urlApiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
let consultorios;
await fetch(urlApiConsultorios)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => consultorios = data);

const VerConsultorio = (consultorio) => {
  
}

const EditarConsultorio = (consultorio) => {
  
}

const EliminarConsultorio = (consultorio) => {
  
}

const ConsultarConsultorios = () => {

    return (
      <div className="App">
        <div id="contenidoConsultorios">
          <center>
            <hr/>
            <h4> Consultorios Disponibles </h4>
            <hr/>
            <br/><br/>
            <table className="table" border='1'>
              <thead>
                <tr>
                  <th> Código </th>
                  <th> Número </th>
                  <th> Consultorio </th>
                  <th colSpan='3'> </th>
                  <th colSpan='3'> </th>
                </tr>
              </thead>
              <tbody>
                {
                  consultorios.map( consultorio => (
                    <tr>
                      <td>{ consultorio.id }</td>
                      <td>{ consultorio.consultorio.numero }</td>
                      <td>{ consultorio.consultorio.nombre }</td>
                      <td><button className='App-body-boton-vistas' onClick={ () => VerConsultorio(consultorio) }>&#128270;</button></td>
                      <td><button className='App-body-boton-vistas' onClick={ () => EditarConsultorio(consultorio) }>&#x270D;</button></td>
                      <td><button className='App-body-boton-vistas color-rojo' onClick={ () => EliminarConsultorio(consultorio) }>&#x1F7AE;</button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </center>
        </div>
      </div>
    );
  }
  
  export default ConsultarConsultorios;