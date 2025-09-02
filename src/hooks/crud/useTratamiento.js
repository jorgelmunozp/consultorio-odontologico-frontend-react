import { useState, useMemo, useEffect } from "react";
import { Alert } from '../../components/alert/Alert.js';
import { useFetch } from '../useFetch.js';
import { getTratamientosFiltered } from '../../components/selectors/getTratamientosFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_TRATAMIENTOS;

export const useTratamiento = ({ esp = '', cons = '', doc = '' } = {}) => {
  /** ---------- TITLES ---------- */
  const getTitles = (state) => {
    let titles = state.map((parameter) => ({
      title: parameter.key.charAt(0).toUpperCase() + parameter.key.slice(1),
      type: parameter.type,
    }));

    let placeholders = titles.map((item) => item.title);
    return { titles, placeholders };
  };

  /** ---------- STATE ---------- */
  const [especialidad, setEspecialidad] = useState(esp);
  const [consultorio, setConsultorio] = useState(cons);
  const [doctor, setDoctor] = useState(doc);

  const state = [
    {
      key: 'especialidad',
      value: especialidad,
      type: "dropdown",
      handleChange: (value) => setEspecialidad(decode(value)),
    },
    {
      key: 'consultorio',
      value: consultorio,
      type: "dropdown",
      handleChange: (value) => setConsultorio(decode(value)),
    },
    {
      key: 'doctor',
      value: doctor,
      type: "dropdown",
      handleChange: (value) => setDoctor(decode(value)),
    },
  ];

  const { titles, placeholders } = getTitles(state);

  /** ---------- DATA ---------- */
  const arrayFetch = useFetch(urlApi);

  useEffect(() => {
    if (arrayFetch.status >= 400) {
      Alert({
        type: 'error',
        title: 'Error en la conexión con la base de datos',
      }).launch();
    }
  }, [arrayFetch]);

  const array = useMemo(() => {
    return JSON.stringify(arrayFetch.data) &&
      JSON.stringify(arrayFetch.data).length !== (0 || undefined)
      ? arrayFetch.data
      : [];
  }, [arrayFetch.data]);

  // Queries
  const [queryCode, setQueryCode] = useState('');
  const [querySpecialty, setQuerySpecialty] = useState('');
  const [queryConsultoryRoom, setQueryConsultoryRoom] = useState('');
  const [queryDoctor, setQueryDoctor] = useState('');
  const queries = [queryCode, querySpecialty, queryConsultoryRoom, queryDoctor];
  const setQueries = [
    setQueryCode,
    setQuerySpecialty,
    setQueryConsultoryRoom,
    setQueryDoctor,
  ];

  const arrayFiltered = useMemo(
    () =>
      getTratamientosFiltered(
        array,
        queryCode,
        querySpecialty,
        queryConsultoryRoom,
        queryDoctor
      ),
    [array, queryCode, querySpecialty, queryConsultoryRoom, queryDoctor]
  );

  // Pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, itemsPerPage]);
  const numPages = Math.floor(arrayFiltered.length / itemsPerPage);
  const resPages = arrayFiltered.length % itemsPerPage;

  let indexPages = [];
  let activePage = [true];
  if (resPages !== 0) {
    for (let i = 0; i <= numPages; i++) {
      indexPages.push(i);
      if (i < 0) {
        activePage.push(false);
      }
    }
  } else if (resPages === 0) {
    for (let i = 0; i < numPages; i++) {
      indexPages.push(i);
      if (i < 0) {
        activePage.push(false);
      }
    }
  }
  const [activePages, setActivePages] = useState(activePage);

  const data = {
    queries,
    setQueries,
    arrayFiltered,
    indexPage,
    itemsPerPage,
    activePages,
    indexPages,
    setIndexPage,
    setActivePages,
  };

  /** ---------- SORT ---------- */
  const [sortBy, setSortBy] = useState(0);
  let SortByProperty = () => {};
  switch (sortBy) {
    case 1:
      SortByProperty = (a, b) => a.id - b.id;
      break;
    case 2:
      SortByProperty = (a, b) => b.id - a.id;
      break;
    case 3:
      SortByProperty = (a, b) =>
        a.tratamiento.especialidad.localeCompare(b.tratamiento.especialidad);
      break;
    case 4:
      SortByProperty = (a, b) =>
        b.tratamiento.especialidad.localeCompare(a.tratamiento.especialidad);
      break;
    case 5:
      SortByProperty = (a, b) =>
        a.tratamiento.consultorio.localeCompare(b.tratamiento.consultorio);
      break;
    case 6:
      SortByProperty = (a, b) =>
        b.tratamiento.consultorio.localeCompare(a.tratamiento.consultorio);
      break;
    case 7:
      SortByProperty = (a, b) =>
        a.tratamiento.doctor.localeCompare(b.tratamiento.doctor);
      break;
    case 8:
      SortByProperty = (a, b) =>
        b.tratamiento.doctor.localeCompare(a.tratamiento.doctor);
      break;
    default:
      SortByProperty = () => {};
      break;
  }

  const sort = { SortByProperty, setSortBy };

  /** ---------- RETURN ---------- */
  return {
    api: urlApi,
    titles,
    placeholders,
    state,
    data,
    sort,
  };
};
export default useTratamiento;