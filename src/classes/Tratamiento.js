import { Consultorio } from './Consultorio';
import { Doctor } from './Persona';

export class Tratamiento {
    constructor(nombre, consultorio, doctor) {
        this.nombre = nombre;
        this.consultorio = new Consultorio(consultorio.numero, consultorio.nombre);
        this.doctor = new Doctor(doctor.identificacion, doctor.nombre, doctor.apellido, doctor.genero, doctor.especialidad);
    }

}