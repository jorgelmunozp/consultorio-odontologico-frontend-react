import '../forms.css';
import { memo, useMemo, useCallback } from 'react';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import { useDropdown } from './useDropdown.js';
import { lazy } from 'react';

const PaginationBar = memo(lazy(() => import('../../pagination/PaginationBar.js')));

export const DropdownSelector = ({
  classType,
  value = '',
  placeholder = '',
  handleChange,
  isOpen,
  onToggle,
  className = '',
  itemsPerPage = 5
}) => {
  const { theme } = useThemeContext();
  const { array, pagination } = useDropdown({ classType, itemsPerPageInitial: itemsPerPage });

  // Botón de toggle
  const buttonClassName = useMemo(() =>
    className + (value.length === 0
      ? " dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100 bg-transparent"
      : " dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100 bg-transparent"),
    [className, value]
  );

  // Opciones seguras: si no hay datos, mostramos "Cargando..."
  const options = useMemo(() => {
    if (!pagination.currentItems || pagination.currentItems.length === 0) {
      return (
        <li className="dropdown-item disabled text-muted">
          {array.length === 0 ? "Cargando..." : "No hay resultados"}
        </li>
      );
    }

    return pagination.currentItems.map((option, index) => {
      const item = option?.[classType]; // protección contra undefined
      let displayValue = "";

      if (item) {
        switch (classType) {
          case "paciente":
          case "doctor":
            displayValue = `${item.nombre || ""} ${item.apellido || ""}`.trim();
            break;
          case "consultorio":
            displayValue = `${item.numero || ""} ${item.nombre || ""}`.trim();
            break;
          case "tratamiento":
          case "eps":
          case "genero":
          case "especialidad":
            displayValue = item.nombre || item.especialidad || "";
            break;
          default:
            displayValue = "";
        }
      }

      return (
        <Option
          key={`${classType}Option${index}`}
          value={displayValue}
          handleChange={handleChange}
          closeDropdown={() => onToggle(false)}
          theme={theme}
        />
      );
    });
  }, [pagination.currentItems, array.length, classType, handleChange, onToggle, theme]);

  return (
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0">
      <button
        onClick={onToggle}
        className={buttonClassName}
        type="button"
        id={"selectButton" + classType}
        aria-controls={"dropdownMenu" + classType}
        aria-expanded={isOpen}
        data-theme={theme}
      >
        {value.length === 0 ? placeholder : value}
      </button>

      <ul
        id={"dropdownMenu" + classType}
        className={"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth" + (isOpen ? " collapse show" : "")}
        style={array.length === 0 ? { maxHeight: "0rem" } : { maxHeight: "12rem" }}
        aria-labelledby={"selectButton" + classType}
        data-theme={theme}
      >
        {options}

        {pagination.totalPages > 1 && (
          <PaginationBar
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            goToPage={pagination.goToPage}
            goPrev={pagination.goPrev}
            goNext={pagination.goNext}
          />
        )}
      </ul>
    </div>
  );
};

const Option = memo(({ value, handleChange, closeDropdown, theme }) => {
  const handleClick = useCallback(() => {
    handleChange(value);
    closeDropdown();
  }, [handleChange, closeDropdown, value]);

  return (
    <li>
      <button
        value={value}
        onClick={handleClick}
        className="dropdown-item bg-transparent"
        data-theme={theme}
      >
        {value}
      </button>
    </li>
  );
});

export default memo(DropdownSelector);
