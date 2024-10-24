import Swal from 'sweetalert2';
import { useState } from "react";
import { Cita } from '../../../classes/Cita';
import { Modal } from '../../modal/Modal';
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { FaCalendarPlus } from "react-icons/fa";
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";
import { getTime } from '../../../helpers/getTime';
import { getDate } from '../../../helpers/getDate';
import { Success } from '../../icons/success/Success';
import { Error } from '../../icons/error/Error';

export const CreateCita = ({ urlApi,pacientes,tratamientos,doctores,consultorios }) => {
  let item = "";
  const [paciente, setPaciente] = useState("");             //Select Paciente
  const handleChangePaciente = (event) => { setPaciente(event.target.value); };
  const [consultorio, setConsultorio] = useState("");       //Select Consultorio
  const handleChangeConsultorio = (event) => { setConsultorio(event.target.value); };  
  const [doctor, setDoctor] = useState("");                 //Select Doctor
  const handleChangeDoctor = (event) => { setDoctor(event.target.value); };
  const [tratamiento, setTratamiento] = useState("");       //Select Tratamiento
  const handleChangeTratamiento = (event) => { setTratamiento(event.target.value); };
  let [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
  const handleChangeFecha = (event) => { setFecha(event.target.value); };
  let [hora, setHora] = useState(getTime);
  const handleChangeHora = (event) => { setHora(event.target.value); };
  const [responseStatus, setResponseStatus] = useState(0);
  const [alert, setAlert] = useState(false); 
  
  if(paciente!=="" && fecha!=="" && hora!=="" && consultorio!=="" && doctor!=="" && tratamiento!==""){ 
    const objectClass = new Cita(paciente, consultorio, doctor, tratamiento);   //Object from Class
    item = `JSON.stringify({                              
      ${Cita.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`;                                                                        //JSON Object from Object Class
  }

  if(200 <= responseStatus && responseStatus <= 299){
    // Swal.fire("Cita Registrada", "", "success");
    setPaciente("");
    setTratamiento("");
    setConsultorio("");
    setDoctor("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    setAlert("error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    setAlert("error");
    setResponseStatus(0);
  }
  return (
    <div className="App" data-mdb-toggle="animation" data-mdb-animation-reset="true" data-mdb-animation="slide-out-right">
      <div className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Asignar Cita</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
          <div className='row d-block d-sm-flex'>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="registroPaciente-label">Paciente</InputLabel>
                <Select value={paciente} onChange={handleChangePaciente} id="registroPaciente" label="registroPaciente" labelId="registroPaciente-label">
                  {pacientes.map((pacientes) => {
                    return (
                      <MenuItem value={pacientes.id} key={pacientes.id}>
                        {pacientes.paciente.nombre + " " + pacientes.paciente.apellido}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                <InputLabel id="registroTratamiento-label" >Tratamiento</InputLabel>
                <Select value={tratamiento} onChange={handleChangeTratamiento} id="registroTratamiento" label="registroTratamiento" labelId="registroTratamiento-label">
                  {tratamientos.map((tratamientos) => {
                    return (
                      <MenuItem value={tratamientos.id} key={tratamientos.id}>
                        {tratamientos.tratamiento.nombre}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className='row d-block d-sm-flex'>
            <div className='col'>
              <TextField defaultValue={fecha} onChange={handleChangeFecha} id="registroFecha" type="date" label="Fecha" variant="outlined" fullWidth margin="dense"/>
            </div>
            <div className='col'>
              <TextField defaultValue={hora} onChange={handleChangeHora} id="registroHora" type="time" label="Hora" variant="outlined" fullWidth margin="dense"/>
            </div>
          </div>
          <div className='row d-block d-sm-flex'>
            <div className='col'>
              <FormControl fullWidth margin="dense">
                  <InputLabel id="registroDoctor-label" >Doctor</InputLabel>
                  <Select value={doctor} onChange={handleChangeDoctor} id="registroDoctor" label="Especialidad" labelId="registroDoctor-label">
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
            <div className='col'>
              <FormControl fullWidth margin="dense">
                  <InputLabel id="registroConsultorio-label" >Consultorio</InputLabel>
                  <Select value={consultorio} onChange={handleChangeConsultorio} id="registroConsultorio" label="registroConsultorio" labelId="registroConsultorio-label">
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
          </div>
          <div className='row mt-2 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<FaCalendarPlus />} titulo={'Asignar'} urlApi={urlApi} contenidoApi={item} setResponseStatus={setResponseStatus} ></BotonGuardar>
            </div>
          </div>   
        </div>
      </div>
      { alert === 'success' && <Modal Icon={Success} iconColor={'#0f0'} setOpen={setAlert} title={'Cita Registrada'} buttons={1} />  }
      { alert === 'error' && <Modal Icon={Error} iconColor={'#f00'} setOpen={setAlert} title={'Cita No Registrada'} buttons={1} />  }
    </div>
  );
};
