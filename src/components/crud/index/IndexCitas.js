import { IndexItem } from '../IndexItem';
import { CalendarSmile } from '../../icons/calendar/CalendarSmile';
import { CalendarSearch } from '../../icons/calendar/CalendarSearch';
import { CalendarPlus } from '../../icons/calendar/CalendarPlus';

export const IndexCitas = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':3, 'Icon':CalendarSearch },
    { 'title':'Registrar', 'menu':4, 'Icon':CalendarPlus },
  ];

  return ( <IndexItem classType={'cita'} Icon={CalendarSmile} services={services} IconCreate={CalendarPlus} IconQuery={CalendarSearch} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}

export default IndexCitas;