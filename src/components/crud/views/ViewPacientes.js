import { CrudView } from '../CrudView';
import { User } from '../../icons/user/User';
import { UserSearch } from '../../icons/user/UserSearch';
import { UserPlus } from '../../icons/user/UserPlus';


export const ViewPacientes = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':6, 'Icon':UserSearch },
    { 'title':'Registrar', 'menu':7, 'Icon':UserPlus },
  ];

  return ( <CrudView classType={'paciente'} Icon={User} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
