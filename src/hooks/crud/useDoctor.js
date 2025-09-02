import { useState, useMemo, useEffect } from "react";
import { Alert } from "../../components/alert/Alert.js";
import { useFetch } from "../useFetch.js";
import { getDoctoresFiltered } from "../../components/selectors/getDoctoresFiltered.js";
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_DOCTORES;

export const useDoctor = () => {
  /** ---------- STATE ---------- */
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [genero, setGenero] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  const state = [
    { key: "nombre", value: nombre, type: "text", handleChange: (v) => setNombre(decode(v)) },
    { key: "apellido", value: apellido, type: "text", handleChange: (v) => setApellido(decode(v)) },
    { key: "identificacion", value: identificacion, type: "number", handleChange: (v) => setIdentificacion(decode(v)) },
    { key: "genero", value: genero, type: "dropdown", handleChange: (v) => setGenero(decode(v)) },
    { key: "especialidad", value: especialidad, type: "dropdown", handleChange: (v) => setEspecialidad(decode(v)) },
  ];

  const getTitles = () => {
    let titles = state.map((parameter) => ({
      title: parameter.key.charAt(0).toUpperCase() + parameter.key.slice(1),
      type: parameter.type,
    }));

    let placeholders = titles.map((item) => item.title);
    return { titles, placeholders };
  };

  const { titles, placeholders } = getTitles();

  /** ---------- DATA ---------- */
  const arrayFetch = useFetch(urlApi);

  useEffect(() => {
    if (arrayFetch.status >= 400) {
      Alert({ type: "error", title: "Error en la conexión con la base de datos" }).launch();
    }
  }, [arrayFetch]);

  const array = useMemo(() => {
    return JSON.stringify(arrayFetch.data) &&
      JSON.stringify(arrayFetch.data).length !== (0 || undefined)
      ? arrayFetch.data
      : [];
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
    default: SortByProperty = () => {}; break;
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
export default useDoctor;