import { Alert } from '../../alert/Alert';
import { fetchCreate } from '../../../helpers/fetchCreate';

export const BotonFetch = ({ endIcon,title,urlApi,dataApi,setResponseStatus,className }) => {
console.log("dataApi BotonFetch: ", dataApi)
  const handleClick = () => {
    if( dataApi.length === 0 ) { Alert({ type:'warning', title:'Debes ingresar todos los datos' }).launch() }
    else { fetchCreate(urlApi,dataApi,setResponseStatus) }
  }

  return ( <button onClick={ handleClick } className={ className }> { title } { endIcon } </button> )
}
