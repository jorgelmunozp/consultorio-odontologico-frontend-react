import React, { useState }  from "react";
import { TextField } from "@mui/material";
import { FaClinicMedical } from "react-icons/fa";
import { BotonGuardar } from "../atomos/botonGuardar/BotonGuardar";

const RegistrarConsultorios = ({
  urlApiconsultorios
}) => {

  const contenidoConsultorios = `JSON.stringify({
    "consultorio": {
      "numero": document.getElementById("ConsultoriosNumero").value,
      "nombre": document.getElementById("ConsultoriosNombre").value,
    },
  })`

  const [alertMessage, setAlertMessage] = useState("");

  return (
    <div className="App">
      <body>
        <center>
          <hr/>
          <h4>Registrar Consultorio</h4>
          <hr/>
          <br/>
          <table className="table">
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
                  <BotonGuardar endIcon={<FaClinicMedical />} titulo={'Registrar'} urlApi={urlApiconsultorios} contenidoApi={contenidoConsultorios} setAlertMessage={setAlertMessage}></BotonGuardar>
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


export default RegistrarConsultorios;
