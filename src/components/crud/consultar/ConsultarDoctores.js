import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

const ElementRender = (urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) =>  { 
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
            doctores.slice(indexPage[0],indexPage[1]).map( doctor => (
              <tr>
                <td>{ doctor.id }</td>
                <td>{ doctor.doctor.nombre }</td>
                <td>{ doctor.doctor.apellido }</td>
                <td>{ doctor.doctor.especialidad }</td>
                <td><button className='App-body-boton-vistas' onClick={ () => ReadDoctor(doctor) }>&#128270;</button></td>
                <td><button className='App-body-boton-vistas' onClick={ () => UpdateDoctor(doctor,urlApiDoctores,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
                <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeleteDoctor(doctor,urlApiDoctores,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <PaginationBar query={query} array={doctores} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )};


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
    root.render(ElementRender(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios));
  }

export const ConsultarDoctores = ({ urlApiDoctores,citas,pacientes,tratamientos,consultorios }) => {
  const doctores = useFetch(urlApiDoctores).data;
  return (
    <div className="App">
      <div id="contenidoDoctores">
        { ElementRender(urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};