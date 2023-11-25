import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserInjured } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreatePaciente = ({ 
  urlApiPacientes
 }) => {

  const contenidoPacientes = `JSON.stringify({
    "paciente": {
      "nombre": document.getElementById("nombrePaciente").value,
      "apellido": document.getElementById("apellidoPaciente").value,
      "identificacion": document.getElementById("cedulaPaciente").value,
      "genero": document.getElementById("generoPaciente").innerText,
      "eps": document.getElementById("epsPaciente").innerText,
    },
  })`

  const [genero, setGenero] = React.useState(""); //Select Género
  const handleChangeGenero = (event) => {
    setGenero(event.target.value);
  };

  const [eps, setEps] = React.useState(""); //Select Eps
  const handleChangeEps = (event) => {
    setEps(event.target.value);
  };

  const [responseStatus, setResponseStatus] = useState("");

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Paciente Registrado", "", "success");
    setGenero("");
    setEps("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    Swal.fire("Paciente No Registrado", "", "error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    Swal.fire("Paciente No Registrado", "", "error");
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <body>
        <center>
          <hr/>
          <h4>Registrar Paciente</h4>
          <hr/>
          <br/>
          <table className="tableRegistrar">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <TextField
                    id="cedulaPaciente"
                    label="Cédula"
                    type="number"
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
                    id="nombrePaciente"
                    label="Nombre"
                    variant="outlined"
                    className="textField"
                    margin="dense"
                    autoComplete="off"
                  />
                </td>
                <td>
                  <TextField
                    id="apellidoPaciente"
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
                    <InputLabel id="generoPaciente-label" className="select">
                      Género
                    </InputLabel>
                    <Select
                      labelId="generoPaciente-label"
                      id="generoPaciente"
                      value={genero}
                      label="generoPaciente"
                      onChange={handleChangeGenero}
                    >
                      <MenuItem value={10} className="select-item">
                        Masculino
                      </MenuItem>
                      <MenuItem value={20} className="select-item">
                        Femenino
                      </MenuItem>
                      <MenuItem value={30} className="select-item">
                        Indefinido
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="epsPaciente-label" className="select">
                      Eps
                    </InputLabel>
                    <Select
                      labelId="epsPaciente-label"
                      id="epsPaciente"
                      value={eps}
                      label="epsPaciente"
                      onChange={handleChangeEps}
                    >
                      <MenuItem value={10} className="select-item">
                        Nueva Eps
                      </MenuItem>
                      <MenuItem value={20} className="select-item">
                        EPS Sanitas
                      </MenuItem>
                      <MenuItem value={30} className="select-item">
                        Saludcoop
                      </MenuItem>
                    </Select>
                  </FormControl>
                </td>
              </tr>
              <br></br>
              <tr>
                <td colSpan={2}>
                  <BotonGuardar endIcon={<FaUserInjured />} titulo={'Registrar'} urlApi={urlApiPacientes} contenidoApi={contenidoPacientes} setResponseStatus={setResponseStatus}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};