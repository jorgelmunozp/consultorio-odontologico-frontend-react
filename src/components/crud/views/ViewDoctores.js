import { CrudView } from '../CrudView';
import { User } from '../../icons/user/User';
import { UserSearch } from '../../icons/user/UserSearch';
import { UserPlus } from '../../icons/user/UserPlus';


export const ViewDoctores = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':12, 'icon':<UserSearch height={4} width={4} strokeWidth={1} className='text-muted main-color' /> },
    { 'title':'Registrar', 'menu':13, 'icon':<UserPlus height={4} width={4} strokeWidth={1} className='text-muted main-color' /> },
  ];

  return ( <CrudView classType={'doctor'} Icon={User} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
