import { Button } from '@mui/material';
import { fetchCreate } from '../../helpers/fetchCreate';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setResponseStatus }) => {
  return (
        <Button className="button" size="large" variant="contained" endIcon={ endIcon }
            onClick={ () => fetchCreate(urlApi,contenidoApi,setResponseStatus) }
        >
            { titulo }{" "}
        </Button>
  )
}
