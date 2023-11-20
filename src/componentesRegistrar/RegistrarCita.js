import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FaCalendarPlus } from "react-icons/fa";
import { BotonGuardar } from "../atomos/botonGuardar/BotonGuardar";

const RegistrarCita = ({
  urlApicitas,
  pacientes,
  tratamientos,
  doctores,
  consultorios,
}) => {

  const contenidoCitas = `JSON.stringify({
    "cita": {
      "paciente": document.getElementById("registroPaciente").innerText,
      "fecha": document.getElementById("registroFecha").value,
      "hora": document.getElementById("registroHora").value,
      "consultorio": document.getElementById("registroConsultorio").innerText,
      "medico": document.getElementById("registroMedico").innerText,
      "tratamiento": document.getElementById("registroTratamiento").innerText,
    },
  })`


  const date = new Date();
  const fechaActual = date
    .toLocaleDateString("es-CO", {
      formatMatcher: "basic",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/");
  let [fecha, setFecha] = useState(
    fechaActual[2] + "-" + fechaActual[1] + "-" + fechaActual[0]
  );

  var hours = new Date();
  const horaActual = hours.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  let [hora, setHora] = useState(horaActual);

  const [paciente, setPaciente] = useState(""); //Select
  const handleChangePaciente = (event) => {
    setPaciente(event.target.value);
  };
  const [tratamiento, setTratamiento] = useState(""); //Select
  const handleChangeTratamiento = (event) => {
    setTratamiento(event.target.value);
  };
  const [doctor, setDoctor] = useState(""); //Select
  const handleChangeDoctor = (event) => {
    setDoctor(event.target.value);
  };
  const [consultorio, setConsultorio] = useState(""); //Select
  const handleChangeConsultorio = (event) => {
    setConsultorio(event.target.value);
  };

  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div className="App">
      <div id="body">
        <body>
          <center>
            <hr/>
            <h4>Asignar Cita</h4>
            <hr/>
            <br/>
            <table className="tableRegistrar">
              <tbody>
                <tr>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel
                        id="registroPaciente-label"
                        className="select"
                      >
                        Paciente
                      </InputLabel>
                      <Select
                        labelId="registroPaciente-label"
                        id="registroPaciente"
                        value={paciente}
                        label="registroPaciente"
                        onChange={handleChangePaciente}
                      >
                        {pacientes.map((pacientes) => {
                          return (
                            <MenuItem
                              value={pacientes.id}
                              className="select-item"
                            >
                              {pacientes.paciente.nombre + " " + pacientes.paciente.apellido}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel
                        id="registroTratamiento-label"
                        className="select"
                      >
                        Tratamiento
                      </InputLabel>
                      <Select
                        labelId="registroTratamiento-label"
                        id="registroTratamiento"
                        value={tratamiento}
                        label="registroTratamiento"
                        onChange={handleChangeTratamiento}
                      >
                        {tratamientos.map((tratamientos) => {
                          return (
                            <MenuItem
                              value={tratamientos.id}
                              className="select-item"
                            >
                              {tratamientos.tratamiento.tipo}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                </tr>
                <tr>
                  <td>
                    <TextField
                      id="registroFecha"
                      type="date"
                      defaultValue={fecha}
                      onChange={() => setFecha(fecha)}
                      label="Fecha"
                      variant="outlined"
                      className="textField"
                      margin="dense"
                    />
                  </td>

                  <td>
                    <TextField
                      id="registroHora"
                      type="time"
                      defaultValue={hora}
                      onChange={() => setHora(hora)}
                      label="Hora"
                      variant="outlined"
                      className="textField"
                      margin="dense"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel
                        id="registroMedico-label"
                        className="select"
                      >
                        Médico
                      </InputLabel>
                      <Select
                        labelId="registroMedico-label"
                        id="registroMedico"
                        value={doctor}
                        label="Especialidad"
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
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel
                        id="registroConsultorio-label"
                        className="select"
                      >
                        Consultorio
                      </InputLabel>
                      <Select
                        labelId="registroConsultorio-label"
                        id="registroConsultorio"
                        value={consultorio}
                        label="registroConsultorio"
                        onChange={handleChangeConsultorio}
                      >
                        {consultorios.map((consultorios) => {
                          return (
                            <MenuItem
                              value={consultorios.id}
                              className="select-item"
                            >
                              {consultorios.consultorio.numero}
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
                    <BotonGuardar endIcon={<FaCalendarPlus />} titulo={'Asignar'} urlApi={urlApicitas} contenidoApi={contenidoCitas} setAlertMessage={setAlertMessage}></BotonGuardar>
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
    </div>
  );
};


export default RegistrarCita;
