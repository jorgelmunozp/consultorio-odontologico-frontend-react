import { lazy, useState, useMemo, useEffect }  from "react";
import { Alert } from '../components/alert/Alert.js';
import { useFetch } from '../hooks/useFetch.js';
import { Especialidad } from './Especialidad.js';
import { Consultorio } from './Consultorio.js';
import { Doctor } from './User.js';
import { getTratamientosFiltered } from '../components/selectors/getTratamientosFiltered.js';
import { jwtDecode as decode } from "jwt-decode";

// const Alert = lazy(() => import('../components/alert/Alert.js'));

const urlApi = process.env.REACT_APP_API_TRATAMIENTOS;

export class Tratamiento {
    constructor({ especialidad:especialidad='', consultorio:consultorio='', doctor:doctor='' }) {
        this.especialidad = new Especialidad({ especialidad:{especialidad} });
        this.consultorio = new Consultorio({ consultorio:{consultorio} });
        this.doctor = new Doctor({ doctor:doctor });
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

    getState = ({ esp:esp='', cons:cons='', doc:doc='' }) => {       // Method
        const [especialidad, setEspecialidad] = useState( esp );     // Input especialidad state
        const [consultorio, setConsultorio] = useState( cons );      // Select consultorio state
        const [doctor, setDoctor] = useState( doc );                 // Select doctor state
        const state = [
          { key:'especialidad', value:especialidad, type:"dropdown", setState:setEspecialidad, handleChange: (event) => setEspecialidad( decode(event.target.value) ) },
          { key:'consultorio', value:consultorio, type:"dropdown", setState:setConsultorio, handleChange: (event) => setConsultorio( decode(event.target.value) ) },
          { key:'doctor', value:doctor, type:"dropdown", setState:setDoctor, handleChange: (event) => setDoctor( decode(event.target.value) ) }
        ];
        
        return( state )
    }      
    get state () { return this.getState({ esp:'', cons:'', doc:'' }) } // Getter state

    getData = () => {                                                // METHOD DATA
        /* Fetch */
        let array = [];
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { Alert({ type:'error', title:'Error en la conexión con la base de datos' }).launch() } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

        /* Query */
        let [ queryCode, setQueryCode ] = useState('');
        let [ querySpecialty, setQuerySpecialty ] = useState('');
        let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
        let [ queryDoctor, setQueryDoctor ] = useState('');
        const queries = [queryCode,querySpecialty,queryConsultoryRoom,queryDoctor];
        const setQueries = [setQueryCode,setQuerySpecialty,setQueryConsultoryRoom,setQueryDoctor];
        const arrayFiltered = useMemo( () => getTratamientosFiltered(array,queryCode,querySpecialty,queryConsultoryRoom,queryDoctor), [array,queryCode,querySpecialty,queryConsultoryRoom,queryDoctor] );
        
        /* Pagination */
        const [itemsPerPage, setItemsPerPage ] = useState(10);          // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemsPerPage]);  // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(arrayFiltered.length/itemsPerPage); // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = arrayFiltered.length%itemsPerPage;             // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
        let indexPages = [];
        let activePage = [true];                                        // [true]
        if(resPages !== 0 ){
        for(let i = 0; i <= numPages; i++) { 
            indexPages.push(i);                                         // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                       // [true,false,false,false]
        }
        } else if(resPages === 0 ){
        for(let i = 0; i < numPages; i++) { 
            indexPages.push(i);                                         // [0,1,2,3]
            if(i < 0) { activePage.push(false); }                       // [true,false,false,false]
        }
        }
        const [activePages, setActivePages] = useState(activePage);     // [true,false,false,false]
    
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
            case 3: SortByProperty = (a,b) => { return a.tratamiento.especialidad.localeCompare(b.tratamiento.especialidad) }; break; // Sort by especialidad up
            case 4: SortByProperty = (a,b) => { return b.tratamiento.especialidad.localeCompare(a.tratamiento.especialidad) }; break; // Sort by especialidad down
            case 5: SortByProperty = (a,b) => { return a.tratamiento.consultorio.localeCompare(b.tratamiento.consultorio) }; break;   // Sort by consultorio up
            case 6: SortByProperty = (a,b) => { return b.tratamiento.consultorio.localeCompare(a.tratamiento.consultorio) }; break;   // Sort by consultorio down
            case 7: SortByProperty = (a,b) => { return a.tratamiento.doctor.localeCompare(b.tratamiento.doctor) }; break;   // Sort by doctor name up
            case 8: SortByProperty = (a,b) => { return b.tratamiento.doctor.localeCompare(a.tratamiento.doctor) }; break;   // Sort by doctor name down
        }

        return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                              // Getter data

}