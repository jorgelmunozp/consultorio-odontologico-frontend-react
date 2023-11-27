import ReactDOM from 'react-dom/client';
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { Arrows } from '../../atoms/arrows/Arrows';

const elementHtml = (urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Doctores Disponibles </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Apellido&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","apellido",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","apellido",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Especialidad&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","especialidad",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","especialidad",urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
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
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateDoctor(doctor,urlApiDoctores,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteDoctor(doctor,urlApiDoctores,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;

  const handleSortBy = async (dir,parameter,urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) => {
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
  renderContent(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios);
  }

  const renderContent = (urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) => {
    const root = ReactDOM.createRoot(document.getElementById('contenidoDoctores'));
    root.render(elementHtml(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios));
  }

export const ConsultarDoctores = ({ urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios }) => {
  return (
    <div className="App">
      <div id="contenidoDoctores">
        { elementHtml(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};