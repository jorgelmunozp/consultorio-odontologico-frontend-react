import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';
import { SortingCitasBar } from '../../sort/SortingCitasBar';

const ElementRender = (urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) =>  { 
  /* Query */
  let query = '';
  const citasFiltered = [];

  /* Pagination */
  const [itemPerPage, setItemPerPage ] = useState(10);                 // Se define el número de items por página
  const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
  const numPages = ((query === '') ? Math.floor(citas.length/itemPerPage) : Math.floor(citasFiltered.length/itemPerPage));                   // Se calcula la cantidad de páginas = cantidad de items/item por página
  const resPages = ((query === '') ? citas.length%itemPerPage : citasFiltered.length%itemPerPage);                   // Se calcula la cantidad de páginas = cantidad de items/item por página
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
  function sortByPatientUp(a, b) { return a.cita.paciente.localeCompare(b.cita.paciente); }
  function sortByPatientDown(a, b) { return b.cita.paciente.localeCompare(a.cita.paciente); }
  function sortByDateUp(a, b) { return a.cita.fecha.localeCompare(b.cita.fecha); }
  function sortByDateDown(a, b) { return b.cita.fecha.localeCompare(a.cita.fecha); }
  function sortByTimeUp(a, b) { return a.cita.hora.localeCompare(b.cita.hora); }
  function sortByTimeDown(a, b) { return b.cita.hora.localeCompare(a.cita.hora); }
  function sortByConsultingRoomUp(a, b) { return a.cita.consultorio.localeCompare(b.cita.consultorio); }
  function sortByConsultingRoomDown(a, b) { return b.cita.consultorio.localeCompare(a.cita.consultorio); }
  function sortByDoctorUp(a, b) { return a.cita.doctor.localeCompare(b.cita.doctor); }
  function sortByDoctorDown(a, b) { return b.cita.doctor.localeCompare(a.cita.doctor); }
  function sortByTreatmentUp(a, b) { return a.cita.tratamiento.localeCompare(b.cita.tratamiento); }
  function sortByTreatmentDown(a, b) { return b.cita.tratamiento.localeCompare(a.cita.tratamiento); }

  return (
    <center className='mt-3 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Citas Registradas</h5>
      <div className='container-fluid overflow-auto'>
        <SortingCitasBar setSortBy={setSortBy} Arrows={Arrows} />
        {   citas.sort(sortBy === 1 ? sortByIdUp 
                      : ( sortBy === 2 ? sortByIdDown 
                        : ( sortBy === 3 ? sortByPatientUp 
                          : ( sortBy === 4 ? sortByPatientDown 
                            : ( sortBy === 5 ? sortByDateUp 
                              : ( sortBy === 6 ? sortByDateDown 
                                : ( sortBy === 7 ? sortByTimeUp 
                                  : ( sortBy === 8 ? sortByTimeDown 
                                    : ( sortBy === 9 ? sortByConsultingRoomUp 
                                      : ( sortBy === 10 ? sortByConsultingRoomDown 
                                        : ( sortBy === 11 ? sortByDoctorUp 
                                          : ( sortBy === 12 ? sortByDoctorDown 
                                            : ( sortBy === 13 ? sortByTreatmentUp 
                                              : ( sortBy === 14 ? sortByTreatmentDown 
                                                : sortByIdUp
                 )))))))))))))).slice(indexPage[0],indexPage[1]).map( cita => (
            <div className='row flex-nowrap border row-color py-2' key={ cita.id }>
              <div className='col-3 col-md-1'>{ cita.id }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.paciente }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.fecha }</div>
              <div className='col-2 col-md-1 text-nowrap'>{ cita.cita.hora }</div>
              <div className='col-2 col-md-1 text-nowrap'>{ cita.cita.consultorio }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.doctor }</div>
              <div className='col-4 col-md-2 text-nowrap'>{ cita.cita.tratamiento }</div>
              <div className='col-6 col-md-2'>
                <div className='row flex-nowrap bg-transparent'>
                  <div className='col-auto'><button className='col border-0 bg-transparent' onClick={ () => ReadCita(cita) }>&#128270;</button></div>
                  <div className='col-auto'><button className='col border-0 bg-transparent' onClick={ () => UpdateCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }>&#x270D;</button></div>
                  <div className='col-auto'><button className='col border-0 bg-transparent color-rojo' onClick={ () => DeleteCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }>&#x1F7AE;</button></div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <PaginationBar query={query} array={citas} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
    </center>  
  )};

  export const ConsultarCitas = ({ urlApiCitas,pacientes,tratamientos,doctores,consultorios }) => {
  const citas = useFetch(urlApiCitas).data;
  return(
    <div className="App">
      <div id="contenidoCitas">
        { ElementRender(urlApiCitas,citas,pacientes,tratamientos,doctores,consultorios) }
      </div>
    </div>
  )
};