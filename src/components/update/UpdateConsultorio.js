import Swal from 'sweetalert2';
import ReactDOM from 'react-dom/client';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { updateFetch } from '../../helpers/updateFetch';

export const UpdateConsultorio = (consultorio,urlApiConsultorios) => {
  Swal.fire({
    title: "Consultorio",
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
              <th>Datos Consultorio</th>
            <tr>
          </thead>
          <tbody>
            <tr>
              <td> Código </td>
              <td><p class="swal2-input idText"> ${ consultorio.id } </p></td>
            <tr>
            </tr>
              <td> Número </td>
              <td><input id="editarNumero" type="text" value=${ consultorio.consultorio.numero } class="swal2-input"></input></td>
            <tr>
            </tr>        
              <td> Nombre </td>
              <td><input id="editarNombre" type="text" value=${ consultorio.consultorio.nombre } class="swal2-input"></input></td>
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
      const contenidoConsultorios = `{
          "consultorio": {
            "numero": "${document.getElementById('editarNumero').value}",
            "nombre": "${document.getElementById('editarNombre').value}"
          },
          "id": ${consultorio.id}
      }`;
      const fetchResponse = updateFetch(urlApiConsultorios,JSON.stringify(contenidoConsultorios),consultorio.id);
      fetchResponse.then(
        async function(value) {
          if(200 <= value && value <= 299) { 
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
        
            Swal.fire("Consultorio Actualizado", "", "success"); 
          } 
          else { Swal.fire("Error en la actualización", "", "error"); }
        },
        function(error) { Swal.fire("Error en la actualización", "", "error"); }
      )
    }
  });
};