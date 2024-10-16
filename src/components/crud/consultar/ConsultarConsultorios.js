import { useState, useMemo } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import { useFetch } from "../../../hooks/useFetch";
import { DeleteConsultorio } from '../delete/DeleteConsultorio';
import { ReadConsultorio } from '../read/ReadConsultorio';
import { UpdateConsultorio } from '../update/UpdateConsultorio';
import { Arrows } from '../../../forms/arrows/Arrows';
import { SearchBar } from '../../search/SearchBar';
import { PaginationBar } from '../../pagination/PaginationBar';
import { getConsultoriosFiltered } from '../../selectors/getConsultoriosFiltered';
import { TbHomeSearch, TbHomeEdit, TbHomeX } from "react-icons/tb";

const Row = ({ item,urlApi }) => { 
  return (
          <>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
            <td className='ps-4 ps-sm-5 text-nowrap'>{ item.consultorio.numero }</td>
            <td className='ps-2 ps-sm-5 text-nowrap'>{ item.consultorio.nombre }</td>
            <td><button className='border-0 bg-transparent' onClick={ () => ReadConsultorio(item) }><TbHomeSearch className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => UpdateConsultorio(item,urlApi,Row) }><TbHomeEdit className='text-secondary'/></button></td>
            <td><button className='border-0 bg-transparent' onClick={ () => DeleteConsultorio(item,urlApi) }><TbHomeX className='text-secondary'/></button></td>
          </>
        )
  }; 

export const ConsultarConsultorios = ({ urlApi }) => {
  const consultorios = useFetch(urlApi).data;

    /* Query */
    let [ queryCode, setQueryCode ] = useState('');
    let [ queryNumber, setQueryNumber ] = useState('');
    let [ queryName, setQueryName ] = useState('');
  
    const arrayFiltered = useMemo( () => getConsultoriosFiltered(consultorios,queryCode,queryNumber,queryName), [consultorios,queryCode,queryNumber,queryName] );
  
    const titles = ['Código','Número','Nombre'];
    const queries = [queryCode,queryNumber,queryName];
    const setQueries = [setQueryCode,setQueryNumber,setQueryName];
    
    /* Pagination */
    const [itemPerPage, setItemPerPage ] = useState(10);                // Se define el número de items por página
    const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
    const numPages = Math.floor(arrayFiltered.length/itemPerPage);     // Se calcula la cantidad de páginas = cantidad de items/item por página
    const resPages = arrayFiltered.length%itemPerPage;                 // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
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
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Código</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Número</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(3)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(4)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
              <th className='border-0 py-0 px-2 ps-sm-5 pe-sm-5'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">Nombre</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy(5)}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy(6)}><Arrows direction={"down"}/></button></th></tr></thead></table></th>
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
    </div>
  );
};