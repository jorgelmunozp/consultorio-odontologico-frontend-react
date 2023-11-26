import React from 'react'
import { Button } from '@mui/material';
import { createFetch } from '../../helpers/createFetch.js';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setResponseStatus }) => {
  return (
        <Button
            className="button"
            size="large"
            variant="contained"
            onClick={ () => createFetch(urlApi,contenidoApi,setResponseStatus) }
            endIcon={ endIcon }
        >
            {titulo}{" "}
        </Button>
  )
}
