import { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { Consultorio } from '../../../classes/Consultorio';
import { Doctor } from '../../../classes/User';
import { useFetch } from "../../../hooks/useFetch";
import { ReadItem } from '../read/ReadItem';
import { UpdateItem } from '../update/UpdateItem';
import { DeleteItem } from '../delete/DeleteItem';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getTratamientosFiltered } from '../../selectors/getTratamientosFiltered';
import { TbFilterSearch,TbFilterEdit, TbFilterX } from "react-icons/tb";
import { FilterEdit } from '../../icons/filter/FilterEdit';
import { Stethoscope } from '../../icons/medical/Stethoscope';
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi }) => {
  const [nombre, setNombre] = useState(item.tratamiento.nombre);
  const [consultorio, setConsultorio] = useState(item.tratamiento.consultorio);
  const [doctor, setDoctor] = useState(item.tratamiento.doctor);
  const state = [
    { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value) },
    { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ) },
    { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor(event.target.value.split(" ")[0], event.target.value.split(" ")[1]).user ) }
  ];

  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='px-2 px-sm-4 text-nowrap'>{ item.tratamiento.nombre }</td>
            <td className='ps-5 ps-sm-5 text-nowrap'>{ item.tratamiento.consultorio.numero }</td>
            <td className='px-2 px-sm-4 text-nowrap'>{ item.tratamiento.doctor.nombre +" "+ item.tratamiento.doctor.apellido }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => setReadOpen(true) }><TbFilterSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setUpdateOpen(true) }><TbFilterEdit className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setDeleteOpen(true) }><TbFilterX className='text-secondary'/></button></td>

            { readOpen && <ReadItem Icon={Stethoscope} item={item} title={'Tratamiento'} buttons={1} setOpen={setReadOpen} /> }
            { updateOpen && <UpdateItem Icon={FilterEdit} item={item} urlApi={urlApi} title={'Actualizar Tratamiento?'} buttons={2} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
            { deleteOpen && <DeleteItem Icon={Warning} item={item} urlApi={urlApi} title={'Eliminar Tratamiento?'} buttons={2} setOpen={setDeleteOpen} setAlert={setAlert} />  }
            { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Tratamiento Actualizado'} buttons={1} />  }
            { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Tratamiento Eliminado'} buttons={1} />  }
            { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
            { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
          </>
        )
    };


export const ConsultarTratamientos = ({ urlApi }) => {
    /* Fetch */
    let array = [];
    let [ alertFetch, setAlertFetch ] = useState(false);
    const arrayFetch = useFetch(urlApi);
    useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
    if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

    /* Query */
    let [ queryCode, setQueryCode ] = useState('');
    let [ queryName, setQueryName ] = useState('');
    let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
    let [ queryDoctor, setQueryDoctor ] = useState('');
  
    const arrayFiltered = useMemo( () => getTratamientosFiltered(array,queryCode,queryName,queryConsultoryRoom,queryDoctor), [array,queryCode,queryName,queryConsultoryRoom,queryDoctor] );
  
    const titles = ['Código','Nombre','Consultorio','Doctor'];
    const queries = [queryCode,queryName,queryConsultoryRoom,queryDoctor];
    const setQueries = [setQueryCode,setQueryName,setQueryConsultoryRoom,setQueryDoctor];
    
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
    function sortByNameUp(a, b) { return a.tratamiento.nombre.localeCompare(b.tratamiento.nombre); }
    function sortByNameDown(a, b) { return b.tratamiento.nombre.localeCompare(a.tratamiento.nombre); }
    function sortByConsultingRoomUp(a, b) { return a.tratamiento.consultorio.localeCompare(b.tratamiento.consultorio); }
    function sortByConsultingRoomDown(a, b) { return b.tratamiento.consultorio.localeCompare(a.tratamiento.consultorio); }
    function sortByDoctorUp(a, b) { return a.tratamiento.doctor.nombre.localeCompare(b.tratamiento.doctor.nombre); }
    function sortByDoctorDown(a, b) { return b.tratamiento.doctor.nombre.localeCompare(a.tratamiento.doctor.nombre); }
        
  return(
    <div id="contenido">
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Tratamientos Autorizados </h5>
      <SearchBar icon={<TbFilterSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />
      
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 py-0 px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[0]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-4 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[1]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-2'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[2]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-4 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[3]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0'colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNameUp 
                    : ( sortBy === 4 ? sortByNameDown 
                      : ( sortBy === 5 ? sortByConsultingRoomUp 
                        : ( sortBy === 6 ? sortByConsultingRoomDown
                          : ( sortBy === 7 ? sortByDoctorUp 
                            : ( sortBy === 8 ? sortByDoctorDown 
                              : sortByIdUp
                  )))))))).slice(indexPage[0],indexPage[1]).map((item)=>{return (
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
    { alertFetch && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlertFetch} title={'Error en la conexión con el servidor'} buttons={1} /> }
    </div>
  )
};