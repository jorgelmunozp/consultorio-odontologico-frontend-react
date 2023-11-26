import ReactDOM from 'react-dom/client';
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { Arrows } from '../../atoms/arrows/Arrows';

const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
let doctores;
await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => doctores = data);
   
export const ConsultarDoctores = () => {
  return (
    <div className="App">
      <div id="contenidoDoctores">
        <center>
          <hr/>
          <h4> Doctores Disponibles </h4>
          <hr/>
          <br/><br/>
          <table className="table" border='1'>
            <thead>
              <tr>
                <th> Código </th>
                <th> Nombre </th>
                <th> Apellido </th>
                <th> Especialidad </th>
                <th colSpan='3'> </th>
              </tr>
            </thead>
            <tbody>
              {
                doctores.map( doctor => (
                  <tr>
                    <td>{ doctor.id }</td>
                    <td>{ doctor.doctor.nombre }</td>
                    <td>{ doctor.doctor.apellido }</td>
                    <td>{ doctor.doctor.especialidad }</td>
                    <td><button className='App-body-boton-vistas' onClick={ () => ReadDoctor(doctor) }>&#128270;</button></td>
                    <td><button className='App-body-boton-vistas' onClick={ () => UpdateDoctor(doctor,urlApiDoctores) }>&#x270D;</button></td>
                    <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteDoctor(doctor,urlApiDoctores) }>&#x1F7AE;</button></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </center>
      </div>
    </div>
  )
};