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
        <table className='contentHome'>
          <thead>
            <tr>
              <th colSpan={3}><h3> Servicios Odontológicos </h3></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='App-body-icono'>
                <TbDental size={iconSize}/>
                <p className='labelHome'>Blanqueamiento</p>
              </td>
              <td className='App-body-icono'>
                <TbDentalBroken size={iconSize}/>
                <p className='labelHome'>Endodoncia</p>
              </td>
              <td className='App-body-icono'>
                <TbDentalOff size={iconSize}/>
                <p className='labelHome'>Cirugía</p>
              </td>
            </tr>
            <tr>
              <td className='App-body-icono'>
                <LiaToothSolid size={iconSize}/>
                <p className='labelHome'>Odontopediatría</p>
              </td>
              <td className='App-body-icono'>
                <PiTooth size={iconSize}/>
                <p className='labelHome'>Ortodoncia</p>
              </td>
              <td className='App-body-icono'>
                <LiaTeethSolid size={iconSize}/>
                <p className='labelHome'>Periodoncia</p>
              </td>
            </tr>
            <tr>
              <td className='App-body-icono'>
                <FaTeeth size={iconSize}/>
                <p className='labelHome'>Radiología</p>
              </td>
              <td className='App-body-icono'>
                <GiTooth size={iconSize}/>
                <p className='labelHome'>Prostodoncia</p>
              </td>
              <td className='App-body-icono'>
                <FaTooth size={iconSize}/>
                <p className='labelHome'>Odontología</p>
              </td>
            </tr>
            <tr>
              <td className='App-body-icono'>
                <LiaTeethOpenSolid size={iconSize}/>
                <p className='labelHome'>Diseño Sonrisa</p>
              </td>
              <td className='App-body-icono'>
                <PiToothFill size={iconSize}/>
                <p className='labelHome'>Patología</p>
              </td>
              <td className='App-body-icono'>
                <FaTeethOpen size={iconSize}/>
                <p className='labelHome'>Profilaxis</p>
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    </div>
  )
}

export default Inicio;