import Swal from 'sweetalert2';
import { useState }  from "react";
import { Doctor } from '../../../classes/User';
import { Modal } from '../../modal/Modal';
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserMd } from "react-icons/fa";
import { Success } from '../../icons/success/Success';
import { Error } from '../../icons/error/Error';

export const CreateDoctor = ({ urlApi,tratamientos,generos }) => {
  let item = "";
  const [identificacion, setIdentificacion] = useState(""); //Input Identificacion
  const handleChangeIdentificacion = (event) => { setIdentificacion(event.target.value); };
  const [nombre, setNombre] = useState("");                 //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [apellido, setApellido] = useState("");             //Input Apellido
  const handleChangeApellido = (event) => { setApellido(event.target.value); };
  const [genero, setGenero] = useState("");                 //Input Apellido
  const handleChangeGenero = (event) => { setGenero(event.target.value); };
  const [especialidad, setEspecialidad] = useState("");     //Select Especialidad
  const handleChangeEspecialidad = (event) => { setEspecialidad(event.target.value); };
  const [responseStatus, setResponseStatus] = useState(0);
  const [alert, setAlert] = useState(false); 

  if(identificacion!=="" &&  nombre!=="" && apellido!=="" && genero!=="" && especialidad!==""){ 
    const objectClass = new Doctor(nombre, apellido, identificacion, genero, especialidad);   //Object from Class
    item = `JSON.stringify({                              
      ${Doctor.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`;                                                    //JSON Object from Object Class
  }

  if(200 <= responseStatus && responseStatus <= 299){
    // Swal.fire("Doctor Registrado", "", "success");
    setAlert('success');
    setIdentificacion("");
    setNombre("");
    setApellido("");
    setGenero("");
    setEspecialidad("");
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
          <h5 className='century-gothic main-color fs-sm-2'>Registrar Doctor</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
            <div className='row'>
              <div className='col'>
                <TextField value={identificacion} onChange={handleChangeIdentificacion} id="identificacionDoctor" label="Identificacion" type="number" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
              </div>
            </div>
            <div className='row d-block d-sm-flex'>
              <div className='col'>
                <TextField value={nombre} onChange={handleChangeNombre} id="nombreDoctor" label="Nombre" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
              </div>
              <div className='col'>
                <TextField value={apellido} onChange={handleChangeApellido} id="apellidoDoctor" label="Apellido" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
              </div>
            </div>
            <div className='row d-block d-sm-flex'>
              <div className='col'>
              <FormControl fullWidth margin="dense">
                  <InputLabel id="generoDoctor-label" >Genero</InputLabel>
                  <Select value={genero} onChange={handleChangeGenero} id="generoDoctor" label="Genero" labelId="generoDoctor-label">
                      {generos.map((generos) => {
                        return (
                          <MenuItem value={generos.genero.nombre} key={generos.genero.nombre}>
                            {generos.genero.nombre}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
              <div className='col'>
              <FormControl fullWidth margin="dense">
                  <InputLabel id="especialidadDoctor-label" >Especialidad</InputLabel>
                  <Select value={especialidad} onChange={handleChangeEspecialidad} id="especialidadDoctor" label="Especialidad" labelId="especialidadDoctor-label">
                      {tratamientos.map((tratamientos) => {
                        return (
                          <MenuItem value={tratamientos.tratamiento.nombre} key={tratamientos.tratamiento.nombre}>
                            {tratamientos.tratamiento.nombre}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='row mt-4 mt-sm-5'>
              <div className='col'>
                <BotonGuardar endIcon={<FaUserMd />} titulo={'Registrar'} urlApi={urlApi} contenidoApi={item} setResponseStatus={setResponseStatus} ></BotonGuardar>
              </div>
            </div>                
        </div>
      </div>
      { alert === 'success' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Médico Registrado'} />  }
      { alert === 'error' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Médico No Registrado'} />  }
    </div>
  );
};