import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteTratamiento } from '../delete/DeleteTratamiento';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { UpdateTratamiento } from '../update/UpdateTratamiento';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

const ElementRender = (root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
  /* Query */
  let query = '';
  const inmueblesFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(inmueblesFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : inmueblesFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página

  let indexPages = [];
  let activePage = [true];                                            // [true]
  if(resPages !== 0 ){
    for(let i = 0; i <= numPages; i++) { 
      indexPages.push(i);                                             // [0,1,2,3]
      if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
    }
  } else if(resPages === 0 ){
    for(let i = 0; i < numPages; i++) { 
      indexPages.push(i);                                             // [0,1,2,3]
      if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
    }
  }

  const [activePages, setActivePages] = useState(activePage);         // [true,false,false,false]

  return (
    <center>
    <hr/>
    <h4> Tratamientos Autorizados </h4>
    <hr/>
    <br/><br/>
    <table className="table" border='1'>
      <thead>
        <tr>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy(root,"up","id",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy(root,"down","id",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy(root,"up","nombre",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy(root,"down","nombre",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Consultorio&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy(root,"up","consultorio",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy(root,"down","consultorio",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Doctor&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy(root,"up","doctor",urlApiTratamientos,pacientes,citas,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy(root,"down","doctor",urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
          <th colSpan='3'></th>
        </tr>
      </thead>
      <tbody>
        {
          tratamientos.slice(indexPage[0],indexPage[1]).map( tratamiento => (
            <tr>
              <td>{ tratamiento.id }</td>
              <td>{ tratamiento.tratamiento.nombre }</td>
              <td>{ tratamiento.tratamiento.consultorio }</td>
              <td>{ tratamiento.tratamiento.doctor }</td>
              <td><button className='App-body-boton-vistas' onClick={ () => ReadTratamiento(tratamiento) }>&#128270;</button></td>
              <td><button className='App-body-boton-vistas' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
              <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteTratamiento(root,tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,doctores,consultorios) }>&#x1F7AE;</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>
    <PaginationBar query={query} array={tratamientos} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
  </center>
)};

const handleSortBy = async (root,dir,parameter,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
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
  renderContent(root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
  root.render(ElementRender(root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarTratamientos = ({ urlApiTratamientos,citas,pacientes,doctores,consultorios }) => {
  const tratamientos = useFetch(urlApiTratamientos).data;
  const root = ReactDOM.createRoot(document.getElementById('App'));
  return(
    <div id="contenido"> 
      { ElementRender(root,urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) }
    </div>
  )
};