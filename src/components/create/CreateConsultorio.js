import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { TextField } from "@mui/material";
import { FaClinicMedical } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;
let doctores;
await fetch(urlApiDoctores)                      //API REST para consumo de la tabla Citas de la base de datos
        .then(response => response.json())
        .then(data => doctores = data);
console.log("doctores 1: ",doctores)

export const CreateConsultorio = ({
  urlApiConsultorios
}) => {

  const contenidoConsultorios = `JSON.stringify({
    "consultorio": {
      "numero": document.getElementById("ConsultoriosNumero").value,
      "nombre": document.getElementById("ConsultoriosNombre").value,
    },
  })`

  const [numero, setNumero] = React.useState("");         //Input Número
  const handleChangeNumero = (event) => { setNumero(event.target.value); };
  const [nombre, setNombre] = React.useState("");         //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  if(200 <= responseStatus && responseStatus <= 299){
    // doctores.push("xxx");
    // console.log("doctores 2: ",doctores)
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
      <body>
        <center>
          <hr/>
          <h4>Registrar Consultorio</h4>
          <hr/>
          <br/>
          <table className="tableRegistrar">
            <tbody>
              <tr>
                <td>
                  <TextField value={numero} onChange={handleChangeNumero}
                    id="ConsultoriosNumero" label="Número" type="number" variant="outlined" 
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField value={nombre} onChange={handleChangeNombre}
                    id="ConsultoriosNombre" label="Nombre" variant="outlined"
                    className="textField" margin="dense" autoComplete="off"
                  />
                </td>
              </tr>
              <br></br>
              <tr>
                <td colSpan={2}>
                  <BotonGuardar endIcon={<FaClinicMedical />} titulo={'Registrar'} urlApi={urlApiConsultorios} contenidoApi={contenidoConsultorios} setResponseStatus={setResponseStatus}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};