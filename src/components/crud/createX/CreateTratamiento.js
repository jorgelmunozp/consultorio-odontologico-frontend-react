import { useState }  from "react";
import { Tratamiento } from '../../../classes/Tratamiento';
import { Consultorio } from '../../../classes/Consultorio';
import { Doctor } from '../../../classes/User';
import { Modal } from '../../modal/Modal';
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import { Success } from '../../icons/success/Success';
import { Error } from '../../icons/error/Error';

// export const CreateTratamiento = ({ urlApi,Classe,consultorios,doctores }) => {
export const CreateTratamiento = ({ urlApi,Classe = Tratamiento,consultorios,doctores }) => {
  let item = "";
  const [nombre, setNombre] = useState("");           //Input Nombre
  const [consultorio, setConsultorio] = useState(""); //Select Consultorio
  const [doctor, setDoctor] = useState("");           //Select Doctor
  const state = [
    { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value) },
    { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ), array: doctores },
    { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ), array: consultorios }
  ];

  const [responseStatus, setResponseStatus] = useState(0);
  const [alert, setAlert] = useState(false);

  if(nombre!=="" && consultorio!=="" && doctor!==""){ 
    const objectClass = new Classe(nombre,consultorio,doctor);   //Object from Class
    item = `JSON.stringify({                           
      ${Classe.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if(200 <= responseStatus && responseStatus <= 299){
    setAlert('success');
    setNombre("");
    setConsultorio("");
    setDoctor("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    setAlert('error');
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    setAlert('error');
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
            state.map((property,index)=>{
              return(
                <div className='row'>
                  {
                    eval(JSON.stringify(Object.values(property)[1])) === 'dropdown'
                          ? <div className='col'><Dropdown array={ Object.values(state[index])[3] } state={state} /></div>
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
      { alert === 'success' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Tratamiento Registrado'} />  }
      { alert === 'error' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Tratamiento No Registrado'} />  }
    </div>
  );
};

const Dropdown = ({ array, state }) => {
  const classType = Object.keys(array[0])[0];
  let index = "";
  switch(classType) { 
                      case 'doctor': index = 1; break;
                      case 'consultorio': index = 2; break;
  }

  return(
    <FormControl fullWidth margin="dense">
      <InputLabel id={ classType+"Dropdown-label" } >{ classType.charAt(0).toUpperCase() + classType.slice(1) }</InputLabel>
      <Select value={ Object.values(Object.values(state[index])[0]).length > 0 ? Object.values(Object.values(state[index])[0])[0] +' '+ Object.values(Object.values(state[index])[0])[1] : '' } onChange={ Object.values(state[index])[2] } id={ classType+"Dropdown"}  label={ classType+"Dropdown" } labelId={ classType+"Dropdown-label" } >
        {array.map((item) => {
          return (
            <MenuItem value={Object.values(item[classType])[0] + " " + Object.values(item[classType])[1]} key={item.id}>
              {Object.values(item[classType])[0] + " " + Object.values(item[classType])[1]}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  )
}