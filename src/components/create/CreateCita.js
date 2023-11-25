import Swal from 'sweetalert2';
import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaCalendarPlus } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";
import { getTime } from '../../helpers/getTime';
import { getDate } from '../../helpers/getDate';

export const CreateCita = ({
  urlApiCitas,
  pacientes,
  tratamientos,
  doctores,
  consultorios
}) => {
  const contenidoCitas = `JSON.stringify({
    "cita": {
      "paciente": document.getElementById("registroPaciente").innerText,
      "fecha": document.getElementById("registroFecha").value,
      "hora": document.getElementById("registroHora").value,
      "consultorio": document.getElementById("registroConsultorio").innerText,
      "doctor": document.getElementById("registroDoctor").innerText,
      "tratamiento": document.getElementById("registroTratamiento").innerText,
    },
  })`

  let [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
  let [hora, setHora] = useState(getTime);

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

  const [responseStatus, setResponseStatus] = useState(0);

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Cita Registrada", "", "success");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    Swal.fire("Cita No Registrada", "", "error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    Swal.fire("Cita No Registrada", "", "error");
    setResponseStatus(0);
  }
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
                              {tratamientos.tratamiento.nombre}
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
                        id="registroDoctor-label"
                        className="select"
                      >
                        Médico
                      </InputLabel>
                      <Select
                        labelId="registroDoctor-label"
                        id="registroDoctor"
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
                    <BotonGuardar endIcon={<FaCalendarPlus />} titulo={'Asignar'} urlApi={urlApiCitas} contenidoApi={contenidoCitas} setResponseStatus={setResponseStatus}></BotonGuardar>
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
