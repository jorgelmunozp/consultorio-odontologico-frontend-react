import { useState, useMemo, useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { ReadPaciente } from '../read/ReadPaciente';
import { UpdateItem } from '../update/UpdateItem';
import { DeletePaciente } from '../delete/DeletePaciente';
import { Modal } from '../../modal/Modal';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getPacientesFiltered } from '../../selectors/getPacientesFiltered';
import { TbUserSearch, TbUserEdit,TbUserX } from "react-icons/tb";
import { User } from '../../icons/user/User';
import { UserEdit } from '../../icons/user/UserEdit';
import { Success } from '../../icons/success/Success';
import { Warning } from '../../icons/warning/Warning';
import { Error } from '../../icons/error/Error';

const Row = ({ item,urlApi }) => {
  const [identificacion, setIdentificacion] = useState(item.paciente.identificacion);
  const [nombre, setNombre] = useState(item.paciente.nombre);
  const [apellido, setApellido] = useState(item.paciente.apellido);
  const [genero, setGenero] = useState(item.paciente.genero);
  const [eps, setEps] = useState(item.paciente.eps);
  const state = [
                  { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value) },
                  { apellido: apellido, type:"text", handleChange: (event) => setApellido(event.target.value) },
                  { identificacion: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value) },
                  { genero: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value) },
                  { eps: eps, type:"dropdown", handleChange: (event) => setEps(event.target.value) },
                ];

  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.paciente.identificacion }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.paciente.nombre }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.paciente.apellido }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.paciente.genero }</td>
            <td className='px-2 px-sm-3 text-nowrap'>{ item.paciente.eps }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => setReadOpen(true) }><TbUserSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setUpdateOpen(true) }><TbUserEdit className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => setDeleteOpen(true) }><TbUserX className='text-secondary'/></button></td>

            { readOpen && <ReadPaciente Icon={User} item={item} title={'Paciente'} buttons={1} setOpen={setReadOpen} /> }
            { updateOpen && <UpdateItem Icon={UserEdit} item={item} urlApi={urlApi} title={'Actualizar Paciente?'} buttons={2} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
            { deleteOpen && <DeletePaciente Icon={Warning} item={item} urlApi={urlApi} title={'Eliminar Paciente?'} buttons={2} setOpen={setDeleteOpen} setAlert={setAlert} />  }
            { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Paciente Actualizado'} buttons={1} />  }
            { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Paciente Eliminado'} buttons={1} />  }
            { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
            { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
          </>
        )
  };

export const ConsultarPacientes = ({ urlApi }) => {
    /* Fetch */
    let array = [];
    let [ alertFetch, setAlertFetch ] = useState(false);
    const arrayFetch = useFetch(urlApi);
    useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
    if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

    /* Query */
    let [ queryCode, setQueryCode ] = useState('');
    let [ queryIdentification, setQueryIdentification ] = useState('');
    let [ queryName, setQueryName ] = useState('');
    let [ queryLastname, setQueryLastname ] = useState('');
    let [ queryGender, setQueryGender ] = useState('');
    let [ queryEps, setQueryEps ] = useState('');
   
    const arrayFiltered = useMemo( () => getPacientesFiltered(array,queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps), [array,queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps] );
  
    const titles = ['Código','identificacion','Nombre','Apellido','Género','Eps'];
    const queries = [queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps];
    const setQueries = [setQueryCode,setQueryIdentification,setQueryName,setQueryLastname,setQueryGender,setQueryEps];
    
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
      
  return(
    <div className="App">
      <div id="contenidoPacientes">  
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Pacientes Afiliados </h5>
      <SearchBar icon={<TbUserSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />
      
      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[0]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[1]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[2]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[3]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(7)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(8)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[4]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(9)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(10)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 px-sm-3px-2 px-sm-3'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[5]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(11)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(12)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(sortBy === 1 ? sortByIdUp 
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
                  )))))))))))).slice(indexPage[0],indexPage[1]).map((item)=>{return (
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