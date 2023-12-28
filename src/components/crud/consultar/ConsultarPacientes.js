import React, { useState } from 'react';
import { useFetch } from "../../../hooks/useFetch";
import { DeletePaciente } from '../delete/DeletePaciente';
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdatePaciente } from '../update/UpdatePaciente';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

import { TbUserSearch, TbUserEdit,TbUserX } from "react-icons/tb";

const ElementRender = (urlApiPacientes,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) => { 
  /* Query */
  let query = '';
  const pacientesFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(pacientesFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : pacientesFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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
  function sortByIdentificationUp(a, b) { return a.paciente.identificacion.localeCompare(b.paciente.identificacion); }
  function sortByIdentificationDown(a, b) { return b.paciente.identificacion.localeCompare(a.paciente.identificacion); }
  function sortByNameUp(a, b) { return a.paciente.nombre.localeCompare(b.paciente.nombre); }
  function sortByNameDown(a, b) { return b.paciente.nombre.localeCompare(a.paciente.nombre); }
  function sortByLastnameUp(a, b) { return a.paciente.apellido.localeCompare(b.paciente.apellido); }
  function sortByLastnameDown(a, b) { return b.paciente.apellido.localeCompare(a.paciente.apellido); }
  function sortByGenderUp(a, b) { return a.paciente.genero.localeCompare(b.paciente.genero); }
  function sortByGenderDown(a, b) { return b.paciente.genero.localeCompare(a.paciente.genero); }
  function sortByEpsUp(a, b) { return a.paciente.eps.localeCompare(b.paciente.eps); }
  function sortByEpsDown(a, b) { return b.paciente.eps.localeCompare(a.paciente.eps); }
    
  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Pacientes Afiliados </h5>
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 p-0 ps-1 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Identificación</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Apellido</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Género</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Eps</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              pacientes.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByIdentificationUp 
                    : ( sortBy === 4 ? sortByIdentificationDown 
                      : ( sortBy === 5 ? sortByNameUp 
                        : ( sortBy === 6 ? sortByNameDown
                          : ( sortBy === 7 ? sortByLastnameUp 
                            : ( sortBy === 8 ? sortByLastnameDown 
                              : ( sortBy === 9 ? sortByGenderUp 
                                : ( sortBy === 10 ? sortByGenderDown 
                                  : ( sortBy === 11 ? sortByEpsUp 
                                    : ( sortBy === 12 ? sortByEpsDown 
                                      : sortByIdUp
                  )))))))))))).slice(indexPage[0],indexPage[1]).map( paciente => (
                <tr key={ paciente.id }>
                  <td className='ps-4 text-nowrap'>{ paciente.id }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ paciente.paciente.identificacion }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ paciente.paciente.nombre }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ paciente.paciente.apellido }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ paciente.paciente.genero }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ paciente.paciente.eps }</td>
                  <td><button className='border-0 bg-transparent' onClick={ () => ReadPaciente(paciente) }><TbUserSearch className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => UpdatePaciente(paciente,urlApiPacientes,ElementRender,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) }><TbUserEdit className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => DeletePaciente(paciente,urlApiPacientes,ElementRender,citas,pacientes,tratamientos,doctores,consultorios,epss,generos) }><TbUserX className='text-secondary'/></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <PaginationBar query={query} array={pacientes} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )};

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