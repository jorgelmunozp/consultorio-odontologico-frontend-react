import { Suspense, lazy, useState, useEffect } from 'react';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { plurales } from '../../global.js';

const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./items/ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, isMenuOpen }) => {
  const objectHook = useCrudFactory({ classType:classType });

  const urlApi = objectHook.api;
  const titles = objectHook.titles;
  const { queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages } = objectHook.data;
  const { SortByProperty, setSortBy } = objectHook.sort;

  const [items, setItems] = useState(arrayFiltered);
  useEffect(() => setItems(arrayFiltered || []), [arrayFiltered]);     // Si initialArray cambia desde fuera, se sincroniza
  
  const handleItems = (action, id, classType) => {
    setItems(arrayFiltered => {
      switch (action) {
        case 'delete': return arrayFiltered.filter(item => item._id !== id);
        case 'update': return arrayFiltered.map(item => item._id === id ? { ...item, [classType]: { ...item[classType] } } : item);
        default: return arrayFiltered;
      }
    });
  }
  
  return (
    <div className="App">
      <div className={'container-fluid mt-4 mt-sm-5 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')}>
        <h5 className='main-color fs-sm-2 mb-4'>{ classType.charAt(0).toUpperCase() + classType.slice(1) + (plurales.includes(classType) ? 'es':'s') }</h5>
        <SearchBar Icon={Icons[classType].IconSearch} items={titles} queries={queries} setQueries={setQueries} isMenuOpen={isMenuOpen} className={'float-end pb-3 me-0 smooth' + (isMenuOpen ? ' w-responsive':' w-100')} />
        <Suspense fallback={ <div className="loaderSpin"></div> }>
          <ItemsList classType={classType} Icons={Icons} titles={titles} urlApi={urlApi} array={items} SortByProperty={SortByProperty} setSortBy={setSortBy} indexPage={indexPage} handleItems={handleItems} />
        </Suspense>
        <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
      </div>
    </div>
  );
};

export default QueryItem;