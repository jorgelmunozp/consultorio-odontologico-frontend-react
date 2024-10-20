import React, { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteCita } from '../delete/DeleteCita';
import { ReadCita } from '../read/ReadCita';
import { UpdateCita } from '../update/UpdateCita';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getCitasFiltered } from '../../selectors/getCitasFiltered';
import { TbCalendarSearch, TbCalendarTime, TbCalendarX } from "react-icons/tb";
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi,pacientes,tratamientos,doctores,consultorios }) => { 
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.paciente }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.fecha }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.hora }</td>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.cita.consultorio }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.doctor }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.tratamiento }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => ReadCita(item) }><TbCalendarSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => UpdateCita(item,urlApi,Row,pacientes,tratamientos,doctores,consultorios) }><TbCalendarTime className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => DeleteCita(item,urlApi) }><TbCalendarX className='text-secondary'/></button></td>
          </>
        )
      };

  export const ConsultarCitas = ({ urlApi,pacientes,tratamientos,doctores,consultorios }) => {
    /* Fetch */
    let array = [];
    let [ alertFetch, setAlertFetch ] = useState(false);
    const arrayFetch = useFetch(urlApi);
    useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
    if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data; }

    /* Query */
    let [ queryCode, setQueryCode ] = useState('');
    let [ queryPatient, setQueryPatient ] = useState('');
    let [ queryDate, setQueryDate ] = useState('');
    let [ queryTime, setQueryTime ] = useState('');
    let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
    let [ queryDoctor, setQueryDoctor ] = useState('');
    let [ queryTreatment, setQueryTreatment ] = useState('');
  
    const arrayFiltered = useMemo( () => getCitasFiltered(array,queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment), [array,queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment] );

    const titles = ['Código','Paciente','Fecha','Hora','Consultorio','Médico','Tratamiento'];
    const queries = [queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment];
    const setQueries = [setQueryCode,setQueryPatient,setQueryDate,setQueryTime,setQueryConsultoryRoom,setQueryDoctor,setQueryTreatment];
    
    /* Pagination */
    const [itemPerPage, setItemPerPage ] = useState(10);                // Se define el número de items por página
    const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
    const numPages = Math.floor(arrayFiltered.length/itemPerPage);      // Se calcula la cantidad de páginas = cantidad de items/item por página
    const resPages = arrayFiltered.length%itemPerPage;                  // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
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

  return(
    <div className="App">
      <div id="contenidoCitas">
        <center className='mt-4 mt-sm-5' data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-right">
        <h5 className='main-color fs-sm-2 mb-4'> Citas Registradas</h5>
        <SearchBar icon={<TbCalendarSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />

        <div className='container-fluid overflow-auto'>
          <table className="table" border='1'>
            <thead>
              <tr>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Paciente</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Fecha</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Hora</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Consultorio</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Médico</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Tratamiento</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(13)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(14)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3' colSpan='3'></th>
              </tr>
            </thead>
            <tbody>
              {
                arrayFiltered.sort(sortBy === 1 ? sortByIdUp 
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
                )))))))))))))).slice(indexPage[0],indexPage[1]).map((item)=>{return (
                  <tr id={ 'row'+item.id } key={ item.id }>
                    <Row item={item} urlApi={urlApi} pacientes={pacientes} tratamientos={tratamientos} doctores={doctores} consultorios={consultorios} />
                  </tr>
                )})
              }
            </tbody>
          </table>
        </div>
        <PaginationBar array={arrayFiltered} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
        </center>  
      </div>
      { alertFetch && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlertFetch} title={'Error en la conexión con el servidor'} buttons={1} /> }
    </div>
  )
};