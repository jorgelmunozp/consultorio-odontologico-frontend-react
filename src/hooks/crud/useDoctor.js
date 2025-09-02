import { useState, useMemo, useEffect } from "react";
import { Alert } from "../../components/alert/Alert.js";
import { useFetch } from "../useFetch.js";
import { getDoctoresFiltered } from "../../components/selectors/getDoctoresFiltered.js";
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_DOCTORES;

export const useDoctor = ({ initialValues={ nombre:'', apellido:'', identificacion:'', genero:'', especialidad:'' } }) => {
  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');
  const [apellido, setApellido] = useState(initialValues.apellido || '');
  const [identificacion, setIdentificacion] = useState(initialValues.identificacion || '');
  const [genero, setGenero] = useState(initialValues.genero || '');
  const [especialidad, setEspecialidad] = useState(initialValues.especialidad || '');

  const state = [
    { key: "nombre", value: nombre, type: "text", handleChange: (v) => setNombre(decode(v)) },
    { key: "apellido", value: apellido, type: "text", handleChange: (v) => setApellido(decode(v)) },
    { key: "identificacion", value: identificacion, type: "number", handleChange: (v) => setIdentificacion(decode(v)) },
    { key: "genero", value: genero, type: "dropdown", handleChange: (v) => setGenero(decode(v)) },
    { key: "especialidad", value: especialidad, type: "dropdown", handleChange: (v) => setEspecialidad(decode(v)) },
  ];

   // --- Titles ---
  const titles = state.map((parameter) => ({
    title: parameter.key.charAt(0).toUpperCase() + parameter.key.slice(1),
    type: parameter.type,
  }));
  const placeholders = titles.map((item) => item.title);

  // --- Data (fetch + queries + pagination) ---
  const arrayFetch = useFetch(urlApi);
  useEffect(() => {
    if (arrayFetch.status >= 400) {
      Alert({ type: "error", title: "Error en la conexión con la base de datos" }).launch();
    }
  }, [arrayFetch]);

  const array = useMemo(() => {
    return (arrayFetch.data && JSON.stringify(arrayFetch.data).length !== (0 || undefined)) ? arrayFetch.data : []
  }, [arrayFetch.data]);

  // queries
  const [queryCode, setQueryCode] = useState("");
  const [queryName, setQueryName] = useState("");
  const [queryLastname, setQueryLastname] = useState("");
  const [querySpeciality, setQuerySpeciality] = useState("");

  const queries = [queryCode, queryName, queryLastname, querySpeciality];
  const setQueries = [setQueryCode, setQueryName, setQueryLastname, setQuerySpeciality];

  const arrayFiltered = useMemo(
    () => getDoctoresFiltered(array, queryCode, queryName, queryLastname, querySpeciality),
    [array, queryCode, queryName, queryLastname, querySpeciality]
  );

  // pagination
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [indexPage, setIndexPage] = useState([0, itemsPerPage]);
  const numPages = Math.floor(arrayFiltered.length / itemsPerPage);
  const resPages = arrayFiltered.length % itemsPerPage;

  let indexPages = [];
  let activePage = [true];
  if (resPages !== 0) {
    for (let i = 0; i <= numPages; i++) {
      indexPages.push(i);
      if (i < 0) activePage.push(false);
    }
  } else if (resPages === 0) {
    for (let i = 0; i < numPages; i++) {
      indexPages.push(i);
      if (i < 0) activePage.push(false);
    }
  }
  const [activePages, setActivePages] = useState(activePage);

  // --- SORT ---
  const [sortBy, setSortBy] = useState(0);
  let SortByProperty = () => {};

  switch (sortBy) {
    case 1: SortByProperty = (a, b) => a.id - b.id; break;
    case 2: SortByProperty = (a, b) => b.id - a.id; break;
    case 3: SortByProperty = (a, b) => a.doctor.nombre.localeCompare(b.doctor.nombre); break;
    case 4: SortByProperty = (a, b) => b.doctor.nombre.localeCompare(a.doctor.nombre); break;
    case 5: SortByProperty = (a, b) => a.doctor.apellido.localeCompare(b.doctor.apellido); break;
    case 6: SortByProperty = (a, b) => b.doctor.apellido.localeCompare(a.doctor.apellido); break;
    case 7: SortByProperty = (a, b) => a.doctor.identificacion.localeCompare(b.doctor.identificacion); break;
    case 8: SortByProperty = (a, b) => b.doctor.identificacion.localeCompare(a.doctor.identificacion); break;
    case 9: SortByProperty = (a, b) => a.doctor.genero.localeCompare(b.doctor.genero); break;
    case 10: SortByProperty = (a, b) => b.doctor.genero.localeCompare(a.doctor.genero); break;
    case 11: SortByProperty = (a, b) => a.doctor.especialidad.localeCompare(b.doctor.especialidad); break;
    case 12: SortByProperty = (a, b) => b.doctor.especialidad.localeCompare(a.doctor.especialidad); break;
    default: break;
  }

  /** ---------- RETURN ---------- */
  return {
    api: urlApi,
    titles,
    placeholders,
    state,
    data: { queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort: { SortByProperty, setSortBy },
  };
};
export default useDoctor;