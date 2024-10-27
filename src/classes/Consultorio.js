import { useState }  from "react";

export class Consultorio {
    constructor({ numero:numero='', nombre:nombre='' }) {
        this.numero = {numero}.numero;
        this.nombre = {nombre}.nombre;
    }

    getTitles = () => {                                              // METHOD TITLES
        const titles = ['Código','Número','Nombre'];
        return( titles )
    }
    get titles () { return this.getTitles() }                        // Getter state

    getState = () => {                                               // METHOD STATE
        const [ numero, setNumero ] = useState('');                    // Input Número state
        const [ nombre, setNombre ] = useState('');                    // Input Nombre state
        const state = [
          { key:'numero', value: numero, type:'number', setState: setNumero, handleChange: (event) => setNumero(event.target.value) },
          { key:'nombre', value: nombre, type:'text', setState: setNombre, handleChange: (event) => setNombre(event.target.value) }
        ];
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

    getQueries = () => {                                             // METHOD QUERIES
        let [ queryCode, setQueryCode ] = useState('');
        let [ queryNumber, setQueryNumber ] = useState('');
        let [ queryName, setQueryName ] = useState('');
        const queries = [ queryCode,queryNumber,queryName ];
        const setQueries = [ setQueryCode,setQueryNumber,setQueryName ];
        // const arrayFiltered = useMemo( () => getConsultoriosFiltered(array,queryCode,queryNumber,queryName), [array,queryCode,queryNumber,queryName] );
        // return({ queries, setQueries, arrayFiltered })
        return({ queries, setQueries })
    }
    get queries () { return this.getQueries() }                    // Getter state

}