import { useCita } from './crud/useCita.js';
import { usePaciente } from './crud/usePaciente.js';
import { useDoctor } from './crud/useDoctor.js';
import { useEspecialidad } from './crud/useEspecialidad.js';
import { useConsultorio } from './crud/useConsultorio.js';
import { useTratamiento } from './crud/useTratamiento.js';

export function useCrudFactory(classType) {
  const cita = useCita();
  const paciente = usePaciente();
  const doctor = useDoctor();
  const consultorio = useConsultorio();
  const tratamiento = useTratamiento();
  const especialidad = useEspecialidad();

  switch (classType) {
    case 'cita': return cita;
    case 'paciente': return paciente;
    case 'doctor': return doctor;
    case 'consultorio': return consultorio;
    case 'tratamiento': return tratamiento;
    case 'especialidad': return especialidad;
    default: throw new Error(`Hook no definido para classType: ${classType}`);
  }
}
export default useCrudFactory;