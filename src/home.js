import React from 'react'

import { FaTooth } from 'react-icons/fa';
import { LiaToothSolid } from "react-icons/lia";
import { PiTooth, PiToothFill } from "react-icons/pi";
import { GiTooth } from "react-icons/gi";
import { LiaTeethSolid, LiaTeethOpenSolid } from "react-icons/lia";
import { FaTeeth, FaTeethOpen } from "react-icons/fa";
import { TbDental, TbDentalBroken, TbDentalOff } from "react-icons/tb";

export const Inicio = () => {
  const iconSize = 50;
  return (
    <div className="App">
      <center>
        <table>
            <thead>
              <tr>
                <td><h3>Sistema de Información Consultorio Odontológico</h3></td>
              </tr>
            </thead>
            <tbody>
              <center>
                <tr>
                  <td className='App-body-icono'>
                    <LiaToothSolid size={iconSize}/>
                    <p>Blanqueamiento</p>
                  </td>
                  <td className='App-body-icono'>
                    <PiTooth size={iconSize}/>
                    <p>Ortodoncia</p>
                  </td>
                  <td className='App-body-icono'>
                    <LiaTeethSolid size={iconSize}/>
                    <p>Periodoncia</p>
                  </td>
                </tr>
                <tr>
                  <td className='App-body-icono'>
                    <FaTeeth size={iconSize}/>
                    <p>Periodoncia</p>
                  </td>
                  <td className='App-body-icono'>
                    <GiTooth size={iconSize}/>
                    <p>Periodoncia</p>
                  </td>
                  <td className='App-body-icono'>
                    <FaTooth size={iconSize}/>
                    <p>Implantes</p>
                  </td>
                </tr>
                <tr>
                  <td className='App-body-icono'>
                    <LiaTeethOpenSolid size={iconSize}/>
                    <p>Diseño de Sonrisa</p>
                  </td>
                  <td className='App-body-icono'>
                    <PiToothFill size={iconSize}/>
                    <p>Diseño de Sonrisa</p>
                  </td>
                  <td className='App-body-icono'>
                    <FaTeethOpen size={iconSize}/>
                    <p>Diseño de Sonrisa</p>
                  </td>
                </tr>
                <tr>
                  <td className='App-body-icono'>
                    <TbDental size={iconSize}/>
                    <p>Extracción</p>
                  </td>
                  <td className='App-body-icono'>
                    <TbDentalBroken size={iconSize}/>
                    <p>Endodoncia</p>
                  </td>
                  <td className='App-body-icono'>
                    <TbDentalOff size={iconSize}/>
                    <p>Extracción</p>
                  </td>
                </tr>
              </center>
            </tbody>
          </table>
        </center>
    </div>
  )
}

export default Inicio;