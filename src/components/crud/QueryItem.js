// import { Suspense, lazy, useMemo } from 'react';
// import { useCrudFactory } from '../../hooks/useCrudFactory.js';
// import { usePagination } from '../pagination/usePagination.js';

// const SearchBar = lazy(() => import('../search/SearchBar.js'));
// const ItemsList = lazy(() => import('./items/ItemsList.js'));
// const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

// export const QueryItem = ({ classType, Icons, title, isMenuOpen }) => {
//   const objectHook = useCrudFactory({ classType });
//   const { api: urlApi, keys, data, sort } = objectHook;
//   const { queries, setQueries, arrayFiltered } = data;
//   const { SortByProperty, setSortBy } = sort;

//   const items = useMemo(() => arrayFiltered ?? [], [arrayFiltered]);

//   const pagination = usePagination({ array: items });     // ✅ Usamos nuestro hook de paginación

//   const containerClass = useMemo(
//     () => `container-fluid mt-4 mt-sm-5 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`,
//     [isMenuOpen]
//   );

//   return (
//     <div className="App">
//       <div className={containerClass}>
//         <h5 className="main-color fs-sm-2 mb-4">{title}</h5>
//         <Suspense fallback={<div className="loaderSpin"></div>}>
//           <SearchBar
//             Icon={Icons[classType].IconSearch}
//             items={keys}
//             queries={queries}
//             setQueries={setQueries}
//             className={`float-end pb-3 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`}
//           />
//           <ItemsList
//             classType={classType}
//             Icons={Icons}
//             keys={keys}
//             urlApi={urlApi}
//             array={items.slice(...pagination.indexPage)}
//             SortByProperty={SortByProperty}
//             setSortBy={setSortBy}
//           />
//           <PaginationBar
//             indexPages={pagination.indexPages}
//             activePages={pagination.activePages}
//             goToPage={pagination.goToPage}
//             goPrev={pagination.goPrev}
//             goNext={pagination.goNext}
//           />
//         </Suspense>
//       </div>
//     </div>
//   );
// };

// export default QueryItem;

import { Suspense, lazy, useMemo } from 'react';
import { useCrudFactory } from '../../hooks/useCrudFactory.js';
import usePagination from '../pagination/usePagination.js';

const SearchBar = lazy(() => import('../search/SearchBar.js'));
const ItemsList = lazy(() => import('./items/ItemsList.js'));
const PaginationBar = lazy(() => import('../pagination/PaginationBar.js'));

export const QueryItem = ({ classType, Icons, title, isMenuOpen }) => {
  const objectHook = useCrudFactory({ classType });
  const { api: urlApi, keys, data, sort } = objectHook;
  const { queries, setQueries, arrayFiltered } = data;
  const { SortByProperty, setSortBy } = sort;

  const items = useMemo(() => arrayFiltered ?? [], [arrayFiltered]);

  // --- Hook de paginación limpio ---
  const pagination = usePagination({ array: items, initialItemsPerPage: 10 });

  const containerClass = useMemo(
    () => `container-fluid mt-4 mt-sm-5 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`,
    [isMenuOpen]
  );

  return (
    <div className="App">
      <div className={containerClass}>
        <h5 className="main-color fs-sm-2 mb-4">{title}</h5>
        <Suspense fallback={<div className="loaderSpin"></div>}>
          <SearchBar
            Icon={Icons[classType].IconSearch}
            items={keys}
            queries={queries}
            setQueries={setQueries}
            className={`float-end pb-3 me-0 smooth ${isMenuOpen ? "w-responsive" : "w-100"}`}
          />

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
            goToPage={pagination.goToPage}
            goPrev={pagination.goPrev}
            goNext={pagination.goNext}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default QueryItem;
