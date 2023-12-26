import Swal from 'sweetalert2';
import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaCalendarPlus } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";
import { getTime } from '../../helpers/getTime';
import { getDate } from '../../helpers/getDate';

export const CreateCita = ({ urlApiCitas,pacientes,tratamientos,doctores,consultorios }) => {
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

  const [paciente, setPaciente] = useState("");             //Select Paciente
  const handleChangePaciente = (event) => { setPaciente(event.target.value); };
  const [tratamiento, setTratamiento] = useState("");       //Select Tratamiento
  const handleChangeTratamiento = (event) => { setTratamiento(event.target.value); };
  const [doctor, setDoctor] = useState("");                 //Select Doctor
  const handleChangeDoctor = (event) => { setDoctor(event.target.value); };
  const [consultorio, setConsultorio] = useState("");       //Select Consultorio
  const handleChangeConsultorio = (event) => { setConsultorio(event.target.value); };
  const [responseStatus, setResponseStatus] = useState(0);
  let [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
  const handleChangeFecha = (event) => { setFecha(event.target.value); };
  let [hora, setHora] = useState(getTime);
  const handleChangeHora = (event) => { setHora(event.target.value); };

  let createFlag = false;
  if(paciente!=="" && fecha!=="" && hora!=="" && tratamiento!=="" && doctor!=="" && consultorio!==""){ createFlag = true; }

  if(200 <= responseStatus && responseStatus <= 299){
    setResponseStatus(0);
    Swal.fire("Cita Registrada", "", "success");
    setPaciente("");
    setTratamiento("");
    setConsultorio("");
    setDoctor("");
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
            <table className="w-100">
              <tbody>
                <tr>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="registroPaciente-label" className="select">
                        Paciente
                      </InputLabel>
                      <Select
                        id="registroPaciente" label="registroPaciente" labelId="registroPaciente-label"
                        value={paciente} onChange={handleChangePaciente}
                      >
                        {pacientes.map((pacientes) => {
                          return (
                            <MenuItem value={pacientes.id} className="select-item">
                              {pacientes.paciente.nombre + " " + pacientes.paciente.apellido}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="registroTratamiento-label" className="select">
                        Tratamiento
                      </InputLabel>
                      <Select
                        id="registroTratamiento" label="registroTratamiento" labelId="registroTratamiento-label"
                        value={tratamiento} onChange={handleChangeTratamiento}
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
                <tr>
                  <td>
                    <TextField
                      id="registroFecha" type="date" label="Fecha"
                      // defaultValue={fecha} onChange={() => setFecha(fecha)}
                      defaultValue={fecha} onChange={handleChangeFecha}
                      
                      variant="outlined" className="textField" margin="dense"
                    />
                  </td>

                  <td>
                    <TextField
                      id="registroHora" type="time" label="Hora"
                      // defaultValue={hora} onChange={() => setHora(hora)}
                      defaultValue={hora} onChange={handleChangeHora}
                      variant="outlined" className="textField" margin="dense"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="registroDoctor-label" className="select">
                        Doctor
                      </InputLabel>
                      <Select
                        id="registroDoctor" label="Especialidad" labelId="registroDoctor-label"
                        value={doctor} onChange={handleChangeDoctor}
                      >
                        {doctores.map((doctores) => {
                          return (
                            <MenuItem value={doctores.id} className="select-item">
                              {doctores.doctor.nombre + " " + doctores.doctor.apellido}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </td>
                  <td>
                    <FormControl fullWidth margin="dense">
                      <InputLabel id="registroConsultorio-label" className="select">
                        Consultorio
                      </InputLabel>
                      <Select
                        id="registroConsultorio" label="registroConsultorio" labelId="registroConsultorio-label"
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
                </tr>
                <br></br>
                <tr>
                  <td colSpan={2}>
                    <BotonGuardar endIcon={<FaCalendarPlus />} titulo={'Asignar'} urlApi={urlApiCitas} contenidoApi={contenidoCitas} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
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
