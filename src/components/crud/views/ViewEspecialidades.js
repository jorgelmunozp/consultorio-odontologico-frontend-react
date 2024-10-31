import { CrudView } from '../CrudView';
import { StethoscopeLight } from '../../icons/medical/StethoscopeLight';
import { HearthSearch } from '../../icons/hearth/HearthSearch';
import { HearthPlus } from '../../icons/hearth/HearthPlus';


export const ViewEspecialidades = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':15, 'icon':<HearthSearch height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
    { 'title':'Registrar', 'menu':16, 'icon':<HearthPlus height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
  ];

  return ( <CrudView classType={'especialidad'} Icon={StethoscopeLight} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
