import Swal from 'sweetalert2';
import { useState }  from "react";
import { Consultorio } from '../../../classes/Consultorio';
import { TextField } from "@mui/material";
import { FaClinicMedical } from "react-icons/fa";
import { BotonGuardar } from "../../../forms/buttons/BotonGuardar";

export const CreateConsultorio = ({ urlApi }) => {
  let item = "";
  const [numero, setNumero] = useState("");               //Input Número
  const handleChangeNumero = (event) => { setNumero(event.target.value); };
  const [nombre, setNombre] = useState("");               //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");
  
  if(numero!=="" && nombre!=="") { 
    const objectClass = new Consultorio(numero,nombre);   //Object from Class
    item = `JSON.stringify({                              
      ${Consultorio.name.toLowerCase()}: ${JSON.stringify(objectClass)}
    })`;                                                  //JSON Object from Object Class
  }

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Consultorio Registrado", "", "success");
    setNumero("");
    setNombre("");
    setResponseStatus(0);
  } else if(400 <= responseStatus && responseStatus <= 499){
    Swal.fire("Consultorio No Registrado", "", "error");
    setResponseStatus(0);
  } else if(500 <= responseStatus && responseStatus <= 599){
    Swal.fire("Consultorio No Registrado", "", "error");
    setResponseStatus(0);
  }

  return (
    <div className="App">
      <body className='mt-4 mt-sm-5'>
        <center>
          <h5 className='century-gothic main-color fs-sm-2'>Registrar Consultorio</h5>
        </center>
        <div className='container-fluid mt-2 mt-sm-5'>
          <div className='row'>
            <div className='col'>
              <TextField value={numero} onChange={handleChangeNumero} id="ConsultoriosNumero" label="Número" type="number" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <TextField value={nombre} onChange={handleChangeNombre} id="ConsultoriosNombre" label="Nombre" variant="outlined" fullWidth margin="dense" autoComplete="off"/>
            </div>
          </div>
          <div className='row mt-4 mt-sm-5'>
            <div className='col'>
              <BotonGuardar endIcon={<FaClinicMedical />} titulo={'Registrar'} urlApi={urlApi} contenidoApi={item} setResponseStatus={setResponseStatus}></BotonGuardar>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};