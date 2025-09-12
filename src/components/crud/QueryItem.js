import { Suspense, lazy, useMemo, useCallback } from 'react';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import { usePagination } from '../pagination/usePagination.js';

const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./items/ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, title, isMenuOpen }) => {
  const objectHook = useCrudFactory({ classType });
  const { api: urlApi, keys, data, sort } = objectHook;
  const { queries, setQueries, arrayFiltered } = data;
  const { SortByProperty, setSortBy } = sort;

  const items = useMemo(() => arrayFiltered ?? [], [arrayFiltered]); // ✅ Memoizamos items para evitar re-creación innecesaria


  const pagination = usePagination({ array: items, initialItemsPerPage: 10 });  // Hook de paginación

  const containerClass = useMemo(
    () => `container-fluid mt-4 mt-sm-5 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`,
    [isMenuOpen]
  );

  console.log('QueryItem!!!');  // DEBUG  

  // ✅ Memorizamos props de SearchBar para que no cambien entre renders
  const searchBarProps = useMemo(() => ({
    Icon: Icons[classType].IconSearch,
    items: keys,
    queries,
    setQueries,
    className: `float-end pb-3 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`
  }), [Icons, classType, keys, queries, setQueries, isMenuOpen]);

  // ✅ Memoizamos callbacks de paginación para referencias estables
  const goToPage = useCallback((page) => pagination.goToPage(page), [pagination]);
  const goPrev = useCallback(() => pagination.goPrev(), [pagination]);
  const goNext = useCallback(() => pagination.goNext(), [pagination]);

  return (
    <div className="App">
      <div className={containerClass}>
        <h5 className="main-color fs-sm-2 mb-4">{title}</h5>
        <Suspense fallback={<div className="loaderSpin"></div>}>

          <SearchBar {...searchBarProps} />

          {/* ItemsList recibe directamente los items de la página actual */}
          <ItemsList
            classType={classType}
            Icons={Icons}
            keys={keys}
            urlApi={urlApi}
            array={pagination.currentItems}
            SortByProperty={SortByProperty}
            setSortBy={setSortBy}
          />

          {/* PaginationBar usando currentPage */}
          <PaginationBar
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            goToPage={goToPage}
            goPrev={goPrev}
            goNext={goNext}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default QueryItem;
