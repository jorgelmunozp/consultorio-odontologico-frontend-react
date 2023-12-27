import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeletePaciente } from '../delete/DeletePaciente';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

const ElementRender = (urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) => { 
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
        <h4> Pacientes Afiliados </h4>
        <hr/>
        <br/><br/>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Código&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","id",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","id",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Identificacion&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","identificacion",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","identificacion",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Nombre&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","nombre",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","nombre",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Apellido&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","apellido",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","apellido",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Genero&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","genero",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","genero",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th><table className='tableSort'><thead><tr><th rowSpan='2'>&nbsp;&nbsp;&nbsp;</th><th rowSpan='2'>Eps&nbsp;</th><th><button className='buttonSort' onClick={()=>handleSortBy("up","eps",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"up"}/></button></th></tr><tr><th><button className='buttonSort' onClick={()=>handleSortBy("down","eps",urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              pacientes.slice(indexPage[0],indexPage[1]).map( paciente => (
                <tr>
                  <td>{ paciente.id }</td>
                  <td>{ paciente.paciente.identificacion }</td>
                  <td>{ paciente.paciente.nombre }</td>
                  <td>{ paciente.paciente.apellido }</td>
                  <td>{ paciente.paciente.genero }</td>
                  <td>{ paciente.paciente.eps }</td>
                  <td><button className='App-body-boton-vistas' onClick={ () => ReadPaciente(paciente) }>&#128270;</button></td>
                  <td><button className='App-body-boton-vistas' onClick={ () => UpdatePaciente(paciente,urlApiPacientes,ElementRender,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) }>&#x270D;</button></td>
                  <td><button className='App-body-boton-vistas color-rojo' onClick={ () => DeletePaciente(paciente,urlApiPacientes,ElementRender,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) }>&#x1F7AE;</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      <PaginationBar query={query} array={pacientes} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )};

const handleSortBy = async (dir,parameter,urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) => {
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
renderContent(urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos);
}

const renderContent = (urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) => {
const root = ReactDOM.createRoot(document.getElementById('contenidoPacientes'));
root.render(ElementRender(urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos));
}

export const ConsultarPacientes = ({ urlApiPacientes,citas,tratamientos,doctores,consultorios,epss,generos }) => {
  const pacientes = useFetch(urlApiPacientes).data;
  return(
    <div className="App">
      <div id="contenidoPacientes">  
        { ElementRender(urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) }
    </div>
  </div>
  )
};