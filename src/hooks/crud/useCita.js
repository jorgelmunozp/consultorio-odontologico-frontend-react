import { useState, useMemo, useEffect, useCallback } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from '../useFetch.js';
import { getDate } from '../../helpers/getDate.js';
import { getTime } from '../../helpers/getTime.js';
import { getCitasFiltered } from '../../components/selectors/getCitasFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_CITAS;

export const useCita = ({ initialValues={ paciente:'', consultorio:'', doctor:'', tratamiento:'' } }) => {
  const { alert } = useAlertContext();
  
  // --- State ---
  const [paciente, setPaciente] = useState(initialValues.paciente || '');
  const [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
  const [hora, setHora] = useState(getTime);
  const [consultorio, setConsultorio] = useState(initialValues.consultorio || '');
  const [doctor, setDoctor] = useState(initialValues.doctor || '');
  const [tratamiento, setTratamiento] = useState(initialValues.tratamiento || '');

  // Reset state encapsulado
  const resetState = useCallback(() => {
    setPaciente('');
    setFecha(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
    setHora(getTime);
    setConsultorio('');
    setDoctor('');
    setTratamiento('');
  }, []);

  // State unificado para inputs
  const state = useMemo(() => [
    { key:'paciente', value:paciente, type:"dropdown", handleChange:(value) => setPaciente(decode(value)), placeholder:'Paciente' },
    { key:'fecha', value:fecha, type:"date", handleChange:(value) => setFecha(decode(value)), placeholder:'Fecha' },
    { key:'hora', value:hora, type:"time", handleChange:(value) => setHora(decode(value)), placeholder:'Hora' },
    { key:'consultorio', value:consultorio, type:"dropdown", handleChange:(value) => setConsultorio(decode(value)), placeholder:'Consultorio' },
    { key:'doctor', value:doctor, type:"dropdown", handleChange:(value) => setDoctor(decode(value)), placeholder:'Doctor' },
    { key:'tratamiento', value:tratamiento, type:"dropdown", handleChange:(value) => setTratamiento(decode(value)), placeholder:'Tratamiento' }
  ], [paciente, fecha, hora, consultorio, doctor, tratamiento]);

  // --- Object ---
  const dataObject = { paciente:'', fecha:'', hora:'', consultorio:'', doctor:'', tratamiento:'' }

  // --- Titles ---
  const keys = useMemo(() => state.map(({ placeholder, type }) => ({ key: placeholder, type })), [state]);
  const placeholders = useMemo(() => keys.map((k) => k.key), [keys]);

  // 👇 Data (fetch + queries + pagination) ---
  // Fetch de datos
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      alert({ type: "error", title: "Error en la conexión con la base de datos", buttons: 1 });
    }
  }, [arrayFetch.status, alert]);

  const array = useMemo(() => arrayFetch.data || [], [arrayFetch.data]);

  // Queries unificadas
  const [queries, setQueries] = useState(["", "", "", "", "", "", ""]);
  const [queryCode, queryPatient, queryDate, queryTime, queryConsultoryRoom, queryDoctor, queryTreatment] = queries;
  
  const arrayFiltered = useMemo(() => getCitasFiltered({ array, code:queryCode, patient:queryPatient, date:queryDate, time:queryTime, consultoryRoom:queryConsultoryRoom, doctor:queryDoctor, treatment:queryTreatment }), [array, queryCode, queryPatient, queryDate, queryTime, queryConsultoryRoom, queryDoctor, queryTreatment] );

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, 10]);

  const totalPages = Math.ceil(arrayFiltered.length / itemsPerPage);
  const indexPages = useMemo( () => Array.from({ length: totalPages }, (_, i) => i), [totalPages] );
  const [activePages, setActivePages] = useState(() => Array(totalPages).fill(false).map((_, i) => i === 0) );    // 👈 Estado inicial: primera página activa
  useEffect(() => { setActivePages(Array(totalPages).fill(false).map((_, i) => i === 0)); }, [totalPages]);       // 👈 Recalcula al cambiar el número de páginas

  // --- Sort ---
  const [sortBy, setSortBy] = useState(0);

  const sortConfig = useMemo(() => {                // 👈 Genera la configuración de ordenamiento
    const fields =  state.map(({ key }) => key);
    return fields.flatMap(field => [{ key: field, order: "asc" }, { key: field, order: "desc" }]); 
  }, []);

  const SortByProperty = useCallback((a, b) => {    // 👈 Función memorizada de comparación en base a sortBy
    const config = sortConfig[sortBy - 1];          // 👈 -1 porque sortBy empieza en 1
    if (!config) return 0;

    const valueA = a.cita[config.key];
    const valueB = b.cita[config.key];

    return config.order === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA); 
  }, [sortBy, sortConfig]);

  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    resetState,
    data:{ queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy }
  };
}

export default useCita;