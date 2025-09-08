import { useState, useEffect, useMemo } from "react";
import { useAlertContext } from "../../../alerts/AlertContext.js";
import { useFetch } from "../../../hooks/useFetch.js";

const apis = {
  paciente: process.env.REACT_APP_API_PACIENTES,
  doctor: process.env.REACT_APP_API_DOCTORES,
  consultorio: process.env.REACT_APP_API_CONSULTORIOS,
  tratamiento: process.env.REACT_APP_API_TRATAMIENTOS,
  eps: process.env.REACT_APP_API_EPSS,
  genero: process.env.REACT_APP_API_GENEROS,
  especialidad: process.env.REACT_APP_API_ESPECIALIDADES,
};

export const useDropdown = ({ classType='' }) => {
  const { alert } = useAlertContext();
  
  const urlApi = apis[classType] || "";
  const { data, status } = useFetch(urlApi);

  useEffect(() => {
    if (status >= 400) {
      alert({ type:'error', title:'Error en la conexión con la base de datos', buttons:1 });
    }
  }, [status]);

  const array = useMemo(() => {
    return Array.isArray(data) ? data : [];
  }, [data]);

  // ✅ Pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [indexPage, setIndexPage] = useState([0, 5]);

  const numPages = Math.floor(array.length / itemsPerPage);
  const resPages = array.length % itemsPerPage;

  let indexPages = [];
  if (resPages !== 0) { 
    for (let i = 0; i <= numPages; i++) { indexPages.push(i); }
  } else {
    for (let i = 0; i < numPages; i++) { indexPages.push(i); }
  }

  const [activePages, setActivePages] = useState(
    indexPages.map((_, i) => i === 0)
  );

  // ✅ Retorno del hook
  return {
    array,
    pagination: { itemsPerPage, indexPage, activePages, indexPages, setIndexPage, setActivePages, setItemsPerPage, },
  };
}
export default useDropdown;