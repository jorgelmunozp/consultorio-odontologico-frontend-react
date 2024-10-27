import { useState, useMemo, useEffect }  from "react";
import { useFetch } from '../hooks/useFetch';
import { getPacientesFiltered } from '../components/selectors/getPacientesFiltered';
import { getDoctoresFiltered } from '../components/selectors/getDoctoresFiltered';
const urlApiPacientes = process.env.REACT_APP_API_PACIENTES;
const urlApiDoctores = process.env.REACT_APP_API_DOCTORES;

export class User {
    constructor({ nombre:nombre, apellido:apellido }) {
      this.nombre = {nombre}.nombre;
      this.apellido = {apellido}.apellido;
    }
  }

export class Paciente extends User {
    constructor({ nombre:nombre='', apellido:apellido='', identificacion:identificacion='', genero:genero='', eps:eps='' }) {
        super({nombre:nombre, apellido:apellido});
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.eps = {eps}.eps;
    }

    getUser () { return new User( this.nombre, this.apellido ) }   // METHOD USER
    get user () { return this.getUser() }                          // Getter user

    getTitles = () => { return( ['Código','identificacion','Nombre','Apellido','Género','Eps'] )}  // METHOD TITLES
    get titles () { return this.getTitles() }                      // Getter titles

    getState = () => {                                             // METHOD STATE
      const [nombre, setNombre] = useState("");                    // Input Nombre state
      const [apellido, setApellido] = useState("");                // Input Apellido state
      const [identificacion, setIdentificacion] = useState("");    // Input Identificacion state
      const [genero, setGenero] = useState("");                    // Select Genero state
      const [eps, setEps] = useState("");                          // Select Eps state
      const state = [
        { key:'nombre', value: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
        { key:'apellido', value: apellido, type:"text", handleChange: (event) => setApellido(event.target.value), setState: setApellido },
        { key:'identificacion', value: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value), setState: setIdentificacion },
        { key:'genero', value: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value), setState: setGenero },
        { key:'eps', value: eps, type:"dropdown", handleChange: (event) => setEps(event.target.value), setState: setEps }
      ];
      return( state )
    }      
    get state () { return this.getState() }                        // Getter state

    getData = () => {                                              // METHOD DATA
      /* Fetch */
      let array = [];
      let [ alertFetch, setAlertFetch ] = useState(false);
      const arrayFetch = useFetch(urlApiPacientes);
      useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
      if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }

      /* Query */
      let [ queryCode, setQueryCode ] = useState('');
      let [ queryIdentification, setQueryIdentification ] = useState('');
      let [ queryName, setQueryName ] = useState('');
      let [ queryLastname, setQueryLastname ] = useState('');
      let [ queryGender, setQueryGender ] = useState('');
      let [ queryEps, setQueryEps ] = useState('');
      const queries = [queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps];
      const setQueries = [setQueryCode,setQueryIdentification,setQueryName,setQueryLastname,setQueryGender,setQueryEps];
      const arrayFiltered = useMemo( () => getPacientesFiltered(array,queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps), [array,queryCode,queryIdentification,queryName,queryLastname,queryGender,queryEps] );
      
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
          
      return({ queries,setQueries,arrayFiltered,indexPage,itemPerPage,activePages,indexPages,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                                 // Getter data

  }

export class Doctor extends User {
    constructor({ nombre:nombre='', apellido:apellido='', identificacion:identificacion='', genero:genero='', especialidad:especialidad='' }) {
        super({nombre:nombre, apellido:apellido});
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.especialidad = {especialidad}.especialidad;
    }

    getUser () { return new User(this.nombre, this.apellido) }     // METHOD USER
    get user () { return this.getUser() }                          // Getter user

    getTitles = () => { return( ['Código','Nombre','Apellido','Especialidad'] )}  // METHOD TITLES
    get titles () { return this.getTitles() }                      // Getter titles

    getState = () => {                                             // METHOD STATE
      const [nombre, setNombre] = useState("");                    // Input Nombre state
      const [apellido, setApellido] = useState("");                // Input Apellido state
      const [identificacion, setIdentificacion] = useState("");    // Input Identificacion state
      const [genero, setGenero] = useState("");                    // Select Genero state
      const [especialidad, setEspecialidad] = useState("");        // Select Especialidad state
      const state = [
        { key:'nombre', value: nombre, type:"text", handleChange: (event) => setNombre(event.target.value), setState: setNombre },
        { key:'apellido', value: apellido, type:"text", handleChange: (event) => setApellido(event.target.value), setState: setApellido },
        { key:'identificacion', value: identificacion, type:"number", handleChange: (event) => setIdentificacion(event.target.value), setState: setIdentificacion },
        { key:'genero', value: genero, type:"dropdown", handleChange: (event) => setGenero(event.target.value), setState: setGenero },
        { key:'especialidad', value: especialidad, type:"dropdown", handleChange: (event) => setEspecialidad(event.target.value), setState: setEspecialidad }
      ];

      return( state )
    }      
    get state () { return this.getState() }                          // Getter state

    getData = () => {                                                // METHOD DATA
      /* Fetch */
      let array = [];
      let [ alertFetch, setAlertFetch ] = useState(false);
      const arrayFetch = useFetch(urlApiDoctores);
      useEffect(() => { if(arrayFetch.status >= 400) { setAlertFetch(true) } },[arrayFetch]);
      if(arrayFetch.data.length !== (0 || undefined)) { array = arrayFetch.data }
  
      /* Query */
      let [ queryCode, setQueryCode ] = useState('');
      let [ queryName, setQueryName ] = useState('');
      let [ queryLastname, setQueryLastname ] = useState('');
      let [ querySpeciality, setQuerySpeciality ] = useState('');
      const queries = [queryCode,queryName,queryLastname,querySpeciality];
      const setQueries = [setQueryCode,setQueryName,setQueryLastname,setQuerySpeciality];
      const arrayFiltered = useMemo( () => getDoctoresFiltered(array,queryCode,queryName,queryLastname,querySpeciality), [array,queryCode,queryName,queryLastname,querySpeciality] );
      
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
        
      return({ queries,setQueries,arrayFiltered,indexPage,itemPerPage,activePages,indexPages,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                              // Getter data

  }