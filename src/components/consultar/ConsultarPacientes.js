import ReactDOM from 'react-dom/client';
import { DeletePaciente } from '../delete/DeletePaciente';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';
import { Arrows } from '../../atoms/arrows/Arrows';

const elementHtml = (urlApiPacientes,pacientes,tratamientos,doctores,consultorios,epss) =>  
<center>
  <hr/>
  <h4> Pacientes Afiliados </h4>
  <hr/>
  <br/><br/>
  <table className="table" border='1'>
    <thead>
      <tr>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Identificacion&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","identificacion",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","identificacion",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Apellido&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","apellido",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","apellido",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Genero&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","genero",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","genero",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Eps&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","eps",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","eps",urlApiPacientes,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
        <th colSpan='3'></th>
      </tr>
    </thead>
    <tbody>
      {
        pacientes.map( paciente => (
          <tr>
            <td>{ paciente.id }</td>
            <td>{ paciente.paciente.identificacion }</td>
            <td>{ paciente.paciente.nombre }</td>
            <td>{ paciente.paciente.apellido }</td>
            <td>{ paciente.paciente.genero }</td>
            <td>{ paciente.paciente.eps }</td>
            <td><button className='App-body-boton-vistas' onClick={ () => ReadPaciente(paciente) }>&#128270;</button></td>
            <td><button className='App-body-boton-vistas' onClick={ () => UpdatePaciente(paciente,urlApiPacientes,epss) }>&#x270D;</button></td>
            <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeletePaciente(paciente,urlApiPacientes) }>&#x1F7AE;</button></td>
          </tr>
        ))
      }
    </tbody>
  </table>
</center>;

const handleSortBy = async (dir,parameter,urlApiPacientes,pacientes,tratamientos,doctores,consultorios) => {
if(dir==="up"){
  if(parameter==="id") {
    pacientes.sort((a, b) => (a.id > b.id) ? 1 : -1);
  } else if(parameter==="identificacion") { 
    pacientes.sort((a, b) => (a.paciente.identificacion > b.paciente.identificacion) ? 1 : -1); 
  } else if(parameter==="nombre") {
    pacientes.sort((a, b) => (a.paciente.nombre > b.paciente.nombre) ? 1 : -1);
  } else if(parameter==="apellido") {
    pacientes.sort((a, b) => (a.paciente.apellido > b.paciente.apellido) ? 1 : -1);
  } else if(parameter==="genero") { 
    pacientes.sort((a, b) => (a.paciente.genero > b.paciente.genero) ? 1 : -1);
  } else if(parameter==="eps") { 
    pacientes.sort((a, b) => (a.paciente.eps > b.paciente.eps) ? 1 : -1);
  } 
} 
else if(dir==="down"){ 
  if(parameter==="id") {
    pacientes.sort((a, b) => (a.id < b.id) ? 1 : -1);
  } else if(parameter==="identificacion") { 
    pacientes.sort((a, b) => (a.paciente.identificacion < b.paciente.identificacion) ? 1 : -1); 
  } else if(parameter==="nombre") {
    pacientes.sort((a, b) => (a.paciente.nombre < b.paciente.nombre) ? 1 : -1); 
  } else if(parameter==="apellido") {
    pacientes.sort((a, b) => (a.paciente.apellido < b.paciente.apellido) ? 1 : -1); 
  }else if(parameter==="genero") { 
    pacientes.sort((a, b) => (a.paciente.genero < b.paciente.genero) ? 1 : -1);
  } else if(parameter==="eps") { 
    pacientes.sort((a, b) => (a.paciente.eps < b.paciente.eps) ? 1 : -1);
  } 
}
renderContent(urlApiPacientes,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (urlApiPacientes,pacientes,tratamientos,doctores,consultorios) => {
const root = ReactDOM.createRoot(document.getElementById('contenidoPacientes'));
root.render(elementHtml(urlApiPacientes,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarPacientes = ({ urlApiPacientes,pacientes,tratamientos,doctores,consultorios,epss }) => {
  return(
    <div className="App">
      <div id="contenidoPacientes">  
        { elementHtml(urlApiPacientes,pacientes,tratamientos,doctores,consultorios,epss) }
    </div>
  </div>
  )
};