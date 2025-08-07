import { CreateItem } from '../CreateItem.js';

export const CreateItems = ({ classType, Icon, isMenuOpen, theme }) => {
  return ( <CreateItem classType={classType} Icon={Icon} isMenuOpen={isMenuOpen} theme={theme} /> )
}
export default CreateItems;