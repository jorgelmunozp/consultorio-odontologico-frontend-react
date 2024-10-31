import { CrudView } from '../CrudView';
import { CalendarSmile } from '../../icons/calendar/CalendarSmile';
import { CalendarSearch } from '../../icons/calendar/CalendarSearch';
import { CalendarPlus } from '../../icons/calendar/CalendarPlus';

export const ViewCitas = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':3, 'Icon':CalendarSearch },
    { 'title':'Registrar', 'menu':4, 'Icon':CalendarPlus },
  ];

  return ( <CrudView classType={'cita'} Icon={CalendarSmile} services={services} IconCreate={CalendarPlus} IconQuery={CalendarSearch} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
