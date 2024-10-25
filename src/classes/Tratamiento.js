import { useState }  from "react";
import { Consultorio } from './Consultorio';
import { Doctor } from './User';

export class Tratamiento {
    constructor(nombre, consultorio, doctor) {
        this.nombre = nombre;
        this.consultorio = new Consultorio(consultorio.numero, consultorio.nombre);
        this.doctor = new Doctor(doctor.nombre, doctor.apellido).user;
    }

    getState = () => {                                               // Method
        const [nombre, setNombre] = useState("");                   //Input Nombre
        const [consultorio, setConsultorio] = useState("");         //Select Consultorio
        const [doctor, setDoctor] = useState("");                   //Select Doctor
        const state = [
          { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
          { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio(event.target.value.split(" ")[0], event.target.value.split(" ")[1]) ), setState: setConsultorio },
          { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor(event.target.value.split(" ")[0], event.target.value.split(" ")[1]).user ), setState: setDoctor }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter


}