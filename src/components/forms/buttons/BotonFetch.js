import { fetchCreate } from '../../../helpers/fetchCreate';

export const BotonFetch = ({ endIcon,title,urlApi,contenidoApi,setResponseStatus,className }) => {
  return (
        <button onClick={ () => fetchCreate(urlApi,contenidoApi,setResponseStatus) } className={ className }>
          { title } { endIcon } 
        </button>
  )
}
