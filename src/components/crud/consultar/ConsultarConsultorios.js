import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';
import  { SortingConsultoriosBar } from '../../sort/SortingConsultoriosBar';

const ElementRender = (urlApiConsultorios,citas,pacientes,tratamientos,doctores,consultorios) => { 
  /* Query */
  let query = '';
  const consultoriosFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(consultoriosFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : consultoriosFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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
  function sortByNumberUp(a, b) { return a.consultorio.numero - b.consultorio.numero; }
  function sortByNumberDown(a, b) { return b.consultorio.numero - a.consultorio.numero; }
  function sortByNameUp(a, b) { return a.consultorio.nombre.localeCompare(b.consultorio.nombre); }
  function sortByNameDown(a, b) { return b.consultorio.nombre.localeCompare(a.consultorio.nombre); }

  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Consultorios Disponibles </h5>
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <SortingConsultoriosBar setSortBy={setSortBy} Arrows={Arrows}/>
          <tbody className='row-color'>
            {
              consultorios.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNumberUp 
                    : ( sortBy === 4 ? sortByNumberDown 
                      : ( sortBy === 5 ? sortByNameUp 
                        : ( sortBy === 6 ? sortByNameDown
                          : sortByIdUp
              )))))).slice(indexPage[0],indexPage[1]).map( consultorio => (
                <tr key={ consultorio.id }>
                  <td className='ps-4 text-nowrap'>{ consultorio.id }</td>
                  <td className='ps-1 ps-sm-3 text-nowrap'>{ consultorio.consultorio.numero }</td>
                  <td className='ps-2 ps-sm-3 text-nowrap'>{ consultorio.consultorio.nombre }</td>
                  <td><button className='border-0 bg-transparent' onClick={ () => ReadConsultorio(consultorio) }>&#x1F50E;</button></td>
                  <td><button className='border-0 bg-transparent' onClick={ () => UpdateConsultorio(consultorio,urlApiConsultorios,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></td>
                  <td><button className='border-0 bg-transparent color-rojo' onClick={ () => DeleteConsultorio(consultorio,urlApiConsultorios,ElementRender,citas,pacientes,tratamientos,doctores,consultorios) }>&#x274C;</button></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <PaginationBar query={query} array={consultorios} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>
  )}; 

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