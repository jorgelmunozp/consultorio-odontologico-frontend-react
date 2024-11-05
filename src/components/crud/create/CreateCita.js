import { CreateItem } from '../CreateItem';

export const CreateCita = ({ Icon, isMenuOpen }) => {
  return ( <CreateItem classType={'cita'} Icon={Icon} isMenuOpen={isMenuOpen} /> )
}

export default CreateCita;