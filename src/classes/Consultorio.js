import { useState }  from "react";

export class Consultorio {
    constructor({ numero:numero, nombre:nombre }) {
        this.numero = {numero}.numero;
        this.nombre = {nombre}.nombre;
    }

    getState = () => {                                               // Method
        const [numero, setNumero] = useState("");                    // Input Número state
        const [nombre, setNombre] = useState("");                    // Input Nombre state
        const state = [
          { numero: numero, type:"number", handleChange: (event) => setNumero(event.target.value), setState: setNumero },
          { nombre: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

}