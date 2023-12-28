import React, { useState } from 'react';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';
import { Arrows } from '../../../atoms/arrows/Arrows';
import { PaginationBar } from '../../pagination/PaginationBar';

import { TbCalendarSearch, TbCalendarTime, TbCalendarX } from "react-icons/tb";

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
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 p-0 ps-1 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Paciente</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Fecha</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Hora</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Consultorio</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Médico</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3'><table className='lh-1 w-100'><thead><tr><th rowSpan='2' className="border-0">Tratamiento</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(13)}><Arrows direction={"up"}/></button></th></tr><tr><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 p-0' onClick={()=>setSortBy(14)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 p-0 ps-0 ps-sm-3' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
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
              <tr key={ cita.id }>
                <td className='ps-4 text-nowrap'>{ cita.id }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.paciente }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.fecha }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.hora }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.consultorio }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.doctor }</td>
                <td className='ps-1 ps-sm-3 text-nowrap'>{ cita.cita.tratamiento }</td>
                <td><button className='border-0 bg-transparent' onClick={ () => ReadCita(cita) }><TbCalendarSearch className='text-secondary'/></button></td>
                <td><button className='border-0 bg-transparent' onClick={ () => UpdateCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }><TbCalendarTime className='text-secondary'/></button></td>
                <td><button className='border-0 bg-transparent' onClick={ () => DeleteCita(cita,urlApiCitas,ElementRender,pacientes,tratamientos,doctores,consultorios) }><TbCalendarX className='text-secondary'/></button></td>
              </tr>
            ))
          }
          </tbody>
        </table>
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