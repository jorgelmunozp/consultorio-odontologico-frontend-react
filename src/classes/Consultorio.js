import { useState, useMemo, useEffect }  from "react";
import { useFetch } from '../hooks/useFetch';
import { getConsultoriosFiltered } from '../components/selectors/getConsultoriosFiltered';
const urlApi = process.env.REACT_APP_API_CONSULTORIOS;

export class Consultorio {
    constructor({ numero:numero='', nombre:nombre='' }) {
        this.numero = {numero}.numero;
        this.nombre = {nombre}.nombre;
    }
    
    getTitles = () => { return( ['Código','Número','Nombre'] )}      // METHOD TITLES
    get titles () { return this.getTitles() }                        // Getter titles

    getState = () => {                                               // METHOD STATE
        const [ numero, setNumero ] = useState('');                  // Input Número state
        const [ nombre, setNombre ] = useState('');                  // Input Nombre state
        const state = [
          { key:'numero', value: numero, type:'number', setState: setNumero, handleChange: (event) => setNumero(event.target.value) },
          { key:'nombre', value: nombre, type:'text', setState: setNombre, handleChange: (event) => setNombre(event.target.value) }
        ];
        
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

    getData = () => {                                                // METHOD DATA
        /* Fetch */
        let array = [];
        let [ alertFetch, setAlertFetch ] = useState(false);
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }
        
        /* Query */
        let [ queryCode, setQueryCode ] = useState('');
        let [ queryNumber, setQueryNumber ] = useState('');
        let [ queryName, setQueryName ] = useState('');
        const queries = [ queryCode,queryNumber,queryName ];
        const setQueries = [ setQueryCode,setQueryNumber,setQueryName ];
        const arrayFiltered = useMemo( () => getConsultoriosFiltered(array,queryCode,queryNumber,queryName), [array,queryCode,queryNumber,queryName] );
        
        /* Pagination */
        const [itemPerPage, setItemPerPage ] = useState(10);           // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemPerPage]);  // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(arrayFiltered.length/itemPerPage); // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = arrayFiltered.length%itemPerPage;             // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
        
        let indexPages = [];
        let activePage = [true];                                       // [true]
        if(resPages !== 0 ){
            for(let i = 0; i <= numPages; i++) { 
            indexPages.push(i);                                        // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                      // [true,false,false,false]
            }
        } else if(resPages === 0 ){
            for(let i = 0; i < numPages; i++) { 
            indexPages.push(i);                                        // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                      // [true,false,false,false]
            }
        }
        const [activePages, setActivePages] = useState(activePage);    // [true,false,false,false]
        
        return({ queries,setQueries,arrayFiltered,indexPage,itemPerPage,activePages,indexPages,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                              // Getter data

}