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

  // console.log(" objectClass: ",objectClass)
  // console.log(" state: ",state)
  // console.log(" urlApi: ",urlApi)

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

  console.log(" stateValues CreateItem: ",stateValues)


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
                  { property.type === 'dropdown'
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