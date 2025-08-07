import { Alert } from '../../alert/Alert.js';
import { fetchCreate } from '../../../helpers/fetchCreate.js';

export const BotonFetch = ({ endIcon,title,urlApi,dataApi,setResponseStatus,className }) => {
  const handleClick = () => {
    if( dataApi.length === 0 ) { Alert({ type:'warning', title:'Debes ingresar todos los datos' }).launch() }
    else { fetchCreate(urlApi,dataApi,setResponseStatus) }
  }

  return ( <button onClick={ handleClick } className={ className }> { title } { endIcon } </button> )
}
export default BotonFetch;