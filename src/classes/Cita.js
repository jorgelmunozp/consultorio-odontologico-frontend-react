import { useState }  from "react";
import { Paciente } from './User';
import { Tratamiento } from './Tratamiento';
import { Consultorio } from './Consultorio';
import { Doctor } from './User';
import { getDate } from '../helpers/getDate';
import { getTime } from '../helpers/getTime';

export class Cita {
    constructor(paciente, consultorio, doctor, tratamiento) {
        this.paciente = new Paciente(paciente.nombre, paciente.apellido).user;
        this.fecha = getDate[2] + "/" + getDate[1] + "/" + getDate[0];
        this.hora = getTime;
        this.consultorio = new Consultorio(consultorio.numero,consultorio.nombre);
        this.doctor = new Doctor(doctor.nombre, doctor.apellido).user;
        this.tratamiento = new Tratamiento(tratamiento.nombre, tratamiento.consultorio, tratamiento.doctor);
    }
}