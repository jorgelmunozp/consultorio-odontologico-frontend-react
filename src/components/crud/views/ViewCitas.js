import { CrudView } from '../CrudView';
import { CalendarSmile } from '../../icons/calendar/CalendarSmile';
import { CalendarSearch } from '../../icons/calendar/CalendarSearch';
import { CalendarPlus } from '../../icons/calendar/CalendarPlus';

export const ViewCitas = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':3, 'icon':<CalendarSearch height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
    { 'title':'Registrar', 'menu':4, 'icon':<CalendarPlus height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
  ];

  return ( <CrudView classType={'cita'} Icon={CalendarSmile} services={services} IconCreate={CalendarPlus} IconQuery={CalendarSearch} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
