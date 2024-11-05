import { IndexItem } from '../IndexItem';
import { HomeIndex } from '../../icons/home/HomeIndex';
import { HomeSearch } from '../../icons/home/HomeSearch';
import { HomePlus } from '../../icons/home/HomePlus';

export const ViewConsultorios = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':18, 'Icon':HomeSearch },
    { 'title':'Registrar', 'menu':19, 'Icon':HomePlus },
  ];

  return ( <IndexItem classType={'consultorio'} Icon={HomeIndex} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
