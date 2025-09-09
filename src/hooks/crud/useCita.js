import { useState, useMemo, useEffect } from "react";
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

  const state = [
    { key:'paciente', value:paciente, type:"dropdown", handleChange:(value) => setPaciente(decode(value)), placeholder:'Paciente' },
    { key:'fecha', value:fecha, type:"date", handleChange:(value) => setFecha(decode(value)), placeholder:'Fecha' },
    { key:'hora', value:hora, type:"time", handleChange:(value) => setHora(decode(value)), placeholder:'Hora' },
    { key:'consultorio', value:consultorio, type:"dropdown", handleChange:(value) => setConsultorio(decode(value)), placeholder:'Consultorio' },
    { key:'doctor', value:doctor, type:"dropdown", handleChange:(value) => setDoctor(decode(value)), placeholder:'Doctor' },
    { key:'tratamiento', value:tratamiento, type:"dropdown", handleChange:(value) => setTratamiento(decode(value)), placeholder:'Tratamiento' }
  ];

  // --- Object ---
  const dataObject = { paciente:'', fecha:'', hora:'', consultorio:'', doctor:'', tratamiento:'' }

  // --- Titles ---
  const keys = state.map(parameter => ({
    key:parameter.placeholder,
    type:parameter.type
  }));
  const placeholders = keys.map(item => item.key);

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
  const [queryPatient, setQueryPatient] = useState('');
  const [queryDate, setQueryDate] = useState('');
  const [queryTime, setQueryTime] = useState('');
  const [queryConsultoryRoom, setQueryConsultoryRoom] = useState('');
  const [queryDoctor, setQueryDoctor] = useState('');
  const [queryTreatment, setQueryTreatment] = useState('');

  const queries = [queryCode, queryPatient, queryDate, queryTime, queryConsultoryRoom, queryDoctor, queryTreatment];
  const setQueries = [setQueryCode, setQueryPatient, setQueryDate, setQueryTime, setQueryConsultoryRoom, setQueryDoctor, setQueryTreatment];

  const arrayFiltered = useMemo(() =>
    getCitasFiltered(array, queryCode, queryPatient, queryDate, queryTime, queryConsultoryRoom, queryDoctor, queryTreatment),
    [array, queryCode, queryPatient, queryDate, queryTime, queryConsultoryRoom, queryDoctor, queryTreatment]
  );

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, 10]);

  const numPages = Math.floor(arrayFiltered.length/itemsPerPage);
  const resPages = arrayFiltered.length % itemsPerPage;

  let indexPages = [];
  let activePage = [true];
  if(resPages !== 0) {
    for(let i = 0; i <= numPages; i++) {
      indexPages.push(i);
      if(i < 0) activePage.push(false);
    }
  } else {
    for(let i = 0; i < numPages; i++) {
      indexPages.push(i);
      if(i < 0) activePage.push(false);
    }
  }
  const [activePages, setActivePages] = useState(activePage);

  // --- Sort ---
  const [sortBy, setSortBy] = useState(0);
  let SortByProperty = () => {};
  switch (sortBy) {
    case 1: SortByProperty = (a,b) => a.id - b.id; break;
    case 2: SortByProperty = (a,b) => b.id - a.id; break;
    case 3: SortByProperty = (a,b) => a.cita.paciente.localeCompare(b.cita.paciente); break;
    case 4: SortByProperty = (a,b) => b.cita.paciente.localeCompare(a.cita.paciente); break;
    case 5: SortByProperty = (a,b) => { return a.cita.fecha.localeCompare(b.cita.fecha) }; break;       // Sort by fecha up
    case 6: SortByProperty = (a,b) => { return b.cita.fecha.localeCompare(a.cita.fecha) }; break;       // Sort by fecha down
    case 7: SortByProperty = (a,b) => { return a.cita.hora.localeCompare(b.cita.hora) }; break;         // Sort by hora up
    case 8: SortByProperty = (a,b) => { return b.cita.hora.localeCompare(a.cita.hora) }; break;         // Sort by hora down
    case 9: SortByProperty = (a,b) => { return a.cita.consultorio.localeCompare(b.cita.consultorio) }; break;  // Sort by consultorio up
    case 10: SortByProperty = (a,b) => { return b.cita.consultorio.localeCompare(a.cita.consultorio) }; break; // Sort by consultorio down
    case 11: SortByProperty = (a,b) => { return a.cita.doctor.localeCompare(b.cita.doctor) }; break;    // Sort by doctor up
    case 12: SortByProperty = (a,b) => { return b.cita.doctor.localeCompare(a.cita.doctor) }; break;    // Sort by doctor down
    case 13: SortByProperty = (a,b) => { return a.cita.tratamiento.localeCompare(b.cita.tratamiento) }; break; // Sort by tratamiento up
    case 14: SortByProperty = (a,b) => { return b.cita.tratamiento.localeCompare(a.cita.tratamiento) }; break; // Sort by tratamiento down
    default: break;     
  }

  return {
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    data:{ queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy }
  };
}

export default useCita;