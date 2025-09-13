import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from "../useFetch.js";
import { getDoctoresFiltered } from "../../components/selectors/getDoctoresFiltered.js";

const urlApi = process.env.REACT_APP_API_DOCTORES;

export const useDoctor = ({ initialValues={ nombre:'', apellido:'', identificacion:'', genero:'', especialidad:'' } }) => {
  const { alert } = useAlertContext();
  
  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');
  const [apellido, setApellido] = useState(initialValues.apellido || '');
  const [identificacion, setIdentificacion] = useState(initialValues.identificacion || '');
  const [genero, setGenero] = useState(initialValues.genero || '');
  const [especialidad, setEspecialidad] = useState(initialValues.especialidad || '');

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setNombre('');
    setApellido('');
    setIdentificacion('');
    setGenero('');
    setEspecialidad('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:"nombre", value:nombre, type:"search", handleChange:(value) => setNombre(value), placeholder:'Nombre' },
    { key:"apellido", value:apellido, type:"search", handleChange:(value) => setApellido(value), placeholder:'Apellido' },
    { key:"identificacion", value:identificacion, type:"number", handleChange:(value) => setIdentificacion(value) , placeholder:'Identificación'},
    { key:"genero", value:genero, type:"dropdown", handleChange:(value) => setGenero(value), placeholder:'Género' },
    { key:"especialidad", value:especialidad, type:"dropdown", handleChange:(value) => setEspecialidad(value), placeholder:'Especialidad' },
  ], [nombre, apellido, identificacion, genero, especialidad]);

  // --- Object ---
  const dataObject = { nombre:'', apellido:'', identificacion:'', genero:'', especialidad:'' }

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
  const [queryCode, queryName, queryLastname, queryIdentification, queryGender, querySpeciality] = queries;

  const memoFiltered = useMemo(() => {
    return getDoctoresFiltered({ array, code:queryCode, name:queryName, lastname:queryLastname, identification:queryIdentification, gender:queryGender, speciality:querySpeciality });
  }, [array, queryCode, queryName, queryLastname, queryIdentification, queryGender, querySpeciality]);

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

    const valueA = a.doctor[config.key];
    const valueB = b.doctor[config.key];

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
export default useDoctor;