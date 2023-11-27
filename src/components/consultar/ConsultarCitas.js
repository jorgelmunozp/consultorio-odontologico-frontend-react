import ReactDOM from 'react-dom/client';
import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';
import { Arrows } from '../../atoms/arrows/Arrows';

const urlApiCitas = process.env.REACT_APP_API_CITAS;
let citas;
await fetch(urlApiCitas)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => citas = data);

const element = (pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Citas Registradas </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Paciente&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","paciente",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","paciente",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Fecha&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","fecha",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","fecha",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Hora&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","hora",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","hora",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Consultorio&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","consultorio",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","consultorio",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Doctor&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","doctor",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","doctor",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Tratamiento&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","tratamiento",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","tratamiento",pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th colSpan='3'></th>
        </tr>
      </thead>
      <tbody>
        {
          citas.map( cita => (
            <tr>
              <td>{ cita.id }</td>
              <td>{ cita.cita.paciente }</td>
              <td>{ cita.cita.fecha }</td>
              <td>{ cita.cita.hora }</td>
              <td>{ cita.cita.consultorio }</td>
              <td>{ cita.cita.doctor }</td>
              <td>{ cita.cita.tratamiento }</td>
              <td><button className='App-body-boton-vistas' onClick={ () => ReadCita(cita) }>&#128270;</button></td>
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateCita(cita,urlApiCitas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteCita(cita,urlApiCitas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;

const handleSortBy = async (dir,parameter,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      citas.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="paciente") { 
      citas.sort((a, b) => (a.cita.paciente > b.cita.paciente) ? 1 : -1); 
    } else if(parameter==="fecha") {
      citas.sort((a, b) => (a.cita.fecha > b.cita.fecha) ? 1 : -1);
    } else if(parameter==="hora") {
      citas.sort((a, b) => (a.cita.hora > b.cita.hora) ? 1 : -1);
    } else if(parameter==="consultorio") { 
      citas.sort((a, b) => (a.cita.consultorio > b.cita.consultorio) ? 1 : -1);
    } else if(parameter==="doctor") { 
      citas.sort((a, b) => (a.cita.doctor > b.cita.doctor) ? 1 : -1);
    } else if(parameter==="tratamiento") { 
      citas.sort((a, b) => (a.cita.tratamiento > b.cita.tratamiento) ? 1 : -1);
    }
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      citas.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="paciente") { 
      citas.sort((a, b) => (a.cita.paciente < b.cita.paciente) ? 1 : -1); 
    } else if(parameter==="fecha") {
      citas.sort((a, b) => (a.cita.fecha < b.cita.fecha) ? 1 : -1); 
    } else if(parameter==="hora") {
      citas.sort((a, b) => (a.cita.hora < b.cita.hora) ? 1 : -1); 
    }else if(parameter==="consultorio") { 
      citas.sort((a, b) => (a.cita.consultorio < b.cita.consultorio) ? 1 : -1);
    } else if(parameter==="doctor") { 
      citas.sort((a, b) => (a.cita.doctor < b.cita.doctor) ? 1 : -1);
    } else if(parameter==="tratamiento") { 
      citas.sort((a, b) => (a.cita.tratamiento < b.cita.tratamiento) ? 1 : -1);
    }
  }
  renderContent(pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (pacientes,tratamientos,doctores,consultorios) => {
  const root = ReactDOM.createRoot(document.getElementById('contenidoCitas'));
  root.render(element(pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarCitas = ({ pacientes,tratamientos,doctores,consultorios }) => {
  return(
    <div className="App">
      <div id="contenidoCitas">
        { element(pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};