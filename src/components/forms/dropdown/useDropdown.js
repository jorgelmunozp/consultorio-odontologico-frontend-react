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
  
  const urlApi = useMemo(() => apis[classType] ?? "", [classType]);   // 👈 Memoriza la URL para evitar recrearla en cada render
  const { data, status } = useFetch(urlApi);

  useEffect(() => {
    if (status >= 400) { alert({ type:'error', title:'Error en la conexión con la base de datos', buttons:1 }) }
  }, [status, alert]);

  const array = useMemo(() => { return Array.isArray(data) ? data : [] }, [data]);

  // 👇 Pagination
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [indexPage, setIndexPage] = useState([0, 5]);

  const indexPages = useMemo(() => {
    const totalPages = Math.ceil(array.length / itemsPerPage);
    return Array.from({ length: totalPages }, (_, i) => i) 
  }, [array.length, itemsPerPage]);  // 👈 Calcula páginas de forma eficiente y memorizada

  const [activePages, setActivePages] = useState(() => indexPages.map((_, i) => i === 0));    // 👈 Estado inicial de páginas activas basado en indexPages
  useEffect(() => { setActivePages(indexPages.map((_, i) => i === 0)) }, [indexPages]);       // 👈 Sincroniza activePages si cambia indexPages

  // 👇 Retorno del hook
  return {
    array,
    pagination: { itemsPerPage, indexPage, activePages, indexPages, setIndexPage, setActivePages, setItemsPerPage, },
  };
}
export default useDropdown;