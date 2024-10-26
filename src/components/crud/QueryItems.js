import { useState, useMemo, useEffect } from 'react';
import { useFetch } from "../../hooks/useFetch";
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';
import { Modal } from '../modal/Modal';
import { Arrows } from '../../forms/arrows/Arrows';
import { SearchBar } from '../search/SearchBar';
import { PaginationBar } from '../pagination/PaginationBar';
import { getConsultoriosFiltered } from '../selectors/getConsultoriosFiltered';
import { TbHomeSearch, TbHomeEdit, TbHomeX } from "react-icons/tb";
import { HomeIndex } from '../icons/home/HomeIndex';
import { HomeEdit } from '../icons/home/HomeEdit';
import { Success } from '../icons/success/Success';
import { Warning } from '../icons/warning/Warning';
import { Error } from '../icons/error/Error';
import 'bootstrap/dist/js/bootstrap.bundle';

const Row = ({ classType,item,urlApi }) => {
  let Classe = '';
  switch (classType) { case 'cita' : Classe = Cita; break;
                  case 'paciente': Classe = Paciente; break;
                  case 'doctor': Classe = Doctor; break;
                  case 'consultorio': Classe = Consultorio; break;
                  case 'tratamiento': Classe = Tratamiento; break;
  }

  let objectClass = new Classe(item[classType]);                                         // Objecto instanciado con la Class
  const state = objectClass.state;

  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [alert, setAlert] = useState(false); 
  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  console.log("item: ", item)
  console.log("item[classType]: ", item[classType])
  console.log("Object.values(item[classType]): ", Object.values(item[classType]))
  return (
        <>
          <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
          {
            Object.values(item[classType]).map((item) => {return(
              <td className='ps-4 ps-sm-5 text-nowrap'>{ item }</td>
            )})
          }
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setReadOpen(true) }><TbHomeSearch className='text-secondary'/></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setUpdateOpen(true) }><TbHomeEdit className='text-secondary'/></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setDeleteOpen(true)}><TbHomeX className='text-secondary'/></button></td>
          
          { readOpen && <ReadItem classType={classType} Icon={HomeIndex} item={item} setOpen={setReadOpen} /> }
          { updateOpen && <UpdateItem classType={classType} Icon={HomeEdit} item={item} urlApi={urlApi} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
          { deleteOpen && <DeleteItem classType={classType} Icon={Warning} item={item} urlApi={urlApi} setOpen={setDeleteOpen} setAlert={setAlert} />  }
          { alert === 'successUpdate' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Actualización exitosa'} buttons={1} />  }
          { alert === 'successDelete' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Eliminación exitosa'} buttons={1} />  }
          { alert === 'errorUpdate' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Actualización'} buttons={1} />  }
          { alert === 'errorDelete' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Error en la Eliminación'} buttons={1} />  }
        </>
      )
  }; 

export const QueryItems = ({ classType, urlApi }) => {
  /* Fetch */
  let array = [];
  let [ alertFetch, setAlertFetch ] = useState(false);
  const arrayFetch = useFetch(urlApi);
  useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
  if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

  /* Query */
  let [ queryCode, setQueryCode ] = useState('');
  let [ queryNumber, setQueryNumber ] = useState('');
  let [ queryName, setQueryName ] = useState('');

  const arrayFiltered = useMemo( () => getConsultoriosFiltered(array,queryCode,queryNumber,queryName), [array,queryCode,queryNumber,queryName] );

  const titles = ['Código','Número','Nombre'];
  const queries = [queryCode,queryNumber,queryName];
  const setQueries = [setQueryCode,setQueryNumber,setQueryName];
  
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
  function sortByNumberUp(a, b) { return a.consultorio.numero - b.consultorio.numero; }
  function sortByNumberDown(a, b) { return b.consultorio.numero - a.consultorio.numero; }
  function sortByNameUp(a, b) { return a.consultorio.nombre.localeCompare(b.consultorio.nombre); }
  function sortByNameDown(a, b) { return b.consultorio.nombre.localeCompare(a.consultorio.nombre); }
  
  return (
    <div className="App">
      <div id="contenidoConsultorios">
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'> Consultorios Disponibles </h5>
      <SearchBar icon={<TbHomeSearch className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />

      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr className="">
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[0]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[1]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-5 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{titles[2]}</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='p-0' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(sortBy === 1 ? sortByIdUp 
                : ( sortBy === 2 ? sortByIdDown 
                  : ( sortBy === 3 ? sortByNumberUp 
                    : ( sortBy === 4 ? sortByNumberDown 
                      : ( sortBy === 5 ? sortByNameUp 
                        : ( sortBy === 6 ? sortByNameDown
                          : sortByIdUp
              )))))).slice(indexPage[0],indexPage[1]).map((item)=>{return (
                <tr id={ 'row'+item.id } key={ item.id }>
                  <Row classType={classType} item={item} urlApi={urlApi} />
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
  );
};