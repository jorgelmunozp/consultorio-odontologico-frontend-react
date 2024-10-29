import { useState, useEffect }  from "react";
import { useFetch } from '../../hooks/useFetch';
import { Alert } from '../../classes/Alert';
import { Cita } from '../../classes/Cita';
import { Paciente, Doctor } from '../../classes/User';
import { Especialidad } from '../../classes/Especialidad';
import { Consultorio } from '../../classes/Consultorio';
import { Tratamiento } from '../../classes/Tratamiento';
import { Modal } from '../modal/Modal';
import { Dropdown } from '../forms/dropdown/Dropdown';
import { BotonGuardar } from "../../forms/buttons/BotonGuardar";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import '../forms/forms.css';
import sign from 'jwt-encode';                                               // Para firma con jwt
import { jwtDecode } from "jwt-decode";
const jwtSecretKey = process.env.REACT_APP_JWTSECRET;

export const CreateItem = ({ classType, Icon }) => {
  const [responseStatus, setResponseStatus] = useState(0);
  
  let Classe = '';
  switch (classType) { case 'cita' : Classe = Cita; break;
                       case 'paciente': Classe = Paciente; break;
                       case 'doctor': Classe = Doctor; break;
                       case 'consultorio': Classe = Consultorio; break;
                       case 'tratamiento': Classe = Tratamiento; break;
                       case 'especialidad': Classe = Especialidad; break;
  }

  const objectClass = new Classe('');                                       // Objeto instanciado con la Class correspondiente
  const state = objectClass.state;
  let item = "";
  const urlApi = objectClass.api;

  // --- Dropdown
  const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las Apis para obtención de los datos
  const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
  const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
  const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
  const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
  const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;
  const especialidades  = useFetch(process.env.REACT_APP_API_ESPECIALIDADES).data;

  const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
  const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
  const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
  const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
  const [epssDropdown, setEpssDropdown] = useState(epss);
  const [generosDropdown, setGenerosDropdown] = useState(generos);
  const [especialidadesDropdown, setEspecialidadesDropdown] = useState(especialidades);
  const statesDropdown = [
    { option: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
    { option: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
    { option: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
    { option: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
    { option: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
    { option: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
    { option: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(especialidades) }
  ];
  // --- Dropdown

  // --- Alert
  const MyAlert = new Alert('');                                            // Objeto instanciado con la clase Alert para las alertas
  const { alert, setAlert } = MyAlert.state;
  // const { alerta, setAlertX } = MyAlert.stateAlert;
  // const ModalAlerta = MyAlert.fire('');
    // console.log("alerta: ", alerta)

  // const [alert, setAlert] = useState(false);
 // --- Alert


  let stateValues = [];                                                     // Arreglo con los datos de cada parámetro del objeto
  state.forEach( property => stateValues.push(property.value) );

  if(stateValues.filter( state => state === '').length === 0 ) {            // Verifica que no hayan campos vacios
    state.forEach(property => objectClass[property.key] = property.value);  // Carga los valores ingresados por el usuario en el objeto
    
    item = `JSON.stringify({                           
      ${Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if( 200 <= responseStatus && responseStatus <= 299 ) {
    setAlert('successCreate');
    state.forEach( property => property.setState('') );                     // Reinicia todas las variables
    setResponseStatus(0);
  } else if( 400 <= responseStatus && responseStatus <= 499 ) {
    setAlert('errorCreate');
    setResponseStatus(0);
  } else if( 500 <= responseStatus && responseStatus <= 599 ) {
    setAlert('errorCreate');
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar { Classe.name.charAt(0).toUpperCase() + Classe.name.slice(1) }</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
          {
            state.map(property => {
              return(
                <div key={'row'+property.key} className='row'>
                  {
                    property.type === 'dropdown'
                          ? <div className='col'><Dropdown property={ property } states={ statesDropdown } className={"input form-control rounded border-muted border-1 text-muted shadow-sm"} /></div>
                          : <div className='col'><TextField value={ property.value } type={ property.type } onChange={ property.handleChange } label={ property.key.charAt(0).toUpperCase() + property.key.slice(1) } variant="outlined" fullWidth margin="dense" autoComplete="off"/></div>
                  }
                </div>
              )})
          }
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<Icon />} titulo={'Registrar'} urlApi={urlApi}  contenidoApi={item} setResponseStatus={setResponseStatus} ></BotonGuardar>
            </div>
          </div>              
			  </div>
      </div>
      <Modal open={alert} setOpen={setAlert} />
      {/* <Modal type={'successCreate'} open={alert} setOpen={setAlert} title={'Registro exitoso'} /> */}
      {/* <Modal type={'errorCreate'} open={alert} setOpen={setAlert} title={'Datos No Registrados'} /> */}
    </div>
  );
};

// const Dropdown = ({ property, array=[], defaultSelect='',className }) => {
//   const key = property.key;
//   const placeholder = key.charAt(0).toUpperCase() + key.slice(1);

//   let index = "";
//   switch(key) { 
//     case 'paciente': index = 0; break;
//     case 'doctor': index = 1; break;
//     case 'consultorio': index = 2; break;
//     case 'tratamiento': index = 3; break;
//     case 'eps': index = 4; break;
//     case 'genero': index = 5; break;
//     case 'especialidad': index = 6; break;
//   };



//   let [value, setValue] = useState('');
//   let [valueItem, setValueItem] = useState('');

//   const [open, setOpen] = useState(false)

//   array = statesDropdown[index];

//   const class1 = ' dropdown-toggle text-start pt-2 ps-2 ps-sm-3 pe-5 w-100';
//   const class2 = ' dropdown-toggle text-center pt-4 ps-2 ps-sm-3 pe-5 w-100';

//   useEffect(() => { if(defaultSelect.length !== 0 && value.length === 0) { setValue(defaultSelect) } });

//   console.log("value: ", value)

//   return(
//     // <FormControl fullWidth margin="dense">
//     //   <InputLabel id={ key+"Dropdown-label" } >{ key.charAt(0).toUpperCase() + key.slice(1) }</InputLabel>
//     //   <Select value={ property[key] } onFocus={ statesDropdown[index].handleSelect } onChange={ property.handleChange } id={ key+"Dropdown"}  label={ key+"Dropdown" } labelId={ key+"Dropdown-label" } >
//     //     {
//     //       statesDropdown[index].option.map((item) => {
//     //         let value = '';
//     //         let valueItem = '';
//     //         switch( key ) {
//     //           case 'paciente': value=item[key]; valueItem=item[key].nombre+ " " + item[key].apellido; break;
//     //           case 'doctor': value=item[key]; valueItem=item[key].nombre + " " + item[key].apellido; break;
//     //           case 'consultorio': value=item[key]; valueItem=item[key].numero + " " + item[key].nombre; break;
//     //           case 'tratamiento': value=item[key].especialidad; valueItem=item[key].especialidad; break;
//     //           case 'eps': value=item[key].nombre; valueItem=item[key].nombre; break;
//     //           case 'genero': value=item[key].nombre; valueItem=item[key].nombre; break;
//     //           case 'especialidad': value=item[key].nombre; valueItem=item[key].nombre; break;
//     //         }

//     //         return ( <MenuItem value={ value } key={ item.id }>{ valueItem }</MenuItem> );
//     //       })
//     //     }
//     //   </Select>
//     // </FormControl>

//     <div className="dropdown form-floating w-100 min-width-10 py-sm-0" onFocus={ array.handleSelect }>
//       <button onClick={ () => setOpen(true) } onChange={ property.handleChange } className={ className + (value.length === 0 ? class1 : class2) } type="button" id="selectButton" data-bs-target={"#dropdownMenu"+key} aria-controls={"dropdownMenu"+key} aria-expanded="false">{ value.length === 0 ? placeholder : value }</button>
//       <label htmlFor="selectButton" className="form-label text-muted text-nowrap text-truncate">{ value.length === 0 ? '' : placeholder }</label>

//       <ul id={"dropdownMenu"+key} className={"dropdown-menu text-center shadow-sm w-100 overflow-auto" + (open ? " collapse show" : "")} style={ array.length === 0 ? {"maxHeight":"0rem"} : {"maxHeight":"12rem"} } aria-labelledby="selectButton">
//         { array.option.map((item, index) => {
//           switch( key ) {
//             case 'paciente': value=item[key]; valueItem=item[key].nombre+ " " + item[key].apellido; break;
//             case 'doctor': value=item[key]; valueItem=item[key].nombre + " " + item[key].apellido; break;
//             case 'consultorio': value=item[key]; valueItem=item[key].numero + " " + item[key].nombre; break;

//             case 'tratamiento': value=item[key].especialidad; valueItem=item[key].especialidad; break;
//             case 'eps': value=item[key].nombre; valueItem=item[key].nombre; break;
//             case 'genero': value=item[key].nombre; valueItem=item[key].nombre; break;
//             case 'especialidad': value=item[key].nombre; valueItem=item[key].nombre; break;
//           }

//           // return (<li key={ key+'Item'+index }><button className="dropdown-item" value={ value } onClick={ (e) => { console.log("e.target.value: ",e.target.value); setValue(value); setValueItem(e.target.value); setOpen(false)} }>{ valueItem }</button></li>);
//           return (<li key={ key+'Item'+index }><button className="dropdown-item" name={ value } value={ valueItem } onClick={ (e) => { console.log("e.target.value: ",e.target.value); console.log("e.target.name: ",e.target.name); setValue(e.target.value); setOpen(false)} }>{ valueItem }</button></li>);
//         })}
//       </ul>
//     </div>
//   )
// }