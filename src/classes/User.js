export class User {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
    }
  }

export class Paciente extends User {
    constructor(nombre, apellido, identificacion, genero, eps) {
        super(nombre, apellido);
        this.identificacion = identificacion;
        this.genero = genero;
        this.eps = eps;
    }

    getUser () { return new User(this.nombre, this.apellido) }     // Method
    get user () { return this.getUser() }                          // Getter
  }

export class Doctor extends User {
    constructor(nombre, apellido, identificacion, genero, especialidad) {
        super(nombre, apellido);
        this.identificacion = identificacion;
        this.genero = genero;
        this.especialidad = especialidad;
    }

    getUser () { return new User(this.nombre, this.apellido) }     // Method
    get user () { return this.getUser() }                          // Getter
  }