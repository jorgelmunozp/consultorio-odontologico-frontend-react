import { useState }  from "react";
import { Consultorio } from './Consultorio';
import { Doctor } from './User';

export class Tratamiento {
    // constructor({nombre:nombre}, consultorio, doctor) {
        // this.nombre = nombre;
        // this.consultorio = new Consultorio(consultorio.numero, consultorio.nombre);
        // this.doctor = new Doctor(doctor.nombre, doctor.apellido).user;

    constructor({ nombre:nombre, consultorio:consultorio, doctor:doctor }) {
        this.nombre = {nombre}.nombre;
        this.consultorio = new Consultorio({ numero:{consultorio}.numero, nombre:{consultorio}.nombre });
        this.doctor = new Doctor({ nombre:"A", apellido:{doctor}.apellido }).user;
        // this.doctor = new Doctor({ nombre:{doctor}.nombre, apellido:{doctor}.apellido }).user;
    }

    getState = () => {                                               // Method
        const [nombre, setNombre] = useState("");                    // Input Nombre state
        const [consultorio, setConsultorio] = useState("");          // Select Consultorio state
        const [doctor, setDoctor] = useState("");                    // Select Doctor state
        const state = [
          { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
          { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio( new Consultorio({ numero:event.target.value.split(" ")[0], nombre:event.target.value.split(" ")[1] }) ), setState: setConsultorio },
          { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor( new Doctor({ nombre:event.target.value.split(" ")[0], apellido:event.target.value.split(" ")[1] }) ), setState: setDoctor }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state


}