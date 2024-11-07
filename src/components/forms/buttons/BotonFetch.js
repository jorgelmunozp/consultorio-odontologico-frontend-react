import { Alert } from '../../alert/Alert';
import { fetchCreate } from '../../../helpers/fetchCreate';

export const BotonFetch = ({ endIcon,title,urlApi,contenidoApi,setResponseStatus,className }) => {
  const handleClick = () => {
    if( contenidoApi.length === 0 ) { Alert({ type:'warning', title:'Debes ingresar todos los datos' }).launch() }
    else { fetchCreate(urlApi,contenidoApi,setResponseStatus) }
  }

  return ( <button onClick={ handleClick } className={ className }> { title } { endIcon } </button> )
}
