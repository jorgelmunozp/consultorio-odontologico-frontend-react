import { IndexItem } from '../IndexItem.js';

export const IndexItems = ({ classType, Icon, IconSearch, IconPlus, menu, setMenu, isMenuOpen, theme }) => {
  const services = [
    { 'title':'Consultar', 'menu':menu+1, 'Icon':IconSearch },
    { 'title':'Registrar', 'menu':menu+2, 'Icon':IconPlus },
  ];

  return ( <IndexItem classType={classType} Icon={Icon} services={services} IconCreate={IconPlus} IconQuery={IconSearch} isMenuOpen={isMenuOpen} setMenu={setMenu} theme={theme} /> )
}

export default IndexItems;