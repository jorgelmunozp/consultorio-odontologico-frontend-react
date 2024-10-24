import { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Paciente } from '../../../classes/User';
import { Doctor } from '../../../classes/User';
import { Consultorio } from '../../../classes/Consultorio';
import { useFetch } from "../../../hooks/useFetch";
import { ReadItem } from '../read/ReadItem';
import { UpdateItem } from '../update/UpdateItem';
import { DeleteItem } from '../delete/DeleteItem';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getCitasFiltered } from '../../selectors/getCitasFiltered';
import { TbCalendarSearch, TbCalendarTime, TbCalendarX } from "react-icons/tb";
import { CalendarSmile } from '../../icons/calendar/CalendarSmile';
import { CalendarEdit } from '../../icons/calendar/CalendarEdit';
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi }) => { 
  const [paciente, setPaciente] = useState(item.cita.paciente);
  const [fecha, setFecha] = useState(item.cita.fecha);
  const [hora, setHora] = useState(item.cita.hora);
  const [consultorio, setConsultorio] = useState(item.cita.consultorio);
  const [doctor, setDoctor] = useState(item.cita.doctor);
  const [tratamiento, setTratamiento] = useState(item.cita.tratamiento);
  const state = [
                  { paciente: paciente, type:"dropdown", handleChange: (event) => setPaciente( new Paciente(event.target.value.split(" ")[0], event.target.value.split(" ")[1]).user ) },
                  { fecha: fecha, type:"date", handleChange: (event) => setFecha(event.target.value) },
                  { hora: hora, type:"time", handleChange: (event) => setHora(event.target.value) },
                  { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ) },
                  { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor(event.target.value.split(" ")[0], event.target.value.split(" ")[1]).user ) },
                  { tratamiento: tratamiento, type:"dropdown", handleChange: (event) => setTratamiento(event.target.value) }
                ];

  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.paciente.nombre + " " + item.cita.paciente.apellido }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.fecha }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.hora }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.consultorio.numero + " " + item.cita.consultorio.nombre }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.doctor.nombre + " " + item.cita.doctor.apellido }</td>
            <td className='ps-1 ps-sm-3 text-nowrap'>{ item.cita.tratamiento }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => setReadOpen(true) }><TbCalendarSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setUpdateOpen(true) }><TbCalendarTime className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setDeleteOpen(true) }><TbCalendarX className='text-secondary'/></button></td>

            { readOpen && <ReadItem Icon={CalendarSmile} item={item} title={'Cita'} buttons={1} setOpen={setReadOpen} /> }
            { updateOpen && <UpdateItem Icon={CalendarEdit} item={item} urlApi={urlApi} title={'Actualizar Cita?'} buttons={2} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
            { deleteOpen && <DeleteItem Icon={Warning} item={item} urlApi={urlApi} title={'Eliminar Cita?'} buttons={2} setOpen={setDeleteOpen} setAlert={setAlert} />  }
            { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Cita Actualizada'} buttons={1} />  }
            { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Cita Eliminadoa'} buttons={1} />  }
            { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
            { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
          </>
        )
      };

  export const ConsultarCitas = ({ urlApi }) => {
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
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[0]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[1]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[2]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[3]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[4]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[5]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
                <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[6]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(13)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(14)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
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
                    <Row item={item} urlApi={urlApi} />
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