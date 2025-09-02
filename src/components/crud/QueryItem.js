import { Suspense, lazy, useState, useEffect } from 'react';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { plurales } from '../../global.js';

const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, isMenuOpen, theme }) => {
  const objectClass = useCrudFactory(classType);

  const urlApi = objectClass.api;
  const titles = objectClass.titles;
  const { queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages } = objectClass.data;
  const { SortByProperty, setSortBy } = objectClass.sort;

  const [items, setItems] = useState(arrayFiltered);
  useEffect(() => setItems(arrayFiltered || []), [arrayFiltered]);     // Si initialArray cambia desde fuera, se sincroniza
  
  const handleItems = (action, id, classType) => {
    setItems(arrayFiltered => {
      switch (action) {
        case 'delete': return arrayFiltered.filter(item => item.id !== id);
        case 'update': return arrayFiltered.map(item => item.id === id ? { ...item, [classType]: { ...item[classType] } } : item);
        default: return arrayFiltered;
      }
    });
  }
  
  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')}>
        <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + (plurales.includes(classType) ? 'es':'s') }</h5>
        <SearchBar Icon={Icons[classType].IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} theme={theme}/>
        <Suspense fallback={ <div className="loaderSpin"></div> }>
          <ItemsList classType={classType} Icons={Icons} titles={titles} urlApi={urlApi} array={items} objectClass={objectClass} SortByProperty={SortByProperty} setSortBy={setSortBy} indexPage={indexPage} handleItems={handleItems} theme={theme}/>
        </Suspense>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
    </div>
  );
};

export default QueryItem;