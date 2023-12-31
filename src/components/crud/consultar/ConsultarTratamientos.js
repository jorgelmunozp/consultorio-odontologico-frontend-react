import React, { useState, useMemo } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteTratamiento } from '../delete/DeleteTratamiento';
import { ReadTratamiento } from '../read/ReadTratamiento';
import { UpdateTratamiento } from '../update/UpdateTratamiento';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getTratamientosFiltered } from '../../selectors/getTratamientosFiltered';

import { TbFilterSearch,TbFilterEdit, TbFilterX } from "react-icons/tb";

const ElementRender = (urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) => {
  /* Query */
  let [ queryCode, setQueryCode ] = useState('');
  let [ queryName, setQueryName ] = useState('');
  let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
  let [ queryDoctor, setQueryDoctor ] = useState('');

  let [ query, setQuery ] = useState('');

  const tratamientosFiltered = useMemo( () => getTratamientosFiltered(tratamientos,queryCode,queryName,queryConsultoryRoom,queryDoctor), [tratamientos,queryCode,queryName,queryConsultoryRoom,queryDoctor] );

  const titles = ['Código','Nombre','Consultorio','Doctor'];
  const queries = [queryCode,queryName,queryConsultoryRoom,queryDoctor];
  const setQueries = [setQueryCode,setQueryName,setQueryConsultoryRoom,setQueryDoctor];
  
  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(tratamientos.length/itemPerPage) : Math.floor(tratamientosFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? tratamientos.length%itemPerPage : tratamientosFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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
    <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Tratamientos Autorizados </h5>
      <SearchBar icon={<TbFilterSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />
      
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-4 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-2'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Consultorio</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-4 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Doctor</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0'colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              (queryCode === '' && queryName === '' && queryConsultoryRoom === '' && queryDoctor === '')
                ? tratamientos.sort(sortBy === 1 ? sortByIdUp 
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
                    <td className='ps-4 ps-sm-5 text-nowrap'>{ tratamiento.id }</td>
                    <td className='px-2 px-sm-4 text-nowrap'>{ tratamiento.tratamiento.nombre }</td>
                    <td className='ps-5 ps-sm-5 text-nowrap'>{ tratamiento.tratamiento.consultorio }</td>
                    <td className='px-2 px-sm-4 text-nowrap'>{ tratamiento.tratamiento.doctor }</td>
                    <td><button className='border-0 bg-transparent' onClick={ () => ReadTratamiento(tratamiento) }><TbFilterSearch className='text-secondary'/></button></td>
                    <td><button className='border-0 bg-transparent' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }><TbFilterEdit className='text-secondary'/></button></td>
                    <td><button className='border-0 bg-transparent' onClick={ () => DeleteTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,doctores,consultorios) }><TbFilterX className='text-secondary'/></button></td>
                  </tr>
                ))
              : tratamientosFiltered.sort(sortBy === 1 ? sortByIdUp 
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
                  <td className='ps-4 ps-sm-5 text-nowrap'>{ tratamiento.id }</td>
                  <td className='px-2 px-sm-4 text-nowrap'>{ tratamiento.tratamiento.nombre }</td>
                  <td className='ps-5 ps-sm-5 text-nowrap'>{ tratamiento.tratamiento.consultorio }</td>
                  <td className='px-2 px-sm-4 text-nowrap'>{ tratamiento.tratamiento.doctor }</td>
                  <td><button className='border-0 bg-transparent' onClick={ () => ReadTratamiento(tratamiento) }><TbFilterSearch className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => UpdateTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }><TbFilterEdit className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => DeleteTratamiento(tratamiento,urlApiTratamientos,ElementRender,citas,pacientes,doctores,consultorios) }><TbFilterX className='text-secondary'/></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <PaginationBar query={query} array={tratamientos} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )};


export const ConsultarTratamientos = ({ urlApiTratamientos,citas,pacientes,doctores,consultorios }) => {
  const tratamientos = useFetch(urlApiTratamientos).data;
  return(
    <div id="contenido"> 
      { ElementRender(urlApiTratamientos,citas,pacientes,tratamientos,doctores,consultorios) }
    </div>
  )
};