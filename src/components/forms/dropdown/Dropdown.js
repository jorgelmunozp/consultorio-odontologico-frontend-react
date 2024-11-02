import { useState,useEffect } from 'react';
import '../forms.css';

export const Dropdown = ({ classType, states, placeholder, defaultSelect='', handleChange, className }) => {
  let [value, setValue] = useState('');
  const [open, setOpen] = useState(false)

  let array = [];
  switch(classType) { 
    case 'paciente': array = states[0]; break;
    case 'doctor': array = states[1]; break;
    case 'consultorio': array = states[2]; break;
    case 'tratamiento': array = states[3]; break;
    case 'eps': array = states[4]; break;
    case 'genero': array = states[5]; break;
    case 'especialidad': array = states[6]; break;
  };

  const class1 = ' dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100';
  const class2 = ' dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100';

  useEffect(() => { if(defaultSelect.length !== 0 && value.length === 0) { setValue(defaultSelect) } });

  return(
    <div className="dropdown form-floating w-100 min-width-10 py-sm-0 px-0" onFocus={ array.handleSelect } autoFocus >
      <button onClick={ () => open === false ? setOpen(true):setOpen(false) } onChange={ handleChange } className={ className + (value.length === 0 ? class1 : class2) } type="button" id="selectButton" data-bs-target={"#dropdownMenu"+classType} aria-controls={"dropdownMenu"+classType} aria-expanded="false">{ value.length === 0 ? placeholder : value }</button>
      <label htmlFor="selectButton" className="form-label text-muted text-nowrap text-truncate">{ value.length === 0 ? '' : placeholder }</label>

      <ul id={"dropdownMenu"+classType} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto" + (open ? " collapse show" : "")} style={ array.length === 0 ? {"maxHeight":"0rem"} : {"maxHeight":"12rem"} } aria-labelledby="selectButton">
        { array.option.map((item, index) => {
            switch( classType ) {
              case 'paciente': value=item[classType].nombre+ " " + item[classType].apellido; break;
              case 'doctor': value=item[classType].nombre + " " + item[classType].apellido; break;
              case 'consultorio': value=item[classType].numero + " " + item[classType].nombre; break;
              case 'tratamiento': value=item[classType].especialidad; break;
              case 'eps': value=item[classType].nombre; break;
              case 'genero': value=item[classType].nombre; break;
              case 'especialidad': value=item[classType].nombre; break;
          }

          return (<li key={ classType+'Item'+index }><button className="dropdown-item" value={ value } onClick={ (event) => { setValue(event.target.value); setOpen(false); handleChange(event)} }>{ value }</button></li>);
        })}
      </ul>
    </div>
  )
}