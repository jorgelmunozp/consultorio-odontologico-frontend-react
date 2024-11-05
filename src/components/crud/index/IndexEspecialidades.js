import { IndexItem } from '../IndexItem';
import { StethoscopeLight } from '../../icons/medical/StethoscopeLight';
import { HearthSearch } from '../../icons/hearth/HearthSearch';
import { HearthPlus } from '../../icons/hearth/HearthPlus';

export const IndexEspecialidades = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':15, 'Icon':HearthSearch },
    { 'title':'Registrar', 'menu':16, 'Icon':HearthPlus },
  ];

  return ( <IndexItem classType={'especialidad'} Icon={StethoscopeLight} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
