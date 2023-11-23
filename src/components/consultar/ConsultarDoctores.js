import Swal from 'sweetalert2';
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';

const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
let doctores;
await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => doctores = data);

// const EditarDoctor = (doctor) => {
//   Swal.fire({
//     title: "Doctor",
//     imageUrl: "./consultorio-odontologico-frontend-react/logo192.png",
//     imageWidth: 40,
//     imageHeight: 40,
//     imageAlt: "🦷",
//     html: `
//       <center>
//         <table class="swalTable" border='1'>
//           <thead>
//             <tr>
//               <th>Parámetro</th>
//               <th>Datos Doctor</th>
//             <tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td> Código </td>
//               <td><input type="text" value=${ doctor.id } class="swal2-input"></input></td>
//             <tr>
//             </tr>        
//               <td> Nombre </td>
//               <td><input type="text" value=${ doctor.doctor.nombre } class="swal2-input"></input></td>
//             <tr>
//             </tr>     
//               <td> Apellido </td>
//               <td><input type="text" value=${ doctor.doctor.apellido } class="swal2-input"></input></td>
//             <tr>
//             </tr>
//               <td> Especialidad </td>
//               <td><input type="text" value=${ doctor.doctor.especialidad } class="swal2-input"></input></td>
//             <tr>
//           </tbody>
//         </table>
//       </center>
//   `,
//   confirmButtonColor: "#5285c5",
//   confirmButtonText: "Aceptar"
//   });  
// }

    
const ConsultarDoctores = () => {
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
}

export default ConsultarDoctores;