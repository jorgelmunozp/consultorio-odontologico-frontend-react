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
              <th colSpan={3}><h4> Servicios Odontológicos </h4></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='main-color'>
                <TbDental size={iconSize}/>
                <p className='labelHome'>Blanqueamiento</p>
              </td>
              <td className='main-color'>
                <TbDentalBroken size={iconSize}/>
                <p className='labelHome'>Endodoncia</p>
              </td>
              <td className='main-color'>
                <TbDentalOff size={iconSize}/>
                <p className='labelHome'>Cirugía</p>
              </td>
            </tr>
            <tr>
              <td className='main-color'>
                <LiaToothSolid size={iconSize}/>
                <p className='labelHome'>Odontopediatría</p>
              </td>
              <td className='main-color'>
                <PiTooth size={iconSize}/>
                <p className='labelHome'>Ortodoncia</p>
              </td>
              <td className='main-color'>
                <LiaTeethSolid size={iconSize}/>
                <p className='labelHome'>Periodoncia</p>
              </td>
            </tr>
            <tr>
              <td className='main-color'>
                <FaTeeth size={iconSize}/>
                <p className='labelHome'>Radiología</p>
              </td>
              <td className='main-color'>
                <GiTooth size={iconSize}/>
                <p className='labelHome'>Prostodoncia</p>
              </td>
              <td className='main-color'>
                <FaTooth size={iconSize}/>
                <p className='labelHome'>Odontología</p>
              </td>
            </tr>
            <tr>
              <td className='main-color'>
                <LiaTeethOpenSolid size={iconSize}/>
                <p className='labelHome'>Diseño Sonrisa</p>
              </td>
              <td className='main-color'>
                <PiToothFill size={iconSize}/>
                <p className='labelHome'>Patología</p>
              </td>
              <td className='main-color'>
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