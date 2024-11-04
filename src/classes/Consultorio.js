import { useState, useMemo, useEffect }  from "react";
import { Alert } from '../components/alert/Alert';
import { useFetch } from '../hooks/useFetch';
import { getConsultoriosFiltered } from '../components/selectors/getConsultoriosFiltered';
import { jwtDecode } from "jwt-decode";
const urlApi = process.env.REACT_APP_API_CONSULTORIOS;

export class Consultorio {
    constructor({ numero:numero='', nombre:nombre='' }) {
        this.numero = {numero}.numero;
        this.nombre = {nombre}.nombre;
    }

    getApi = () => { return( urlApi )}                               // METHOD API
    get api () { return this.getApi() }                              // Getter api

    getTitles = () => {                                              // METHOD TITLES
        let titles = [];
        this.state.forEach((parameter, index) => { 
            titles[index] = { 
                title:parameter.key.charAt(0).toUpperCase() + parameter.key.slice(1), 
                type:parameter.type 
            }
        });

        let placeholders = ['Código'];
        titles.forEach(item => { placeholders.push(item.title) } );

        return({ titles, placeholders })
    }                          
    get titles () { return this.getTitles() }                        // Getter titles

    getState = () => {                                               // METHOD STATE
        const [ numero, setNumero ] = useState('');                  // Input Número state
        const [ nombre, setNombre ] = useState('');                  // Input Nombre state
        const state = [
          { key:'numero', value:numero, type:'number', setState:setNumero, handleChange: (event) => setNumero( event.target.value ) },
          { key:'nombre', value:nombre, type:'text', setState:setNombre, handleChange: (event) => setNombre( event.target.value ) }
        ];
        
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

    getData = () => {                                                // METHOD DATA
        /* Fetch */
        let array = [];
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { Alert({ type:'error', title:'Error en la conexión con la base de datos' }).launch() } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }
        
        /* Query */
        let [ queryCode, setQueryCode ] = useState('');
        let [ queryNumber, setQueryNumber ] = useState('');
        let [ queryName, setQueryName ] = useState('');
        const queries = [ queryCode,queryNumber,queryName ];
        const setQueries = [ setQueryCode,setQueryNumber,setQueryName ];
        const arrayFiltered = useMemo( () => getConsultoriosFiltered(array,queryCode,queryNumber,queryName), [array,queryCode,queryNumber,queryName] );
        
        /* Pagination */
        const [itemsPerPage, setItemsPerPage ] = useState(10);           // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemsPerPage]);  // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(arrayFiltered.length/itemsPerPage); // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = arrayFiltered.length%itemsPerPage;             // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
        
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
        
        return({ queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                              // Getter data

    getSort = () => {                                                  // METHOD SORT
        /* Sort */
        const [sortBy, setSortBy] = useState(0);
        let SortByProperty = () => {};
        switch (sortBy) { 
            case 1: SortByProperty = (a,b) => { return a.id - b.id }; break;                                                // Sort by id up
            case 2: SortByProperty = (a,b) => { return b.id - a.id }; break;                                                // Sort by id down
            case 3: SortByProperty = (a,b) => { return a.consultorio.numero - b.consultorio.numero }; break;                // Sort by numero up
            case 4: SortByProperty = (a,b) => { return b.consultorio.numero - a.consultorio.numero }; break;                // Sort by numero down
            case 5: SortByProperty = (a,b) => { return a.consultorio.nombre.localeCompare(b.consultorio.nombre) }; break;   // Sort by nombre up
            case 6: SortByProperty = (a,b) => { return b.consultorio.nombre.localeCompare(a.consultorio.nombre) }; break;   // Sort by nombre down
        }

        return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                              // Getter data

}