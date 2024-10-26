import { useState }  from "react";
import { useFetch } from '../../hooks/useFetch';
import { Tratamiento } from '../../classes/Tratamiento';
import { Paciente, Doctor } from '../../classes/User';
import { Consultorio } from '../../classes/Consultorio';
import { Cita } from '../../classes/Cita';
import { Modal } from '../modal/Modal';
import { BotonGuardar } from "../../forms/buttons/BotonGuardar";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Success } from '../icons/success/Success';
import { Error } from '../icons/error/Error';

export const CreateItem = ({ type, urlApi, Icon }) => {
  let Classe = '';
  switch (type) { case 'cita' : Classe = Cita; break;
                  case 'paciente': Classe = Paciente; break;
                  case 'doctor': Classe = Doctor; break;
                  case 'consultorio': Classe = Consultorio; break;
                  case 'tratamiento': Classe = Tratamiento; break;
  }

  let objectClass = new Classe('');                                         // Objecto instanciado con la Class
  const state = objectClass.state;
  let item = "";

  const [responseStatus, setResponseStatus] = useState(0);
  const [alert, setAlert] = useState(false);

  let stateValues = [];                                                    // Arreglo con los datos de cada parámetro del objeto
  state.forEach(property => stateValues.push(Object.values(property)[0]));

  if(stateValues.filter(state => state === '').length === 0) {             // Verifica que no hayan campos vacios
    state.forEach(property => objectClass[Object.keys(property)[0]] = Object.values(property)[0]);  // Carga los valores ingresados por el usuario en el objeto
    
    item = `JSON.stringify({                           
      ${Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if( 200 <= responseStatus && responseStatus <= 299 ) {
    setAlert("success");
    state.forEach(property => Object.values(property)[3](''));          // Reinicia todas las variables
    setResponseStatus(0);
  } else if( 400 <= responseStatus && responseStatus <= 499 ) {
    setAlert("error");
    setResponseStatus(0);
  } else if( 500 <= responseStatus && responseStatus <= 599 ) {
    setAlert("error");
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
                <div key={'row'+Object.keys(property)[0]} className='row'>
                  {
                    eval(JSON.stringify(Object.values(property)[1])) === 'dropdown'
                          ? <div className='col'><Dropdown property={ property } /></div>
                          : <div className='col'><TextField value={ Object.values(property)[0] } onChange={ Object.values(property)[2] } label={ Object.keys(property)[0].charAt(0).toUpperCase() + Object.keys(property)[0].slice(1) } variant="outlined" fullWidth margin="dense" autoComplete="off"/></div>
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
      { alert === 'success' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Tratamiento Registrado'} buttons={1} />  }
      { alert === 'error' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Tratamiento No Registrado'} buttons={1} />  }
    </div>
  );
};

const Dropdown = ({ property }) => {
  const classType = Object.keys(property)[0];
  let index = "";
  switch(classType) { 
    case 'paciente': index = 0; break;
    case 'doctor': index = 1; break;
    case 'consultorio': index = 2; break;
    case 'tratamiento': index = 3; break;
    case 'eps': index = 4; break;
    case 'genero': index = 5; break;
    case 'especialidad': index = 6; break;
  };

  const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las Apis para obtención de los datos
  const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
  const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
  const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
  const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
  const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;

  const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
  const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
  const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
  const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
  const [epssDropdown, setEpssDropdown] = useState(epss);
  const [generosDropdown, setGenerosDropdown] = useState(generos);
  const [especialidadesDropdown, setEspecialidadesDropdown] = useState(tratamientos);
  const statesDropdown = [
    { paciente: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
    { doctor: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
    { consultorio: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
    { tratamiento: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
    { eps: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
    { genero: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
    { especialidad: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(tratamientos) }
  ];

  return(
    <FormControl fullWidth margin="dense">
      <InputLabel id={ classType+"Dropdown-label" } >{ classType.charAt(0).toUpperCase() + classType.slice(1) }</InputLabel>
      <Select value={ property[classType] } onFocus={ Object.values(statesDropdown[index])[1] } onChange={ Object.values(property)[2] } id={ classType+"Dropdown"}  label={ classType+"Dropdown" } labelId={ classType+"Dropdown-label" } >
        {
          Object.values(statesDropdown[index])[0].map((item) => {
            let value = '';
            let valueDropdown = '';
            switch( classType ) {
              case 'paciente': value=item[classType]; valueDropdown=item[classType].nombre+ " " + item[classType].apellido; break;
              case 'doctor': value=item[classType]; valueDropdown=item[classType].nombre + " " + item[classType].apellido; break;
              case 'consultorio': value=item[classType]; valueDropdown=item[classType].numero + " " + item[classType].nombre; break;
              case 'tratamiento': value=item[classType].nombre; valueDropdown=item[classType].nombre; break;
              case 'eps': value=item[classType].nombre; valueDropdown=item[classType].nombre; break;
              case 'genero': value=item[classType].nombre; valueDropdown=item[classType].nombre; break;
              case 'especialidad': value=item[classType].nombre; valueDropdown=item[classType].nombre; break;
            }

            return ( <MenuItem value={ value } key={ item.id }>{ valueDropdown }</MenuItem> );
          })
        }
      </Select>
    </FormControl>
  )
}