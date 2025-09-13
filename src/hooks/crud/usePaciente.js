import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from "../useFetch.js";
import { getPacientesFiltered } from "../../components/selectors/getPacientesFiltered.js";

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
    { key:"nombre", value:nombre, type:"search", handleChange:(value) => setNombre(value), placeholder:'Nombre' },
    { key:"apellido", value:apellido, type:"search", handleChange:(value) => setApellido(value), placeholder:'Apellido' },
    { key:"identificacion", value:identificacion, type:"number", handleChange:(value) => setIdentificacion(value), placeholder:'Identificación' },
    { key:"genero", value:genero, type:"dropdown", handleChange:(value) => setGenero(value), placeholder:'Género' },
    { key:"eps", value:eps, type:"dropdown", handleChange:(value) => setEps(value), placeholder:'Eps' },
  ], [nombre, apellido, identificacion, genero, eps]);

  // --- Object ---
  const dataObject = { nombre:'', apellido:'', identificacion:'', genero:'', eps:'' }
  
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
  const [queries, setQueries] = useState(["", "", "", "", "", ""]);
  const [queryCode, queryName, queryLastname, queryIdentification, queryGender, queryEps] = queries;
  
  const memoFiltered = useMemo(() => {
    return getPacientesFiltered({ array, code:queryCode, name:queryName, lastname:queryLastname, identification:queryIdentification, gender:queryGender, eps:queryEps });
  }, [array, queryCode, queryName, queryLastname, queryIdentification, queryGender, queryEps]);

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

    const valueA = a.paciente[config.key];
    const valueB = b.paciente[config.key];

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
};
export default usePaciente;