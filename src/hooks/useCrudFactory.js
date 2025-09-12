import { useCita } from './crud/useCita.js';
import { usePaciente } from './crud/usePaciente.js';
import { useDoctor } from './crud/useDoctor.js';
import { useEspecialidad } from './crud/useEspecialidad.js';
import { useConsultorio } from './crud/useConsultorio.js';
import { useTratamiento } from './crud/useTratamiento.js';

const hookMap = {
  cita: useCita,
  paciente: usePaciente,
  doctor: useDoctor,
  consultorio: useConsultorio,
  tratamiento: useTratamiento,
  especialidad: useEspecialidad,
};

export const useCrudFactory = ({ classType, initialValues={} }) => {
  const selectedHook = hookMap[classType];

  return selectedHook({ initialValues });
}

export default useCrudFactory;