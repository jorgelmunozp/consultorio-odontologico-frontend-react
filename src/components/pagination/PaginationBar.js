import './pagination.css';

export const PaginationBar = ({
  currentPage,
  totalPages,
  goToPage,
  goPrev,
  goNext,
  windowSize = 1, // cuántas páginas adyacentes mostrar alrededor del current
}) => {
  if (totalPages === 0) return null;

  const pages = new Set();

  // Siempre la primera y la última página
  pages.add(0);
  pages.add(totalPages - 1);

  // Página actual y adyacentes
  const start = Math.max(currentPage - windowSize, 1);
  const end = Math.min(currentPage + windowSize, totalPages - 2);
  for (let i = start; i <= end; i++) pages.add(i);

  // Convertimos a array ordenado
  const sortedPages = Array.from(pages).sort((a, b) => a - b);

  // Insertamos ellipsis donde haya saltos
  const finalPages = [];
  for (let i = 0; i < sortedPages.length; i++) {
    if (i > 0 && sortedPages[i] - sortedPages[i - 1] > 1) finalPages.push('ellipsis');
    finalPages.push(sortedPages[i]);
  }

  return (
    <nav aria-label="Page navigation" className="container-fluid mt-3">
      <ul className="pagination pagination-sm justify-content-center">
        {/* Botón anterior */}
        <li className="page-item">
          <button
            onClick={goPrev}
            type="button"
            className="page-link rounded-circle page-arrow"
            aria-label="◂"
            disabled={currentPage === 0}
          >
            ◂
          </button>
        </li>

        {/* Páginas */}
        {finalPages.map((p, idx) =>
          p === 'ellipsis' ? (
            <li key={`e-${idx}`} className="page-item disabled">
              <span className="page-link">…</span>
            </li>
          ) : (
            <li
              key={`p-${p}`}
              className={currentPage === p ? 'page-item active fw-bolder' : 'page-item'}
            >
              <button
                onClick={() => goToPage(p)}
                type="button"
                className="page-link rounded-circle fw-bolder"
              >
                {p + 1}
              </button>
            </li>
          )
        )}

        {/* Botón siguiente */}
        <li className="page-item">
          <button
            onClick={goNext}
            type="button"
            className="page-link rounded-circle page-arrow"
            aria-label="▸"
            disabled={currentPage === totalPages - 1}
          >
            ▸
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default PaginationBar;
