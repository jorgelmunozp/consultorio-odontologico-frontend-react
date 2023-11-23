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
      "tipo": document.getElementById("nombreTratamiento").value,
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

  const [alertMessage, setAlertMessage] = useState("");

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
                    id="nombreTratamiento"
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
                  <FormControl fullWidth margin="dense">
                    <InputLabel id="tipoTratamiento-label" className="select">
                      Consultorio
                    </InputLabel>
                    <Select
                      labelId="consultorioTratamiento-label"
                      id="consultorioTratamiento"
                      value={consultorio}
                      label="consultorioTratamiento"
                      onChange={handleChangeConsultorio}
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
                      labelId="doctorTratamiento-label"
                      id="doctorTratamiento"
                      value={doctor}
                      label="doctorTratamiento"
                      onChange={handleChangeDoctor}
                    >
                      {doctores.map((doctores) => {
                        return (
                          <MenuItem value={doctores.id} className="select-item">
                            {doctores.doctor.nombre +
                              " " +
                              doctores.doctor.apellido}
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
                  <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApiTratamientos}  contenidoApi={contenidoTratamientos} setAlertMessage={setAlertMessage}></BotonGuardar>
                </td>
              </tr>
              <tr>
                <td colSpan={2}>
                      <p className="alertMessage">{ alertMessage }</p>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};