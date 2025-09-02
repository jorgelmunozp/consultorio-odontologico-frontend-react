import { useState, useMemo, useEffect } from "react";
import { Alert } from "../../components/alert/Alert.js";
import { useFetch } from "../useFetch.js";
import { getPacientesFiltered } from "../../components/selectors/getPacientesFiltered.js";
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_PACIENTES;

export const usePaciente = ({ initialValues={ nombre:'', apellido:'', identificacion:'', genero:'', eps:'' } }) => {
  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');
  const [apellido, setApellido] = useState(initialValues.apellido || '');
  const [identificacion, setIdentificacion] = useState(initialValues.identificacion || '');
  const [genero, setGenero] = useState(initialValues.genero || '');
  const [eps, setEps] = useState(initialValues.eps || '');

  const state = [
    { key: "nombre", value: nombre, type: "text", handleChange: (v) => setNombre(decode(v)) },
    { key: "apellido", value: apellido, type: "text", handleChange: (v) => setApellido(decode(v)) },
    { key: "identificacion", value: identificacion, type: "number", handleChange: (v) => setIdentificacion(decode(v)) },
    { key: "genero", value: genero, type: "dropdown", handleChange: (v) => setGenero(decode(v)) },
    { key: "eps", value: eps, type: "dropdown", handleChange: (v) => setEps(decode(v)) },
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
    return (arrayFetch.data && JSON.stringify(arrayFetch.data).length !== (0 || undefined)) ? arrayFetch.data : [];
  }, [arrayFetch.data]);

  // Queries
  const [queryCode, setQueryCode] = useState("");
  const [queryName, setQueryName] = useState("");
  const [queryLastname, setQueryLastname] = useState("");
  const [queryIdentification, setQueryIdentification] = useState("");
  const [queryGender, setQueryGender] = useState("");
  const [queryEps, setQueryEps] = useState("");

  const queries = [queryCode, queryIdentification, queryName, queryLastname, queryGender, queryEps];
  const setQueries = [setQueryCode, setQueryIdentification, setQueryName, setQueryLastname, setQueryGender, setQueryEps];

  const arrayFiltered = useMemo(() =>
    getPacientesFiltered(array, queryCode, queryIdentification, queryName, queryLastname, queryGender, queryEps),
    [array, queryCode, queryIdentification, queryName, queryLastname, queryGender, queryEps]
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
      if (i < 0) activePage.push(false);
    }
  } else {
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
    case 3: SortByProperty = (a, b) => a.paciente.identificacion.localeCompare(b.paciente.identificacion); break;
    case 4: SortByProperty = (a, b) => b.paciente.identificacion.localeCompare(a.paciente.identificacion); break;
    case 5: SortByProperty = (a, b) => a.paciente.nombre.localeCompare(b.paciente.nombre); break;
    case 6: SortByProperty = (a, b) => b.paciente.nombre.localeCompare(a.paciente.nombre); break;
    case 7: SortByProperty = (a, b) => a.paciente.apellido.localeCompare(b.paciente.apellido); break;
    case 8: SortByProperty = (a, b) => b.paciente.apellido.localeCompare(a.paciente.apellido); break;
    case 9: SortByProperty = (a, b) => a.paciente.genero.localeCompare(b.paciente.genero); break;
    case 10: SortByProperty = (a, b) => b.paciente.genero.localeCompare(a.paciente.genero); break;
    case 11: SortByProperty = (a, b) => a.paciente.eps.localeCompare(b.paciente.eps); break;
    case 12: SortByProperty = (a, b) => b.paciente.eps.localeCompare(a.paciente.eps); break;
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
export default usePaciente;