import { IndexItem } from '../IndexItem';
import { SyringeLight } from '../../icons/medical/SyringeLight';
import { FilterSearch } from '../../icons/filter/FilterSearch';
import { FilterPlus } from '../../icons/filter/FilterPlus';

export const IndexTratamientos = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':9, 'Icon':FilterSearch },
    { 'title':'Registrar', 'menu':10, 'Icon':FilterPlus },
  ];

  return ( <IndexItem classType={'tratamiento'} Icon={SyringeLight} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}

export default IndexTratamientos;