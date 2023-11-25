import Swal from 'sweetalert2';
import React, { useState }  from "react";
import { TextField } from "@mui/material";
import { FaClinicMedical } from "react-icons/fa";
import { BotonGuardar } from "../../atoms/botonGuardar/BotonGuardar";

export const CreateConsultorio = ({
  urlApiConsultorios
}) => {

  const contenidoConsultorios = `JSON.stringify({
    "consultorio": {
      "numero": document.getElementById("ConsultoriosNumero").value,
      "nombre": document.getElementById("ConsultoriosNombre").value,
    },
  })`

  const [responseStatus, setResponseStatus] = useState("");

  if(200 <= responseStatus && responseStatus <= 299){
    Swal.fire("Consultorio Registrado", "", "success");
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
                  <TextField
                    id="ConsultoriosNumero"
                    label="Número"
                    type="number"
                    variant="outlined"
                    className="textField"
                    margin="dense"
                    autoComplete="off"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <TextField
                    id="ConsultoriosNombre"
                    label="Nombre"
                    variant="outlined"
                    className="textField"
                    margin="dense"
                    autoComplete="off"
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