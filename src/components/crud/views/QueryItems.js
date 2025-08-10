import { Suspense, lazy } from 'react';
const CalendarEdit = lazy(() => import('../../icons/calendar/CalendarEdit.js'));
const CalendarDelete = lazy(() => import('../../icons/calendar/CalendarDelete.js'));
const UserEdit = lazy(() => import('../../icons/user/UserEdit.js'));
const UserDelete = lazy(() => import('../../icons/user/UserDelete.js'));
const HomeEdit = lazy(() => import('../../icons/home/HomeEdit.js'));
const HomeDelete = lazy(() => import('../../icons/home/HomeDelete.js'));
const HearthEdit = lazy(() => import('../../icons/hearth/HearthEdit.js'));
const HearthDelete = lazy(() => import('../../icons/hearth/HearthDelete.js'));
const FilterEdit = lazy(() => import('../../icons/filter/FilterEdit.js'));
const FilterDelete = lazy(() => import('../../icons/filter/FilterDelete.js'));
const QueryItem = lazy(() => import('../QueryItem.js'));

export const QueryItems = ({ classType, icons, isMenuOpen, theme }) => {
  const iconsCrud = { cita: { IconSearch:icons.CitaSearch, IconRead:icons.Cita, IconEdit:CalendarEdit, IconDelete:CalendarDelete },
                      paciente: { IconSearch:icons.PacienteSearch, IconRead:icons.Paciente, IconEdit:UserEdit, IconDelete:UserDelete },
                      doctor: { IconSearch:icons.DoctorSearch, IconRead:icons.Doctor, IconEdit:UserEdit, IconDelete:UserDelete },
                      consultorio: { IconSearch:icons.ConsultorioSearch, IconRead:icons.Consultorio, IconEdit:HomeEdit, IconDelete:HomeDelete },
                      tratamiento: { IconSearch:icons.TratamientoSearch, IconRead:icons.Tratamiento, IconEdit:FilterEdit, IconDelete:FilterDelete },
                      especialidad: { IconSearch:icons.EspecialidadSearch, IconRead:icons.Especialidad, IconEdit:HearthEdit, IconDelete:HearthDelete }
                    }

  return ( <Suspense fallback={<></>}><QueryItem classType={classType} icons={iconsCrud} isMenuOpen={isMenuOpen} theme={theme}/></Suspense> )
}

export default QueryItems;