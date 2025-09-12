import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from '../useFetch.js';
import { getTratamientosFiltered } from '../../components/selectors/getTratamientosFiltered.js';

const urlApi = process.env.REACT_APP_API_TRATAMIENTOS;

export const useTratamiento = ({ initialValues={ especialidad:'', consultorio:'', doctor:'' } }) => {
  const { alert } = useAlertContext();

  // --- State ---
  const [especialidad, setEspecialidad] = useState(initialValues.especialidad || '');
  const [consultorio, setConsultorio] = useState(initialValues.consultorio || '');
  const [doctor, setDoctor] = useState(initialValues.doctor || '');

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setEspecialidad('');
    setConsultorio('');
    setDoctor('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:'especialidad', value:especialidad, type:"dropdown", handleChange:(value) => setEspecialidad(value), placeholder:'Especialidad' },
    { key:'consultorio', value:consultorio, type:"dropdown", handleChange:(value) => setConsultorio(value), placeholder:'Consultorio' },
    { key:'doctor', value:doctor, type:"dropdown", handleChange:(value) => setDoctor(value), placeholder:'Doctor' },
  ], [especialidad, consultorio, doctor]);

  // --- Object ---
  const dataObject = { especialidad:'', consultorio:'', doctor:'' }

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
  const [queries, setQueries] = useState(["", "", "", ""]);
  const [queryCode, querySpecialty, queryConsultoryRoom, queryDoctor] = queries;

  const [arrayFiltered, setArrayFiltered] = useState([]);
  useEffect(() => {
    setArrayFiltered( getTratamientosFiltered({array, code:queryCode, specialty:querySpecialty, consultoryRoom:queryConsultoryRoom, doctor:queryDoctor }) );
  }, [array, queryCode, querySpecialty, queryConsultoryRoom, queryDoctor]);

  // --- SORT ---
  const [sortBy, setSortBy] = useState(0);

  const sortConfig = useMemo(() => {                // 👈 Genera la configuración de ordenamiento
    const fields =  state.map(({ key }) => key);
    return fields.flatMap(field => [{ key: field, order: "asc" }, { key: field, order: "desc" }]); 
  }, [state]);

  const SortByProperty = useCallback((a, b) => {    // 👈 Función memorizada de comparación en base a sortBy
    const config = sortConfig[sortBy - 1];          // 👈 -1 porque sortBy empieza en 1
    if (!config) return 0;

    const valueA = a.tratamiento[config.key];
    const valueB = b.tratamiento[config.key];

    return config.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA); 
  }, [sortBy, sortConfig]);

  const data = useMemo(() => ({ queries, setQueries, arrayFiltered, setArrayFiltered }), [queries, arrayFiltered]);
  const sort = useMemo(() => ({ SortByProperty, setSortBy }), [SortByProperty]);

  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    resetState,
    data,
    sort,
  };
};
export default useTratamiento;