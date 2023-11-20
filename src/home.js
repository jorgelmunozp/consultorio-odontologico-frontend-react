import React from 'react'

import { FaTooth } from 'react-icons/fa';
import { LiaToothSolid } from "react-icons/lia";
import { PiTooth, PiToothFill } from "react-icons/pi";
import { GiTooth } from "react-icons/gi";
import { LiaTeethSolid, LiaTeethOpenSolid } from "react-icons/lia";
import { FaTeeth, FaTeethOpen } from "react-icons/fa";
import { TbDental, TbDentalBroken, TbDentalOff } from "react-icons/tb";

export const Inicio = () => {

  return (
    <div className="App">
        <table className="table">
          <center>
            <tbody>
              <tr>
                <td><h3>Sistema de Información Consultorio Odontológico</h3></td>
              </tr>
              <tr>
                <td className='App-body-icono'>
                  <LiaToothSolid size={60}/>
                  <FaTooth size={60}/>
                  <PiTooth size={60}/>
                </td>
              </tr>
              <tr>
                <td className='App-body-icono'>
                  <FaTeeth size={60}/>
                  <GiTooth size={60}/>
                  <LiaTeethSolid size={60}/>
                </td>
              </tr>
              <tr>
                <td className='App-body-icono'>
                  <LiaTeethOpenSolid size={60}/>
                  <PiToothFill size={60}/>
                  <FaTeethOpen size={60}/>
                </td>
              </tr>
              <tr>
                <td className='App-body-icono'>
                  <TbDental size={60}/>
                  <TbDentalBroken size={60}/>
                  <TbDentalOff size={60}/>
                </td>
              </tr>
            </tbody>
          </center>
        </table>
      
    </div>
  )
}

export default Inicio;