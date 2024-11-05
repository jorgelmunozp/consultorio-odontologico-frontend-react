import { CreateItem } from '../CreateItem';

export const CreateDoctor = ({ Icon, isMenuOpen }) => {
  return ( <CreateItem classType={'doctor'} Icon={Icon} isMenuOpen={isMenuOpen} /> )
}

export default CreateDoctor;