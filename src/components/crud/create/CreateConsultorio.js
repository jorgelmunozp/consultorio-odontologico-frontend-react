import { CreateItem } from '../CreateItem';

export const CreateConsultorio = ({ Icon, isMenuOpen }) => {
  return ( <CreateItem classType={'consultorio'} Icon={Icon} isMenuOpen={isMenuOpen} /> )
}

export default CreateConsultorio;