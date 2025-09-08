import '../forms.css';
import { lazy, memo, useMemo, useCallback } from 'react';
import { useThemeContext } from "../../../theme/ThemeContext.js";
import sign from 'jwt-encode';                                                  // Para firma con jwt

const PaginationBar = memo( lazy(() => import('../../pagination/PaginationBar.js')) );

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const DropdownSelector = ({ classType, value='', placeholder='', array=[], handleChange, pagination, isOpen, onToggle, className='' }) => {
  const { theme } = useThemeContext();        // 👈 Call the global theme

  // 👈 memoriza clases del botón para evitar concatenación en cada render
  const buttonClassName = useMemo(() => className + (value.length === 0
        ? " dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100 bg-transparent"
        : " dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100 bg-transparent")
        ,[className, value]);
  
  // 👈 memoriza lista de opciones para evitar map en cada render innecesario
  const options = useMemo(() => {
    return array.slice(pagination.indexPage[0], pagination.indexPage[1]).map((option, index) => {
      let displayValue = "";
      switch (classType) {
        case "paciente": case "doctor": displayValue = `${option[classType].nombre} ${option[classType].apellido}`; break;
        case "consultorio": displayValue = `${option[classType].numero} ${option[classType].nombre}`; break;
        case "tratamiento": case "eps": case "genero": case "especialidad": displayValue = option[classType].nombre || option[classType].especialidad; break;
        default: displayValue = "";
      }
      return (<Option  key={`${classType}Option${index}`} value={displayValue} handleChange={handleChange} closeDropdown={() => onToggle(false)} theme={theme} /> );
    });
  }, [array, pagination.indexPage, classType, handleChange, onToggle, theme]);

  return(
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0" >
      <button onClick={ onToggle } onChange={ handleChange } className={ buttonClassName } type="button" id={"selectButton"+classType} data-bs-target={"#dropdownMenu"+classType} aria-controls={"dropdownMenu"+classType} aria-expanded="false" data-theme={theme}>{ value.length === 0 ? placeholder : value }</button>
      <label htmlFor="selectButton" className="form-label text-nowrap text-truncate" data-theme={theme}>{ value.length === 0 ? '' : placeholder }</label>

      <ul id={"dropdownMenu"+classType} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth" + (isOpen ? " collapse show" : "")} style={ array.length === 0 ? {"maxHeight":"0rem"} : {"maxHeight":"12rem"} } aria-labelledby="selectButton" data-theme={theme}>
        { options }
        <PaginationBar array={array} itemsPerPage={pagination.itemsPerPage} indexPage={pagination.indexPage} activePages={pagination.activePages} indexPages={pagination.indexPages} setIndexPage={pagination.setIndexPage} setActivePages={pagination.setActivePages} />
      </ul>
    </div>
  )
}

// const Options = ({ value, handleChange, closeDropdown, theme  }) => {
//   return ( <li><button className="dropdown-item bg-transparent" value={ sign(value,jwtSecretKey) } onClick={ (event) => {  handleChange(event.target.value); closeDropdown(); } } data-theme={theme}>{ value }</button></li> );
// }

const Option = memo(({ value, handleChange, closeDropdown, theme }) => {
  const handleClick = useCallback( (event) => {
      handleChange(event.target.value);
      closeDropdown();
    },[handleChange, closeDropdown]);

  return ( <li><button value={sign(value, jwtSecretKey)} onClick={handleClick} className="dropdown-item bg-transparent" data-theme={theme}>{value}</button></li> );
});

export default memo(DropdownSelector);
