import { useState } from 'react';
import { Alert } from '../../classes/Alert';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';
import { Modal } from '../modal/Modal';
import { CalendarSearch } from '../icons/calendar/CalendarSearch';
import { CalendarEdit } from '../icons/calendar/CalendarEdit';
import { CalendarDelete } from '../icons/calendar/CalendarDelete';
import { UserSearch } from '../icons/user/UserSearch';
import { UserEdit } from '../icons/user/UserEdit';
import { UserDelete } from '../icons/user/UserDelete';
import { HomeSearch } from '../icons/home/HomeSearch';
import { HomeEdit } from '../icons/home/HomeEdit';
import { HomeDelete } from '../icons/home/HomeDelete';
import { FilterSearch } from '../icons/filter/FilterSearch';
import { FilterEdit } from '../icons/filter/FilterEdit';
import { FilterDelete } from '../icons/filter/FilterDelete';
import { Arrows } from '../../forms/arrows/Arrows';
import { SearchBar } from '../search/SearchBar';
import { PaginationBar } from '../pagination/PaginationBar';
import { iconHeight,iconWidth,iconStrokeWidth } from '../../global';
import 'bootstrap/dist/js/bootstrap.bundle';

const Row = ({ classType,item,urlApi,state }) => {
  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  let IconSearch = '';                                                      // Selección de icono search
  let IconEdit = '';                                                        // Selección de icono update
  let IconDelete = '';                                                      // Selección de icono delete
  switch (classType) { case 'cita': IconSearch= CalendarSearch; IconEdit= CalendarEdit; IconDelete= CalendarDelete; break;
                       case 'paciente': IconSearch= UserSearch; IconEdit= UserEdit; IconDelete= UserDelete;  break;
                       case 'doctor': IconSearch= UserSearch; IconEdit= UserEdit; IconDelete= UserDelete;  break;
                       case 'consultorio': IconSearch= HomeSearch; IconEdit= HomeEdit; IconDelete= HomeDelete;  break;
                       case 'tratamiento': IconSearch= FilterSearch; IconEdit= FilterEdit; IconDelete= FilterDelete;  break;
                       case 'especialidad': IconSearch= FilterSearch; IconEdit= FilterEdit; IconDelete= FilterDelete;  break;
  }

  const MyAlert = new Alert('');                                            // Objeto instanciado con la clase Alert para las alertas
  const { alert, setAlert } = MyAlert.state;

  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';
  
  return (
        <>
          <td className='ps-4 ps-sm-5 text-nowrap'>{ item.id }</td>
          {
            Object.values(item[classType]).map((item,index) => { return(
              <td key={'item'+index} className='ps-2 ps-sm-3 text-nowrap'>{ typeof item !== 'object' ? item : Object.values(item)[0] + ' ' + Object.values(item)[1] }</td>
            )})
          }
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setReadOpen(true) }><IconSearch /></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setUpdateOpen(true) }><IconEdit /></button></td>
          <td><button className='border-0 bg-transparent primaryBtn' onClick={ () => setDeleteOpen(true)}><IconDelete /></button></td>
          
          { readOpen && <ReadItem classType={classType} item={item} setOpen={setReadOpen} /> }
          { updateOpen && <UpdateItem classType={classType} item={item} urlApi={urlApi} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
          { deleteOpen && <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setDeleteOpen} setAlert={setAlert} />  }
          {/* { alert === 'successUpdate' && <Modal open={alert} setOpen={setAlert} />  } */}
          { alert === 'successDelete' && <Modal open={alert} setOpen={setAlert} />  }
          { alert === 'errorUpdate' && <Modal open={alert} setOpen={setAlert} />  }
          { alert === 'errorDelete' && <Modal open={alert} setOpen={setAlert} />  }
          
          <Modal open={alert} setOpen={setAlert} />
        </>
      )
  }; 

export const QueryItems = ({ classType }) => {
  let Classe = '';
  let IconSearch = '';                                                      // Selección de icono search
  switch (classType) { case 'cita': Classe= Cita; IconSearch= CalendarSearch; break;
                       case 'paciente': Classe= Paciente; IconSearch= UserSearch; break;
                       case 'doctor': Classe= Doctor; IconSearch= UserSearch; break;
                       case 'consultorio': Classe= Consultorio; IconSearch= HomeSearch; break;
                       case 'tratamiento': Classe= Tratamiento; IconSearch= FilterSearch; break;
                       case 'especialidad': Classe= Especialidad; IconSearch= FilterSearch; break;
  }

  const objectClass = new Classe('');                                       // Objeto instanciado con la Class
  const urlApi = objectClass.api;
  const titles = objectClass.titles;
  const state = objectClass.state;

  const { queries,setQueries,arrayFiltered,alertFetch,indexPage,itemPerPage,activePages,indexPages,setAlertFetch,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;
  
  return (
    <div className="App">
      <div id="contenidoConsultorios">
      <center className='mt-4 mt-sm-5'>
      <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + "s" }</h5>
      <SearchBar icon={<IconSearch height={iconHeight} width={iconWidth} strokeWidth={iconStrokeWidth} className={'main-color'}/>} titles={titles} queries={queries} setQueries={setQueries} />

      <div className='container-fluid overflow-auto'>
        <table className="table" border='1'>
          <thead>
            <tr className="">
              {
                titles.map((title,index) => { return( <th key={'title'+title} className='border-0 py-0 px-2 ps-sm-3 pe-sm-0'><table className='lh-1 w-100'><thead><tr className='lh-0'><th rowSpan='2' className="border-0">{ title }</th><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-1 pb-0' onClick={()=>setSortBy( 1 + index*2 )}><Arrows direction={"up"}/></button></th></tr><tr className='lh-0'><th className='border-0 p-0'><button className='border-0 bg-main-color dark-color-hover white-color fs-5 pt-0 pb-1' onClick={()=>setSortBy( 2 + index*2 )}><Arrows direction={"down"}/></button></th></tr></thead></table></th> )})
              }
              <th className='p-0' colSpan='3'></th>
            </tr>
          </thead>
          <tbody>
            {
              arrayFiltered.sort(SortByProperty).slice(indexPage[0],indexPage[1]).map((item) => { return (
                <tr id={ 'row'+item.id } key={ item.id }>
                  <Row classType={classType} item={item} urlApi={urlApi} state={state} />
                </tr>
              )})
            }
          </tbody>
        </table>
        </div>
        <PaginationBar array={arrayFiltered} itemPerPage={itemPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
        </center>
      </div>
      <Modal open={alertFetch} setOpen={setAlertFetch} />
    </div>
  );
};