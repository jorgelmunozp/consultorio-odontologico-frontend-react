import { useState, useMemo, useEffect } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from '../useFetch.js';
import { getConsultoriosFiltered } from '../../components/selectors/getConsultoriosFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_CONSULTORIOS;

export const useConsultorio = ({ initialValues={ numero:'', nombre:'' } }) => {
  const { alert } = useAlertContext();

  // --- State ---
  const [numero, setNumero] = useState(initialValues.numero || '');
  const [nombre, setNombre] = useState(initialValues.nombre || '');

  const state = [
    { key:'numero', value:numero, type:'number', handleChange:(value) => setNumero(decode(value)) },
    { key:'nombre', value:nombre, type:'search', handleChange:(value) => setNombre(decode(value)) }
  ];

  // --- Object ---
  const dataObject = { numero:'', nombre:'' }

  // --- Titles ---
  const titles = state.map(param => ({
    title:param.key.charAt(0).toUpperCase() + param.key.slice(1),
    type:param.type
  }));
  const placeholders = titles.map(item => item.title);

  // --- Data (fetch + queries + pagination) ---
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      alert({ type:'error', title:'Error en la conexión con la base de datos', buttons:1 });
    }
  }, [arrayFetch,alert]);

  const array = useMemo(() => {
    return (arrayFetch.data && JSON.stringify(arrayFetch.data).length !== (0 || undefined)) ? arrayFetch.data : []
  }, [arrayFetch.data]);

  // Queries
  const [queryCode, setQueryCode] = useState('');
  const [queryNumber, setQueryNumber] = useState('');
  const [queryName, setQueryName] = useState('');

  const queries = [queryCode, queryNumber, queryName];
  const setQueries = [setQueryCode, setQueryNumber, setQueryName];

  const arrayFiltered = useMemo(() =>
    getConsultoriosFiltered(array, queryCode, queryNumber, queryName),
    [array, queryCode, queryNumber, queryName]
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
    case 3: SortByProperty = (a, b) => a.consultorio.numero - b.consultorio.numero; break;
    case 4: SortByProperty = (a, b) => b.consultorio.numero - a.consultorio.numero; break;
    case 5: SortByProperty = (a, b) => a.consultorio.nombre.localeCompare(b.consultorio.nombre); break;
    case 6: SortByProperty = (a, b) => b.consultorio.nombre.localeCompare(a.consultorio.nombre); break;
    default: break;
  }

  return {
    api:urlApi,
    dataObject,
    titles,
    placeholders,
    state,
    data:{ queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy }
  };
}
export default useConsultorio;