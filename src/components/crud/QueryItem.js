import { Suspense, lazy, useMemo, useCallback } from 'react';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';

const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./items/ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, title, isMenuOpen }) => {
  const objectHook = useCrudFactory({ classType });

  const { api: urlApi, keys, data, sort } = objectHook;
  const { queries, setQueries, arrayFiltered, setArrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages } = data;
  const { SortByProperty, setSortBy } = sort;

  const items = useMemo(() => arrayFiltered ?? [], [arrayFiltered]);    // 👈 Evita estado duplicado

  const handleItems = useCallback((action, id, classType) => {          // 👈 Memorized handler
    setArrayFiltered(prevItems =>
      prevItems
        .filter(item => (action === "delete" ? item._id !== id : true))
        .map(item => action === "update" && item._id === id ? { ...item, [classType]: { ...item[classType] } } : item ) );
  }, [setArrayFiltered]);

  const containerClass = useMemo(() => `container-fluid mt-4 mt-sm-5 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`, [isMenuOpen] );

  return (
    <div className="App">
      <div className={containerClass}>
        <h5 className="main-color fs-sm-2 mb-4">{title}</h5>
        <Suspense fallback={<div className="loaderSpin"></div>}>
          <SearchBar Icon={Icons[classType].IconSearch} items={keys} queries={queries} setQueries={setQueries} className={`float-end pb-3 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`} />
          <ItemsList classType={classType} Icons={Icons} keys={keys} urlApi={urlApi} array={items} SortByProperty={SortByProperty} setSortBy={setSortBy} indexPage={indexPage} handleItems={handleItems} />
          <PaginationBar array={arrayFiltered} itemsPerPage={itemsPerPage} indexPage={indexPage} activePages={activePages} indexPages={indexPages} setIndexPage={setIndexPage} setActivePages={setActivePages} /> 
        </Suspense>
      </div>
    </div>
  );
};

export default QueryItem;
