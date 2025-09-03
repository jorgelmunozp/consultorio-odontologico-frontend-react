import { useState, useMemo, useEffect } from "react";
import { Alert } from '../../components/alert/Alert.js';
import { useFetch } from '../useFetch.js';
import { getEspecialidadesFiltered } from '../../components/selectors/getEspecialidadesFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_ESPECIALIDADES;

export function useEspecialidad(initialValues={ nombre:'' }) {
  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');

  const state = [
    { key: 'nombre', value: nombre, type: 'text', handleChange: (value) => setNombre(decode(value)) }
  ];

  // --- Object ---
  const dataObject = { nombre:'' }

  // --- Titles ---
  const titles = state.map(param => ({
    title: param.key.charAt(0).toUpperCase() + param.key.slice(1),
    type: param.type
  }));
  const placeholders = titles.map(item => item.title);

  // --- Data (fetch + queries + pagination) ---
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      Alert({ type: 'error', title: 'Error en la conexión con la base de datos' }).launch();
    }
  }, [arrayFetch]);

  const array = useMemo(() => {
   return ( arrayFetch.data && JSON.stringify(arrayFetch.data).length !== (0 || undefined)) ? arrayFetch.data : []
  }, [arrayFetch.data]);

  // Queries
  const [queryCode, setQueryCode] = useState('');
  const [queryName, setQueryName] = useState('');

  const queries = [queryCode, queryName];
  const setQueries = [setQueryCode, setQueryName];

  const arrayFiltered = useMemo(() =>
    getEspecialidadesFiltered(array, queryCode, queryName),
    [array, queryCode, queryName]
  );

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, 10]);

  const numPages = Math.floor(arrayFiltered.length / itemsPerPage);
  const resPages = arrayFiltered.length % itemsPerPage;

  let indexPages = [];
  let activePage = [true];
  if (resPages !== 0) {
    for (let i = 0; i <= numPages; i++) {
      indexPages.push(i);
      if (i < 0) activePage.push(false);
    }
  } else {
    for (let i = 0; i < numPages; i++) {
      indexPages.push(i);
      if (i < 0) activePage.push(false);
    }
  }
  const [activePages, setActivePages] = useState(activePage);

  // --- SORT ---
  const [sortBy, setSortBy] = useState(0);
  let SortByProperty = () => {};
  switch (sortBy) {
    case 1: SortByProperty = (a, b) => a.id - b.id; break;
    case 2: SortByProperty = (a, b) => b.id - a.id; break;
    case 3: SortByProperty = (a, b) => a.especialidad.nombre.localeCompare(b.especialidad.nombre); break;
    case 4: SortByProperty = (a, b) => b.especialidad.nombre.localeCompare(a.especialidad.nombre); break;
    default: break;
  }

  return {
    api: urlApi,
    dataObject,
    titles,
    placeholders,
    state,
    data: { queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort: { SortByProperty, setSortBy }
  };
}
export default useEspecialidad;