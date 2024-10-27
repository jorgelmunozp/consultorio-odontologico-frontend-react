import { useState, useMemo, useEffect }  from "react";
import { useFetch } from '../hooks/useFetch';
import { Paciente } from './User';
import { Tratamiento } from './Tratamiento';
import { Consultorio } from './Consultorio';
import { Doctor } from './User';
import { getDate } from '../helpers/getDate';
import { getTime } from '../helpers/getTime';
import { getCitasFiltered } from '../components/selectors/getCitasFiltered';
const urlApi = process.env.REACT_APP_API_CITAS;

export class Cita {
    constructor({ paciente:paciente='', consultorio:consultorio='', doctor:doctor='', tratamiento:tratamiento='' }) {
        this.paciente = new Paciente({ paciente:{paciente} });
        this.fecha = getDate[2] + "/" + getDate[1] + "/" + getDate[0];
        this.hora = getTime;
        this.consultorio = new Consultorio({ consultorio:{consultorio} });
        this.doctor = new Doctor({ doctor:{doctor} });
        this.tratamiento = new Tratamiento({ tratamiento:{tratamiento} });
    }

    getApi = () => { return( urlApi )}                            // METHOD API
    get api () { return this.getApi() }                           // Getter api

    getTitles = () => { return( ['Código','Paciente','Fecha','Hora','Consultorio','Médico','Tratamiento'] )}  // METHOD TITLES
    get titles () { return this.getTitles() }                     // Getter titles

    getState = () => {                                            // Method
        const [paciente, setPaciente] = useState("");             //Select Paciente
        let [fecha, setFecha] = useState(getDate[2] + "-" + getDate[1] + "-" + getDate[0]);
        let [hora, setHora] = useState(getTime);
        const [consultorio, setConsultorio] = useState("");       //Select Consultorio
        const [doctor, setDoctor] = useState("");                 //Select Doctor
        const [tratamiento, setTratamiento] = useState("");       //Select Tratamiento      
        const state = [
          { key:'paciente', value: paciente, type:"dropdown", setState: setPaciente , handleChange: (event) => setPaciente(JSON.parse(event.target.value))},
          { key:'fecha', value: fecha, type:"date", setState: setFecha , handleChange: (event) => setFecha(event.target.value)},
          { key:'hora', value: hora, type:"time", setState: setHora, handleChange: (event) => setHora(event.target.value) },
          { key:'consultorio', value: consultorio, type:"dropdown", setState: setConsultorio, handleChange: (event) => setConsultorio(JSON.parse(event.target.value)) },
          { key:'doctor', value: doctor, type:"dropdown", setState: setDoctor, handleChange: (event) => setDoctor(JSON.parse(event.target.value)) },
          { key:'tratamiento', value: tratamiento, type:"dropdown", setState: setTratamiento, handleChange: (event) => setTratamiento(JSON.parse(event.target.value)) }
        ];

        return( state )
    }      
    get state () { return this.getState() }                        // Getter state

    getData = () => {                                              // METHOD DATA
        /* Fetch */
        let array = [];
        let [ alertFetch, setAlertFetch ] = useState(false);
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data; }

        /* Query */
        let [ queryCode, setQueryCode ] = useState('');
        let [ queryPatient, setQueryPatient ] = useState('');
        let [ queryDate, setQueryDate ] = useState('');
        let [ queryTime, setQueryTime ] = useState('');
        let [ queryConsultoryRoom, setQueryConsultoryRoom ] = useState('');
        let [ queryDoctor, setQueryDoctor ] = useState('');
        let [ queryTreatment, setQueryTreatment ] = useState('');
        const queries = [queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment];
        const setQueries = [setQueryCode,setQueryPatient,setQueryDate,setQueryTime,setQueryConsultoryRoom,setQueryDoctor,setQueryTreatment];
        const arrayFiltered = useMemo( () => getCitasFiltered(array,queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment), [array,queryCode,queryPatient,queryDate,queryTime,queryConsultoryRoom,queryDoctor,queryTreatment] );
        
        /* Pagination */
        const [itemPerPage, setItemPerPage ] = useState(10);                // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemPerPage]);       // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(arrayFiltered.length/itemPerPage);      // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = arrayFiltered.length%itemPerPage;                  // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
        let indexPages = [];
        let activePage = [true];                                            // [true]
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
        const [activePages, setActivePages] = useState(activePage);         // [true,false,false,false]
        
        return({ queries,setQueries,arrayFiltered,alertFetch,indexPage,itemPerPage,activePages,indexPages,setAlertFetch,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                          // Getter data

    getSort = () => {                                              // METHOD SORT
        /* Sort */
        const [sortBy, setSortBy] = useState(0);
        let SortByProperty = () => {};
        switch (sortBy) { 
            case 1: SortByProperty = (a,b) => { return a.id - b.id }; break;                                    // Sort by id up
            case 2: SortByProperty = (a,b) => { return b.id - a.id }; break;                                    // Sort by id down
            case 3: SortByProperty = (a,b) => { return a.cita.paciente.localeCompare(b.cita.paciente) }; break; // Sort by paciente up
            case 4: SortByProperty = (a,b) => { return b.cita.paciente.localeCompare(a.cita.paciente) }; break; // Sort by paciente down
            case 5: SortByProperty = (a,b) => { return a.cita.fecha.localeCompare(b.cita.fecha) }; break;       // Sort by fecha up
            case 6: SortByProperty = (a,b) => { return b.cita.fecha.localeCompare(a.cita.fecha) }; break;       // Sort by fecha down
            case 7: SortByProperty = (a,b) => { return a.cita.hora.localeCompare(b.cita.hora) }; break;         // Sort by hora up
            case 8: SortByProperty = (a,b) => { return b.cita.hora.localeCompare(a.cita.hora) }; break;         // Sort by hora down
            case 9: SortByProperty = (a,b) => { return a.cita.consultorio.localeCompare(b.cita.consultorio) }; break;  // Sort by consultorio up
            case 10: SortByProperty = (a,b) => { return b.cita.consultorio.localeCompare(a.cita.consultorio) }; break; // Sort by consultorio down
            case 11: SortByProperty = (a,b) => { return a.cita.doctor.localeCompare(b.cita.doctor) }; break;    // Sort by doctor up
            case 12: SortByProperty = (a,b) => { return b.cita.doctor.localeCompare(a.cita.doctor) }; break;    // Sort by doctor down
            case 13: SortByProperty = (a,b) => { return a.cita.tratamiento.localeCompare(b.cita.tratamiento) }; break; // Sort by tratamiento up
            case 14: SortByProperty = (a,b) => { return b.cita.tratamiento.localeCompare(a.cita.tratamiento) }; break; // Sort by tratamiento down
        }

        return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                           // Getter data

}