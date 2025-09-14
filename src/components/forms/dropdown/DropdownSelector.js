import '../forms.css';
import { memo, useMemo, useCallback } from 'react';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import { useDropdown } from './useDropdown.js';
import { lazy } from 'react';

const PaginationBar = memo(lazy(() => import('../../pagination/PaginationBar.js')));

export const DropdownSelector = ({ classType, value = '', placeholder='', handleChange, isOpen, onToggle, className='', itemsPerPage = 5 }) => {
  const { theme } = useThemeContext();
  const { array, pagination } = useDropdown({ classType, itemsPerPageInitial: itemsPerPage });

  // Botón de toggle
  const buttonClassName = useMemo(() =>
    className + (value.length === 0 ? " dropdown-toggle century-gothic text-start pt-2 ps-2 ps-sm-3 pe-5 w-100 bg-transparent"
                                    : " dropdown-toggle century-gothic text-center pt-4 ps-2 ps-sm-3 pe-5 w-100 bg-transparent"),
  [className, value] );

  // Button label memorized classname
  const labelClassName = useMemo( () => `form-control text-start my-0 w-100 bg-transparent ${ value.length === 0 ? "align-items-center" : "pt-3" }`, [value] );

  // Dropdown memorized Options
  const options = useMemo(() => {
    // Opciones seguras: si no hay datos, mostramos "Cargando..."
    if (!pagination.currentItems || pagination.currentItems.length === 0) {
      return (
        <li className="dropdown-item disabled text-muted">
          {array.length === 0 ? "Cargando..." : "No hay resultados"}
        </li>
      );
    }

    // Definimos transformadores para cada tipo
    const displayMap = {
      paciente: (item) => `${item?.nombre || ""} ${item?.apellido || ""}`.trim(),
      doctor: (item) => `${item?.nombre || ""} ${item?.apellido || ""}`.trim(),
      consultorio: (item) => `${item?.numero || ""} ${item?.nombre || ""}`.trim(),
      tratamiento: (item) => item?.nombre || item?.especialidad || "",
      eps: (item) => item?.nombre || item?.especialidad || "",
      genero: (item) => item?.nombre || item?.especialidad || "",
      especialidad: (item) => item?.nombre || item?.especialidad || "",
    };

    const transform = displayMap[classType] || (() => "");

    return pagination.currentItems.map((option, index) => {
      const item = option?.[classType];
      const displayValue = transform(item);

      return ( <Option key={`${classType}Option${index}`} value={displayValue} handleChange={handleChange} closeDropdown={() => onToggle(false)} theme={theme} /> );
    });
  }, [pagination.currentItems, array.length, classType, handleChange, onToggle, theme]);

  return (
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0">
      <button id={"selectButton" + classType} onClick={onToggle} className={buttonClassName} type="button" aria-controls={"dropdownMenu" + classType} aria-expanded={isOpen} data-theme={theme}>{ value.length === 0 ? placeholder : value }</button>
      <label htmlFor={"selectButton" + classType} className={"form-label text-nowrap text-truncate bg-transparent" + labelClassName} data-theme={theme}>{ value.length === 0 ? '' : placeholder  }</label>

      <ul id={"dropdownMenu" + classType} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth" + (isOpen ? " collapse show" : "")} style={array.length === 0 ? { maxHeight: "0rem" } : { maxHeight: "12rem" }}aria-labelledby={"selectButton" + classType} data-theme={theme}>
        { options }

        {pagination.totalPages > 1 && (
          <PaginationBar currentPage={pagination.currentPage} totalPages={pagination.totalPages} goToPage={pagination.goToPage} goPrev={pagination.goPrev} goNext={pagination.goNext} />
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

  return ( <li className='bg-row'><button value={value} onClick={handleClick} className="dropdown-item bg-transparent" data-theme={theme}>{ value }</button></li> );
});

export default memo(DropdownSelector);