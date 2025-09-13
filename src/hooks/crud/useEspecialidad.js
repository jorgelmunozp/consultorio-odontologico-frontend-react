import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from '../useFetch.js';
import { getEspecialidadesFiltered } from '../../components/selectors/getEspecialidadesFiltered.js';

const urlApi = process.env.REACT_APP_API_ESPECIALIDADES;

export const useEspecialidad = ({ initialValues={ nombre:'' } }) => {
  const { alert } = useAlertContext();

  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setNombre('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:'nombre', value:nombre, type:'search', handleChange:(value) => setNombre(value), placeholder:'Nombre' }
  ], [nombre]);

  // --- Object ---
  const dataObject = { nombre:'' }

  // --- Titles ---
  const keys = useMemo(() => state.map(({ placeholder, type }) => ({ key: placeholder, type })), [state]);
  const placeholders = useMemo(() => keys.map((k) => k.key), [keys]);

  // 👇 Data (fetch + queries + filtering) ---
  // Data fetch
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      alert({ type:'error', title:'Error en la conexión con la base de datos', buttons:1 });
    }
  }, [arrayFetch,alert]);

  const array = useMemo(() => arrayFetch.data || [], [arrayFetch.data]);

  // Queries + Filtering
  const [queries, setQueries] = useState(["", ""]);
  const [queryCode, queryName] = queries;

  const memoFiltered = useMemo(() => {
    return getEspecialidadesFiltered({ array, code:queryCode, name:queryName });
  }, [array, queryCode, queryName]);

  const [arrayFiltered, setArrayFiltered] = useState(memoFiltered);
  useEffect(() => { setArrayFiltered(memoFiltered); }, [memoFiltered]); // 👈 Sincroniza cuando cambie memoFiltered
  
  // --- SORT ---
  const [sortBy, setSortBy] = useState(0);

  const sortConfig = useMemo(() => {                // 👈 Genera la configuración de ordenamiento
    const fields =  state.map(({ key }) => key);
    return fields.flatMap(field => [{ key: field, order: "asc" }, { key: field, order: "desc" }]); 
  }, [state]);

  const SortByProperty = useCallback((a, b) => {    // 👈 Función memorizada de comparación en base a sortBy
    const config = sortConfig[sortBy - 1];          // 👈 -1 porque sortBy empieza en 1
    if (!config) return 0;

    const valueA = a.especialidad[config.key];
    const valueB = b.especialidad[config.key];

    return config.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA); 
  }, [sortBy, sortConfig]);
  
  const data = useMemo(() => ({ queries, setQueries, arrayFiltered, setArrayFiltered }), [queries, arrayFiltered]);
  const sort = useMemo(() => ({ SortByProperty, setSortBy }), [SortByProperty]);

  const handleItems = useCallback((action, item) => {
    if (action === "create") {
      setArrayFiltered(prev => [item, ...prev]);
    } else if (action === "update") {
      setArrayFiltered(prev => prev.map(i => (i._id === item._id ? item : i)));
    } else if (action === "delete") {
      setArrayFiltered(prev => prev.filter(i => i._id !== item));
    }
  }, []);

  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    resetState,
    data,
    sort,
    handleItems
  };
}
export default useEspecialidad;