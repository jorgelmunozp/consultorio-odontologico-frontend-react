import { handleSortBy } from '../helpers/handleSortBy'
import { DeleteCita } from '../components/delete/DeleteCita';
import { ReadCita } from '../components/read/ReadCita';
import { UpdateCita } from '../components/update/UpdateCita';
import { Arrows } from '../atoms/arrows/Arrows';

export const elementRender = (urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) =>  
  <center>
    <hr/>
    <h4> Citas Registradas </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Paciente&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","paciente",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","paciente",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Fecha&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","fecha",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","fecha",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Hora&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","hora",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","hora",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Consultorio&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","consultorio",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","consultorio",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Doctor&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","doctor",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","doctor",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;</th><th rowSpan='2'>Tratamiento&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","tratamiento",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","tratamiento",urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
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
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateCita(cita,urlApiCitas,elementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteCita(cita,urlApiCitas,elementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
  </center>;