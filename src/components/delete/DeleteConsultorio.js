import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { deleteFetch } from '../../helpers/deleteFetch';

export const DeleteConsultorio = (consultorio,urlApiConsultorios) => {
    Swal.fire({
      title: "Eliminar Consultorio?",
      html: `
        <center>
          <table class="swalTable" border='1'>
            <thead>
              <tr>
                <th>Parámetro</th>
                <th>Datos Consultorio</th>
              <tr>
            </thead>
            <tbody>
              <tr>
                <td> Código </td>
                <td>${ consultorio.id }</td>
              <tr>
              </tr>
                <td> Número </td>
                <td>${ consultorio.consultorio.numero }</td>
              <tr>
              </tr>        
                <td> Nombre </td>
                <td>${ consultorio.consultorio.nombre }</td>
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
        deleteFetch(urlApiConsultorios,consultorio.id);

        let consultorios;
        await fetch(urlApiConsultorios)                      //API REST para consumo de la tabla Consultorios de la base de datos
            .then(response => response.json())
            .then(data => consultorios = data);
  
        const root = ReactDOM.createRoot(
          document.getElementById('contenidoConsultorios')
        );
        const element =    
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
          </center>;
    root.render(element);

        Swal.fire({ title: "Consultorio Eliminado", icon: "success" });
      }
    });
};