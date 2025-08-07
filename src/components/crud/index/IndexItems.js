import { IndexItem } from '../IndexItem.js';

export const IndexItems = ({ classType, isMenuOpen, Icon, IconSearch, IconPlus, menu, setMenu }) => {
  let menu = 0;

  switch (classType) {
    case 'cita':  menu = 3; break;
    case 'paciente': menu = 6; break;
    case 'tratamiento': menu = 9; break;
    case 'doctor': menu = 12; break;
    case 'especialidad': menu = 15; break;
    case 'consultorio': menu = 18; break; 
    default: menu = 0; break;
  }

  const services = [
    { 'title':'Consultar', 'menu':menu, 'Icon':IconSearch },
    { 'title':'Registrar', 'menu':menu+1, 'Icon':IconPlus },
  ];

  return ( <IndexItem classType={classType} Icon={Icon} services={services} IconCreate={IconPlus} IconQuery={IconSearch} isMenuOpen={isMenuOpen} setMenu={setMenu} /> )
}

export default IndexItems;