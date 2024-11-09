import { useState, useMemo, useEffect }  from "react";
import { Alert } from '../components/alert/Alert';
import { useFetch } from '../hooks/useFetch';
import { getPacientesFiltered } from '../components/selectors/getPacientesFiltered';
import { getDoctoresFiltered } from '../components/selectors/getDoctoresFiltered';
import { jwtDecode as decode } from "jwt-decode";

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
        super({ nombre:nombre, apellido:apellido });
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.eps = {eps}.eps;
    }

    getApi = () => { return( urlApiPacientes )}                    // METHOD API
    get api () { return this.getApi() }                            // Getter api

    getUser () { return new User( this.nombre, this.apellido ) }   // METHOD USER
    get user () { return this.getUser() }                          // Getter user

    getTitles = () => {                                            // METHOD TITLES
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
    get titles () { return this.getTitles() }                      // Getter titles

    getState = ({ nomb:nomb='', ape:ape='', id:id='', gen:gen='', eps_:eps_='' }) => { // METHOD STATE
      const [nombre, setNombre] = useState( nomb );                // Input nombre state
      const [apellido, setApellido] = useState( ape );             // Input apellido state
      const [identificacion, setIdentificacion] = useState( id );  // Input identificacion state
      const [genero, setGenero] = useState( gen );                 // Select genero state
      const [eps, setEps] = useState( eps_ );                       // Select eps state
      const state = [
        { key:'nombre', value:nombre, type:"text", setState:setNombre, handleChange: (value) => setNombre( decode(value) ) },
        { key:'apellido', value:apellido, type:"text", setState:setApellido, handleChange: (value) => setApellido( decode(value) ) },
        { key:'identificacion', value:identificacion, type:"number", setState:setIdentificacion, handleChange: (value) => setIdentificacion( decode(value) ) },
        { key:'genero', value:genero, type:"dropdown", setState:setGenero, handleChange: (event) => setGenero( decode(event.target.value) ) },
        { key:'eps', value:eps, type:"dropdown", setState:setEps, handleChange: (event) => setEps( decode(event.target.value) ) }
      ];

      return( state )

    }      
    get state () { return this.getState({ nomb:'', ape:'', id:'', gen:'', eps_:'' }) } // Getter state

    getData = () => {                                              // METHOD DATA
      /* Fetch */
      let array = [];
      const arrayFetch = useFetch(urlApiPacientes);
      useEffect(() => { if(arrayFetch.status >= 400) { Alert({ type:'error', title:'Error en la conexión con la base de datos' }).launch() } },[arrayFetch]);
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
      const [itemsPerPage, setItemPerPage ] = useState(10);           // Se define el número de items por página
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
    get data () { return this.getData() }                             // Getter data

    getSort = () => {                                                 // METHOD SORT
      /* Sort */
      const [sortBy, setSortBy] = useState(0);
      let SortByProperty = () => {};
      switch (sortBy) { 
          case 1: SortByProperty = (a,b) => { return a.id - b.id }; break;                                            // Sort by id up
          case 2: SortByProperty = (a,b) => { return b.id - a.id }; break;                                            // Sort by id down
          case 3: SortByProperty = (a,b) => { return a.paciente.identificacion.localeCompare(b.paciente.identificacion) }; break;  // Sort by identificacion up
          case 4: SortByProperty = (a,b) => { return b.paciente.identificacion.localeCompare(a.paciente.identificacion) }; break;  // Sort by identificacion down
          case 5: SortByProperty = (a,b) => { return a.paciente.nombre.localeCompare(b.paciente.nombre) }; break;     // Sort by nombre up
          case 6: SortByProperty = (a,b) => { return b.paciente.nombre.localeCompare(a.paciente.nombre) }; break;     // Sort by nombre down
          case 7: SortByProperty = (a,b) => { return a.paciente.apellido.localeCompare(b.paciente.apellido) }; break; // Sort by apellido up
          case 8: SortByProperty = (a,b) => { return b.paciente.apellido.localeCompare(a.paciente.apellido) }; break; // Sort by apellido down
          case 9: SortByProperty = (a,b) => { return a.paciente.genero.localeCompare(b.paciente.genero) }; break;     // Sort by genero up
          case 10: SortByProperty = (a,b) => { return b.paciente.genero.localeCompare(a.paciente.genero) }; break;    // Sort by genero down
          case 11: SortByProperty = (a,b) => { return a.paciente.eps.localeCompare(b.paciente.eps) }; break;          // Sort by eps up
          case 12: SortByProperty = (a,b) => { return b.paciente.eps.localeCompare(a.paciente.eps) }; break;          // Sort by eps down
      }

      return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                             // Getter data

  }

export class Doctor extends User {
    constructor({ nombre:nombre='', apellido:apellido='', identificacion:identificacion='', genero:genero='', especialidad:especialidad='' }) {
        super({ nombre:nombre, apellido:apellido });
        this.identificacion = {identificacion}.identificacion;
        this.genero = {genero}.genero;
        this.especialidad = {especialidad}.especialidad;
    }

    getApi = () => { return( urlApiDoctores )}                     // METHOD API
    get api () { return this.getApi() }                            // Getter api

    getUser () { return new User(this.nombre, this.apellido) }     // METHOD USER
    get user () { return this.getUser() }                          // Getter user

    getTitles = () => {                                            // METHOD TITLES
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
    get titles () { return this.getTitles() }                      // Getter titles

    getState = ({ nomb:nomb='', ape:ape='', id:id='', gen:gen='', esp:esp='' }) => { // METHOD STATE
      const [nombre, setNombre] = useState( nomb );                // Input nombre state
      const [apellido, setApellido] = useState( ape );             // Input apellido state
      const [identificacion, setIdentificacion] = useState( id );  // Input identificacion state
      const [genero, setGenero] = useState( gen );                 // Select genero state
      const [especialidad, setEspecialidad] = useState( esp );     // Select especialidad state
      const state = [
        { key:'nombre', value:nombre, type:"text", setState:setNombre, handleChange: (value) => setNombre( decode(value) ) },
        { key:'apellido', value:apellido, type:"text", setState:setApellido, handleChange: (value) => setApellido( decode(value) ) },
        { key:'identificacion', value:identificacion, type:"number", setState:setIdentificacion, handleChange: (value) => setIdentificacion( decode(value) ) },
        { key:'genero', value:genero, type:"dropdown", setState:setGenero, handleChange: (event) => setGenero( decode(event.target.value) ) },
        { key:'especialidad', value:especialidad, type:"dropdown", setState:setEspecialidad, handleChange: (event) => setEspecialidad( decode(event.target.value) ) }
      ];

      return( state )
    }      
    get state () { return this.getState({ nomb:'', ape:'', id:'', gen:'', esp:'' }) } // Getter state

    getData = () => {                                               // METHOD DATA
      /* Fetch */
      let array = [];
      const arrayFetch = useFetch(urlApiDoctores);
      useEffect(() => { if(arrayFetch.status >= 400) { Alert({ type:'error', title:'Error en la conexión con la base de datos' }).launch() } },[arrayFetch]);
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
      const [itemsPerPage, setItemPerPage ] = useState(10);           // Se define el número de items por página
      const [indexPage, setIndexPage ] = useState([0,itemsPerPage]);  // Se calculan los indices de la paginación para el filtro Slice(x,y) que entrega un rango de los items de x a y
      const numPages = Math.floor(arrayFiltered.length/itemsPerPage); // Se calcula la cantidad de páginas = cantidad de items/item por página
      const resPages = arrayFiltered.length%itemsPerPage;             // Se calcula la cantidad de páginas faltantes = cantidad de items%item por página
      let indexPages = [];
      let activePage = [true];                                        // [true]
      if(resPages !== 0 ){
        for(let i = 0; i <= numPages; i++) { 
          indexPages.push(i);                                          // [0,1,2,3]
          if(i < 0) { activePage.push(false); }                        // [true,false,false,false]
        }
      } else if(resPages === 0 ){
        for(let i = 0; i < numPages; i++) { 
          indexPages.push(i);                                          // [0,1,2,3]
          if(i < 0) { activePage.push(false); }                        // [true,false,false,false]
        }
      }
      const [activePages, setActivePages] = useState(activePage);      // [true,false,false,false]
        
      return({ queries,setQueries,arrayFiltered,indexPage,itemsPerPage,activePages,indexPages,setIndexPage,setActivePages })
    }
    get data () { return this.getData() }                              // Getter data

    getSort = () => {                                                  // METHOD SORT
      /* Sort */
      const [sortBy, setSortBy] = useState(0);
      let SortByProperty = () => {};
      switch (sortBy) { 
          case 1: SortByProperty = (a,b) => { return a.id - b.id }; break;                                            // Sort by id up
          case 2: SortByProperty = (a,b) => { return b.id - a.id }; break;                                            // Sort by id down
          case 3: SortByProperty = (a,b) => { return a.doctor.nombre.localeCompare(b.doctor.nombre) }; break;         // Sort by nombre up
          case 4: SortByProperty = (a,b) => { return b.doctor.nombre.localeCompare(a.doctor.nombre) }; break;         // Sort by nombre down
          case 5: SortByProperty = (a,b) => { return a.doctor.apellido.localeCompare(b.doctor.apellido) }; break;     // Sort by apellido up
          case 6: SortByProperty = (a,b) => { return b.doctor.apellido.localeCompare(a.doctor.apellido) }; break;     // Sort by apellido down
          case 7: SortByProperty = (a,b) => { return a.doctor.identificacion.localeCompare(b.doctor.identificacion) }; break; // Sort by identificacion up
          case 8: SortByProperty = (a,b) => { return b.doctor.identificacion.localeCompare(a.doctor.identificacion) }; break; // Sort by identificacion down
          case 9: SortByProperty = (a,b) => { return a.doctor.genero.localeCompare(b.doctor.genero) }; break;              // Sort by genero up
          case 10: SortByProperty = (a,b) => { return b.doctor.genero.localeCompare(a.doctor.genero) }; break;             // Sort by genero down
          case 11: SortByProperty = (a,b) => { return a.doctor.especialidad.localeCompare(b.doctor.especialidad) }; break; // Sort by especialidad up
          case 12: SortByProperty = (a,b) => { return b.doctor.especialidad.localeCompare(a.doctor.especialidad) }; break; // Sort by especialidad down
      }

      return({ SortByProperty, setSortBy })
    }
    get sort () { return this.getSort() }                              // Getter data

  }