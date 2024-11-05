import { CreateItem } from '../CreateItem';

export const CreatePaciente = ({ Icon, isMenuOpen }) => {
  return ( <CreateItem classType={'paciente'} Icon={Icon} isMenuOpen={isMenuOpen} /> )
}

export default CreatePaciente;