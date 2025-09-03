import { useState, useMemo, useEffect } from "react";
import { Alert } from '../../components/alert/Alert.js';
import { useFetch } from '../useFetch.js';
import { getDate } from '../../helpers/getDate.js';
import { getTime } from '../../helpers/getTime.js';
import { getCitasFiltered } from '../../components/selectors/getCitasFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_CITAS;

export function useCita({ initialValues={ paciente:'', consultorio:'', doctor:'', tratamiento:'' } }) {
  // --- State ---
  const [paciente, setPaciente] = useState(initialValues.paciente || '');
  const [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
  const [hora, setHora] = useState(getTime);
  const [consultorio, setConsultorio] = useState(initialValues.consultorio || '');
  const [doctor, setDoctor] = useState(initialValues.doctor || '');
  const [tratamiento, setTratamiento] = useState(initialValues.tratamiento || '');

  const state = [
    { key:'paciente', value:paciente, type:"dropdown", handleChange: (value) => setPaciente(decode(value)) },
    { key:'fecha', value:fecha, type:"date", handleChange: (value) => setFecha(decode(value)) },
    { key:'hora', value:hora, type:"time", handleChange: (value) => setHora(decode(value)) },
    { key:'consultorio', value:consultorio, type:"dropdown", handleChange: (value) => setConsultorio(decode(value)) },
    { key:'doctor', value:doctor, type:"dropdown", handleChange: (value) => setDoctor(decode(value)) },
    { key:'tratamiento', value:tratamiento, type:"dropdown", handleChange: (value) => setTratamiento(decode(value)) }
  ];

  // --- Object ---
  const dataObject = { paciente:'', fecha:'', hora:'', consultorio:'', doctor:'', tratamiento:'' }

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
      Alert({ type:'error', title:'Error en la conexión con la base de datos' }).launch();
    }
  }, [arrayFetch]);

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

export default useCita;