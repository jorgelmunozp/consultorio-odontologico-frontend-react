import { Suspense, lazy } from 'react';
import { Cita } from '../../classes/Cita.js';
import { Paciente, Doctor } from '../../classes/User.js';
import { Especialidad } from '../../classes/Especialidad.js';
import { Consultorio } from '../../classes/Consultorio.js';
import { Tratamiento } from '../../classes/Tratamiento.js';

const CalendarEdit = lazy(() => import('../icons/calendar/CalendarEdit.js'));
const CalendarDelete = lazy(() => import('../icons/calendar/CalendarDelete.js'));
const UserEdit = lazy(() => import('../icons/user/UserEdit.js'));
const UserDelete = lazy(() => import('../icons/user/UserDelete.js'));
const HomeEdit = lazy(() => import('../icons/home/HomeEdit.js'));
const HomeDelete = lazy(() => import('../icons/home/HomeDelete.js'));
const HearthEdit = lazy(() => import('../icons/hearth/HearthEdit.js'));
const HearthDelete = lazy(() => import('../icons/hearth/HearthDelete.js'));
const FilterEdit = lazy(() => import('../icons/filter/FilterEdit.js'));
const FilterDelete = lazy(() => import('../icons/filter/FilterDelete.js'));
const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, menuIcons, isMenuOpen, theme }) => {
  const classes = { cita: { Classe: Cita },
                    paciente: { Classe: Paciente },
                    doctor: { Classe: Doctor },
                    consultorio: { Classe: Consultorio },
                    tratamiento: { Classe: Tratamiento },
                    especialidad: { Classe: Especialidad }
  }

  const icons = { cita: { IconSearch:menuIcons.citaSearch, IconRead:menuIcons.cita, IconEdit:CalendarEdit, IconDelete:CalendarDelete },
                  paciente: { IconSearch:menuIcons.pacienteSearch, IconRead:menuIcons.paciente, IconEdit:UserEdit, IconDelete:UserDelete },
                  doctor: { IconSearch:menuIcons.doctorSearch, IconRead:menuIcons.doctor, IconEdit:UserEdit, IconDelete:UserDelete },
                  consultorio: { IconSearch:menuIcons.consultorioSearch, IconRead:menuIcons.consultorio, IconEdit:HomeEdit, IconDelete:HomeDelete },
                  tratamiento: { IconSearch:menuIcons.tratamientoSearch, IconRead:menuIcons.tratamiento, IconEdit:FilterEdit, IconDelete:FilterDelete },
                  especialidad: { IconSearch:menuIcons.especialidadSearch, IconRead:menuIcons.especialidad, IconEdit:HearthEdit, IconDelete:HearthDelete }
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
        <SearchBar Icon={icons[classType].IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} theme={theme}/>
        <Suspense fallback={ <div className="loaderSpin"></div> }>
          <ItemsList classType={classType} icons={icons} titles={titles} urlApi={urlApi} array={arrayFiltered} objectClass={objectClass} SortByProperty={SortByProperty} setSortBy={setSortBy} indexPage={indexPage} />
        </Suspense>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
    </div>
  );
};

export default QueryItem;