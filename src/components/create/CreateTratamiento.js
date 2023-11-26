import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreateTratamiento = ({
  urlApiTratamientos,
  consultorios,
  doctores
}) => {

  const contenidoTratamientos = `JSON.stringify({
    "tratamiento": {
      "nombre": document.getElementById("nombreTratamiento").value,
      "consultorio": document.getElementById("consultorioTratamiento").innerText,
      "doctor": document.getElementById("doctorTratamiento").innerText,
    },
  })`

  const [consultorio, setConsultorio] = React.useState(""); //Select
  const handleChangeConsultorio = (event) => {
    setConsultorio(event.target.value);
  };
  const [doctor, setDoctor] = React.useState(""); //Select
  const handleChangeDoctor = (event) => {
    setDoctor(event.target.value);
  };

  const [responseStatus, setResponseStatus] = useState("");

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Tratamiento Registrado", "", "success");
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
      <body>
        <center>
          <hr/>
          <h4>Registrar Tratamiento</h4>
          <hr/>
          <br/>
          <table className="tableRegistrar">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <TextField
                    id="nombreTratamiento" label="Nombre" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="nombreTratamiento-label" className="select">
                      Consultorio
                    </InputLabel>
                    <Select
                      id="consultorioTratamiento" label="consultorioTratamiento" labelId="consultorioTratamiento-label"
                      value={consultorio} onChange={handleChangeConsultorio}
                    >
                      {consultorios.map((consultorios) => {
                        return (
                          <MenuItem value={consultorios.id} className="select-item">
                            {consultorios.consultorio.numero}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </td>
                <td>
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="doctorTratamiento-label" className="select">
                      Médico
                    </InputLabel>
                    <Select
                      id="doctorTratamiento" label="doctorTratamiento" labelId="doctorTratamiento-label"
                      value={doctor} onChange={handleChangeDoctor}
                    >
                      {doctores.map((doctores) => {
                        return (
                          <MenuItem value={doctores.id} className="select-item">
                            {doctores.doctor.nombre + "\&nbsp;" + doctores.doctor.apellido}
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
                  <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApiTratamientos}  contenidoApi={contenidoTratamientos} setResponseStatus={setResponseStatus}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};