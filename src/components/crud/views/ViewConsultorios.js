import { CrudView } from '../CrudView';
import { HomeIndex } from '../../icons/home/HomeIndex';
import { HomeSearch } from '../../icons/home/HomeSearch';
import { HomePlus } from '../../icons/home/HomePlus';


export const ViewConsultorios = ({ isMenuOpen, setMenu }) => {
  const services = [
    { 'title':'Consultar', 'menu':18, 'icon':<HomeSearch height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
    { 'title':'Registrar', 'menu':19, 'icon':<HomePlus height={5} width={5} strokeWidth={1} className='text-muted main-color' /> },
  ];

  return ( <CrudView classType={'consultorio'} Icon={HomeIndex} services={services} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}
