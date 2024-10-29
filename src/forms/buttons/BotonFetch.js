import { Button } from '@mui/material';
import { fetchCreate } from '../../helpers/fetchCreate';

export const BotonFetch = ({ endIcon,titulo,urlApi,contenidoApi,setResponseStatus }) => {
  return (
        <Button endIcon={ endIcon } className="button" size="large" variant="contained"
            onClick={ () => fetchCreate(urlApi,contenidoApi,setResponseStatus) }
        >
            { titulo }{" "}
        </Button>
  )
}
