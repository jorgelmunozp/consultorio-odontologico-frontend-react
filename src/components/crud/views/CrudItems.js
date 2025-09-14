import { Suspense, lazy, memo, useState, useEffect, useMemo } from "react";
import { createPortal } from 'react-dom';
import { useCrudFactory } from '../../../hooks/useCrudFactory.js';
import { usePagination } from '../../pagination/usePagination.js';
import { iconHeight, iconWidth, iconStrokeWidth } from '../../../global.js';

// helper para lazy-imports, DRY
const lazyIcon = (path) => lazy(() => import(`../../icons/${path}.js`));

// centralizamos imports para que sean fáciles de leer
const IconsLazy = {
  calendar: {
    search: lazyIcon("calendar/CalendarSearch"),
    create: lazyIcon("calendar/CalendarPlus"),
    read: lazyIcon("calendar/CalendarSmile"),
    update: lazyIcon("calendar/CalendarEdit"),
    delete: lazyIcon("calendar/CalendarDelete"),
  },
  user: {
    search: lazyIcon("user/UserSearch"),
    create: lazyIcon("user/UserPlus"),
    read: lazyIcon("user/User"),
    update: lazyIcon("user/UserEdit"),
    delete: lazyIcon("user/UserDelete"),
  },
  home: {
    search: lazyIcon("home/HomeSearch"),
    create: lazyIcon("home/HomePlus"),
    read: lazyIcon("home/HomeIndex"),
    update: lazyIcon("home/HomeEdit"),
    delete: lazyIcon("home/HomeDelete"),
  },
  hearth: {
    search: lazyIcon("hearth/HearthSearch"),
    create: lazyIcon("hearth/HearthPlus"),
    update: lazyIcon("hearth/HearthEdit"),
    delete: lazyIcon("hearth/HearthDelete"),
  },
  filter: {
    search: lazyIcon("filter/FilterSearch"),
    create: lazyIcon("filter/FilterPlus"),
    update: lazyIcon("filter/FilterEdit"),
    delete: lazyIcon("filter/FilterDelete"),
  },
  syringe: { read:lazyIcon("medical/SyringeLight") }, 
  especialidad: { read:lazyIcon("medical/StethoscopeLight") },
};

const CreateItem = lazy(() => import("../CreateItem.js"));
const QueryItems = lazy(() => import("../QueryItems.js"));
const QueryItem = lazy(() => import('../QueryItem.js'));
const PaginationBar = lazy(() => import('../../pagination/PaginationBar.js'));

export const CrudItems = ({ classType, title = "Registros" }) => {
  const [open, setOpen] = useState(false);

  const objectHook = useCrudFactory({ classType });
  const { keys, data } = objectHook;
  const { queries, setQueries } = data;

  // const pagination = usePagination({ array:items, initialItemsPerPage: 10 });  // 👈 Hook de paginación

  // Iconos con useMemo para no recrear este objeto en cada render
  const IconsCrud = useMemo( () => ({
      cita: { IconSearch:IconsLazy.calendar.search, IconCreate:IconsLazy.calendar.create, IconRead:IconsLazy.calendar.read, IconUpdate:IconsLazy.calendar.update, IconDelete:IconsLazy.calendar.delete, },
      paciente:{ IconSearch:IconsLazy.user.search, IconCreate:IconsLazy.user.create, IconRead:IconsLazy.user.read, IconUpdate:IconsLazy.user.update, IconDelete:IconsLazy.user.delete, },
      doctor:{ IconSearch:IconsLazy.user.search, IconCreate:IconsLazy.user.create, IconRead:IconsLazy.user.read, IconUpdate:IconsLazy.user.update, IconDelete:IconsLazy.user.delete, },
      consultorio:{ IconSearch:IconsLazy.home.search, IconCreate:IconsLazy.home.create, IconRead:IconsLazy.home.read, IconUpdate:IconsLazy.home.update, IconDelete:IconsLazy.home.delete, },
      tratamiento:{ IconSearch:IconsLazy.filter.search, IconCreate:IconsLazy.filter.create, IconRead:IconsLazy.syringe.read, IconUpdate:IconsLazy.filter.update, IconDelete:IconsLazy.filter.delete, },
      especialidad:{ IconSearch:IconsLazy.hearth.search, IconCreate:IconsLazy.hearth.create, IconRead:IconsLazy.especialidad.read, IconUpdate:IconsLazy.hearth.update, IconDelete:IconsLazy.hearth.delete, },
  }), [] );

  const IconCreate = IconsCrud[classType].IconCreate;
  const IconSearch = IconsCrud[classType].IconSearch;

    // 👇 Props de QueryItem memorizados para que no cambien entre renders
  const searchItemProps = useMemo(() => ({ classType:classType, Icon:IconSearch, items:keys, queries, setQueries, className:'float-end pb-3 me-0 smooth w-100', setOpen }), [IconSearch, classType, keys, queries, setQueries]);
  const createItemProps = useMemo(() => ({ classType:classType, Icon:IconCreate, objectHook, setOpen }), [IconCreate, classType, objectHook, setOpen]);

  // 👇 Componentes del CRUD memorizados
  const components = useMemo(() => ({
      search: <QueryItem {...searchItemProps} />,
      create: <CreateItem {...createItemProps} />,
  }), [createItemProps, searchItemProps]);

  // 👇 Hace scroll-lock solo cuando cambia 'open'
  useEffect(() => {
      if (open) { document.body.classList.add('noScroll'); } 
      else { document.body.classList.remove('noScroll'); }
      return () => document.body.classList.remove('noScroll'); // cleanup
  }, [open]);
  
  if (process.env.NODE_ENV === 'development') console.log('[Crud Items 🟠]');

  return (
    <div className="App">
      <Suspense fallback={null}>
        <h5 className="main-color mt-4 mb-4">{title}</h5>

        {/* 👇 Buttons */}
        <div className='d-flex justify-content-center mb-2 gap-2'>
          <button className='form-control iconBtn py-0 py-sm-1 bg-transparent w-25' onClick={()=>setOpen('search')}><IconSearch width={iconWidth} height={iconHeight} strokeWidth={iconStrokeWidth} className={'main-color jumpHover'}/></button>
          <button className='form-control iconBtn py-0 py-sm-1 bg-transparent w-25' onClick={()=>setOpen('create')}><IconCreate width={iconWidth} height={iconHeight} strokeWidth={iconStrokeWidth} className={'main-color jumpHover'}/></button>
        </div>

        <QueryItems classType={classType} Icons={IconsCrud} objectHook={objectHook} />
        
        {/* <PaginationBar currentPage={pagination.currentPage} totalPages={pagination.totalPages} goToPage={goToPage} goPrev={goPrev} goNext={goNext} /> */}

        {/* 👇 Modal con portal */}
        { open && createPortal( <div id="modal">{ components[open] }</div>, document.body ) }
      </Suspense>
    </div>
  );
};

export default memo(CrudItems);