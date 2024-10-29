import { useState } from "react";
import { useFetch } from '../hooks/useFetch';

// const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las Apis para obtención de los datos
// const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
// const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
// const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
// const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
// const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;
// const especialidades  = useFetch(process.env.REACT_APP_API_ESPECIALIDADES).data;

export class DropdownClass {
    constructor() { }

    getState = () => {          
        const pacientes = useFetch(process.env.REACT_APP_API_PACIENTES).data;           // Consume las Apis para obtención de los datos
        const doctores = useFetch(process.env.REACT_APP_API_DOCTORES).data;
        const consultorios = useFetch(process.env.REACT_APP_API_CONSULTORIOS).data;
        const tratamientos = useFetch(process.env.REACT_APP_API_TRATAMIENTOS).data;
        const epss = useFetch(process.env.REACT_APP_API_EPSS).data;
        const generos  = useFetch(process.env.REACT_APP_API_GENEROS).data;
        const especialidades  = useFetch(process.env.REACT_APP_API_ESPECIALIDADES).data;                                                        // METHOD STATE

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