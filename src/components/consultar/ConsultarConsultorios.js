import ReactDOM from 'react-dom/client';
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { Arrows } from '../../atoms/arrows/Arrows';

const elementHtml = (urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Consultorios Disponibles </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Número&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","numero",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","numero",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th colSpan='3'></th>
        </tr>
      </thead>
      <tbody>
        {
          consultorios.map( consultorio => (
            <tr>
              <td>{ consultorio.id }</td>
              <td>{ consultorio.consultorio.nombre }</td>
              <td>{ consultorio.consultorio.numero }</td>
              <td><button className='App-body-boton-vistas' onClick={ () => ReadConsultorio(consultorio) }>&#128270;</button></td>
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateConsultorio(consultorio,urlApiConsultorios,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteConsultorio(consultorio,urlApiConsultorios,elementHtml,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;
      
const handleSortBy = async (dir,parameter,urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      consultorios.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      consultorios.sort((a, b) => (a.consultorio.nombre > b.consultorio.nombre) ? 1 : -1); 
    } else if(parameter==="numero") {
      consultorios.sort((a, b) => (a.consultorio.numero > b.consultorio.numero) ? 1 : -1);
    } 
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      consultorios.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="nombre") { 
      consultorios.sort((a, b) => (a.consultorio.nombre < b.consultorio.nombre) ? 1 : -1); 
    } else if(parameter==="numero") {
      consultorios.sort((a, b) => (a.consultorio.numero < b.consultorio.numero) ? 1 : -1); 
    } 
  }
  renderContent(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => {
  const root = ReactDOM.createRoot(document.getElementById('contenidoConsultorios'));
  root.render(elementHtml(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarConsultorios = ({ urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios }) => {
  return (
    <div className="App">
      <div id="contenidoConsultorios">
        { elementHtml(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  );
};