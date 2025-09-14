import { Suspense, lazy, useMemo, useCallback } from 'react';
import { usePagination } from '../pagination/usePagination.js';

// const SearchItem = lazy(() => import('../search/SearchItem.js'));
const ItemsList = lazy(() => import('./items/ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, objectHook }) => {
  const { api:urlApi, keys, data, sort, handleItems } = objectHook;
  const { arrayFiltered } = data;
  const { SortByProperty, setSortBy } = sort;

  const items = useMemo(() => arrayFiltered ?? [], [arrayFiltered]); // 👈 Items memorizados para evitar re-creación innecesaria

  const pagination = usePagination({ array: items, initialItemsPerPage: 10 });  // 👈 Hook de paginación

  // 👇 Callbacks de paginación memorizados para referencias estables
  const goToPage = useCallback((page) => pagination.goToPage(page), [pagination]);
  const goPrev = useCallback(() => pagination.goPrev(), [pagination]);
  const goNext = useCallback(() => pagination.goNext(), [pagination]);

  if (process.env.NODE_ENV === 'development') console.log('[Query Item 📍]');

  return (
      <div className="container-fluid mt-3 mt-sm-4 me-0 smooth w-100">
        <Suspense fallback={<div className="loaderSpin"></div>}>
          <ItemsList classType={classType} Icons={Icons} keys={keys} urlApi={urlApi} array={pagination.currentItems} SortByProperty={SortByProperty} setSortBy={setSortBy} handleItems={handleItems} />
        </Suspense>
        <PaginationBar currentPage={pagination.currentPage} totalPages={pagination.totalPages} goToPage={goToPage} goPrev={goPrev} goNext={goNext} />
      </div>
  );
};

export default QueryItem;
