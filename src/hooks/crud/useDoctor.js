import { useState, useMemo, useEffect } from "react";
import { useAlertContext } from "../../alerts/AlertContext.js";
import { useFetch } from "../useFetch.js";
import { getDoctoresFiltered } from "../../components/selectors/getDoctoresFiltered.js";
import { jwtDecode as decode } from "jwt-decode";

const urlApi = process.env.REACT_APP_API_DOCTORES;

export const useDoctor = ({ initialValues={ nombre:'', apellido:'', identificacion:'', genero:'', especialidad:'' } }) => {
  const { alert } = useAlertContext();
  
  // --- State ---
  const [nombre, setNombre] = useState(initialValues.nombre || '');
  const [apellido, setApellido] = useState(initialValues.apellido || '');
  const [identificacion, setIdentificacion] = useState(initialValues.identificacion || '');
  const [genero, setGenero] = useState(initialValues.genero || '');
  const [especialidad, setEspecialidad] = useState(initialValues.especialidad || '');

  const state = [
    { key:"nombre", value:nombre, type:"search", handleChange:(v) => setNombre(decode(v)), placeholder:'Nombre' },
    { key:"apellido", value:apellido, type:"search", handleChange:(v) => setApellido(decode(v)), placeholder:'Apellido' },
    { key:"identificacion", value:identificacion, type:"number", handleChange:(v) => setIdentificacion(decode(v)) , placeholder:'Identificación'},
    { key:"genero", value:genero, type:"dropdown", handleChange:(v) => setGenero(decode(v)), placeholder:'Género' },
    { key:"especialidad", value:especialidad, type:"dropdown", handleChange:(v) => setEspecialidad(decode(v)), placeholder:'Especialidad' },
  ];

  // --- Object ---
  const dataObject = { nombre:'', apellido:'', identificacion:'', genero:'', especialidad:'' }

   // --- Titles ---
  const keys = state.map((parameter) => ({
    key:parameter.placeholder,
    type:parameter.type,
  }));
  const placeholders = keys.map((item) => item.key);

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
    api:urlApi,
    dataObject,
    keys,
    placeholders,
    state,
    data:{ queries, setQueries, arrayFiltered, indexPage, itemsPerPage, activePages, indexPages, setIndexPage, setActivePages },
    sort:{ SortByProperty, setSortBy },
  };
};
export default useDoctor;