import React from 'react'
import { Button } from '@mui/material';
import { fetchCreate } from '../../helpers/fetchCreate';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setResponseStatus,createFlag }) => {
  return (
        <Button className="button" size="large" variant="contained"
            onClick={ () => fetchCreate(urlApi,contenidoApi,setResponseStatus,createFlag) }
            endIcon={ endIcon }
        >
            { titulo }{" "}
        </Button>
  )
}
