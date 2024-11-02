import { useState, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';

const apiPacientes = process.env.REACT_APP_API_PACIENTES;           // Consume las Apis para obtención de los datos
const apiDoctores = process.env.REACT_APP_API_DOCTORES;
const apiConsultorios = process.env.REACT_APP_API_CONSULTORIOS;
const apiTratamientos = process.env.REACT_APP_API_TRATAMIENTOS;
const apiEpss = process.env.REACT_APP_API_EPSS;
const apiGeneros  = process.env.REACT_APP_API_GENEROS;
const apiEspecialidades  = process.env.REACT_APP_API_ESPECIALIDADES;

export class DropdownClass {
    constructor() { }

    // getState = () => {          
    //     const pacientes = useFetch(apiPacientes).data;           // Consume las Apis para obtención de los datos
    //     const doctores = useFetch(apiDoctores).data;
    //     const consultorios = useFetch(apiConsultorios).data;
    //     const tratamientos = useFetch(apiTratamientos).data;
    //     const epss = useFetch(apiEpss).data;
    //     const generos  = useFetch(apiGeneros).data;
    //     const especialidades  = useFetch(apiEspecialidades).data;                                                        // METHOD STATE

    //     const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
    //     const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
    //     const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
    //     const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
    //     const [epssDropdown, setEpssDropdown] = useState(epss);
    //     const [generosDropdown, setGenerosDropdown] = useState(generos);
    //     const [especialidadesDropdown, setEspecialidadesDropdown] = useState(especialidades);
    //     const states = [
    //       { option: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
    //       { option: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
    //       { option: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
    //       { option: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
    //       { option: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
    //       { option: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
    //       { option: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(especialidades) }
    //     ];
        
    //     return( states )
    // }      
    // get state () { return this.getState() }                                             // Getter state

    getData = ( key ) => {                                              // METHOD DATA
        /* Fetch */
        let array = [];
        let urlApi = '';

        switch(key) { 
          case 'paciente': urlApi = apiPacientes; break;
          case 'doctor': urlApi = apiDoctores; break;
          case 'consultorio': urlApi = apiConsultorios; break;
          case 'tratamiento': urlApi = apiTratamientos; break;
          case 'eps': urlApi = apiEpss; break;
          case 'genero': urlApi = apiGeneros; break;
          case 'especialidad': urlApi = apiEspecialidades; break;
        };

        let [ alertFetch, setAlertFetch ] = useState(false);
        const arrayFetch = useFetch(urlApi);
        useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch('errorFetch') } },[arrayFetch]);
        if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data; }

        /* Pagination */
        const [itemsPerPage, setItemsPerPage ] = useState(5);               // Se define el número de items por página
        const [indexPage, setIndexPage ] = useState([0,itemsPerPage]);      // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
        const numPages = Math.floor(array.length/itemsPerPage);     // Se calcula la cantidad de páginas = cantidad de items/item por página
        const resPages = array.length%itemsPerPage;                 // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
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
        const pagination = { indexPage:indexPage, indexPage:indexPage, activePages:activePages, indexPages:indexPages, setIndexPage:setIndexPage, setActivePages:setActivePages }

        return({ array, pagination })
    }
    get data () { return this.getData() }                          // Getter data

}