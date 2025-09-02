import '../forms.css';
import { lazy, useState } from 'react';
import sign from 'jwt-encode';                                                  // Para firma con jwt
import { jwtDecode as decode } from "jwt-decode";

const PaginationBar = lazy(() => import('../../pagination/PaginationBar.js'));

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

// export const Dropdown = ({ classType, object, placeholder='', array=[], defaultSelect='', handleChange, pagination, className='', theme }) => {
export const Dropdown = ({ classType, value='', setValue, placeholder='', array=[], defaultSelect='', handleChange, pagination, className='', theme }) => {
  const [open, setOpen] = useState(false);
  // let { value, setValue } = object.getValue({ defaultValue:defaultSelect })

  const class1 = ' dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100 bg-transparent';
  const class2 = ' dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100 bg-transparent';

  return(
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0" >
      <button onClick={ () => open === false ? setOpen(true):setOpen(false) } onChange={ handleChange } className={ className + (value.length === 0 ? class1 : class2) } type="button" id={"selectButton"+classType} data-bs-target={"#dropdownMenu"+classType} aria-controls={"dropdownMenu"+classType} aria-expanded="false" data-theme={theme}>{ value.length === 0 ? placeholder : value }</button>
      <label htmlFor="selectButton" className="form-label text-nowrap text-truncate" data-theme={theme}>{ value.length === 0 ? '' : placeholder }</label>

      <ul id={"dropdownMenu"+classType} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth" + (open ? " collapse show" : "")} style={ array.length === 0 ? {"maxHeight":"0rem"} : {"maxHeight":"12rem"} } aria-labelledby="selectButton" data-theme={theme}>
        { array.slice(pagination.indexPage[0],pagination.indexPage[1]).map((option, index) => {
            switch( classType ) {
              case 'paciente': value=option[classType].nombre+ " " + option[classType].apellido; break;
              case 'doctor': value=option[classType].nombre + " " + option[classType].apellido; break;
              case 'consultorio': value=option[classType].numero + " " + option[classType].nombre; break;
              case 'tratamiento': value=option[classType].especialidad; break;
              case 'eps': value=option[classType].nombre; break;
              case 'genero': value=option[classType].nombre; break;
              case 'especialidad': value=option[classType].nombre; break;
              default: value=''; break;
            }
            return ( <Options key={ classType+'Option'+index } value={value} setValue={setValue} setOpen={setOpen} handleChange={handleChange} theme={theme} /> );
          })
        }
        <PaginationBar array={array} itemsPerPage={pagination.itemsPerPage} indexPage={pagination.indexPage} activePages={pagination.activePages} indexPages={pagination.indexPages} setIndexPage={pagination.setIndexPage} setActivePages={pagination.setActivePages} />
      </ul>
    </div>
  )
}

const Options = ({ value, setValue, setOpen, handleChange,theme  }) => {
  return ( <li><button className="dropdown-item bg-transparent" value={ sign(value,jwtSecretKey) } onClick={ (event) => { setValue( decode(event.target.value) ); setOpen(false); handleChange(event.target.value)} } data-theme={theme}>{ value }</button></li> );
}

export default Dropdown;