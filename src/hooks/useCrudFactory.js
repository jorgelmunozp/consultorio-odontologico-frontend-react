import { useCita } from './crud/useCita.js';
import { usePaciente } from './crud/usePaciente.js';
import { useDoctor } from './crud/useDoctor.js';
import { useEspecialidad } from './crud/useEspecialidad.js';
import { useConsultorio } from './crud/useConsultorio.js';
import { useTratamiento } from './crud/useTratamiento.js';

export const useCrudFactory = ({ classType, initialValues={} }) => {
  const hookCita = useCita({ initialValues:initialValues });
  const hookPaciente = usePaciente({ initialValues:initialValues });
  const hookDoctor = useDoctor({ initialValues:initialValues });
  const hookConsultorio = useConsultorio({ initialValues:initialValues });
  const hookTratamiento = useTratamiento({ initialValues:initialValues });
  const hookEspecialidad = useEspecialidad({ initialValues:initialValues });

  switch (classType) {
    case 'cita': return hookCita;
    case 'paciente': return hookPaciente;
    case 'doctor': return hookDoctor;
    case 'consultorio': return hookConsultorio;
    case 'tratamiento': return hookTratamiento;
    case 'especialidad': return hookEspecialidad;
    default: throw new Error(`Hook no definido para classType: ${classType}`);
  }
}
export default useCrudFactory;