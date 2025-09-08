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

export const QueryItems = ({ classType, Icons, title='Registros', isMenuOpen }) => {
  const IconsCrud = { cita: { IconSearch:Icons.CitaSearch, IconRead:Icons.Cita, IconEdit:CalendarEdit, IconDelete:CalendarDelete },
                      paciente: { IconSearch:Icons.PacienteSearch, IconRead:Icons.Paciente, IconEdit:UserEdit, IconDelete:UserDelete },
                      doctor: { IconSearch:Icons.DoctorSearch, IconRead:Icons.Doctor, IconEdit:UserEdit, IconDelete:UserDelete },
                      consultorio: { IconSearch:Icons.ConsultorioSearch, IconRead:Icons.Consultorio, IconEdit:HomeEdit, IconDelete:HomeDelete },
                      tratamiento: { IconSearch:Icons.TratamientoSearch, IconRead:Icons.Tratamiento, IconEdit:FilterEdit, IconDelete:FilterDelete },
                      especialidad: { IconSearch:Icons.EspecialidadSearch, IconRead:Icons.Especialidad, IconEdit:HearthEdit, IconDelete:HearthDelete }
                    }

  return ( <Suspense fallback={<></>}><QueryItem classType={classType} Icons={IconsCrud} title={title} isMenuOpen={isMenuOpen}/></Suspense> )
}

export default QueryItems;