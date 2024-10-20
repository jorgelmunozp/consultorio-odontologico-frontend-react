import { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteDoctor } from '../delete/DeleteDoctor';
import { ReadDoctor } from '../read/ReadDoctor';
import { UpdateDoctor } from '../update/UpdateDoctor';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getDoctoresFiltered } from '../../selectors/getDoctoresFiltered';
import { TbUserSearch, TbUserEdit,TbUserX } from "react-icons/tb";
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi,tratamientos,generos }) =>  { 
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.nombre }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.apellido }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.especialidad }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => ReadDoctor(item) }><TbUserSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => UpdateDoctor(item,urlApi,Row,tratamientos,generos) }><TbUserEdit className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => DeleteDoctor(item,urlApi) }><TbUserX className='text-secondary'/></button></td>
          </>
        )
  };

export const ConsultarDoctores = ({ urlApi,tratamientos,generos }) => {
    /* Fetch */
    let array = [];
    let [ alertFetch, setAlertFetch ] = useState(false);
    const arrayFetch = useFetch(urlApi);
    useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
    if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

    /* Query */
    let [ queryCode, setQueryCode ] = useState('');
    let [ queryName, setQueryName ] = useState('');
    let [ queryLastname, setQueryLastname ] = useState('');
    let [ querySpeciality, setQuerySpeciality ] = useState('');
  
    const arrayFiltered = useMemo( () => getDoctoresFiltered(array,queryCode,queryName,queryLastname,querySpeciality), [array,queryCode,queryName,queryLastname,querySpeciality] );
  
    const titles = ['Código','Nombre','Apellido','Especialidad'];
    const queries = [queryCode,queryName,queryLastname,querySpeciality];
    const setQueries = [setQueryCode,setQueryName,setQueryLastname,setQuerySpeciality];
    
    /* Pagination */
    const [itemPerPage, setItemPerPage ] = useState(10);                // Se define el número de items por página
    const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
    const numPages = Math.floor(arrayFiltered.length/itemPerPage);   // Se calcula la cantidad de páginas = cantidad de items/item por página
    const resPages = arrayFiltered.length%itemPerPage;               // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
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
    <div className="App">
      <div id="contenidoDoctores">
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Doctores Disponibles </h5>
      <SearchBar icon={<TbUserSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />

      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Apellido</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Especialidad</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNameUp 
                    : ( sortBy === 4 ? sortByNameDown 
                      : ( sortBy === 5 ? sortByLastnameUp 
                        : ( sortBy === 6 ? sortByLastnameDown
                          : ( sortBy === 7 ? sortBySpecialityUp 
                            : ( sortBy === 8 ? sortBySpecialityDown 
                              : sortByIdUp
                )))))))).slice(indexPage[0],indexPage[1]).map((item)=>{return (
                  <tr id={ 'row'+item.id } key={ item.id }>
                    <Row item={item} urlApi={urlApi} tratamientos={tratamientos} generos={generos} />
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