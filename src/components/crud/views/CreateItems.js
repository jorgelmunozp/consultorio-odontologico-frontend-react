import { CreateItem } from '../CreateItem.js';

export const CreateItems = ({ classType, Icon, isMenuOpen }) => {
  return ( <CreateItem classType={classType} Icon={Icon} isMenuOpen={isMenuOpen} /> )
}
export default CreateItems;