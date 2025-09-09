import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from "../useFetch.js";
import { getPacientesFiltered } from "../../components/selectors/getPacientesFiltered.js";
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_PACIENTES;

export const usePaciente = ({ initialValues={ nombre:'', apellido:'', identificacion:'', genero:'', eps:'' } }) => {
  const { alert } = useAlertContext();

  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');
  const [apellido, setApellido] = useState(initialValues.apellido || '');
  const [identificacion, setIdentificacion] = useState(initialValues.identificacion || '');
  const [genero, setGenero] = useState(initialValues.genero || '');
  const [eps, setEps] = useState(initialValues.eps || '');

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setNombre('');
    setApellido('');
    setIdentificacion('');
    setGenero('');
    setEps('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:"nombre", value:nombre, type:"search", handleChange:(v) => setNombre(decode(v)), placeholder:'Nombre' },
    { key:"apellido", value:apellido, type:"search", handleChange:(v) => setApellido(decode(v)), placeholder:'Apellido' },
    { key:"identificacion", value:identificacion, type:"number", handleChange:(v) => setIdentificacion(decode(v)), placeholder:'Identificación' },
    { key:"genero", value:genero, type:"dropdown", handleChange:(v) => setGenero(decode(v)), placeholder:'Género' },
    { key:"eps", value:eps, type:"dropdown", handleChange:(v) => setEps(decode(v)), placeholder:'Eps' },
  ], [nombre, apellido, identificacion, genero, eps]);

  // --- Object ---
  const dataObject = { nombre:'', apellido:'', identificacion:'', genero:'', eps:'' }
  
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
  const [queries, setQueries] = useState(["", "", "", "", "", ""]);
  const [queryCode, queryName, queryLastname, queryIdentification, queryGender, queryEps] = queries;
  
  const [arrayFiltered, setArrayFiltered] = useState([]);
  useEffect(() => {
    setArrayFiltered( getPacientesFiltered({ array, code:queryCode, name:queryName, lastname:queryLastname, identification:queryIdentification, gender:queryGender, eps:queryEps }) );
  }, [array, queryCode, queryName, queryLastname, queryIdentification, queryGender, queryEps]);

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, itemsPerPage]);
  
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

    const valueA = a.paciente[config.key];
    const valueB = b.paciente[config.key];

    return config.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA); 
  }, [sortBy, sortConfig]);

  /** ---------- RETURN ---------- */
  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    resetState,
    data:{ queries, setQueries, arrayFiltered, setArrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy },
  };
};
export default usePaciente;