import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteDoctor = (doctor,urlApiDoctores) => {
    Swal.fire({
      title: "Eliminar Doctor?",
      html: `
        <center>
          <table class="swalTable" border='1'>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Datos Doctor</th>
              <tr>
            </thead>
            <tbody>
              <tr>
                <td> Código </td>
                <td>${ doctor.id }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ doctor.doctor.nombre }</td>
              <tr>
              </tr>     
                <td> Apellido </td>
                <td>${ doctor.doctor.apellido }</td>
              <tr>
              </tr>
                <td> Especialidad </td>
                <td>${ doctor.doctor.especialidad }</td>
              <tr>
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteFetch(urlApiDoctores,doctor.id);

        let doctores;
        await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Doctores de la base de datos
            .then(response => response.json())
            .then(data => doctores = data);

        const root = ReactDOM.createRoot(
          document.getElementById('contenidoDoctores')
        );
        const element =    
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
          </center>;
        root.render(element);
        
        Swal.fire({ title: "Doctor Eliminado", icon: "success" });
      }
    });
};