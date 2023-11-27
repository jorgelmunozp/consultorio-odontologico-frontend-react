import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaUserInjured } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreatePaciente = ({ urlApiPacientes,epss,generos }) => {
  const contenidoPacientes = `JSON.stringify({
    "paciente": {
      "nombre": document.getElementById("nombrePaciente").value,
      "apellido": document.getElementById("apellidoPaciente").value,
      "identificacion": document.getElementById("cedulaPaciente").value,
      "genero": document.getElementById("generoPaciente").innerText,
      "eps": document.getElementById("epsPaciente").innerText,
    },
  })`

  const [identificacion, setIdentificacion] = useState();         //Input Identificacion
  const handleChangeCedula = (event) => { setIdentificacion(event.target.value); };
  const [nombre, setNombre] = useState("");         //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [apellido, setApellido] = useState("");     //Input Apellido
  const handleChangeApellido = (event) => { setApellido(event.target.value); };
  const [genero, setGenero] = useState("");          //Select Género
  const handleChangeGenero = (event) => { setGenero(event.target.value); };
  const [eps, setEps] = useState("");                 //Select Eps
  const handleChangeEps = (event) => { setEps(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  let createFlag = false;
  if(identificacion!=="" && nombre!=="" && apellido!=="" && genero!=="" && eps!==""){ createFlag = true; }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Paciente Registrado", "", "success");
    setIdentificacion("");
    setNombre("");
    setApellido("");
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
                  <TextField value={identificacion} onChange={handleChangeCedula}
                    id="cedulaPaciente" label="Cédula" type="number" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField value={nombre} onChange={handleChangeNombre}
                    id="nombrePaciente" label="Nombre" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
                <td>
                  <TextField value={apellido} onChange={handleChangeApellido}
                    id="apellidoPaciente" label="Apellido" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
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
                      id="generoPaciente" label="generoPaciente" labelId="generoPaciente-label"
                      value={genero} onChange={handleChangeGenero}
                    >
                      {generos.map((generos) => {
                        return (
                          <MenuItem value={generos.id} className="select-item">
                            {generos.genero.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="epsPaciente-label" className="select">
                      Eps
                    </InputLabel>
                    <Select
                      id="epsPaciente" label="epsPaciente" labelId="epsPaciente-label"
                      value={eps} onChange={handleChangeEps}
                    >
                      {epss.map((epss) => {
                        return (
                          <MenuItem value={epss.id} className="select-item">
                            {epss.eps.nombre}
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
                  <BotonGuardar endIcon={<FaUserInjured />} titulo={'Registrar'} urlApi={urlApiPacientes} contenidoApi={contenidoPacientes} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};