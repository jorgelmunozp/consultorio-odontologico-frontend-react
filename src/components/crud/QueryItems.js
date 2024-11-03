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
import { HearthSearch } from '../icons/hearth/HearthSearch';
import { HearthEdit } from '../icons/hearth/HearthEdit';
import { HearthDelete } from '../icons/hearth/HearthDelete';
import { FilterSearch } from '../icons/filter/FilterSearch';
import { FilterEdit } from '../icons/filter/FilterEdit';
import { FilterDelete } from '../icons/filter/FilterDelete';
import { Arrows } from '../forms/arrows/Arrows';
import { SearchBar } from '../search/SearchBar';
import { PaginationBar } from '../pagination/PaginationBar';

const Row = ({ classType,item,urlApi,state }) => {
  const [readOpen, setReadOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  let IconSearch = '';                                                          // Selección de icono search
  let IconEdit = '';                                                            // Selección de icono update
  let IconDelete = '';                                                          // Selección de icono delete
  switch (classType) { case 'cita': IconSearch= CalendarSearch; IconEdit= CalendarEdit; IconDelete= CalendarDelete; break;
                       case 'paciente': IconSearch= UserSearch; IconEdit= UserEdit; IconDelete= UserDelete;  break;
                       case 'doctor': IconSearch= UserSearch; IconEdit= UserEdit; IconDelete= UserDelete;  break;
                       case 'consultorio': IconSearch= HomeSearch; IconEdit= HomeEdit; IconDelete= HomeDelete;  break;
                       case 'tratamiento': IconSearch= FilterSearch; IconEdit= FilterEdit; IconDelete= FilterDelete;  break;
                       case 'especialidad': IconSearch= HearthSearch; IconEdit= HearthEdit; IconDelete= HearthDelete;  break;
  }

  const MyAlert = new Alert('');                                                            // Objeto instanciado con la clase Alert para las alertas
  const { alert, setAlert } = MyAlert.state;

  (readOpen || updateOpen || deleteOpen) ? document.getElementById('body').className = 'noScroll' : document.getElementById('body').className = '';   // No scroll when alerts are open
  
  const wideItems = ['paciente','doctor','consultorio','tratamiento','especialidad'];       // Wide columns

  return (
        <>
          <div className='col-3 col-sm-2 text-nowrap'>{ item.id }</div>
          { Object.entries(item[classType]).map((item,index) => {
            return( <div key={'item'+index} className={'text-start text-nowrap' + ( wideItems.includes(item[0]) ? ' col-6 col-sm-3':' col-4 col-sm-2') }>{ (typeof item[1] !== 'object') ? item[1] : Object.values(item[1])[0]+' '+Object.values(item[1])[1] }</div> )})
          }
          <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setReadOpen(true) }><IconSearch /></button></div>
          <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setUpdateOpen(true) }><IconEdit /></button></div>
          <div className='col'><button className='border-0 bg-transparent queryBtn' onClick={ () => setDeleteOpen(true)}><IconDelete /></button></div>
          
          { readOpen && <ReadItem classType={classType} item={item} setOpen={setReadOpen} /> }
          { updateOpen && <UpdateItem classType={classType} item={item} urlApi={urlApi} setOpen={setUpdateOpen} setAlert={setAlert} Row={Row} state={state} /> }
          { deleteOpen && <DeleteItem classType={classType} item={item} urlApi={urlApi} setOpen={setDeleteOpen} setAlert={setAlert} />  }
          { alert === 'successUpdate' && <Modal open={alert} setOpen={setAlert} />  }
          { alert === 'successDelete' && <Modal open={alert} setOpen={setAlert} />  }
          { alert === 'errorUpdate' && <Modal open={alert} setOpen={setAlert} />  }
          { alert === 'errorDelete' && <Modal open={alert} setOpen={setAlert} />  }
          
          <Modal open={alert} setOpen={setAlert} />
        </>

        
      )
  }; 

export const QueryItems = ({ classType, isMenuOpen }) => {
  let Classe = '';
  let IconSearch = '';                                                      // Selección de icono search
  switch (classType) { case 'cita': Classe= Cita; IconSearch= CalendarSearch; break;
                       case 'paciente': Classe= Paciente; IconSearch= UserSearch; break;
                       case 'doctor': Classe= Doctor; IconSearch= UserSearch; break;
                       case 'consultorio': Classe= Consultorio; IconSearch= HomeSearch; break;
                       case 'tratamiento': Classe= Tratamiento; IconSearch= FilterSearch; break;
                       case 'especialidad': Classe= Especialidad; IconSearch= HearthSearch; break;
  }

  const objectClass = new Classe('');                                       // Objeto instanciado con la Class
  const urlApi = objectClass.api;
  const { titles, placeholders } = objectClass.titles;
  const state = objectClass.state;
  const { queries,setQueries,arrayFiltered,alertFetch,indexPage,itemsPerPage,activePages,indexPages,setAlertFetch,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;
  const pluralEs = ['doctor','especialidad'];
  
  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')}>
        <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + (pluralEs.includes(classType) ? 'es':'s') }</h5>
        <SearchBar Icon={IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} />
        <div className={'container-fluid border overflow-auto px-0' }>
          <div className={'row flex-nowrap bg-main-color'}>
            <span className={'col-3 col-sm-2 bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ 'Código' }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></div></div></div></span>
            { titles.map((item,index) => { return( <span key={'title'+index} className={'bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' + ( item.type === 'dropdown' ? ' col-6 col-sm-3':' col-4 col-sm-2') }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ item.title }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 1 + (index + 1)*2 )}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 2 + (index + 1)*2 )}><Arrows direction={"down"}/></button></div></div></div></span> )}) }
            <div className='col-8 col-sm-3 bg-main-color border-bottom border-dark'></div>        {/* header botones crud */}
          </div>
            { arrayFiltered.sort(SortByProperty).slice(indexPage[0],indexPage[1]).map((item) => { return (
                <div id={'row'+item.id } key={ item.id } className='row flex-nowrap border-bottom text-start text-nowrap py-2' >
                  <Row classType={classType} item={item} urlApi={urlApi} state={state} />
                </div>
              )})
            }
        </div>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
      <Modal open={alertFetch} setOpen={setAlertFetch} />
    </div>
  );
};

export default QueryItems;