import { CrudView } from '../CrudView';
import { SyringeLight } from '../../icons/medical/SyringeLight';
import { FilterSearch } from '../../icons/filter/FilterSearch';
import { FilterPlus } from '../../icons/filter/FilterPlus';


export const ViewTratamientos = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':9, 'icon':<FilterSearch height={4} width={4} strokeWidth={1} className='text-muted main-color' /> },
    { 'title':'Registrar', 'menu':10, 'icon':<FilterPlus height={4} width={4} strokeWidth={1} className='text-muted main-color' /> },
  ];

  return ( <CrudView classType={'tratamiento'} Icon={SyringeLight} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
