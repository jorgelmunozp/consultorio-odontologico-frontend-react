import React from 'react'
import { Button } from '@mui/material';
import { guardarFetch } from '../../helpers/guardarFetch2.js';

export const BotonGuardar = ({ endIcon,titulo,urlApi,contenidoApi,setAlertMessage }) => {
  return (
        <Button
            variant="contained"
            className="button"
            size="large"
            onClick={ () => guardarFetch(urlApi,contenidoApi,setAlertMessage) }
            endIcon={ endIcon }
        >
            {titulo}{" "}
        </Button>
  )
}
