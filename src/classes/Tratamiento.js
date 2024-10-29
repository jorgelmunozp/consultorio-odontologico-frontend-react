import { useState, useMemo, useEffect }  from "react";
import { useFetch } from '../hooks/useFetch';
import { Especialidad } from './Especialidad';
import { Consultorio } from './Consultorio';
import { Doctor } from './User';
import { getTratamientosFiltered } from '../components/selectors/getTratamientosFiltered';
import { jwtDecode } from "jwt-decode";
const urlApi = process.env.REACT_APP_API_TRATAMIENTOS;

export class Tratamiento {
    constructor({ especialidad:especialidad='', consultorio:consultorio='', doctor:doctor='' }) {
        this.especialidad = new Especialidad({ especialidad:{especialidad} });
        this.consultorio = new Consultorio({ consultorio:{consultorio} });
        this.doctor = new Doctor({ doctor:doctor });
    }

    getApi = () => { return( urlApi )}                               // METHOD API
    get api () { return this.getApi() }                              // Getter api

    getTitles = () => { return( ['Código','Especialidad','Consultorio','Doctor'] )}  // METHOD TITLES
    get titles () { return this.getTitles() }                        // Getter titles

    getState = () => {                                               // Method
        const [especialidad, setEspecialidad] = useState("");        // Input especialidad state
        const [consultorio, setConsultorio] = useState("");          // Select consultorio state
        const [doctor, setDoctor] = useState("");                    // Select doctor state
        const state = [
          { key:'especialidad', value: especialidad, type:"dropdown", setState: setEspecialidad, handleChange: (event) => setEspecialidad( event.target.value ) },
          { key:'consultorio', value: consultorio, type:"dropdown", setState: setConsultorio, handleChange: (event) => setConsultorio( event.target.value ) },
          { key:'doctor', value: doctor, type:"dropdown", setState: setDoctor, handleChange: (event) => setDoctor( event.target.value ) }
        ];
        
        return( state )
    }      
    get state () { return this.getState() }                          // Getter state

    getData = () => {                                                // METHOD DATA
        /* Fetch */
        let array = [];
        let [ alertFetch, setAlertFetch ] = useState(false);
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch('errorFetch') } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

        /* Query */
        let [ queryCode, setQueryCode ] = useState('');
        let [ queryName, setQueryName ] = useState('');
        let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
        let [ queryDoctor, setQueryDoctor ] = useState('');
        const queries = [queryCode,queryName,queryConsultoryRoom,queryDoctor];
        const setQueries = [setQueryCode,setQueryName,setQueryConsultoryRoom,setQueryDoctor];
        const arrayFiltered = useMemo( () => getTratamientosFiltered(array,queryCode,queryName,queryConsultoryRoom,queryDoctor), [array,queryCode,queryName,queryConsultoryRoom,queryDoctor] );
        
        /* Pagination */
        const [itemPerPage, setItemPerPage ] = useState(10);                // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(arrayFiltered.length/itemPerPage);      // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = arrayFiltered.length%itemPerPage;                  // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
        let indexPages = [];
        let activePage = [true];                                            // [true]
        if(resPages !== 0 ){
        for(let i = 0; i <= numPages; i++) { 
            indexPages.push(i);                                             // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
        }
        } else if(resPages === 0 ){
        for(let i = 0; i < numPages; i++) { 
            indexPages.push(i);                                             // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                           // [true,false,false,false]
        }
        }
        const [activePages, setActivePages] = useState(activePage);         // [true,false,false,false]
    
        return({ queries,setQueries,arrayFiltered,alertFetch,indexPage,itemPerPage,activePages,indexPages,setAlertFetch,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                              // Getter data

    getSort = () => {                                                  // METHOD SORT
        /* Sort */
        const [sortBy, setSortBy] = useState(0);
        let SortByProperty = () => {};
        switch (sortBy) { 
            case 1: SortByProperty = (a,b) => { return a.id - b.id }; break;                                                // Sort by id up
            case 2: SortByProperty = (a,b) => { return b.id - a.id }; break;                                                // Sort by id down
            case 3: SortByProperty = (a,b) => { return a.tratamiento.nombre.localeCompare(b.tratamiento.nombre) }; break;   // Sort by nombre up
            case 4: SortByProperty = (a,b) => { return b.tratamiento.nombre.localeCompare(a.tratamiento.nombre) }; break;   // Sort by nombre down
            case 5: SortByProperty = (a,b) => { return a.tratamiento.consultorio.localeCompare(b.tratamiento.consultorio) }; break;   // Sort by consultorio up
            case 6: SortByProperty = (a,b) => { return b.tratamiento.consultorio.localeCompare(a.tratamiento.consultorio) }; break;   // Sort by consultorio down
            case 7: SortByProperty = (a,b) => { return a.tratamiento.doctor.nombre.localeCompare(b.tratamiento.doctor.nombre) }; break;   // Sort by doctor name up
            case 8: SortByProperty = (a,b) => { return b.tratamiento.doctor.nombre.localeCompare(a.tratamiento.doctor.nombre) }; break;   // Sort by doctor name down
        }

        return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                              // Getter data

}