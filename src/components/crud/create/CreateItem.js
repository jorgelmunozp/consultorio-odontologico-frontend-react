import { useState }  from "react";
import { useFetch } from '../../../hooks/useFetch';
import { Tratamiento } from '../../../classes/Tratamiento';
import { Consultorio } from '../../../classes/Consultorio';
import { Doctor } from '../../../classes/User';
import { Modal } from '../../modal/Modal';
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import { Success } from '../../icons/success/Success';
import { Error } from '../../icons/error/Error';

export const CreateItem = ({ urlApi,Classe = Tratamiento }) => {
  const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las aPI para obtención de los datos
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
    { paciente: pacientesDropdown, handleSelect: (event) => setPacientesDropdown(pacientes) },
    { doctor: doctoresDropdown, handleSelect: (event) => setDoctoresDropdown(doctores) },
    { consultorio: consultoriosDropdown, handleSelect: (event) => setConsultoriosDropdown(consultorios) },
    { tratamiento: tratamientosDropdown, handleSelect: (event) => setTratamientosDropdown(tratamientos) },
    { eps: epssDropdown, handleSelect: (event) => setEpssDropdown(epss) },
    { genero: generosDropdown, handleSelect: (event) => setGenerosDropdown(generos) },
    { especialidad: especialidadesDropdown, handleSelect: (event) => setEspecialidadesDropdown(tratamientos) }
  ];
  
  let item = "";
  const [nombre, setNombre] = useState("");           //Input Nombre
  const [consultorio, setConsultorio] = useState(""); //Select Consultorio
  const [doctor, setDoctor] = useState("");           //Select Doctor
  const state = [
    { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value) },
    { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor(event.target.value.split(" ")[0], event.target.value.split(" ")[1]).user ) },
    { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ) }
  ];

  const [responseStatus, setResponseStatus] = useState(0);
  const [alert, setAlert] = useState(false);

  let statesData = [];                                                    // Arreglo con los datos de cada parámetro del objeto
  state.forEach(parameter => statesData.push(Object.values(parameter)[0]) );
  let stateParameters = [];                                                    // Arreglo con los datos de cada parámetro del objeto
  state.forEach(parameter => stateParameters.push(Object.keys(parameter)[0]) );

console.log("state: ",state)
console.log("statesData: ",statesData)
console.log("stateParameters: ",stateParameters)

  if(statesData.filter(state => state === '').length === 0) {             // Verifica que no hayan campos vacios
    const objectClass = new Classe(nombre,consultorio,doctor);            //Object from Class
    item = `JSON.stringify({                           
      ${Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if(200 <= responseStatus && responseStatus <= 299){
    setAlert("success");
    setNombre("");
    setConsultorio("");
    setDoctor("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    setAlert("error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
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
            state.map((parameter,index)=>{
              return(
                <div key={'row'+index} className='row'>
                  {
                    eval(JSON.stringify(Object.values(parameter)[1])) === 'dropdown'
                          ? <div className='col'><Dropdown parameter={parameter} statesDropdown={statesDropdown} /></div>
                          : <div className='col'><TextField value={ Object.values(state[index])[0] } onChange={ Object.values(state[index])[2] } label="Nombre" variant="outlined" fullWidth margin="dense" autoComplete="off"/></div>
                  }
                </div>
              )})
          }
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApi}  contenidoApi={item} setResponseStatus={setResponseStatus} ></BotonGuardar>
            </div>
          </div>              
			  </div>
      </div>
      { alert === 'success' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Tratamiento Registrado'} buttons={1} />  }
      { alert === 'error' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Tratamiento No Registrado'} buttons={1} />  }
    </div>
  );
};

const Dropdown = ({ parameter, statesDropdown }) => {
  const classType = Object.keys(parameter)[0];
  let index = "";
  switch(classType) { case 'paciente': index = 0; break;
                      case 'doctor': index = 1; break;
                      case 'consultorio': index = 2; break;
                      case 'tratamiento': index = 3; break;
                      case 'eps': index = 4; break;
                      case 'genero': index = 5; break;
                      case 'especialidad': index = 6; break;
  };

  return(
    <FormControl fullWidth margin="dense">
      <InputLabel id={ classType+"Dropdown-label" } >{ classType.charAt(0).toUpperCase() + classType.slice(1) }</InputLabel>
      <Select value={ Object.values(Object.values(parameter)[0]).length > 0 ? Object.values(Object.values(parameter)[0])[0] +' '+ Object.values(Object.values(parameter)[0])[1] : '' } onFocus={ Object.values(statesDropdown[index])[1] } onChange={ Object.values(parameter)[2] } id={ classType+"Dropdown"}  label={ classType+"Dropdown" } labelId={ classType+"Dropdown-label" } >
        {
          Object.values(statesDropdown[index])[0].map((item) => {
            return (
              <MenuItem value={Object.values(item[classType])[0] + " " + Object.values(item[classType])[1]} key={item.id}>
                {Object.values(item[classType])[0] + " " + Object.values(item[classType])[1]}
              </MenuItem>
            );
          })
        }
      </Select>
    </FormControl>
  )
}