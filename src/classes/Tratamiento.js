import { Consultorio } from './Consultorio';

export class Tratamiento {
    constructor(nombre, consultorio, doctor) {
        this.nombre = nombre;
        this.consultorio = new Consultorio(consultorio.numero, consultorio.nombre);
        this.doctor = doctor;
    }

}