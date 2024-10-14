export class Persona {
    constructor(identificacion, nombre, apellido, genero, eps) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
    }
}

export class Paciente extends Persona {
    constructor(eps) {
        this.eps = eps;
    }
  }

  export class Doctor extends Persona {
    constructor(especialidad) {
        this.especialidad = especialidad;
    }
  }