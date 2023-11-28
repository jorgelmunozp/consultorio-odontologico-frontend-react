import ReactDOM from 'react-dom/client';
import { DeleteTratamiento } from '../delete/DeleteTratamiento';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { UpdateTratamiento } from '../update/UpdateTratamiento';
import { Arrows } from '../../atoms/arrows/Arrows';

const elementRender = (urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Tratamientos Autorizados </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Consultorio&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","consultorio",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","consultorio",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Doctor&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","doctor",urlApiTratamientos,pacientes,citas,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","doctor",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th colSpan='3'></th>
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
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,elementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteTratamiento(tratamiento,urlApiTratamientos,elementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;

const handleSortBy = async (dir,parameter,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      tratamientos.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      tratamientos.sort((a, b) => (a.tratamiento.nombre > b.tratamiento.nombre) ? 1 : -1); 
    } else if(parameter==="consultorio") {
      tratamientos.sort((a, b) => (a.tratamiento.consultorio > b.tratamiento.consultorio) ? 1 : -1);
    } else if(parameter==="doctor") {
      tratamientos.sort((a, b) => (a.tratamiento.doctor > b.tratamiento.doctor) ? 1 : -1);
    } 
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      tratamientos.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      tratamientos.sort((a, b) => (a.tratamiento.nombre < b.tratamiento.nombre) ? 1 : -1); 
    } else if(parameter==="consultorio") {
      tratamientos.sort((a, b) => (a.tratamiento.consultorio < b.tratamiento.consultorio) ? 1 : -1); 
    } else if(parameter==="doctor") {
      tratamientos.sort((a, b) => (a.tratamiento.doctor < b.tratamiento.doctor) ? 1 : -1); 
    }
  }
  renderContent(urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
  const root = ReactDOM.createRoot(document.getElementById('contenidoTratamientos'));
  root.render(elementRender(urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarTratamientos = ({ urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios }) => {
  return(
    <div className="App">
      <div id="contenidoTratamientos">  
        { elementRender(urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};