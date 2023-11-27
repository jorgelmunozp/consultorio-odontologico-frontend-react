import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserMd } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreateDoctor = ({ urlApiDoctores,tratamientos }) => {
  const contenidoDoctores = `JSON.stringify({
    "doctor": {
      "nombre": document.getElementById("nombreDoctor").value,
      "apellido": document.getElementById("apellidoDoctor").value,
      "especialidad": document.getElementById("especialidadDoctor").innerText,
    },
  })`

  const [nombre, setNombre] = useState("");                 //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [apellido, setApellido] = useState("");             //Input Apellido
  const handleChangeApellido = (event) => { setApellido(event.target.value); };
  const [especialidad, setEspecialidad] = useState("");     //Select Especialidad
  const handleChange = (event) => { setEspecialidad(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  let createFlag = false;
  if(nombre!=="" && apellido!=="" && especialidad!==""){ createFlag = true; }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Doctor Registrado", "", "success");
    setNombre("");
    setApellido("");
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
        <body>
          <center>
            <hr/>
            <h4>Registrar Doctor</h4>
            <hr/>
            <br/>
            <table className="tableRegistrar">
              <tr>
                <td>
                  <TextField value={nombre} onChange={handleChangeNombre}
                    id="nombreDoctor" label="Nombre" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField value={apellido} onChange={handleChangeApellido}
                    id="apellidoDoctor" label="Apellido" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="especialidadDoctor-label" className="select">
                      Especialidad
                    </InputLabel>
                    <Select
                      id="especialidadDoctor" label="Especialidad" labelId="especialidadDoctor-label"
                      value={especialidad} onChange={handleChange}
                    >
                        {tratamientos.map((tratamientos) => {
                          return (
                            <MenuItem value={tratamientos.id} className="select-item">
                              {tratamientos.tratamiento.nombre}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <br></br>
              <tr>
                <td colSpan={2}>
                  <BotonGuardar endIcon={<FaUserMd />} titulo={'Registrar'} urlApi={urlApiDoctores} contenidoApi={contenidoDoctores} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
                </td>
              </tr>
            </table>
          </center>
        </body>
      </div>
  );
};