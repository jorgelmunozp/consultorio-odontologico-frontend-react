import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { UpdateTratamiento } from '../update/UpdateTratamiento';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteTratamiento = (tratamiento,urlApiTratamientos,doctores,consultorios) => {
    Swal.fire({
      title: "Eliminar Tratamiento?",
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
                <td>${ tratamiento.tratamiento.nombre }</td>
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
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        deleteFetch(urlApiTratamientos,tratamiento.id);

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
        </center>;
        root.render(element);
        Swal.fire({ title: "Tratamiento Eliminado", icon: "success" });
      }
    });
};