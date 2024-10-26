import { useState }  from "react";
import { Consultorio } from './Consultorio';
import { Doctor } from './User';

export class Tratamiento {
    constructor({ nombre:nombre='', consultorio:consultorio='', doctor:doctor=''}) {
        this.nombre = {nombre}.nombre;
        this.consultorio = new Consultorio({ consultorio:{consultorio} });
        this.doctor = new Doctor({ doctor:doctor });
    }

    getState = () => {                                               // Method
        const [nombre, setNombre] = useState("");                    // Input Nombre state
        const [consultorio, setConsultorio] = useState("");          // Select Consultorio state
        const [doctor, setDoctor] = useState("");                    // Select Doctor state
        const state = [
          { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
          { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio(event.target.value), setState: setConsultorio },
          { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor(event.target.value), setState: setDoctor }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state


}