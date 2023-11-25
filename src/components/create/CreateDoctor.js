import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserMd } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreateDoctor = ({ 
  urlApiDoctores
}) => {

  const contenidoDoctores = `JSON.stringify({
    "doctor": {
      "nombre": document.getElementById("nombreDoctor").value,
      "apellido": document.getElementById("apellidoDoctor").value,
      "especialidad": document.getElementById("especialidadDoctor").innerText,
    },
  })`

  const [especialidad, setEspecialidad] = React.useState(""); //Select
  const handleChange = (event) => {
    setEspecialidad(event.target.value);
  };

  const [responseStatus, setResponseStatus] = useState("");

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Doctor Registrado", "", "success");
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
                {/* Codigo de la persona o cedula para registrarse */}
                <td>
                  <TextField
                    id="nombreDoctor"
                    label="Nombre"
                    variant="outlined"
                    className="textField"
                    margin="dense"
                    autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="apellidoDoctor"
                    label="Apellido"
                    variant="outlined"
                    className="textField"
                    margin="dense"
                    autoComplete="off"
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
                      labelId="especialidadDoctor-label"
                      id="especialidadDoctor"
                      value={especialidad}
                      label="Especialidad"
                      onChange={handleChange}
                    >
                      <MenuItem value={10} className="select-item">
                        Blanqueamiento
                      </MenuItem>
                      <MenuItem value={20} className="select-item">
                        Diseño Sonrisa
                      </MenuItem>
                      <MenuItem value={30} className="select-item">
                        Ortodoncia
                      </MenuItem>
                      <MenuItem value={40} className="select-item">
                        Periodoncia
                      </MenuItem>
                      <MenuItem value={50} className="select-item">
                        Prótesis
                      </MenuItem>
                      <MenuItem value={60} className="select-item">
                        Higiene
                      </MenuItem>
                      <MenuItem value={70} className="select-item">
                        Detartraje
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <br></br>
              <tr>
                <td colSpan={2}>
                  <BotonGuardar endIcon={<FaUserMd />} titulo={'Registrar'} urlApi={urlApiDoctores} contenidoApi={contenidoDoctores} setResponseStatus={setResponseStatus}></BotonGuardar>
                </td>
              </tr>
            </table>
          </center>
        </body>
      </div>
  );
};