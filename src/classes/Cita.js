import { useState }  from "react";
import { Paciente } from './User';
import { Tratamiento } from './Tratamiento';
import { Consultorio } from './Consultorio';
import { Doctor } from './User';
import { getDate } from '../helpers/getDate';
import { getTime } from '../helpers/getTime';

export class Cita {
    constructor({ paciente:paciente='', consultorio:consultorio='', doctor:doctor='', tratamiento:tratamiento='' }) {
        this.paciente = new Paciente({ paciente:{paciente} });
        this.fecha = getDate[2] + "/" + getDate[1] + "/" + getDate[0];
        this.hora = getTime;
        this.consultorio = new Consultorio({ consultorio:{consultorio} });
        this.doctor = new Doctor({ doctor:{doctor} });
        this.tratamiento = new Tratamiento({ tratamiento:{tratamiento} });
    }

    getState = () => {                                            // Method
        const [paciente, setPaciente] = useState("");             //Select Paciente
        let [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
        let [hora, setHora] = useState(getTime);
        const [consultorio, setConsultorio] = useState("");       //Select Consultorio
        const [doctor, setDoctor] = useState("");                 //Select Doctor
        const [tratamiento, setTratamiento] = useState("");       //Select Tratamiento      
        const state = [
          { paciente: paciente, type:"dropdown", handleChange: (event) => setPaciente(event.target.value), setState: setPaciente },
          { fecha: fecha, type:"date", handleChange: (event) => setFecha(event.target.value), setState: setFecha },
          { hora: hora, type:"time", handleChange: (event) => setHora(event.target.value), setState: setHora },
          { consultorio: consultorio, type:"dropdown", handleChange: (event) => setConsultorio(event.target.value), setState: setConsultorio },
          { doctor: doctor, type:"dropdown", handleChange: (event) => setDoctor(event.target.value), setState: setDoctor },
          { tratamiento: tratamiento, type:"dropdown", handleChange: (event) => setTratamiento(event.target.value), setState: setTratamiento }
        ];
        return( state )
    }      
    get state () { return this.getState() }                        // Getter state

}