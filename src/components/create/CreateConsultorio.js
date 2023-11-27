import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { TextField } from "@mui/material";
import { FaClinicMedical } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreateConsultorio = ({ urlApiConsultorios,consultorios }) => {
  const itemConsultorio = `{
    "consultorio": {
      "nombre": document.getElementById("ConsultoriosNombre").value,
      "numero": document.getElementById("ConsultoriosNumero").value
    },
  }`;
  const contenidoConsultorios = `JSON.stringify(` + itemConsultorio  + `)`;

  const [numero, setNumero] = useState("");         //Input Número
  const handleChangeNumero = (event) => { setNumero(event.target.value); };
  const [nombre, setNombre] = useState("");         //Input Nombre
  const handleChangeNombre = (event) => { setNombre(event.target.value); };
  const [responseStatus, setResponseStatus] = useState("");

  // const [create, setCreate] = useState(false);

  let createFlag = false;
  if(numero !== "" && nombre !== ""){
    createFlag = true;
    console.log(createFlag)
  }
  // if(numero !== "" && nombre !== "") {
  //   setCreate(true);
  //   console.log(createFlag)
  // }

  if(200 <= responseStatus && responseStatus <= 299){
    // consultorios.push(itemConsultorio);
    Swal.fire("Consultorio Registrado", "", "success");
    createFlag = false;
    console.log(createFlag)
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
                  <BotonGuardar endIcon={<FaClinicMedical />} titulo={'Registrar'} urlApi={urlApiConsultorios} contenidoApi={contenidoConsultorios} setResponseStatus={setResponseStatus} createFlag={createFlag}></BotonGuardar>
                </td>
              </tr>
            </tbody>
          </table>
        </center>
      </body>
    </div>
  );
};