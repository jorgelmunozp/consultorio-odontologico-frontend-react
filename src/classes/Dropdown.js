import { useState } from "react";
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

    getState = () => {          
        const pacientes = useFetch(apiPacientes).data;           // Consume las Apis para obtención de los datos
        const doctores = useFetch(apiDoctores).data;
        const consultorios = useFetch(apiConsultorios).data;
        const tratamientos = useFetch(apiTratamientos).data;
        const epss = useFetch(apiEpss).data;
        const generos  = useFetch(apiGeneros).data;
        const especialidades  = useFetch(apiEspecialidades).data;                                                        // METHOD STATE

        const [pacientesDropdown, setPacientesDropdown] = useState(pacientes);          // Variables de estado para el manejo de lños Dropdowns
        const [doctoresDropdown, setDoctoresDropdown] = useState(doctores);
        const [consultoriosDropdown, setConsultoriosDropdown] = useState(consultorios);
        const [tratamientosDropdown, setTratamientosDropdown] = useState(tratamientos);
        const [epssDropdown, setEpssDropdown] = useState(epss);
        const [generosDropdown, setGenerosDropdown] = useState(generos);
        const [especialidadesDropdown, setEspecialidadesDropdown] = useState(especialidades);
        const states = [
          { option: pacientesDropdown, handleSelect: () => setPacientesDropdown(pacientes) },
          { option: doctoresDropdown, handleSelect: () => setDoctoresDropdown(doctores) },
          { option: consultoriosDropdown, handleSelect: () => setConsultoriosDropdown(consultorios) },
          { option: tratamientosDropdown, handleSelect: () => setTratamientosDropdown(tratamientos) },
          { option: epssDropdown, handleSelect: () => setEpssDropdown(epss) },
          { option: generosDropdown, handleSelect: () => setGenerosDropdown(generos) },
          { option: especialidadesDropdown, handleSelect: () => setEspecialidadesDropdown(especialidades) }
        ];
        
        return( states )
    }      
    get state () { return this.getState() }                                             // Getter state

}