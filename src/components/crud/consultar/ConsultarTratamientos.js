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
  const tratamientosFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(tratamientosFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : tratamientosFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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

  /* Sort */
  const [sortBy, setSortBy] = useState(0);
  function sortByIdUp(a, b) { return a.id - b.id; }
  function sortByIdDown(a, b) { return b.id - a.id; }
  function sortByNameUp(a, b) { return a.tratamiento.nombre.localeCompare(b.tratamiento.nombre); }
  function sortByNameDown(a, b) { return b.tratamiento.nombre.localeCompare(a.tratamiento.nombre); }
  function sortByConsultingRoomUp(a, b) { return a.tratamiento.consultorio.localeCompare(b.tratamiento.consultorio); }
  function sortByConsultingRoomDown(a, b) { return b.tratamiento.consultorio.localeCompare(a.tratamiento.consultorio); }
  function sortByDoctorUp(a, b) { return a.tratamiento.doctor.localeCompare(b.tratamiento.doctor); }
  function sortByDoctorDown(a, b) { return b.tratamiento.doctor.localeCompare(a.tratamiento.doctor); }
      
  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Tratamientos Autorizados </h5>
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 p-0 ps-1 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Consultorio</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Doctor</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              tratamientos.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNameUp 
                    : ( sortBy === 4 ? sortByNameDown 
                      : ( sortBy === 5 ? sortByConsultingRoomUp 
                        : ( sortBy === 6 ? sortByConsultingRoomDown
                          : ( sortBy === 7 ? sortByDoctorUp 
                            : ( sortBy === 8 ? sortByDoctorDown 
                              : sortByIdUp
                  )))))))).slice(indexPage[0],indexPage[1]).map( tratamiento => (
                <tr key={ tratamiento.id }>
                  <td className='ps-4'>{ tratamiento.id }</td>
                  <td className='ps-1 ps-sm-3'>{ tratamiento.tratamiento.nombre }</td>
                  <td className='ps-1 ps-sm-3'>{ tratamiento.tratamiento.consultorio }</td>
                  <td className='ps-1 ps-sm-3'>{ tratamiento.tratamiento.doctor }</td>
                  <td><button className='border-0 bg-transparent' onClick={ () => ReadTratamiento(tratamiento) }>&#128270;</button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
                  <td><button className='border-0 bg-transparent color-rojo' onClick={ () => DeleteTratamiento(root,tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,doctores,consultorios) }>&#x1F7AE;</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
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