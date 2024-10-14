import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserMd } from "react-icons/fa";
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";

export const CreateDoctor = ({ urlApi,tratamientos,generos }) => {
  const itemUpdated = `JSON.stringify({
    "doctor": {
      "nombre": document.getElementById("nombreDoctor").value,
      "apellido": document.getElementById("apellidoDoctor").value,
      "especialidad": document.getElementById("especialidadDoctor").innerText,
    },
  })`

  const [identificacion, setIdentificacion] = useState(""); //Input Identificacion
  const handleChangeIdentificacion = (event) => { setIdentificacion(event.target.value); };
  const [nombre, setNombre] = useState("");                 //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [apellido, setApellido] = useState("");             //Input Apellido
  const handleChangeApellido = (event) => { setApellido(event.target.value); };
  const [genero, setGenero] = useState("");             //Input Apellido
  const handleChangeGenero = (event) => { setGenero(event.target.value); };
  const [especialidad, setEspecialidad] = useState("");     //Select Especialidad
  const handleChange = (event) => { setEspecialidad(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  let createFlag = false;
  if(identificacion!=="" &&  nombre!=="" && apellido!=="" && genero!=="" && especialidad!==""){ createFlag = true; }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Doctor Registrado", "", "success");
    setIdentificacion("");
    setNombre("");
    setApellido("");
    setGenero("");
    setEspecialidad("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    Swal.fire("Doctor No Registrado", "", "error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    Swal.fire("Doctor No Registrado", "", "error");
    setResponseStatus(0);
  }

  return (
    <div className="App">
        <body className='mt-4 mt-sm-5'>
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
                    <Select value={genero} onChange={handleChange} id="generoDoctor" label="Genero" labelId="generoDoctor-label">
                        {generos.map((generos) => {
                          return (
                            <MenuItem value={generos.id} key={generos.id}>
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
                    <Select value={especialidad} onChange={handleChange} id="especialidadDoctor" label="Especialidad" labelId="especialidadDoctor-label">
                        {tratamientos.map((tratamientos) => {
                          return (
                            <MenuItem value={tratamientos.id} key={tratamientos.id}>
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
                  <BotonGuardar endIcon={<FaUserMd />} titulo={'Registrar'} urlApi={urlApi} contenidoApi={itemUpdated} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
                </div>
              </div>                
			    </div>
         </body>
      </div>
  );
};