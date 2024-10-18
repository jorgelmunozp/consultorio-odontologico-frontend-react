export class Persona {
    constructor(identificacion, nombre, apellido, genero) {
        this.identificacion = identificacion;
        this.nombre = nombre;
        this.apellido = apellido;
        this.genero = genero;
    }
}

export class Paciente extends Persona {
    constructor(identificacion, nombre, apellido, genero, eps) {
        super(identificacion, nombre, apellido, genero);
        this.eps = eps;
    }
  }

  export class Doctor extends Persona {
    constructor(identificacion, nombre, apellido, genero, especialidad) {
        super(identificacion, nombre, apellido, genero);
        this.especialidad = especialidad;
    }
  }