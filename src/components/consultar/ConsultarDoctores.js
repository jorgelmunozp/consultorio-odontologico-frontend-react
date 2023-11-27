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

const element = (pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Doctores Disponibles </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Apellido&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","apellido",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","apellido",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Especialidad&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","especialidad",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","especialidad",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th colSpan='3'></th>
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
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateDoctor(doctor,urlApiDoctores,tratamientos) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteDoctor(doctor,urlApiDoctores) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;

  const handleSortBy = async (dir,parameter,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      doctores.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      doctores.sort((a, b) => (a.doctor.nombre > b.doctor.nombre) ? 1 : -1); 
    } else if(parameter==="apellido") {
      doctores.sort((a, b) => (a.doctor.apellido > b.doctor.apellido) ? 1 : -1);
    } else if(parameter==="especialidad") {
      doctores.sort((a, b) => (a.doctor.especialidad > b.doctor.especialidad) ? 1 : -1);
    } 
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      doctores.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      doctores.sort((a, b) => (a.doctor.nombre < b.doctor.nombre) ? 1 : -1); 
    } else if(parameter==="apellido") {
      doctores.sort((a, b) => (a.doctor.apellido < b.doctor.apellido) ? 1 : -1); 
    } else if(parameter==="especialidad") {
      doctores.sort((a, b) => (a.doctor.especialidad < b.doctor.especialidad) ? 1 : -1); 
    }
  }
  renderContent(pacientes,tratamientos,doctores,consultorios);
  }

  const renderContent = (pacientes,tratamientos,doctores,consultorios) => {
    const root = ReactDOM.createRoot(document.getElementById('contenidoDoctores'));
    root.render(element(pacientes,tratamientos,doctores,consultorios));
  }

export const ConsultarDoctores = ({ pacientes,tratamientos,doctores,consultorios }) => {
  return (
    <div className="App">
      <div id="contenidoDoctores">
        { element(pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};