import { useState, useEffect, useMemo, useCallback } from "react";
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

export const useDropdown = ({ classType = "", itemsPerPageInitial = 5 }) => {
  const { alert } = useAlertContext();

  const safeItemsPerPage = Math.max(1, itemsPerPageInitial);

  const urlApi = useMemo(() => apis[classType] ?? "", [classType]);
  const { data, status } = useFetch(urlApi);

  useEffect(() => {
    if (status >= 400) {
      alert({
        type: "error",
        title: "Error en la conexión con la base de datos",
        buttons: 1,
      });
    }
  }, [status, alert]);

  const array = useMemo(() => (Array.isArray(data) ? data : []), [data]);

  const [itemsPerPage, setItemsPerPage] = useState(safeItemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(array.length / itemsPerPage)),
    [array.length, itemsPerPage]
  );

  const indexPages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i), [totalPages]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = Math.min(start + itemsPerPage, array.length);
    return array.slice(start, end);
  }, [array, currentPage, itemsPerPage]);

  const goToPage = useCallback(
    (pageIndex) => setCurrentPage(Math.max(0, Math.min(pageIndex, totalPages - 1))),
    [totalPages]
  );
  const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);

  const activePages = useMemo(() => indexPages.map((_, i) => i === currentPage), [indexPages, currentPage]);

  return {
    array,
    pagination: {
      itemsPerPage,
      setItemsPerPage,
      currentPage,
      totalPages,
      indexPages,
      currentItems,
      activePages,
      goToPage,
      goPrev,
      goNext,
    },
  };
};

export default useDropdown;
