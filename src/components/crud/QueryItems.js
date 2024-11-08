import { Suspense, lazy } from 'react';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
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
import { SearchBar } from '../search/SearchBar';
import { PaginationBar } from '../pagination/PaginationBar';

const ItemsList = lazy(() => import('./ItemsList'));

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
  const { queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;
  const pluralEs = ['doctor','especialidad'];

  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')}>
        <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + (pluralEs.includes(classType) ? 'es':'s') }</h5>
        <SearchBar Icon={icons[classType].IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} />
        <Suspense fallback={ <center><div className="loaderSpin"></div></center> }>
          <ItemsList classType={classType} icons={icons} titles={titles} urlApi={urlApi} array={arrayFiltered} objectClass={objectClass} SortByProperty={SortByProperty} setSortBy={setSortBy} indexPage={indexPage} />
        </Suspense>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
    </div>
  );
};

export default QueryItems;