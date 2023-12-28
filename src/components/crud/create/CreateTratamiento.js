import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaStethoscope } from "react-icons/fa";
import { BotonGuardar } from "../../../atoms/botonGuardar/BotonGuardar";

export const CreateTratamiento = ({ urlApiTratamientos,consultorios,doctores }) => {
  const contenidoTratamientos = `JSON.stringify({
    "tratamiento": {
      "nombre": document.getElementById("nombreTratamiento").value,
      "consultorio": document.getElementById("consultorioTratamiento").innerText,
      "doctor": document.getElementById("doctorTratamiento").innerText,
    },
  })`

  const [nombre, setNombre] = useState("");           //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [consultorio, setConsultorio] = useState(""); //Select Consultorio
  const handleChangeConsultorio = (event) => { setConsultorio(event.target.value); };
  const [doctor, setDoctor] = useState("");           //Select Doctor
  const handleChangeDoctor = (event) => { setDoctor(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  let createFlag = false;
  if(nombre!=="" && consultorio!=="" && doctor!==""){ createFlag = true; }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Tratamiento Registrado", "", "success");
    setNombre("");
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
      <body className='mt-3 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar Tratamiento</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
          <div className='row'>
            <div className='col'>
              <TextField value={nombre} onChange={handleChangeNombre} id="nombreTratamiento" label="Nombre" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="nombreTratamiento-label" className="select">Consultorio</InputLabel>
                <Select value={consultorio} onChange={handleChangeConsultorio} id="consultorioTratamiento" label="consultorioTratamiento" labelId="consultorioTratamiento-label">
                  {consultorios.map((consultorios) => {
                    return (
                      <MenuItem value={consultorios.id} key={consultorios.id}>
                        {consultorios.consultorio.numero}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="doctorTratamiento-label" className="select">Médico</InputLabel>
                <Select value={doctor} onChange={handleChangeDoctor} id="doctorTratamiento" label="doctorTratamiento" labelId="doctorTratamiento-label">
                  {doctores.map((doctores) => {
                    return (
                      <MenuItem value={doctores.id} key={doctores.id}>
                        {doctores.doctor.nombre + " " + doctores.doctor.apellido}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApiTratamientos}  contenidoApi={contenidoTratamientos} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
            </div>
          </div>              
			</div>

          {/* <table className="w-100">
            <tbody>
              <tr>
                <td colSpan={2}>
                  <TextField value={nombre} onChange={handleChangeNombre}
                    id="nombreTratamiento" label="Nombre" variant="outlined"
                    margin="dense" autoComplete="off"
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
                          <MenuItem value={consultorios.id}>
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
                          <MenuItem value={doctores.id}>
                            {doctores.doctor.nombre + " " + doctores.doctor.apellido}
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
                  <BotonGuardar endIcon={<FaStethoscope />} titulo={'Registrar'} urlApi={urlApiTratamientos}  contenidoApi={contenidoTratamientos} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table> */}
        
      </body>
    </div>
  );
};