import { useState, useMemo, useEffect, useCallback } from "react";
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

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setNumero('');
    setNombre('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:'numero', value:numero, type:'number', handleChange:(value) => setNumero(decode(value)), placeholder:'Número' },
    { key:'nombre', value:nombre, type:'search', handleChange:(value) => setNombre(decode(value)), placeholder:'Nombre' }
  ], [numero, nombre]);

  // --- Object ---
  const dataObject = { numero:'', nombre:'' }

  // --- Titles ---
  const keys = useMemo(() => state.map(({ placeholder, type }) => ({ key: placeholder, type })), [state]);
  const placeholders = useMemo(() => keys.map((k) => k.key), [keys]);

  // 👇 Data (fetch + queries + pagination) ---
  // Fetch de datos
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      alert({ type:'error', title:'Error en la conexión con la base de datos', buttons:1 });
    }
  }, [arrayFetch,alert]);

  const array = useMemo(() => arrayFetch.data || [], [arrayFetch.data]);

  // Queries unificadas
  const [queries, setQueries] = useState(["", "", ""]);
  const [queryCode, queryNumber, queryName] = queries;
  
  const [arrayFiltered, setArrayFiltered] = useState([]);
  useEffect(() => {
    setArrayFiltered( getConsultoriosFiltered({ array, code:queryCode, number:queryNumber, name:queryName }) );
  }, [array, queryCode, queryNumber, queryName]);
  
  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, 10]);

  const totalPages = Math.ceil(arrayFiltered.length / itemsPerPage);
  const indexPages = useMemo( () => Array.from({ length: totalPages }, (_, i) => i), [totalPages] );
  const [activePages, setActivePages] = useState(() => Array(totalPages).fill(false).map((_, i) => i === 0) );    // 👈 Estado inicial: primera página activa
  useEffect(() => { setActivePages(Array(totalPages).fill(false).map((_, i) => i === 0)); }, [totalPages]);       // 👈 Recalcula al cambiar el número de páginas

  // --- SORT ---
  const [sortBy, setSortBy] = useState(0);

  const sortConfig = useMemo(() => {                // 👈 Genera la configuración de ordenamiento
    const fields =  state.map(({ key }) => key);
    return fields.flatMap(field => [{ key: field, order: "asc" }, { key: field, order: "desc" }]); 
  }, []);

  const SortByProperty = useCallback((a, b) => {    // 👈 Función memorizada de comparación en base a sortBy
    const config = sortConfig[sortBy - 1];          // 👈 -1 porque sortBy empieza en 1
    if (!config) return 0;

    const valueA = a.consultorio[config.key];
    const valueB = b.consultorio[config.key];

    return config.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA); 
  }, [sortBy, sortConfig]);

  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    resetState,
    data:{ queries, setQueries, arrayFiltered, setArrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy }
  };
}
export default useConsultorio;