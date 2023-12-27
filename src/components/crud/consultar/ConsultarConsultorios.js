import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

const ElementRender = (urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => { 
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
      <h4> Consultorios Disponibles </h4>
      <hr/>
      <br/><br/>
      <table className="table" border='1'>
        <thead>
          <tr>
            <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
            <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Número&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","numero",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","numero",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
            <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
            <th colSpan='3'></th>
          </tr>
        </thead>
        <tbody className='row-color'>
          {
            consultorios.slice(indexPage[0],indexPage[1]).map( consultorio => (
              <tr key={ consultorio.id }>
                <td>{ consultorio.id }</td>
                <td>{ consultorio.consultorio.numero }</td>
                <td>{ consultorio.consultorio.nombre }</td>
                <td><button className='App-body-boton-vistas' onClick={ () => ReadConsultorio(consultorio) }>&#128270;</button></td>
                <td><button className='App-body-boton-vistas' onClick={ () => UpdateConsultorio(consultorio,urlApiConsultorios,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
                <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteConsultorio(consultorio,urlApiConsultorios,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <PaginationBar query={query} array={consultorios} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )}; 

      
const handleSortBy = async (dir,parameter,urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => {
  if(dir==="up"){
    if(parameter==="id") {
      consultorios.sort((a, b) => (a.id > b.id) ? 1 : -1);
    } else if(parameter==="numero") {
      consultorios.sort((a, b) => (a.consultorio.numero > b.consultorio.numero) ? 1 : -1);
    } else if(parameter==="nombre") { 
      consultorios.sort((a, b) => (a.consultorio.nombre > b.consultorio.nombre) ? 1 : -1); 
    } 
  } 
  else if(dir==="down"){ 
    if(parameter==="id") {
      consultorios.sort((a, b) => (a.id < b.id) ? 1 : -1);
    } else if(parameter==="numero") {
      consultorios.sort((a, b) => (a.consultorio.numero < b.consultorio.numero) ? 1 : -1); 
    } else if(parameter==="nombre") { 
      consultorios.sort((a, b) => (a.consultorio.nombre < b.consultorio.nombre) ? 1 : -1); 
    } 
  }
  renderContent(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios);
}

const renderContent = (urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => {
  const root = ReactDOM.createRoot(document.getElementById('contenidoConsultorios'));
  root.render(ElementRender(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios));
}

export const ConsultarConsultorios = ({ urlApiConsultorios,citas,pacientes,tratamientos,doctores }) => {
  const consultorios = useFetch(urlApiConsultorios).data;
  return (
    <div className="App">
      <div id="contenidoConsultorios">
        { ElementRender(urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  );
};