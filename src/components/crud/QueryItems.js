import { useState } from 'react';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { ReadItem } from './ReadItem';
import { UpdateItem } from './UpdateItem';
import { DeleteItem } from './DeleteItem';
import { Item } from './Item';

import { CalendarSmile } from '../icons/calendar/CalendarSmile';
import { User } from '../icons/user/User';
import { StethoscopeLight } from '../icons/medical/StethoscopeLight';
import { SyringeLight } from '../icons/medical/SyringeLight';
import { HomeIndex } from '../icons/home/HomeIndex';
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

export const QueryItems = ({ classType, isMenuOpen }) => {
  const classes = { cita: { Classe: Cita },
                    paciente: { Classe: Paciente },
                    doctor: { Classe: Doctor },
                    consultorio: { Classe: Consultorio },
                    tratamiento: { Classe: Tratamiento },
                    especialidad: { Classe: Especialidad }
  }

  const icons = { cita: { IconSearch:CalendarSearch, IconRead:CalendarSmile, IconEdit:CalendarEdit, IconDelete:CalendarDelete },
                  paciente: { IconSearch:UserSearch, IconRead:User, IconEdit:UserEdit, IconDelete:UserDelete },
                  doctor: { IconSearch:UserSearch, IconRead:User, IconEdit:UserEdit, IconDelete:UserDelete },
                  consultorio: { IconSearch:HomeSearch, IconRead:HomeIndex, IconEdit:HomeEdit, IconDelete:HomeDelete },
                  tratamiento: { IconSearch:FilterSearch, IconRead:SyringeLight, IconEdit:FilterEdit, IconDelete:FilterDelete },
                  especialidad: { IconSearch:HearthSearch, IconRead:StethoscopeLight, IconEdit:HearthEdit, IconDelete:HearthDelete }
                }
  
  const objectClass = new classes[classType].Classe('');                      // Objeto instanciado con la Class 
  const urlApi = objectClass.api;
  const { titles, placeholders } = objectClass.titles;
  const state = objectClass.state;
  const { queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;
  const pluralEs = ['doctor','especialidad'];

  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')}>
        <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + (pluralEs.includes(classType) ? 'es':'s') }</h5>
        <SearchBar Icon={icons[classType].IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} />
        <div className={'container-fluid border overflow-auto px-0' }>
          <div className={'row flex-nowrap bg-main-color'}>
            <span className={'col-3 col-sm-2 bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ 'Código' }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(1)}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy(2)}><Arrows direction={"down"}/></button></div></div></div></span>
            { titles.map((item,index) => { return( <span key={'title'+index} className={'bg-main-color border-bottom border-dark text-center pe-3 pe-sm-5' + ( item.type === 'dropdown' ? ' col-6 col-sm-3':' col-4 col-sm-2') }><div className='row bg-main-color justify-content-between'><div className='col-3 col-sm-1 align-self-center white-color'>{ item.title }</div><div className='col-2'><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 1 + (index + 1)*2 )}><Arrows direction={"up"}/></button></div><div className='row lh-1'><button className='border-0 bg-transparent dark-color-hover white-color fs-5 pt-0 pb-0 px-0 ms-2 ms-sm-3' onClick={()=>setSortBy( 2 + (index + 1)*2 )}><Arrows direction={"down"}/></button></div></div></div></span> )}) }
            <div className='col-8 col-sm-3 bg-main-color border-bottom border-dark'></div>        {/* header botones crud */}
          </div>
            { arrayFiltered.sort(SortByProperty).slice(indexPage[0],indexPage[1]).map((item) => { return (
                <div id={'row'+item.id } key={ item.id } className='row flex-nowrap border-bottom text-start text-nowrap py-2' >
                  <Item classType={classType} icons={icons} item={item} urlApi={urlApi} state={state} />
                </div>
              )})
            }
        </div>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
    </div>
  );
};

export default QueryItems;