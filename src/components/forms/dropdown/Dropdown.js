import { useState,useEffect } from 'react';
import { PaginationBar } from '../../pagination/PaginationBar';
import '../forms.css';

import * as jose from 'jose'
import sign from 'jwt-encode';                                                  // Para firma con jwt
import { jwtDecode as decode } from "jwt-decode";

const jwtSecretKey = process.env.REACT_APP_JWTSECRET;


export const Dropdown = ({ classType, placeholder, array, defaultSelect='', handleChange, pagination, className }) => {
  let [value, setValue] = useState('');
  const [open, setOpen] = useState(false)

  const class1 = ' dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100';
  const class2 = ' dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100';

  useEffect(() => { if(defaultSelect.length !== 0 && value.length === 0) { setValue(defaultSelect) } });
  
  return(
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0" >
      <button onClick={ () => open === false ? setOpen(true):setOpen(false) } onChange={ handleChange } className={ className + (value.length === 0 ? class1 : class2) } type="button" id="selectButton" data-bs-target={"#dropdownMenu"+classType} aria-controls={"dropdownMenu"+classType} aria-expanded="false">{ value.length === 0 ? placeholder : value }</button>
      <label htmlFor="selectButton" className="form-label text-muted text-nowrap text-truncate">{ value.length === 0 ? '' : placeholder }</label>

      <ul id={"dropdownMenu"+classType} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto slideIn smooth" + (open ? " collapse show" : "")} style={ array.length === 0 ? {"maxHeight":"0rem"} : {"maxHeight":"12rem"} } aria-labelledby="selectButton">
        { array.slice(pagination.indexPage[0],pagination.indexPage[1]).map((option, index) => {
            switch( classType ) {
              case 'paciente': value=option[classType].nombre+ " " + option[classType].apellido; break;
              case 'doctor': value=option[classType].nombre + " " + option[classType].apellido; break;
              case 'consultorio': value=option[classType].numero + " " + option[classType].nombre; break;
              case 'tratamiento': value=option[classType].especialidad; break;
              case 'eps': value=option[classType].nombre; break;
              case 'genero': value=option[classType].nombre; break;
              case 'especialidad': value=option[classType].nombre; break;
            }
            return ( <Options key={ classType+'Option'+index } value={value} setValue={setValue} setOpen={setOpen} handleChange={handleChange} /> );
          })
        }
        <PaginationBar array={array} itemsPerPage={pagination.itemsPerPage} indexPage={pagination.indexPage} activePages={pagination.activePages} indexPages={pagination.indexPages} setIndexPage={pagination.setIndexPage} setActivePages={pagination.setActivePages} />
      </ul>
    </div>
  )
}



const Options = ({ value, setValue, setOpen, handleChange  }) => {
  return ( <li><button className="dropdown-item" value={ sign(value,jwtSecretKey) } onClick={ (event) => { setValue( decode(event.target.value) ); setOpen(false); handleChange(event)} }>{ value }</button></li> );
}