import { useState }  from "react";

export class Consultorio {
    constructor({ numero:numero='', nombre:nombre='' }) {
        this.numero = {numero}.numero;
        this.nombre = {nombre}.nombre;
    }

    getState = () => {                                               // Method
        const [numero, setNumero] = useState('');                    // Input Número state
        const [nombre, setNombre] = useState('');                    // Input Nombre state
        const state = [
          { key:'numero', value: numero, type:'number', setState: setNumero, handleChange: (event) => setNumero(event.target.value) },
          { key:'nombre', value: nombre, type:'text', setState: setNombre, handleChange: (event) => setNombre(event.target.value) }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

}