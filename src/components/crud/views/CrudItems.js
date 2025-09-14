import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import { createPortal } from 'react-dom';
import { useCrudFactory } from '../../../hooks/useCrudFactory.js';

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
const QueryItem = lazy(() => import("../QueryItem.js"));

export const CrudItems = ({ classType, title = "Registros" }) => {
  const [open, setOpen] = useState(false);

  const objectHook = useCrudFactory({ classType });
  
  // usamos useMemo para no recrear este objeto en cada render
  const IconsCrud = useMemo( () => ({
      cita: {
        IconSearch:IconsLazy.calendar.search,
        IconCreate:IconsLazy.calendar.create,
        IconRead:IconsLazy.calendar.read,
        IconUpdate:IconsLazy.calendar.update,
        IconDelete:IconsLazy.calendar.delete,
      },
      paciente:{
        IconSearch:IconsLazy.user.search,
        IconCreate:IconsLazy.user.create,
        IconRead:IconsLazy.user.read,
        IconUpdate:IconsLazy.user.update,
        IconDelete:IconsLazy.user.delete,
      },
      doctor:{
        IconSearch:IconsLazy.user.search,
        IconCreate:IconsLazy.user.create,
        IconRead:IconsLazy.user.read,
        IconUpdate:IconsLazy.user.update,
        IconDelete:IconsLazy.user.delete,
      },
      consultorio:{
        IconSearch:IconsLazy.home.search,
        IconCreate:IconsLazy.home.create,
        IconRead:IconsLazy.home.read,
        IconUpdate:IconsLazy.home.update,
        IconDelete:IconsLazy.home.delete,
      },
      tratamiento:{
        IconSearch:IconsLazy.filter.search,
        IconCreate:IconsLazy.filter.create,
        IconRead:IconsLazy.syringe.read,
        IconUpdate:IconsLazy.filter.update,
        IconDelete:IconsLazy.filter.delete,
      },
      especialidad:{
        IconSearch:IconsLazy.hearth.search,
        IconCreate:IconsLazy.hearth.create,
        IconRead:IconsLazy.especialidad.read,
        IconUpdate:IconsLazy.hearth.update,
        IconDelete:IconsLazy.hearth.delete,
      },
  }), [] );

  const IconCreate = IconsCrud[classType].IconCreate;

  // 👇 Componentes del CRUD memorizados
  const components = useMemo(() => ({
      create: <CreateItem classType={classType} Icon={IconCreate} objectHook={objectHook} setOpen={setOpen} />,
  }), [classType, IconCreate, objectHook, setOpen]);

  // 👇 Hace scroll-lock solo cuando cambia 'open'
  useEffect(() => {
      if (open) { document.body.classList.add('noScroll'); } 
      else { document.body.classList.remove('noScroll'); }
      return () => document.body.classList.remove('noScroll'); // cleanup
  }, [open]);
  

  return (
    <div className="App">
      <Suspense fallback={null}>
        <h5 className="main-color fs-sm-2 mt-4 mb-4">{title}</h5>

        <button className='border-0 bg-transparent queryBtn main-color' onClick={()=>setOpen('create')}><IconCreate width={'1.5'} height={'1.5'} /></button>

        <QueryItem
          classType={classType}
          Icons={IconsCrud}
          objectHook={objectHook}
        />
        {/* 👇 Modal con portal */}
        { open && createPortal( <div id="modal">{ components[open] }</div>, document.body ) }
      </Suspense>
    </div>
  );
};

export default CrudItems;
