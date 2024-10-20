import Swal from 'sweetalert2';
import { useState }  from "react";
import { Tratamiento } from '../../../classes/Tratamiento';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";

export const CreateTratamiento = ({ urlApi,consultorios,doctores }) => {
  let item = "";
  const [nombre, setNombre] = useState("");           //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [consultorio, setConsultorio] = useState(""); //Select Consultorio
  const handleChangeConsultorio = (event) => { setConsultorio(event.target.value); };
  const [doctor, setDoctor] = useState("");           //Select Doctor
  const handleChangeDoctor = (event) => { setDoctor(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  if(nombre!=="" && consultorio!=="" && doctor!==""){ 
    const objectClass = new Tratamiento(nombre,consultorio,doctor);   //Object from Class
    item = `JSON.stringify({                              
      ${Tratamiento.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`; 
   }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Tratamiento Registrado", "", "success");
    setNombre("");
    setConsultorio("");
    setDoctor("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    Swal.fire("Tratamiento No Registrado", "", "error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    Swal.fire("Tratamiento No Registrado", "", "error");
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar Tratamiento</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
          <div className='row'>
            <div className='col'>
              <TextField value={nombre} onChange={handleChangeNombre} id="nombreTratamiento" label="Nombre" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
            </div>
          </div>
          <div className='row d-block d-sm-flex'>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="nombreTratamiento-label" >Consultorio</InputLabel>
                <Select value={consultorio} onChange={handleChangeConsultorio} id="consultorioTratamiento" label="consultorioTratamiento" labelId="consultorioTratamiento-label">
                  {consultorios.map((consultorios) => {
                    return (
                      <MenuItem value={consultorios.consultorio} key={consultorios.id}>
                        {consultorios.consultorio.numero}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="doctorTratamiento-label" >Médico</InputLabel>
                <Select value={doctor} onChange={handleChangeDoctor} id="doctorTratamiento" label="doctorTratamiento" labelId="doctorTratamiento-label">
                  {doctores.map((doctores) => {
                    return (
                      <MenuItem value={doctores.doctor} key={doctores.id}>
                        {doctores.doctor.nombre + " " + doctores.doctor.apellido}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApi}  contenidoApi={item} setResponseStatus={setResponseStatus} ></BotonGuardar>
            </div>
          </div>              
			  </div>
      </div>
    </div>
  );
};