import { useState, useMemo, useCallback } from "react";

export const usePagination = ({ array = [], initialItemsPerPage = 10 }) => {
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(array.length / itemsPerPage)), [array.length, itemsPerPage]);

  const indexPages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i), [totalPages]);

  const currentItems = useMemo(() => {
    const start = currentPage * itemsPerPage;
    const end = start + itemsPerPage;
    return array.slice(start, end);
  }, [array, currentPage, itemsPerPage]);

  // const goToPage = useCallback((pageIndex) => {
  //   const safePage = Math.max(0, Math.min(pageIndex, totalPages - 1));
  //   setCurrentPage(safePage);
  // }, [totalPages]);

  // const goPrev = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);
  // const goNext = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);

  const goToPage = useCallback((pageIndex) => {
  setCurrentPage(prev => Math.max(0, Math.min(pageIndex, totalPages - 1)));
}, [totalPages]);

const goPrev = useCallback(() => {
  setCurrentPage(prev => Math.max(0, prev - 1));
}, []);

const goNext = useCallback(() => {
  setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
}, [totalPages]);

  return { itemsPerPage, setItemsPerPage, currentPage, totalPages, indexPages, currentItems, goToPage, goPrev, goNext };
};

export default usePagination;