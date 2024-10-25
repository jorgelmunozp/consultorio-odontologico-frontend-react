import { useState }  from "react";

export class User {
    constructor({ nombre:nombre, apellido:apellido }) {
      this.nombre = {nombre}.nombre;
      this.apellido = {apellido}.apellido;
  }
  }

export class Paciente extends User {
    constructor({ nombre:nombre, apellido:apellido, identificacion:identificacion, genero:genero, eps:eps }) {
        super({nombre:nombre, apellido:apellido});
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.eps = {eps}.eps;
    }

    getUser () { return new User(this.nombre, this.apellido) }     // Method
    get user () { return this.getUser() }                          // Getter user

    getState = () => {                                             // Method
      const [nombre, setNombre] = useState("");                    // Input Nombre state
      const [apellido, setApellido] = useState("");                // Input Apellido state
      const [identificacion, setIdentificacion] = useState("");    // Input Identificacion state
      const [genero, setGenero] = useState("");                    // Select Genero state
      const [eps, setEps] = useState("");                          // Select Eps state
      const state = [
        { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
        { apellido: apellido, type:"text", handleChange: (event) => setApellido(event.target.value), setState: setApellido },
        { identificacion: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value), setState: setIdentificacion },
        { genero: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value), setState: setGenero },
        { eps: eps, type:"dropdown", handleChange: (event) => setEps(event.target.value), setState: setEps }
      ];
      return( state )
    }      
    get state () { return this.getState() }                        // Getter state

  }

export class Doctor extends User {
    constructor({ nombre:nombre, apellido:apellido, identificacion:identificacion, genero:genero, especialidad:especialidad }) {
        super({nombre:nombre, apellido:apellido});
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.especialidad = {especialidad}.especialidad;
    }

    getUser () { return new User(this.nombre, this.apellido) }     // Method
    get user () { return this.getUser() }                          // Getter user

    getState = () => {                                             // Method
      const [nombre, setNombre] = useState("");                    // Input Nombre state
      const [apellido, setApellido] = useState("");                // Input Apellido state
      const [identificacion, setIdentificacion] = useState("");    // Input Identificacion state
      const [genero, setGenero] = useState("");                    // Select Genero state
      const [especialidad, setEspecialidad] = useState("");        // Select Especialidad state
      const state = [
        { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
        { apellido: apellido, type:"text", handleChange: (event) => setApellido(event.target.value), setState: setApellido },
        { identificacion: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value), setState: setIdentificacion },
        { genero: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value), setState: setGenero },
        { especialidad: especialidad, type:"dropdown", handleChange: (event) => setEspecialidad(event.target.value), setState: setEspecialidad }
      ];

      return( state )
    }      
    get state () { return this.getState() }                          // Getter state

  }