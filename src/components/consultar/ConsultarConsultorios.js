import ReactDOM from 'react-dom/client';
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { Arrows } from '../../atoms/arrows/Arrows';

const urlApiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
let consultorios;
await fetch(urlApiConsultorios)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => consultorios = data);

export const ConsultarConsultorios = () => {
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
                    <td><button className='App-body-boton-vistas' onClick={ () => ReadConsultorio(consultorio) }>&#128270;</button></td>
                    <td><button className='App-body-boton-vistas' onClick={ () => UpdateConsultorio(consultorio,urlApiConsultorios) }>&#x270D;</button></td>
                    <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteConsultorio(consultorio,urlApiConsultorios) }>&#x1F7AE;</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </center>
      </div>
    </div>
  );
};