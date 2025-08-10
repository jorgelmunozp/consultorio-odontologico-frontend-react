import { Cita } from './Cita.js';
import { Paciente, Doctor } from './User.js';
import { Especialidad } from './Especialidad.js';
import { Consultorio } from './Consultorio.js';
import { Tratamiento } from './Tratamiento.js';

export const Classes = { 
                cita: { Classe: Cita },
                paciente: { Classe: Paciente },
                doctor: { Classe: Doctor },
                consultorio: { Classe: Consultorio },
                tratamiento: { Classe: Tratamiento },
                especialidad: { Classe: Especialidad }
}

export default Classes;