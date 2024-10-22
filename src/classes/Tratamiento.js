import { Consultorio } from './Consultorio';
import { Doctor } from './Doctor';

export class Tratamiento {
    constructor(nombre, consultorio, doctor) {
        this.nombre = nombre;
        this.consultorio = new Consultorio(consultorio.numero, consultorio.nombre);
        this.doctor = new Doctor(doctor.nombre, doctor.apellido);
    }

}