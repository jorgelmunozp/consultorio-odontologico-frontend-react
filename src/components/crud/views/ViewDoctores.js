import { CrudView } from '../CrudView';
import { User } from '../../icons/user/User';
import { UserSearch } from '../../icons/user/UserSearch';
import { UserPlus } from '../../icons/user/UserPlus';


export const ViewDoctores = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':12, 'Icon':UserSearch },
    { 'title':'Registrar', 'menu':13, 'Icon':UserPlus },
  ];

  return ( <CrudView classType={'doctor'} Icon={User} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
