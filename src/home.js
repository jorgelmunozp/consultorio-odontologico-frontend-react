import React from 'react'

import { FaTooth } from 'react-icons/fa';
import { LiaToothSolid } from "react-icons/lia";
import { PiTooth, PiToothFill } from "react-icons/pi";
import { GiTooth } from "react-icons/gi";
import { LiaTeethSolid, LiaTeethOpenSolid } from "react-icons/lia";
import { FaTeeth, FaTeethOpen } from "react-icons/fa";
import { TbDental, TbDentalBroken, TbDentalOff } from "react-icons/tb";

const iconSize = 30;

const services = [
  {
      "title":"Blanqueamiento",
      "icon":<TbDental size={iconSize}/>,
      "content":"Blanqueamiento"
  },
  {
      "title":"Endodoncia",
      "icon":<TbDentalBroken size={iconSize}/>,
      "content":"Endodoncia"
  },    
  {
      "title":"Cirugía",
      "icon":<TbDentalOff size={iconSize}/>,
      "content":"Cirugía"
  },
  {
      "title":"Pediatría",
      "icon":<LiaToothSolid size={iconSize}/>,
      "content":"Pediatría"
  },  
  {
    "title":"Ortodoncia",
    "icon":<PiTooth size={iconSize}/>,
    "content":"Ortodoncia"
  },
  {
    "title":"Periodoncia",
    "icon":<LiaTeethSolid size={iconSize}/>,
    "content":"Periodoncia"
  },    
  {
    "title":"Radiología",
    "icon":<FaTeeth size={iconSize}/>,
    "content":"Radiología"
  },
  {
    "title":"Prostodoncia",
    "icon":<GiTooth size={iconSize}/>,
    "content":"Prostodoncia"
  },
  {
    "title":"Odontología",
    "icon":<FaTooth size={iconSize}/>,
    "content":"Odontología"
  },
  {
    "title":"Diseño Sonrisa",
    "icon":<LiaTeethOpenSolid size={iconSize}/>,
    "content":"Diseño Sonrisa"
  },
  {
    "title":"Patología",
    "icon":<PiToothFill size={iconSize}/>,
    "content":"Patología"
  },
  {
    "title":"Profilaxis",
    "icon":<FaTeethOpen size={iconSize}/>,
    "content":"Profilaxis"
  }                   
];

export const Inicio = () => {
  return (
    <div className="App">
        <center><h5 className='main-color pt-2 pt-sm-4'>Servicios Odontológicos</h5></center> 
        <div className="container-fluid bg-light pt-2 pt-sm-3 px-0">
          <div className="row">   
            {
              services.map((service) => {
                return (
                  <div key={ service.title } className="col-lg-4 col-sm-6 col-6 mb-1 mb-sm-2 text-center">
                    <div className="card border-0 shadow rounded-xs pt-0">
                      <div className="card-body"> 
                        <i className="text-secondary">{ service.icon }</i>
                        <h6 className="main-color fs-sm-1 mt-0 mb-0 mb-sm-2 text-nowrap">{ service.title }</h6>
                        {/* <p className='text-muted text-justify'>{ service.content }</p> */}
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
    </div>
  )
}