export class User {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
}

export class Paciente extends User {
    constructor(identificacion, nombre, apellido, genero, eps) {
        super(nombre, apellido);
        this.identificacion = identificacion;
        this.genero = genero;
        this.eps = eps;
    }
  }

export class Doctor extends User {
    constructor(nombre, apellido) {
        super(nombre, apellido);
    }
  }

export class DoctorFull extends Doctor {
    constructor(identificacion, nombre, apellido, genero, especialidad) {
        super(nombre, apellido);
        this.identificacion = identificacion;
        this.genero = genero;
        this.especialidad = especialidad;
    }
  }