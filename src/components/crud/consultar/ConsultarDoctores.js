import { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { ReadItem } from '../read/ReadItem';
import { UpdateItem } from '../update/UpdateItem';
import { DeleteItem } from '../delete/DeleteItem';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getDoctoresFiltered } from '../../selectors/getDoctoresFiltered';
import { TbUserSearch, TbUserEdit,TbUserX } from "react-icons/tb";
import { User } from '../../icons/user/User'
import { UserEdit } from '../../icons/user/UserEdit'
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi }) => {
  const [identificacion, setIdentificacion] = useState(item.doctor.identificacion);
  const [nombre, setNombre] = useState(item.doctor.nombre);
  const [apellido, setApellido] = useState(item.doctor.apellido);
  const [genero, setGenero] = useState(item.doctor.genero);
  const [especialidad, setEspecialidad] = useState(item.doctor.especialidad);
  const state = [
                  { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value) },
                  { apellido: apellido, type:"text", handleChange: (event) => setApellido(event.target.value) },
                  { identificacion: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value) },
                  { genero: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value) },
                  { especialidad: especialidad, type:"dropdown", handleChange: (event) => setEspecialidad(event.target.value) },
                ];

  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.nombre }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.apellido }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.doctor.especialidad }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => setReadOpen(true) }><TbUserSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setUpdateOpen(true) }><TbUserEdit className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setDeleteOpen(true) }><TbUserX className='text-secondary'/></button></td>

            { readOpen && <ReadItem Icon={User} item={item} setOpen={setReadOpen} /> }
            { updateOpen && <UpdateItem Icon={UserEdit} item={item} urlApi={urlApi} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
            { deleteOpen && <DeleteItem Icon={Warning} item={item} urlApi={urlApi} setOpen={setDeleteOpen} setAlert={setAlert} />  }
            { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Médico Actualizado'} buttons={1} />  }
            { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Médico Eliminado'} buttons={1} />  }
            { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
            { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
          </>
        )
  };

export const ConsultarDoctores = ({ urlApi }) => {
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
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[0]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[1]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[2]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[3]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
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