import React from 'react'
import { Button } from '@mui/material';
import { createFetch } from '../../helpers/createFetch.js';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setAlertMessage }) => {
  return (
        <Button
            variant="contained"
            className="button"
            size="large"
            onClick={ () => createFetch(urlApi,contenidoApi,setAlertMessage) }
            endIcon={ endIcon }
        >
            {titulo}{" "}
        </Button>
  )
}
