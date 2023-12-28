import React, { useState } from 'react';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

import { TbUserSearch, TbUserEdit,TbUserX } from "react-icons/tb";

const ElementRender = (urlApiDoctores,citas,pacientes,tratamientos,doctores,consultorios) =>  { 
  /* Query */
  let query = '';
  const doctoresFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(doctoresFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : doctoresFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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
    function sortByNameUp(a, b) { return a.doctor.nombre.localeCompare(b.doctor.nombre); }
    function sortByNameDown(a, b) { return b.doctor.nombre.localeCompare(a.doctor.nombre); }
    function sortByLastnameUp(a, b) { return a.doctor.apellido.localeCompare(b.doctor.apellido); }
    function sortByLastnameDown(a, b) { return b.doctor.apellido.localeCompare(a.doctor.apellido); }
    function sortBySpecialityUp(a, b) { return a.doctor.especialidad.localeCompare(b.doctor.especialidad); }
    function sortBySpecialityDown(a, b) { return b.doctor.especialidad.localeCompare(a.doctor.especialidad); }
  
  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Doctores Disponibles </h5>
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 p-0 ps-1 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Apellido</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Especialidad</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3' colSpan='3'></th>
            </tr>
          </thead>
          <tbody className='row-color'>
            {
              doctores.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNameUp 
                    : ( sortBy === 4 ? sortByNameDown 
                      : ( sortBy === 5 ? sortByLastnameUp 
                        : ( sortBy === 6 ? sortByLastnameDown
                          : ( sortBy === 7 ? sortBySpecialityUp 
                            : ( sortBy === 8 ? sortBySpecialityDown 
                              : sortByIdUp
                 )))))))).slice(indexPage[0],indexPage[1]).map( doctor => (
                <tr key={ doctor.id }>
                  <td className='ps-4 text-nowrap'>{ doctor.id }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ doctor.doctor.nombre }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ doctor.doctor.apellido }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ doctor.doctor.especialidad }</td>
                  <td><button className='border-0 bg-transparent' onClick={ () => ReadDoctor(doctor) }><TbUserSearch className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => UpdateDoctor(doctor,urlApiDoctores,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }><TbUserEdit className='text-secondary'/></button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => DeleteDoctor(doctor,urlApiDoctores,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }><TbUserX className='text-secondary'/></button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <PaginationBar query={query} array={doctores} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )};

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