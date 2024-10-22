import { Paciente } from './Paciente';
import { Tratamiento } from './Tratamiento';
import { Consultorio } from './Consultorio';
import { Doctor } from './Doctor';
import { getDate } from '../helpers/getDate';
import { getTime } from '../helpers/getTime';

export class Cita {
    constructor(paciente, consultorio, doctor, tratamiento) {
        this.paciente = new Paciente(paciente.identificacion, paciente.nombre, paciente.apellido, paciente.genero, paciente.eps);
        this.fecha = getDate[2] + "/" + getDate[1] + "/" + getDate[0];
        this.hora = getTime;
        this.consultorio = new Consultorio(consultorio.numero,consultorio.nombre);
        this.doctor = new Doctor(doctor.nombre, doctor.apellido);
        this.tratamiento = new Tratamiento(tratamiento.nombre, tratamiento.consultorio, tratamiento.doctor);
    }
}