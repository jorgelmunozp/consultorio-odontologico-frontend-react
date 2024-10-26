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
          { key:'nombre', value: nombre, type:"text", setState: setNombre, handleChange: (event) => setNombre(event.target.value) },
          { key:'consultorio', value: consultorio, type:"dropdown", setState: setConsultorio, handleChange: (event) => setConsultorio(event.target.value) },
          { key:'doctor', value: doctor, type:"dropdown", setState: setDoctor, handleChange: (event) => setDoctor(event.target.value) }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state


}