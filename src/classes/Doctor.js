// export class Doctor {
//     constructor(identificacion, nombre, apellido, genero, especialidad) {
//         this.identificacion = identificacion;
//         this.nombre = nombre;
//         this.apellido = apellido;
//         this.genero = genero;
//         this.especialidad = especialidad;
//     }
// }

export class Doctor {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
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